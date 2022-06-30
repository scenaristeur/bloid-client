<template>
  <div>
    <!-- {{brains}} -->
    <b-button-group v-for="(b,i) in brains" :key="i">
      <b-button @click="restore(b)" variant="outline-secondary" size="sm">{{b.name}}</b-button>
      <b-button @click="init_clear(b)" variant="outline-warning" size="sm">X</b-button>
      <!-- <b-button>Button 2</b-button>
      <b-button>Button 3</b-button> -->
    </b-button-group>
  </div>
</template>

<script>
export default {
  name: "BrainsView",
  methods:{
    restore(b){
      console.log(b)
    },
    init_clear(b){
      console.log(b)
    }
  },
  computed: {
    brains() {
      return this.$store.state.graph.brains
    },
  },
}
</script>

<style>

</style>
