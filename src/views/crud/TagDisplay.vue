<template>
  <div>
    <div v-if="Array.isArray(tag)" >
      <b-button v-for="(v , i) in tag"
      :key="i"
      size="sm"
      :title="v.description+' / '+ v.source"
      :variant="thingVariant(v)">
      {{v.name || v.text}}

    </b-button>
  </div>
  <b-button v-else-if="typeof tag == 'object'" variant="outline-secondary" size="sm"
  :title="tag.description+tag.source">
  {{tag.name || tag.text}}
  <!-- <span v-if="tag.description!= null">({{tag.description}})</span>
  <span v-if="tag['https://www.wikidata.org/wiki/Q3523102'] != null">({{tag['https://www.wikidata.org/wiki/Q3523102']}})</span> -->

</b-button>

<b-button  v-else variant="outline-secondary" size="sm">{{tag}}</b-button>

</div>
</template>

<script>
export default {
  name: "TagDisplay",
  props: ["tag"],
  methods:{
    thingVariant(t){
      let variant = "outline-secondary"
      switch (t['https://www.wikidata.org/wiki/Q3523102']) { // source
        case 'wikidata':
        variant = 'outline-success'
        break;
        case 'local':
        variant = 'outline-warnig'
        break;
        default:
        console.log("no variant for ", t['https://www.wikidata.org/wiki/Q3523102'])
      }
      return variant
    },
  }
}
</script>

<style>

</style>
