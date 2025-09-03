export type Picture = {
  id: string; title: string; artist: string; url: string;
  description?: string; bytes?: number;
};
export type ChatMessage = { pictureId: string; author: string; text: string; ts: number };
