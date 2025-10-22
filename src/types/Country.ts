export interface Country {
    flags: {
      png: string;
      svg: string;
      alt?: string; 
    };
    name: {
      common: string;
      official: string;
      nativeName?: {
        [languageCode: string]: {
          official: string;
          common: string;
        };
      };
    };
    cca3: string;
    capital?: string[]; 
    region: string;
    languages?: {
      [languageCode: string]: string;
    };
    population: number;
  }