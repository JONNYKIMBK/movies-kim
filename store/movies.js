import { defineStore } from "pinia";
import axios from "axios";

export const useMovieStore = defineStore({
  id: "movies",
  state: () => ({
    movies: [],
    copyMovies: [],
  }),
  actions: {
    async fetchMovies() {
      const runtimeConfig = useRuntimeConfig();

      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: runtimeConfig.public.key,
        },
      };

      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
        options
      );

      this.movies = response.data.results;
      this.copyMovies = [].concat(response.data.results);
    },

    filterOrder(order) {
      if (order == "default") this.movies = [].concat(this.copyMovies);

      if (order == "a-z") {
        this.movies.sort((a, b) => {
          const titleA = a.title.toUpperCase();
          const titleB = b.title.toUpperCase();

          if (titleA < titleB) return -1;

          if (titleA > titleB) return 1;

          return 0;
        });
      }

      if (order == "z-a") {
        this.movies.sort((a, b) => {
          const titleA = a.title.toUpperCase();
          const titleB = b.title.toUpperCase();

          if (titleA < titleB) return 1;

          if (titleA > titleB) return -1;

          return 0;
        });
      }

      if (order == "+") {
        this.movies.sort((a, b) => {
          return b.vote_average - a.vote_average;
        });
      }

      if (order == "-") {
        this.movies.sort((a, b) => {
          return a.vote_average - b.vote_average;
        });
      }
    },
  },
});
