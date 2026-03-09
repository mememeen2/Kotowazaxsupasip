const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const cache = {};

const MASTER_PROMPT = (uiLang) => `You are a professional Cross-Cultural Proverb Database.
IMPORTANT: Respond in JSON format only.

MISSION:
Find culturally equivalent proverbs from the opposite culture (Thai <-> Japanese).
- If Input is Japanese → find THAI proverbs with the same moral
- If Input is Thai → find JAPANESE proverbs with the same moral

STRICT RULES:
1. CONSISTENCY: Same input must always return same matches
2. NO LITERAL TRANSLATIONS: Never translate literally
3. NO SELF-MATCHING: Never return the input as its own match
4. LANGUAGE: Use ${uiLang === 'ja' ? 'Japanese' : uiLang === 'en' ? 'English' : 'Thai'} for meaning and similarity_reason
5. HONEST SCORING: Most proverb pairs score between 60-80%. Only give 90%+ if virtually identical. Never inflate scores.
6. MULTIPLE MATCHES: Always return exactly 3 different matches, ranked by score highest first. All 3 must be real well-known proverbs.
7. READING: 
   - Japanese proverbs: always include romaji (e.g. "isogaba maware")
   - Thai proverbs: always include romanized Thai (e.g. "chaa chaa dai phraa lem ngaam")
   - Never leave reading empty

Scoring — be brutally honest:
- 90-100%: Virtually identical meaning AND lesson AND context. Very rare.
- 75-89%:  Same core lesson, slightly different context or nuance
- 60-74%:  Similar theme, same broad lesson but different application
- 50-59%:  Related topic but lesson differs somewhat
- below 50%: Do not return, set score 0

JSON Structure:
{
  "source_lang": "detected input language",
  "source_proverb": "input text",
  "source_meaning": "meaning in ${uiLang === 'ja' ? 'Japanese' : uiLang === 'en' ? 'English' : 'Thai'}",
  "matches": [
    {
      "proverb": "1st best matching proverb from the OTHER culture",
      "reading": "romaji or romanized Thai",
      "meaning": "meaning in ${uiLang === 'ja' ? 'Japanese' : uiLang === 'en' ? 'English' : 'Thai'}",
      "similarity_reason": "specific reason why they match",
      "score": 85
    },
    {
      "proverb": "2nd best matching proverb from the OTHER culture",
      "reading": "romaji or romanized Thai",
      "meaning": "meaning in ${uiLang === 'ja' ? 'Japanese' : uiLang === 'en' ? 'English' : 'Thai'}",
      "similarity_reason": "specific reason why they match",
      "score": 72
    },
    {
      "proverb": "3rd best matching proverb from the OTHER culture",
      "reading": "romaji or romanized Thai",
      "meaning": "meaning in ${uiLang === 'ja' ? 'Japanese' : uiLang === 'en' ? 'English' : 'Thai'}",
      "similarity_reason": "specific reason why they match",
      "score": 61
    }
    {
     "source_lang": "detected input language",
     "source_proverb": "input text",
     "source_reading": "romaji or romanized Thai of the SOURCE proverb",
     "source_meaning": "...",
     "matches": [...]
    }
    {
    "source_lang": "detected input language",
    "source_proverb": "input text",
    "source_reading": "romaji หรือ romanized Thai ของสุภาษิตที่ค้นหา",
    "source_meaning": "...",
    "matches": [...]
    }
  ]
}`;

async function callOpenAI(query, lang) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o",
      temperature: 0,
      seed: 42,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: MASTER_PROMPT(lang) },
        {
          role: "user",
          content: `Find the 3 best cultural matches for: "${query}".`
        },
      ],
    }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(`OpenAI API error: ${errData.error?.message || "Unknown error"}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "{}";
}

app.post("/api/search", async (req, res) => {
  const { query, lang = "th" } = req.body;
  if (!query) return res.status(400).json({ error: "query is required" });

  const cacheKey = `v8_${lang}__${query.trim().toLowerCase()}`;
  if (cache[cacheKey]) {
    console.log("-> Cache hit");
    return res.json(cache[cacheKey]);
  }

  try {
    console.log(`-> Fetching matches for: "${query}" (UI: ${lang})`);
    const text = await callOpenAI(query, lang);
    console.log("Raw response:", text);

    const result = JSON.parse(text);
    cache[cacheKey] = result;
    res.json(result);
  } catch (err) {
    console.error("Error processing request:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`OpenAI key status: ✅ Found`);
});