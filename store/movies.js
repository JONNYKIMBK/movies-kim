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
          Authorization: process.env.key,
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
