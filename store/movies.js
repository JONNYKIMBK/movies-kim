import { defineStore } from "pinia";
import axios from "axios";

export const useMovieStore = defineStore({
  id: "movies",
  state: () => ({
    movies: [],
  }),
  actions: {
    async fetchMovies() {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNjAyN2M5NTYzNmRjMmUxMTFmNzllYzM5M2RlM2IyMSIsInN1YiI6IjY0OTMyZDgyNGJhNTIyMDEzOTM4YTkxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bgd-7B9FoPwZhvsY50GXj9ebtRhW8xQjBePgSXB7XHs",
        },
      };

      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
        options
      );
      console.log(response.data.results);

      this.movies = response.data.results;
    },
  },
});
