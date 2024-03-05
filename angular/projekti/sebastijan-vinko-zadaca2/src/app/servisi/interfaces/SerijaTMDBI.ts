export interface SerijaTMDBI {
  page: number;
  results: Array<SerijaTMDBI>;
  total_pages: number;
  total_results: number;
}

export interface SerijaTMDBI {
  id: number;
  original_name: string;
  name: string;
  overview: string;
  number_of_seasons: number;
  number_of_episodes: number;
  original_language: string;
  poster_path: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  homepage: string;
}
