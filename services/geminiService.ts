
import { GoogleGenAI, Type } from "@google/genai";
import { TattooIdea } from "../types";

const API_KEY = process.env.API_KEY || '';

export const getTattooIdeas = async (prompt: string, imageBase64?: string, styles?: string[]): Promise<TattooIdea[]> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const selectedStyleString = styles && styles.length > 0 
    ? styles.join(', ') 
    : "High-contrast Nordic Blackwork, Primal Runes, and Blood Red splatters";

  const parts: any[] = [
    { text: `The user is seeking a tattoo design for "Blod' Hel Tattoo Studio".
    Aesthetic Rules:
    1. STYLE: ${selectedStyleString}. The design must strictly adhere to these styles while maintaining the studio's signature dark, high-contrast look.
    2. THEME: Raven iconography (Hugin/Munin), Norse Mythology, and Sacred Geometry.
    3. COLORS: Primarily Black and White with intentional, aggressive Blood Red accents.
    
    User Request: "${prompt}"
    
    Generate 3 unique tattoo concepts in this specific Blod' Hel style.` }
  ];

  if (imageBase64) {
    parts.push({
      inlineData: {
        mimeType: "image/jpeg",
        data: imageBase64.split(',')[1] // Extract base64 part
      }
    });
    parts[0].text += "\nUse the attached image as a visual reference for the composition or symbols.";
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
        High-contrast blackwork, sharp Nordic runes, a central raven figure, and aggressive red blood splatter accents. 
        Solid white background. Design should look hand-inked, primal, and mythic. 
        Concept: ${prompt}` }
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
