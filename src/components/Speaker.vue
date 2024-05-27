<template>
  <div class="speaker-card">
    <img class="speaker-card__img" :src="photo" alt="img" />
    <div class="speaker-card__info">
      <div class="speaker-card__name">
        {{ name }}
      </div>
      <div class="speaker-card__company">
        {{ post }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  name: String,
  photo: String,
  post: String
})
</script>

<style scoped lang="scss">
.speaker-card {
  display: flex;
  align-items: center;
  width: 50%;
  .speaker-card__img {
    width: 140px;
    height: 140px;
    border-radius: 50%;
  }
  .speaker-card__info {
    margin-left: 10px;
    .speaker-card__name {
      font-size: 28px;
      font-weight: 500;
      margin-bottom: 10px;
      width: 80%;
    }
    .speaker-card__company {
      font-size: 20px;
      font-weight: 200;
    }
  }
}
</style>
