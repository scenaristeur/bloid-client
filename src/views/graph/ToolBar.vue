<template>
  <div>
    uu{{disabled}}pp
    <b-button-group>

      <b-button @click="stash" variant="outline-secondary" size="sm" :disabled="disabled">stash</b-button>
      <b-button @click="init_clear" variant="outline-warning" size="sm" :disabled="disabled">clear</b-button>
      <!-- <b-button>Button 2</b-button>
      <b-button>Button 3</b-button> -->
    </b-button-group>
  </div>
</template>

<script>
export default {
  name:"ToolBar",
  data(){
    return {
      disabled: true
    }
  },
  created(){
    this.disabled = this.$store.state.graph.toolbar_disabled
  },
  methods:{
    stash(){
      console.log("stash")
      let name = prompt("what is the name of this stash ?", Date.now());
      let where = prompt("where do you want to stash ?", 'local');
      if (name!= null && where != null){
        this.$store.commit('graph/stash',{name:name, where: where})
      }
    },
    init_clear(){
      console.log("stash")
      let cl = confirm("Are you sure you want to clear all nodes ?");
      if (cl != null){
        this.$store.commit('graph/clear')
      }
    }
  },
  watch:{
    toolbar_disabled(){
      this.disabled = this.toolbar_disabled
    }
  },
  computed: {
    toolbar_disabled() {
      return this.$store.state.graph.toolbar_disabled
    },
  },
}
</script>

<style>

</style>
