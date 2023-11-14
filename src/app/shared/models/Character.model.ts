export interface Character {
    id?: number;
    name?: string;
    status?: 'Alive' | 'Dead' | 'unknown';
    species?: string;
    type?: string;
    gender?: 'Female' | 'Male' | 'Genderless' | 'unknown';
    origin?: {
      name?: string;
      link?: string;
    };
    location?: {
      name?: string;
      link?: string;
    };
    image?: string;
    episode?: string[];
    url?: string;
    created?: string;
  }