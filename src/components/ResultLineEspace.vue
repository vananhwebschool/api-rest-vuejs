<script setup>
const properties = defineProps({
  trKey: Number,
  nom: String,
  numero: Number,
  typevoie: String,
  libellevoie: String,
})
</script>

<template>
    <tr class="font-common">
      <th>{{ trKey + 1 }}</th>
      <td>{{ nom }}</td>
      <td>{{ numero }} {{typevoie}} {{libellevoie}}</td>
    </tr>
</template>

<style scoped>
.font-common {
  color: white;
}
</style>