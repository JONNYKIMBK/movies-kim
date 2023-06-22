<template>
  <div class="flex flex-wrap">
    <div
      v-for="movie in movieList"
      :key="movie.id"
      :id="movie.id"
      class="w-full p-2 md:w-1/5"
    >
      <MovieCard :id="movie.id" />
    </div>
  </div>
</template>

<script>
import { useMovieStore } from "@/store/movies";
import MovieCard from "@/components/movieCard/MovieCard.vue";
import { watch, ref } from "vue";

export default {
  components: {
    MovieCard,
  },
  setup() {
    const movieStore = useMovieStore();

    const movieList = ref([]);

    watch(
      () => movieStore.movies,
      (newVal) => {
        movieList.value = newVal;
      }
    );

    return {
      fetchMovies: movieStore.fetchMovies,
      movieList,
    };
  },
  async mounted() {
    await this.fetchMovies();
  },
};
</script>
