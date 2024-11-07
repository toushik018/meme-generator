export interface MemeTemplate {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  box_count: number;
}

export interface DecorativeElement {
  id: string;
  name: string;
  url: string;
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

export const frames: DecorativeElement[] = [
  {
    id: 'frame1',
    name: 'Gold Frame',
    url: '/frame.png',
  },
  {
    id: 'frame2',
    name: 'Silver Frame',
    url: '/frame2.png',
  },
  {
    id: 'frame3',
    name: 'Wooden Frame',
    url: '/frame3.png',
  },
  {
    id: 'frame4',
    name: 'Wooden Frame',
    url: '/frame4.png',
  },
  {
    id: 'frame5',
    name: 'Wooden Frame',
    url: '/frame5.png',
  },
  {
    id: 'frame6',
    name: 'Wooden Frame',
    url: '/frame6.png',
  }
];

export const heads: DecorativeElement[] = [
  {
    id: 'head1',
    name: 'Cool Hat',
    url: '/head1.png',
  },
  {
    id: 'head2',
    name: 'Party Hat',
    url: '/head2.png',
  },
  {
    id: 'head3',
    name: 'Crown',
    url: '/head3.png',
  },
  {
    id: 'head4',
    name: 'Crown',
    url: '/head4.png',
  },
  {
    id: 'head5',
    name: 'Crown',
    url: '/head5.png',
  },
];

export const attributes: DecorativeElement[] = [
  {
    id: 'attr1',
    name: 'Sunglasses',
    url: '/attr1.png',
  },
  {
    id: 'attr2',
    name: 'Bowtie',
    url: '/attr2.png',
  },
  {
    id: 'attr3',
    name: 'Mustache',
    url: '/attr3.png',
  },
  {
    id: 'attr4',
    name: 'Glasses',
    url: '/attr4.png',
  },
  {
    id: 'attr5',
    name: 'Glasses',
    url: '/attr5.png',
  },
  {
    id: 'attr6',
    name: 'Glasses',
    url: '/attr6.png',
  },
  {
    id: 'attr7',
    name: 'Glasses',
    url: '/attr7.png',
  },
  {
    id: 'attr8',
    name: 'Glasses',
    url: '/attr8.png',
  },
  {
    id: 'attr9',
    name: 'Glasses',
    url: '/attr9.png',
  },

]; 