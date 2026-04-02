import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

async function withRetry<T>(fn: () => Promise<T>, maxRetries = 5): Promise<T> {
  let lastError: any;
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;
      const isQuotaError = error?.message?.includes('429') || error?.status === 'RESOURCE_EXHAUSTED';
      if (isQuotaError && i < maxRetries - 1) {
        // More aggressive backoff: 5s, 10s, 20s, 40s...
        const waitTime = Math.pow(2, i) * 5000 + Math.random() * 2000;
        console.warn(`Quota hit, retrying in ${Math.round(waitTime)}ms...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        continue;
      }
      throw error;
    }
  }
  throw lastError;
}

export async function generateDollBase(skinColor: string) {
  return withRetry(async () => {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `A professional 2D anime character base doll. Full body, front-facing, neutral standing pose. The character has ${skinColor} skin. Clean, high-quality line art with soft shading. The character is wearing simple, modest white undergarments. No hair, no accessories, no background (pure white background). This is a base template for a dress-up game. Masterpiece quality, cute aesthetic.`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "3:4",
        },
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  });
}

export async function generateLayeredAsset(category: string, style: string) {
  return withRetry(async () => {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `Kawaii anime game asset: a ${style} ${category}. Front view, centered, designed to fit a standard anime doll body. Isolated on a plain white background, clean lines, vibrant colors, high resolution, 2D game art style. No character, just the ${category}.`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "3:4",
        },
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  });
}
