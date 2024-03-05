export interface SerijeTMDBI {
  page: number;
  results: Array<SerijeTMDBI>;
  total_pages: number;
  total_results: number;
}
export interface SerijeTMDBI {
  id: number;
  original_name: string;
  name: string;
  overview: string;
  original_language: string;
  poster_path: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
}
  