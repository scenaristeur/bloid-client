<template>
  <b-modal id="modal-crudlet" title="Let" size="lg" @ok="save" @cancel="onCancel"
  :ok-disabled="thing.name==undefined || thing.name.length==0"
  :ok-variant="thing.name==undefined || thing.name.length==0 ? 'secondary' : 'success'"
  >
  <!-- <p class="my-4">Hello from modal! -->
  <!-- {{createParams}}

  <hr>
  {{thing}} -->
  <div class="scroll">
    <b-checkbox size="sm" disabled  >use wikidata</b-checkbox>
    <div v-for="(val, k) in thing" :key="k">

      <b-row v-if="!k.startsWith('@')" class="my-1" >

        <b-col sm="3">
          <label :for="`field-${k}`">{{k}}</label>
        </b-col>
        <b-col sm="9">


          <!-- <div v-else>
            <b-button size="sm" :variant="thingVariant(thing[k])">{{thing[k]}}</b-button>

          </div> -->



          <b-form-input v-if="k == 'name'" :id="`field-${k}`" autofocus :state="thing[k] != null && thing[k].length>0" v-model="thing[k]" :placeholder="'{'+k+'}'"></b-form-input>


            <!-- <b-form-input :id="`field-${k}`" v-model="thing[k]" :placeholder="'{'+k+'}'"></b-form-input> -->
            <KTag :thing="thing" :k="k"/>

          <!--
          <b-form-input v-if="thing[k].split('^^').length > 0" :type="thing[k].split('^^')[1]" v-model="thing[k].split('^^')[0]" >

        </b-form-input>
        <b-form-input v-else :id="`field-${k}`" v-model="thing[k]"></b-form-input> -->
      </b-col>


    </b-row>
  </div>

</div>
<b-row class="my-1">

  <b-col sm="6">
    <b-form-input id="add_filed" v-model="new_field" placeholder="new field" size="sm"></b-form-input>
  </b-col>
  <b-col sm="3">
    <b-form-input placeholder="type" disabled size="sm" />
  </b-col>
  <b-col sm="3">
    <b-button @click="add" :disabled="new_field == null || new_field.length== 0" size="sm" :variant="new_field == null || new_field.length == 0? 'secondary' : 'success'" >Add field</b-button>
  </b-col>

</b-row>





<!-- <b-list-group>
<b-list-group-item v-for="(v, k) in thing" :key="k">  {{k}} -> {{v}}</b-list-group-item>
</b-list-group> -->

<!-- <b-row v-for="(v, k) in thing" :key="k" >
{{k}} -> {{v}}
</b-row> -->
<!-- </p> -->

</b-modal>
</template>

<script>

import { v4 as uuidv4 } from 'uuid';

export default {
  name: "CrudLet",
  components: {
    'KTag': ()=>import('@/views/crud/KTag'),
  },

  data() {
    return {
      thing: {},
      new_field: null
    }
  },
  methods: {
    save(){
      console.log("save ", this.thing)
      let extraProps = this.$store.state.crud.currentThingExtraProps
      console.log(extraProps)
      for (const [key, value] of Object.entries(extraProps)) {
        console.log(`${key}: ${value}`);
        let v = this.thing[key]
        console.log(v)
        if (v == null || v.length == 0){
          this.thing[key] = value
        }else if(Array.isArray(v) && ! v.some( val => val == value )){
          console.log(value)
          v.push(value)
        }else{
          console.log(value)
          this.thing[key] = [this.thing[key]]
          this.thing[key].push(value)
        }
      }
      let crud = {action: "create", thing: this.thing, start: Date.now()}
      this.new_field = ""
      this.$io_ld_crud(crud)
      this.$store.commit('crud/resetCurrentThingExtraProps')
    },

    onCancel(){
      console.log("todo cancel")
    },
    add(){
      if(this.new_field.length > 0){
        this.thing[this.new_field] == undefined ? this.thing[this.new_field] = "" :alert("already exist")
      }
      console.log(this.thing)
      this.new_field = ""
    },

  },
  watch: {
    createParams() {
      let template = {
        "@context": {
          "@vocab": "https://scenaristeur/github.io/bloid/",
          "name": "https://www.wikidata.org/wiki/Q82799",
          "type": "https://www.wikidata.org/wiki/Q21146257",
          "description": "https://www.wikidata.org/wiki/Q1200750",
          "version": "https://www.wikidata.org/wiki/Q20826013",
          "creator": "https://www.wikidata.org/wiki/Q2500638",
          "source": "https://www.wikidata.org/wiki/Q3523102"
          //  "@base": "https://www.wikidata.org/wiki/"
        },
        "@id": "{@id}",
        "name": null,
        "type": null,
        "description": null,
        "version": null,
        "creator": null
      }

      // let template1 = {
      //   "@context": {
      //     "@vocab": "http://xmlns.com/foaf/0.1/",
      //     "homepage": { "@type": "@id" },
      //     "knows": { "@type": "@id" },
      //     "based_near": { "@type": "@id" }
      //   },
      //   "@id": "{@id}",
      //   "name": null,
      //   "type": null,
      //   "description": null,
      //   "version": null,
      //   "creator": null
      // }
      this.thing = template
      this.thing['@id'] = "http://local/base/"+uuidv4()

      let action = this.createParams.array.shift()
      let params = this.createParams.array
      console.log(action, params)

      if(params.length == 1 && params[0].split('=')[1] == undefined){
        this.thing.name = params[0]
      }else{
        params.forEach((item, i) => {
          let splitted = item.split('=')
          console.log(i,item, splitted)
          this.thing[splitted[0]] = splitted[1]
        });
      }
      console.log(this.thing)

    },
    currentNode(){
      console.log("current", this.currentNode)
      this.thing = this.currentNode
      this.$bvModal.show('modal-crudlet')
    }
  },
  computed: {
    createParams() {
      return this.$store.state.crud.createParams
    },
    currentNode() {
      return this.$store.state.graph.currentNode
    },
  }
}
</script>

<style>
.scroll{
  max-height: 65vh;
  /*margin-bottom: 10px;*/
  overflow-y:scroll;
  overflow-x:hidden;
  -webkit-overflow-scrolling: touch;
}
</style>
