import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

async function generateCover() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is not set");
    process.exit(1);
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `Album cover art for 'The Meeting of The Legends - Remix 2006'. Featuring artists 'Aşkın Şerbetçi' (Turkish font style) and 'Omar Faruk Tekbilek'. Text 'Coming Soon' should be visible. The visual style should be warm, heartfelt, and uplifting, blending Turkish melodic tradition with cinematic world-music textures. Include traditional instruments like the ney, oud, and kanun artfully arranged or being played. The atmosphere should be intimate, timeless, and deeply human, suggesting a journey into the unknown. High quality, photorealistic or highly detailed artistic style.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-image-preview',
      contents: {
        parts: [
          {
            text: prompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
          imageSize: "1K"
        }
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64EncodeString = part.inlineData.data;
        const buffer = Buffer.from(base64EncodeString, 'base64');
        const outputPath = path.join(process.cwd(), 'public', 'The_Meeting_of_The_Legends_Remix_2006_Cover.png');
        fs.writeFileSync(outputPath, buffer);
        console.log(`Image saved to ${outputPath}`);
      }
    }
  } catch (error) {
    console.error("Error generating image:", error);
    process.exit(1);
  }
}

generateCover();
