<template>
  <div :key="detail.id">
    <p>
      {{ id }}
    </p>
    <div v-if="detail.title">
      <p>
        {{ detail.title }}
      </p>
      <img :src="'https://image.tmdb.org/t/p/w500' + detail.poster_path" />
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

    onMounted(() => {
      fetchDetail();
    });

    return {
      id,
      detail,
    };
  },
};
</script>
