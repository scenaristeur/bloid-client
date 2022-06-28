<template>
  <b-list-group>
    <b-list-group-item v-for="h in history" :key="h.id">
      {{h}}
    </b-list-group-item>
  </b-list-group>
</template>

<script>
export default {
  name: "HistoryView",
  computed: {
    history() {
      return this.$store.state.crud.history
    },
  }
}
</script>

<style>

</style>
