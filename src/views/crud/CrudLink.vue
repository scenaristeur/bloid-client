<template>
  <b-container>
    Crud link

    <b-row>
      <vue-tags-input
      class="col"
      placeholder="subjects"
      v-model="subjectTag"
      :tags="subjectTags"
      :autocomplete-items="filteredSubjects"
      @tags-changed="newTags => subjectTags = newTags"
      />

      <vue-tags-input
      class="col"
      placeholder="links"
      v-model="predicateTag"
      :tags="predicateTags"
      :autocomplete-items="filteredPredicates"
      @tags-changed="newTags => predicateTags = newTags"
      />


      <vue-tags-input
      class="col"
      placeholder="objects"
      v-model="objectTag"
      :tags="objectTags"
      :autocomplete-items="filteredObjects"
      @tags-changed="newTags => objectTags = newTags"
      />

    </b-row>
    <b-button
    @click="createLinks"
    size="sm"
    variant="primary"
    :disabled="subjectTags.length==0 || predicateTags.length==0 || objectTags.length==0 "
    >Create links</b-button>
    <br>
    s: {{filteredSubjects}}
    <hr>
    p: {{filteredPredicates}}
    <hr>
    o: {{filteredObjects}}
    <hr>
    {{links}}
    <hr>
    {{nodes}}


  </b-container>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input';


export default {
  name: 'CrudLink',
  components: {
    VueTagsInput,
  },
  data() {
    return {
      subjectTag: '',
      predicateTag: '',
      objectTag: '',
      subjectTags: [],
      predicateTags: [],
      objectTags: [],
    };
  },
  methods:{
    createLinks(){

      console.log(this.subjectTags, this.predicateTags, this.objectTags)
      let links= []
      this.subjectTags.forEach((subject) => {

        this.predicateTags.forEach((predicate) => {
          this.objectTags.forEach((object) => {
            console.log(subject,predicate, object)
            let l = {source: subject['@id'] || subject.text, label: predicate['@id'] || predicate.text, target: object['@id'] || object.text}
            links.push(l)
            // ajout graphData
            this.$store.commit('graph/addLink', l)
          });
        });
      });
      //  console.log(links)

      let params = {action: "addLinks", subjects: this.subjectTags, predicates: this.predicateTags, objects: this.objectTags}

      this.$io_ld_crud(params)


      //links = links.concat(this.links)

      //todo ajout db
      console.log("todo ajout DB")
      this.subjectTags =[]
      this.predicateTags =  []
      this.objectTags = []




    }
  },
  computed: {
    filteredSubjects() {
      let filtered = this.nodes.filter(i => {
        i.name == undefined ?  console.log("todo i.name undefined", i) : ""
        i.name == undefined ? i.name = i.text  : ""
        return i.name.toLowerCase().indexOf(this.subjectTag.toLowerCase()) !== -1
      });
      return filtered.map(i => {return {text: i.name, '@id': i['@id']}})
    },
    filteredObjects() {
      let filtered = this.nodes.filter(i => {
        i.name == undefined ?  console.log("todo i.name undefined", i) : ""
        i.name == undefined ? i.name = i.text  : ""
        return i.name.toLowerCase().indexOf(this.objectTag.toLowerCase()) !== -1
      });
      return filtered.map(i => {return {text: i.name, '@id': i['@id']}})
    },
    filteredPredicates(){
      return []
      // let filtered = this.links.filter(i => {
      //   console.log(i)
      //   return i.label.toLowerCase().indexOf(this.predicateTag.toLowerCase()) !== -1;
      // });
      //
      // return filtered.map(i => {return {text: i.label, '@id': i['@id']}})
    },
    nodes() {
      return this.$store.state.graph.nodes
    },
    links() {
      return this.$store.state.graph.links
    },

  }
}
</script>
