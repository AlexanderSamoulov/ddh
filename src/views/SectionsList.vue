<template>
  <div v-for="event in currentEvents" :key="event.name">
    <EventBox 
    :name="event.name"
    :startTime="event.startTime"
    :endTime="event.endTime"
    :speakers="event.speakers"
    :speakersPhotos="event.speakersPhotos"
    :eventType="event.eventType"
    :lang="event.lang"
    :theme="event.theme"
    :isCurrent="event.isCurrent"
    :time="currentTime"
    />
  </div>
</template>

<script setup lang="ts">
import EventBox from './../components/EventBox.vue'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import{timeToMinutes,minutesToTime} from './../hooks/Time'
const props=defineProps({
  time:String
})
interface Data {
  __1: string,
  __2: string,
  __3: number,
  __4: string,
  __5: string,
  __6: string,
  __7: string,
  __8: string
}
interface Event{
  name: string,
  startTime: number,
  endTime: number,
  speakers: string,
  speakersPhotos: string,
  eventType: string,
  lang: string,
  theme: string,
  isCurrent: boolean
}
const route = useRoute()
const data = ref<null|Data[]>(null)
const currentEvents = ref<null|Event[]>(null)
function fetchData(): void {
  fetch(`json/report_${route.params.id}.json`)
  .then(res => res.json())
  .then(res => data.value = res.slice(1))
  .catch(err => console.log(err))
}
const currentTime=props.time?timeToMinutes(props.time.slice(4))-600:0
const allEventsFill=()=>{
  if(data.value){
  currentEvents.value = data.value.map(event=>{
let start=timeToMinutes(event.__2)
let end=start+event.__3

if(currentTime<end){
    return {
      name: event.__1,
      startTime: start,
      endTime: end,
      speakers: event.__4,
      speakersPhotos: event.__5,
      eventType: event.__6,
      lang: event.__7,
      theme: event.__8,
      isCurrent: currentTime>start&&currentTime<end?true:false
    }}else return null
  }).filter(item=>item)
}
}
onMounted(() => {
  fetchData()
  setInterval(()=>{
   
  },300000)
})

watch(
  () => data.value,
  () => {
    allEventsFill()
  }
);


const futureEvents=computed(()=>{
  return data.value
})

</script>


