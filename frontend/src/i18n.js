export const translations = {
  th: {
    tagline: "ことわざ × สุภาษิต",
    title: "สุภาษิตสองแผ่นดิน",
    subtitle: "ค้นหาสุภาษิตข้ามภาษา — 🇹🇭 ไทย ⇌ ญี่ปุ่น 🇯🇵 — ด้วย AI",
    inputLabel: "พิมพ์สุภาษิตไทย หรือ 日本語のことわざ",
    inputPlaceholder: "เช่น น้ำขึ้นให้รีบตัก  หรือ  七転び八起き",
    searchBtn: "ค้นหา →",
    searching: "⏳ กำลังค้นหา...",
    examples: "ตัวอย่าง:",
    loadingText: "กำลังค้นหาสุภาษิตที่ใกล้เคียง...",
    similarity: "ความใกล้เคียง",
    meaning: "ความหมาย",
    sourceLabel_thai: "สุภาษิตไทยที่ค้นหา",
    sourceLabel_japanese: "สุภาษิตญี่ปุ่นที่ค้นหา",
    matchLabel_thai: "สุภาษิตไทยที่ใกล้เคียง",
    matchLabel_japanese: "สุภาษิตญี่ปุ่นที่ใกล้เคียง",
    errorMsg: "เกิดข้อผิดพลาด กรุณาตรวจสอบว่า backend รันอยู่ที่ port 3001",
    footer: "ขับเคลื่อนด้วย OpenAI · GPT-4o",
  },
  ja: {
    tagline: "ことわざ × สุภาษิต",
    title: "ことわざの架け橋",
    subtitle: "AIでタイ語と日本語のことわざをつなぐ — 🇹🇭 ⇌ 🇯🇵",
    inputLabel: "タイ語または日本語のことわざを入力",
    inputPlaceholder: "例：น้ำขึ้นให้รีบตัก または 七転び八起き",
    searchBtn: "検索 →",
    searching: "⏳ 検索中...",
    examples: "例：",
    loadingText: "AIが類似のことわざを検索中...",
    similarity: "類似度",
    meaning: "意味",
    sourceLabel_thai: "検索したタイ語のことわざ",
    sourceLabel_japanese: "検索した日本語のことわざ",
    matchLabel_thai: "類似するタイ語のことわざ",
    matchLabel_japanese: "類似する日本語のことわざ",
    errorMsg: "エラーが発生しました。バックエンドがポート3001で起動しているか確認してください。",
    footer: "OpenAI · GPT-4o 提供",
  },
  en: {
    tagline: "ことわざ × สุภาษิต",
    title: "Proverbs Across Borders",
    subtitle: "Find matching proverbs between Thai & Japanese — 🇹🇭 ⇌ 🇯🇵 — powered by AI",
    inputLabel: "Enter a Thai or Japanese proverb",
    inputPlaceholder: "e.g. น้ำขึ้นให้รีบตัก  or  七転び八起き",
    searchBtn: "Search →",
    searching: "⏳ Searching...",
    examples: "Examples:",
    loadingText: "AI is finding similar proverbs...",
    similarity: "Similarity",
    meaning: "Meaning",
    sourceLabel_thai: "Thai proverb searched",
    sourceLabel_japanese: "Japanese proverb searched",
    matchLabel_thai: "Similar Thai proverbs",
    matchLabel_japanese: "Similar Japanese proverbs",
    errorMsg: "An error occurred. Please make sure the backend is running on port 3001.",
    footer: "Powered by OpenAI · GPT-4o",
  },
};

export const SYSTEM_PROMPTS = {
  th: `คุณเป็นผู้เชี่ยวชาญด้านสุภาษิตไทยและญี่ปุ่น

กฎสำคัญ:
- ใช้เฉพาะสุภาษิตที่มีอยู่จริงและเป็นที่รู้จักดีเท่านั้น
- ห้ามแต่งสุภาษิตขึ้นเอง ห้ามแปลตรงตัว
- ถ้าหาไม่ได้ให้ใส่ "ไม่พบสุภาษิตที่ใกล้เคียง" และ score เป็น 0
- ถ้าผลลัพธ์เป็นสุภาษิตญี่ปุ่น ใส่ reading เป็นโรมาจิทุกครั้ง
- ถ้าผลลัพธ์เป็นสุภาษิตไทย ใส่ reading เป็นคำอ่านภาษาไทยแบบถอดเสียง เช่น "nám khûen hâi rîip tàk"
- score ต้องเหมือนเดิมทุกครั้งสำหรับคำค้นเดิม

สุภาษิตไทยที่ใช้ได้ เช่น:
น้ำขึ้นให้รีบตัก, ช้าๆได้พร้าสองเล่มงาม, ไก่งามเพราะขน คนงามเพราะแต่ง,
รักดีหามจั่ว รักชั่วหามเสา, น้ำพึ่งเรือเสือพึ่งป่า, กว่าถั่วจะสุกงาก็ไหม้,
รักวัวให้ผูก รักลูกให้ตี, ไม้อ่อนดัดง่าย ไม้แก่ดัดยาก,
น้ำเชี่ยวอย่าขวางเรือ, เข้าเมืองตาหลิ่วต้องหลิ่วตาตาม, สี่ตีนยังรู้พลาด,
อย่าไว้ใจทาง อย่าวางใจคน จะจนใจเอง

ตอบเป็น JSON เท่านั้น:
{
  "source_lang": "thai",
  "source_proverb": "น้ำขึ้นให้รีบตัก",
  "source_meaning": "เมื่อมีโอกาสดีควรรีบคว้าไว้",
  "matches": [
    {
      "proverb": "好機逸すべからず",
      "reading": "kouki issubeki karazu",
      "meaning": "อย่าปล่อยให้โอกาสดีผ่านไป",
      "similarity_reason": "ทั้งคู่สอนให้รีบคว้าโอกาสเมื่อมี",
      "score": 90
    }
  ]
}
  

ตัวอย่าง output เมื่อค้นญี่ปุ่น:
{
  "source_lang": "japanese",
  "source_proverb": "七転び八起き",
  "source_meaning": "ล้มแล้วต้องลุกขึ้นใหม่เสมอ",
  "matches": [
    {
      "proverb": "ความพยายามอยู่ที่ไหน ความสำเร็จอยู่ที่นั่น",
      "reading": "khwaam phayaayaam yuu thîi nǎi khwaam samret yuu thîi nân",
      "meaning": "ถ้าไม่ยอมแพ้ สุดท้ายก็สำเร็จ",
      "similarity_reason": "ทั้งคู่สอนให้ไม่ยอมแพ้",
      "score": 75
    }
  ]
}`,

  ja: `あなたはタイ語と日本語のことわざの専門家です。

重要なルール:
- 実在する有名なことわざのみを使用すること
- ことわざを自分で作らないこと
- 日本語のことわざにはローマ字readingを必ず記入すること
- タイ語のことわざにはタイ語ローマ字読み（例: nám khûen hâi rîip tàk）を必ず記入すること
- 同じ入力には常に同じscoreを返すこと

JSONのみで回答:
{
  "source_lang": "japanese",
  "source_proverb": "七転び八起き",
  "source_meaning": "何度失敗しても諦めずに立ち上がる",
  "matches": [
    {
      "proverb": "น้ำขึ้นให้รีบตัก",
      "reading": "nám khûen hâi rîip tàk",
      "meaning": "チャンスが来たら素早く掴め",
      "similarity_reason": "どちらも好機を逃さない行動力を教えている",
      "score": 70
    }
  ]
}`,

  en: `You are an expert in Thai and Japanese proverbs.

Important rules:
- Use only well-known, widely recognized proverbs that actually exist
- Never invent proverbs
- Japanese proverbs must always include romaji reading
- Thai proverbs must always include romanized Thai reading (e.g. "nám khûen hâi rîip tàk")
- Always return the same score for the same input

Respond in JSON only:
{
  "source_lang": "japanese",
  "source_proverb": "七転び八起き",
  "source_meaning": "Never give up no matter how many times you fall",
  "matches": [
    {
      "proverb": "น้ำขึ้นให้รีบตัก",
      "reading": "nám khûen hâi rîip tàk",
      "meaning": "Seize the opportunity when it comes",
      "similarity_reason": "Both teach the importance of timely action",
      "score": 70
    }
  ]
}`,
};