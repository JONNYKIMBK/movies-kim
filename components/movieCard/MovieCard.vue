<template>
  <div
    class="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 flex flex-col text-center group"
  >
    <div class="hover:opacity-60">
      <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" />

      <h2
        class="h-8 md:h-16 mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50"
      >
        {{ movie.title }}
      </h2>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useMovieStore } from "~/store/movies";

export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const movieStore = useMovieStore();
    const state = reactive({
      movie: {},
    });

    const updateMovie = () => {
      state.movie = movieStore.movies.find((movie) => movie.id === props.id);
    };

    updateMovie();

    return {
      movie: state.movie,
    };
  },
};
</script>
