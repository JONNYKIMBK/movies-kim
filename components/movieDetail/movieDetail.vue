<template>
  <div :key="detail.id" class="h-screen w-full">
    <p>
      {{ id }}
    </p>
    <div class="md:flex flex-column pt-2" v-if="detail.title">
      <div class="md:pr-40 md:w-2/3">
        <img
          class=""
          :src="'https://image.tmdb.org/t/p/w500' + detail.poster_path"
        />
      </div>

      <div>
        <h1 class="text-3xl pb-2">
          {{ detail.title }}
        </h1>

        <div v-if="detail.belongs_to_collection !== null">
          <img
            :src="
              'https://image.tmdb.org/t/p/w500' +
              detail.belongs_to_collection.backdrop_path
            "
          />
        </div>
        <div v-else>
          <img
            :src="'https://image.tmdb.org/t/p/w500' + detail.backdrop_path"
          />
        </div>

        <div class="bg-slate-800">
          <p class="pt-2 md:w-4/5">
            {{ detail.overview }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";

export default {
  setup() {
    let { id } = useRoute().params;
    let detail = ref({});

    async function fetchDetail() {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNjAyN2M5NTYzNmRjMmUxMTFmNzllYzM5M2RlM2IyMSIsInN1YiI6IjY0OTMyZDgyNGJhNTIyMDEzOTM4YTkxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bgd-7B9FoPwZhvsY50GXj9ebtRhW8xQjBePgSXB7XHs",
        },
      };

      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
        options
      );

      detail.value = response.data;
    }

    // onMounted(() => {
    fetchDetail();
    // });

    return {
      id,
      detail,
    };
  },
};
</script>
