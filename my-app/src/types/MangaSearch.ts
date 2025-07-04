export type MangaSearch = {
  data: Manga[];
  pagination: Pagination;
};

type Pagination = {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
};

type Title = {
  type: string;
  title: string;
};

export type DefaultMangaInfo = {
  mal_id: number;
  type: string;
  name: string;
  url: string;
};

export type Manga = {
  mal_id: number;
  url: string;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
    webp: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  approved: boolean;
  titles: Title[];
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  type: string;
  chapters: number;
  volumes: number;
  status: string;
  publishing: boolean;
  published: {
    from: string;
    to: string;
    prop: {
      from: {
        day: number;
        month: number;
        year: number;
      };
      to: {
        day: number;
        month: number;
        year: number;
      };
    };
    string: string;
  };
  score: number;
  scored: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  authors: DefaultMangaInfo[];
  serializations: DefaultMangaInfo[];
  genres: DefaultMangaInfo[];
  explicit_genres: DefaultMangaInfo[];
  themes: DefaultMangaInfo[];
  demographics: DefaultMangaInfo[];
};