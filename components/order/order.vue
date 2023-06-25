<template>
  <div class="w-full flex justify-center">
    <div>
      <form>
        <select
          class="text-slate-800 rounded-full border border-gray-300 px-4 py-2 pr-8 focus:outline-none focus:border-blue-500"
          @change="filterMovies"
        >
          <option value="default" selected>Default</option>
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
          <option value="+">Score +</option>
          <option value="-">Score -</option>
        </select>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useMovieStore } from "@/store/movies";

const movieStore = useMovieStore();

const filterMovies = (event) => {
  movieStore.filterOrder(event.target.value);
};
</script>
