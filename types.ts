
export interface TattooIdea {
  title: string;
  description: string;
  suggestedStyles: string[];
  placementAdvice: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export enum TattooStyle {
  TRADITIONAL = 'Traditional',
  NEOTRADITIONAL = 'Neo-Traditional',
  REALISM = 'Realism',
  BLACKWORK = 'Blackwork',
  FINELINE = 'Fine Line',
  JAPANESE = 'Japanese (Irezumi)',
  WATERCOLOR = 'Watercolor',
  MINIMALIST = 'Minimalist'
}
