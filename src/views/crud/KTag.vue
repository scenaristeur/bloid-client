<template>
  <div>{{thing[k]}}

      <vue-tags-input
    id="vue-tags"
    v-model="tag"
    placeholder="Search wikidata"
    autofocus
    :tags="tags"
    :autocomplete-items="autocompleteItems"
    @tags-changed="update"
    />
    <!-- {{localAutocompleteKey}}-- -->
    <hr>
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
      let objects = newTags.map(function(t) {
        console.log(t)
        let tag = {}
        if(t.url !=undefined){
          tag = {'@id': t.url, name: t.item.match.text, description: t.item.description, 'https://www.wikidata.org/wiki/Q3523102': t.item.repository  }
        }else{
          tag = {text: t.text, 'https://www.wikidata.org/wiki/Q3523102': "none"}
        }

        return tag
      } )
      console.log("objects", objects)

      this.$store.commit('crud/setCurrentThingExtraProp', {key: this.k, tags: objects})

    },
    // async runQueries(){
    //   // console.log(this.tags)
    //   await this.$loadBrainsFromWikidata(this.tags)
    //   this.tags = []
    // },

    async getWikidataItems(query) {
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
    getLocalItems(item){
      console.log(item)
      let params = {'action': 'get', 'what': item, callback: "crud/addLocalAutocomplete", key: this.k }
      this.$socket.emit('ld_crud', params)
    }
  },
  watch:{
    'tag': _.debounce(function(item) {
      // this.$store.commit('crud/resetLocalAutoComplete', this.key)
       this.getWikidataItems(item)
      // if(item.length > 0){
      //   this.getLocalItems(item)
      // }

    }, 500),
    // tags(){
    //   console.log(this.tags)
    //   //this.note.tags = this.tags//.map(t => t.text.trim())
    // },
  },
  computed: {
    localAutocompleteKey() {
      let vals = this.$store.state.crud.localAutocomplete[this.k]
      console.log(vals)
      return vals
      // return this.$store.state.crud.localAutocomplete
    },

  }
}
</script>

<style>
/* #vue-tags{
z-index:100000000000000;
} */
</style>
