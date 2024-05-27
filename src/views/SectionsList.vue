<template>
  <div v-for="item in data" :key="item.__1">
    <EventBox 
    :name="item.__1"
    :startTime="item.__2"
    :duration="item.__3"
    :speakers="item.__4"
    :speakersPhotos="item.__5"
    :eventType="item.__6"
    :lang="item.__7"
    :theme="item.__8"
    />
  </div>
</template>

<script setup lang="ts">
import EventBox from './../components/EventBox.vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const data = ref<null|Object[]>(null)
function fetchData(): void {
  fetch(`./../../public/json/report_${route.params.id}.json`)
  .then(res => res.json())
  .then(res => data.value = res?.slice(1))
  .catch(err => console.log(err))
}

onMounted(() => {
  fetchData()
})
</script>


