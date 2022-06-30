<template>
  <div>
    <vue-tags-input
    v-model="tag"
    placeholder="Search wikidata"
    autofocus
    :tags="tags"
    :autocomplete-items="autocompleteItems"
    @tags-changed="update"
    />
  </div>
</template>

<script>
import _ from 'underscore'
const API_URL = 'https://www.wikidata.org/w/api.php?action=wbsearchentities&origin=*&format=json'
export default {
  name: "KTag",
  props:["thing", "k"],
  components: {
    'VueTagsInput': () => import('@johmun/vue-tags-input'),
  },
  data(){
    return{
      tag: '',
      tags: [],
      autocompleteItems: [],
      debounce: null,
    }
  },
  created(){
    this.language = navigator.language.split("-")[0] || 'en'
    console.log(this.language)
  },
  methods: {
    update(newTags) {
      console.log(this.k, this.thing, newTags)
      this.autocompleteItems = [];
      this.tags = newTags;
let value = this.thing[this.k]
console.log(value)





    },
    // async runQueries(){
    //   // console.log(this.tags)
    //   await this.$loadBrainsFromWikidata(this.tags)
    //   this.tags = []
    // },
    async getItems(query) {
      if(query.length>0){
        this.loading = true
        let search_url = API_URL+"&language="+this.language+"&search="+query
        // console.log(search_url)
        try{
          const res = await fetch(search_url)
          const suggestions = await res.json()
          console.log(suggestions)
          this.items = suggestions.search
          console.log(this.items)
          this.autocompleteItems = suggestions.search.map(a => {
            return { text: a.match.text+" ("+a.description+")", url: a.concepturi, item: a };
          });
        }catch(e){
          alert(e)
        }
        this.loading = false
      }
    },
  },
  watch:{
    'tag': _.debounce(function(item) { this.getItems(item) }, 500),
    // tags(){
    //   console.log(this.tags)
    //   //this.note.tags = this.tags//.map(t => t.text.trim())
    // },
  },
}
</script>

<style>

</style>
