<template>
  <div>
    <h2>
      {{ movie.id }}
    </h2>
    <h2 class="h-16">{{ movie.title }}</h2>
    <img
      class="pt-2"
      :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
    />
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
