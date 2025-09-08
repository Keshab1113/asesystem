import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_TRANSLATE_API as string;

export async function translateText(
  targetLang: string,
  text: string | string[]
): Promise<string | string[]> {
  try {
    // If input is an array, translate each element
    if (Array.isArray(text)) {
      const translations = await Promise.all(
        text.map(async (item) => {
          const response = await axios.get(API_URL, {
            params: {
              q: item,
              langpair: `en|${targetLang}`,
            },
          });
          return response.data.responseData.translatedText as string;
        })
      );
      return translations;
    }

    // If input is a single string
    const response = await axios.get(API_URL, {
      params: {
        q: text,
        langpair: `en|${targetLang}`,
      },
    });

    return response.data.responseData.translatedText as string;
  } catch (error) {
    console.error("Translation error:", error);
    return Array.isArray(text) ? text.map(() => "Translation failed") : "Translation failed";
  }
}
