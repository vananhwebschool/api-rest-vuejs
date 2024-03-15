<script setup>
import {onMounted, ref} from 'vue'
import {useRoute} from 'vue-router'
import ResultLineEspace from "./ResultLineEspace.vue";
import ResultLineEau from "./ResultLineEau.vue";
import router from "../router.js";

defineProps({
  msg: String,
})

const route = useRoute();
const result = ref([]);
const arrondissement = route.params.arrondissement;
const isActivityEau = route.params.activity === "eau";
let fullArrondissement = getFullArrondissement();

function getUrl() {
  let commonPart = "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets";
  let paramsUrl = getParamsUrl();
  return commonPart + paramsUrl;
}

function getFullArrondissement() {
  let param = "";
  let chars = Array.from(arrondissement);
  if (chars.length > 1) {
    param = "750" + arrondissement;
  } else {
    param = "7500" + arrondissement;
  }
  return param;
}

function getParamsUrl() {
  let secondPartUrl = "";
  if (isActivityEau) {
    secondPartUrl = `/commerces-eau-de-paris/records?select=nom_commerce%2Cnum_voie%2Cnom_voie&where=code_postal%3D%22${fullArrondissement}%22&limit=10`;
  } else {
    secondPartUrl = `/espaces_verts/records?select=nom_ev%2Cadresse_numero%2Cadresse_typevoie%2Cadresse_libellevoie&where=adresse_codepostal%3D%22${fullArrondissement}%22&limit=10`;
  }
  return secondPartUrl;
}

async function fetchResult() {
  try {
    let url = getUrl();
    const res = await fetch(url);
    const body = await res.json();
    if (!isActivityEau) {
      body.results.filter(e => e.adresse_typevoie || e.adresse_libellevoie != null)
          .map(e => {
            result.value.push(e);
          });
    } else {
      body.results.map(e => { result.value.push(e)})
    }

    console.log(result.value);
  } catch (error) {
    console.log("Error reaching API");
  }
}

onMounted(() => {
  fetchResult();
})
</script>

<template>
    <div class="primary-div">
    <div class="chat chat-start">
      <div class="chat-bubble chat-bubble-secondary">{{fullArrondissement}} Paris</div>
    </div>
    <div class="chat chat-end">
      <div class="chat-bubble chat-bubble-warning" v-if="!isActivityEau">Voici quelques espaces verts dans cet arrondissement!</div>
      <div class="chat-bubble chat-bubble-warning" v-else>Venez à un de ces commerces du quartier pour boire de l'eau!</div>
    </div>
    <div class="overflow-x-auto">
      <table class="table">
        <thead>
        <tr class="font-common">
          <th></th>
          <th>Nom</th>
          <th>Adresse</th>
        </tr>
        </thead>
        <tbody>
        <ResultLineEspace v-if="!isActivityEau" v-for="(element, index) in result"
                    :tr-key="index"
                    :nom="element.nom_ev"
                    :numero="element.adresse_numero"
                    :typevoie="element.adresse_typevoie"
                    :libellevoie="element.adresse_libellevoie">
        </ResultLineEspace>
        <ResultLineEau v-else v-for="(element, index) in result"
                       :tr-key="index"
                       :nom="element.nom_commerce"
                       :numero="element.num_voie"
                       :voie="element.nom_voie">

        </ResultLineEau>
        </tbody>
      </table>
    </div>
      <button class="btn btn-neutral" @click="router.push(`/search`)">Revenir à la recherche</button>
    </div>
</template>

<style>
.primary-div {
  width: 60rem;
  margin-top: -2rem;
}
</style>
