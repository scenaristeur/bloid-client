<template>
  <div>
    <!-- {{thing}} // {{k}} -->
    <!-- {{thing[k]}}
    v-model="thing[k]" -->
    cval :   {{val}}
    <!-- <b-form-input
    v-if="k == 'name'"
    :id="`field-${k}`"
    autofocus
    :state="val != null && val.length>0"
    v-model="val"
    @input="update"
    :placeholder="'{'+k+'}'">
  </b-form-input> -->
  <!-- v-else  -->
  <b-form-input :id="`field-${k}`"
  v-model="val"
  @input="update"
  :placeholder="'{'+k+'}'">
</b-form-input>
jhgjhgjhgjhgj

</div>
</template>

<script>
export default {
  name: "ExtendedInput",
  props: [ "k"],
  created(){
    this.val = this.thing[this.k]
  },
  methods:{
    update(){
      console.log(this.k, this.val)
      // this.$emit('update', {key: this.k, val: this.val})
      this.thing[this.k] = this.val
    }
  },
  computed:{
    thing: {

      get() {
        return this.$store.state.crud.thing
      },
      // setter
      set(t) {
        // Note: we are using destructuring assignment syntax here.
        this.$store.commit('crud/setThing',t)
      }
    },
  }
}
</script>

<style>

</style>
