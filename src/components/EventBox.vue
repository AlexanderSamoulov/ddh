<template>
  <div>
  <div class="event-box" :class="{'event-box-active':isCurrent}">
    <div class="event-box__inner" >
      <div v-if="isCurrent" class="event-box__bar"></div>
      <span class="event-box__time-box">
        <span class="event-box__time">{{ startEndTime() }}</span>
        <span v-if="isCurrent" class="event-box__end-time">{{ restTime() }}</span>
      </span>
      <div class="event-box__speakers">
        <Speaker v-for="speaker in twoAdjacentItems" :key="speaker.name" v-bind="speaker" />
      </div>
      <span class="event-box__name">{{ name }}</span>
      <div v-if="isLecture" class="event-box__footer">
        <div class="event-box__type">{{ eventType }}</div>
        <div class="event-box__lang">{{ lang }}</div>
        <div class="event-box__theme">{{ theme }}</div>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import Speaker from './Speaker.vue'
import{timeToMinutes,minutesToTime} from './../hooks/Time'
interface SpeakerList {
  name: string | undefined
  post: string | undefined
  photo: string | undefined
}
const props = defineProps({
  name: String,
  startTime: Number,
  endTime: Number,
  speakers: String,
  speakersPhotos: String,
  eventType: String,
  lang: String,
  theme: String,
  isCurrent:Boolean,
  time:Number
});
const isLecture=ref<boolean>(props.speakers!=='-');
const speakerList = ref<SpeakerList[] | []>([])

if(props.speakers){
  speakerList.value=props.speakers
    ?.split('; ')
    .map((str) => str.split('/'))
    .filter((el) => el[0].search(/[a-z,а-я]/i) != -1)
    .map((el) => {
      return {
        name: el[0],
        post: el[1],
        photo: props.speakersPhotos
      }
    })
}

const currentIndexSpeaker = ref(0);


const twoAdjacentItems = computed(() => {
  if (speakerList.value.length <= 2) {
    return speakerList.value;
  }else{
  return [
  speakerList.value[currentIndexSpeaker.value]||{},
  speakerList.value[(currentIndexSpeaker.value + 1) % speakerList.value.length]||{}
  ]}
});


function nextPair() {
  currentIndexSpeaker.value = (currentIndexSpeaker.value + 1) % speakerList.value.length;
}

setInterval(()=>{
  nextPair() 
},10000)


const startEndTime=():string|null=>{
  if(props.startTime||props.endTime){
  return `${minutesToTime(props.startTime)}-${minutesToTime(props.endTime)}`
}else return null
  
}

onMounted(()=>{
  
})

const restTime=()=>{
  return `Осталось ${props.endTime-props.time} мин.`
}

</script>

<style scoped lang="scss">
.event-box {
  --text-color:rgba(94, 94, 94, 1);
  --bg-color:rgba(238, 238, 238, 1);
  color: var(--text-color);
  margin-bottom: 60px;
  &-active{
    --bg-color:rgba(119, 116, 33, 1);
    --text-color:rgba(255, 255, 255, 1);
  }
  .event-box__inner {
    position: relative;
    overflow: hidden;
    margin-left: 70px;
    padding: 30px;
    background-color: var(--bg-color);
    border-radius: 32px;
    &::before{
      content: '';
      height: 1px;
      width: 58px;
      position: absolute;
      top: 10px;
    }
    .event-box__bar {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 20px;
      background-color: green;
    }
    .event-box__time-box {
      display: inline-block;
      .event-box__time {
        display: inline-block;
        font-size: 60px;
        font-weight: 600;
       
      }
      .event-box__end-time {
        display: inline-block;
        
      }
    }
    .event-box__speakers {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .event-box__name {
      font-size: 48px;
      font-weight: 700;
      margin-bottom: 50px;
    }
    .event-box__footer {
      display: flex;
      font-size: 20px;
      font-weight: 300;
      width: 100%;
      justify-content: space-between;
      & > * {
        padding: 12px 20px;
        border: 1px solid rgba(132, 132, 132, 1);
        border-radius: 8px;
      }
      .event-box__type {
        color: rgba(238, 238, 238, 1);
        background-color: rgba(132, 132, 132, 1);
      }
      .event-box__lang {
      }
      .event-box__theme {
      }
    }
  }
}
</style>
