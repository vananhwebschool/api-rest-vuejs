<script setup>
const properties = defineProps({
  trKey: Number,
  nom: String,
  numero: String,
  voie: String,
})
</script>

<template>
    <tr class="font-common">
      <th>{{ trKey + 1 }}</th>
      <td>{{ nom }}</td>
      <td>{{ numero }} {{ voie }}</td>
    </tr>
</template>

<style scoped>
.font-common {
  color: white;
}
</style>