<template>
  <div :key="detail.id" class="bg-slate-800 md:h-screen">
    <div class="md:flex flex-column pt-2" v-if="detail.title">
      <div class="pb-2 md:pt-2">
        <img
          class=""
          :src="'https://image.tmdb.org/t/p/w500' + detail.poster_path"
        />
      </div>

      <div class="border-2 p-4 border-sky-500 m-2 md:w-3/4">
        <h1 class="text-3xl pb-2 font-bold">
          {{ detail.title }}
        </h1>

        <div>
          <div
            v-if="
              detail.belongs_to_collection !== null &&
              detail.belongs_to_collection.backdrop_path !== null
            "
          >
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
        </div>

        <div>
          <span class="font-bold text-neutral-500"> Score: </span>
          <span :class="color">
            {{ Math.round(detail.vote_average * 10) }}%
          </span>
        </div>

        <div>
          <span>
            <span class="font-bold text-neutral-500">Release date: </span>
            <span>{{ detail.release_date }}</span>
          </span>
        </div>

        <div>
          <span>
            <span class="font-bold text-neutral-500"> Genres: </span>

            <span class="pr-3" v-for="genre in detail.genres"
              >| {{ genre.name }} |</span
            >
          </span>
        </div>

        <div class="bg-slate-800">
          <span class="pt-2 md:w-4/5">
            <span class="font-bold text-neutral-500"> Description: </span>
            <p>
              {{ detail.overview }}
            </p>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";

export default {
  setup() {
    let { id } = useRoute().params;
    let detail = ref({});
    let color = ref("text-red-500");
    const runtimeConfig = useRuntimeConfig();

    const setColor = (detail) => {
      if (detail.vote_average >= 7) {
        color.value = "text-green-500";
      }
      if (detail.vote_average < 7 && detail.vote_average >= 5) {
        color.value = "text-yellow-400";
      }
    };

    async function fetchDetail() {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: runtimeConfig.public.key,
        },
      };

      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
        options
      );

      detail.value = response.data;

      setColor(response.data);
    }

    fetchDetail();

    watch(detail, () => {
      if (detail.value.title) {
        useHead({
          title: detail.value.title,
        });
      }
    });

    return {
      id,
      detail,
      color,
    };
  },
};
</script>
