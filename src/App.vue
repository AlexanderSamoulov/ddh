<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useRoute } from 'vue-router'
import time from './hooks/Time'
const route = useRoute()
const sectionName=ref<null|string>(null)
const setTime=ref(time())
// переменной со временем
setInterval(()=>{
  setTime.value=time()
}, 30000,)

watchEffect(() => {
  sectionName.value=String.fromCharCode(64+Number(route.params.id))
})
</script>



<template>
  <main class="main">
  <header class="header">
    <div class="header__inner">
    <h1 class="header__name">СЕКЦИЯ {{ sectionName }}</h1>
    <time class="header__time">{{ setTime }}</time>
  </div>
  </header>
  <RouterView />
  </main>
</template>


<style scoped lang="scss">
.main {
  width: 990px;
  margin: 0 auto;
  border: 1px solid black;
  .header{
    .header__inner {
      margin-left: 70px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .header__name {
        font-size: 100px;
        font-weight: 700;
      }
      .header__time {
        font-size: 60px;
        font-weight: 700;
      }
    }
  }
}

</style>

