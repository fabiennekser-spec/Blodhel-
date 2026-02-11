
import { GoogleGenAI, Type } from "@google/genai";
import { TattooIdea } from "../types";

const API_KEY = process.env.API_KEY || '';

export const getTattooIdeas = async (prompt: string, imageBase64?: string, styles?: string[]): Promise<TattooIdea[]> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const selectedStyleString = styles && styles.length > 0 
    ? styles.join(', ') 
    : "Clean Nordic Blackwork, Fineline Runes, and Mist-inspired shading";

  const parts: any[] = [
    { text: `The user is seeking a tattoo design for "Blod' Hel Tattoo Studio".
    Aesthetic Rules:
    1. STYLE: ${selectedStyleString}. High-contrast blackwork with elegant, sharp Nordic linework.
    2. THEME: Nature-focused Nordic mythology (Yggdrasil, Fjords, Mountains), Ancestral Runes, and Celestial Geometry.
    3. COLORS: Primarily deep black ink with soft slate-grey shading and occasional crisp white highlights. AVOID all red or bloody imagery. Focus on "Frost" and "Stone" textures.
    
    User Request: "${prompt}"
    
    Generate 3 unique tattoo concepts that feel ancient, serene, and majestic.` }
  ];

  if (imageBase64) {
    parts.push({
      inlineData: {
        mimeType: "image/jpeg",
        data: imageBase64.split(',')[1] // Extract base64 part
      }
    });
    parts[0].text += "\nUse the attached image as a visual reference for the composition or natural elements.";
  }

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: { parts },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            suggestedStyles: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            placementAdvice: { type: Type.STRING }
          },
          required: ["title", "description", "suggestedStyles", "placementAdvice"]
        }
      },
    },
  });

  return JSON.parse(response.text);
};

export const generateTattooImage = async (prompt: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { text: `A professional tattoo design for Blod' Hel Studio. 
        Clean high-contrast blackwork, sharp Nordic runes, a majestic mountain or forest silhouette. 
        Serene and mythic. Solid white background. Linework should feel like etched stone.
        NO RED, NO BLOOD, NO SKULLS. Concept: ${prompt}` }
      ]
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1"
      }
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  throw new Error("No image generated");
};
