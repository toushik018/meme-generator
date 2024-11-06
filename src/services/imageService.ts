export interface MemeTemplate {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  box_count: number;
}

export const fetchMemeTemplates = async (): Promise<MemeTemplate[]> => {
  try {
    const response = await fetch('https://api.imgflip.com/get_memes');
    const data = await response.json();
    if (data.success) {
      return data.data.memes;
    }
    return [];
  } catch (error) {
    console.error('Error fetching meme templates:', error);
    return [];
  }
}; 