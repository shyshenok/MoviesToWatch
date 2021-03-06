/**
 * Created by shyshenok on 17.02.2018.
 */
export interface MovieResponse {
  page: number;
  total_results: number;
  total_pages: number;
  results: MovieResponseResult[];
}

export interface MovieResponseResult {
  vote_count: number;
  id: number;
  video: boolean;
  vote_average: number;
  title: string;
  popularity: number;
  poster_path: string;
  original_language: string;
  original_title: string;
  genre_ids: number[];
  backdrop_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
}
