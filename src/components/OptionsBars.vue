<script setup xmlns="http://www.w3.org/1999/html">
import {ref} from "vue";
import {useRouter} from "vue-router";
const selectedArrondissement = ref('1');
const selectedActivity = ref('espace');
const router = useRouter();
</script>

<template>
  <div class="text-2xl font-bold mb-10 font-common">Je suis à l'arrondissement</div>
  <select class="select select-secondary w-full max-w-xs select-common" v-model="selectedArrondissement">
    <option v-for="n in 20" :value=n> {{ n }} </option>
  </select>
  <div class="text-2xl font-bold mb-10 font-common">Je veux</div>
  <select class="select select-secondary w-full max-w-xs select-common" v-model="selectedActivity">
    <option value="espace">Trouver des espaces verts pour me promener</option>
    <option value="eau">Trouver où je peux boire de l'eau/remplir ma gourde</option>
  </select>
  <div>
    <button class="btn btn-secondary" @click="router.push(`/results/${selectedArrondissement}/${selectedActivity}`)">Lancer la recherche</button>
  </div>

</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Nunito&family=Open+Sans:wght@300&family=Roboto+Slab&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Yantramanav:wght@300;400&display=swap');
.font-common {
  color: white;
  font-family: Lora, sans-serif;
  margin-bottom: 10px;
}
.select-common {
  margin-bottom: 50px;
}
</style>
