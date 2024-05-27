<template>
  <div class="event-box">
    <div class="event-box__inner">
      <div class="event-box__bar"></div>
      <div class="event-box__time-box">
        <div class="event-box__time">12.00-13.40</div>
        <div class="event-box__end-time">Осталось 16 мин</div>
      </div>
      <div class="event-box__speakers">
        <Speaker v-for="speaker in speakerList" :key="speaker.name" v-bind="speaker" />
      </div>
      <div class="event-box__name">{{ name }}</div>
      <div class="event-box__footer">
        <div class="event-box__type">{{ eventType }}</div>
        <div class="event-box__lang">{{ lang }}</div>
        <div class="event-box__theme">{{ theme }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Speaker from './Speaker.vue'
interface SpeakerList {
  name: string | undefined
  post: string | undefined
  photo: string | undefined
}
const props = defineProps({
  name: String,
  startTime: String,
  duration: Number,
  speakers: String,
  speakersPhotos: String,
  eventType: String,
  lang: String,
  theme: String
})
const speakerList = ref<SpeakerList[] | undefined>(
  props.speakers
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
)

const fillSpeakerList = () => {
  console.log(
    props.speakers
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
  )
}
fillSpeakerList()
</script>

<style scoped lang="scss">
.event-box {
  color: rgba(94, 94, 94, 1);
  margin-bottom: 60px;
  .event-box__inner {
    margin-left: 70px;
    padding: 30px;
    background-color: rgba(238, 238, 238, 1);
    border-radius: 32px;
    &::before{
      content: '';
      height: 1px;
      width: 58px;
      position: relative;
      top: 10px;
    }
    .event-box__bar {
    }
    .event-box__time-box {
      .event-box__time {
      }
      .event-box__end-time {
      }
    }
    .event-box__speakers {
      display: flex;
      flex-direction: row;
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
