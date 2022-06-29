<template>
  <b-list-group class="scroll-group">
    <b-list-group-item class="m-0 p-0" v-for="h in history" :key="h.id" >
      <div :class="h.status == 'ok' ? 'bg-success' : 'bg-warning'">
        {{new Date(h.end).toLocaleTimeString()}} |

          <b><u><i>{{h.action}} {{h.what}}</i></u></b> |
          <span v-if="Array.isArray(h.result)">{{h.result.length}} results </span>
        </div>
        <!-- {{h.result}} -->
        <!-- {{h}} -->
        <b-table v-if="Array.isArray(h.result)" responsive sticky-header hover head-variant="light" :items="h.result">
          <template #cell()="data">
            <b-button size="sm" :variant="data.value.includes(h.what) ? 'outline-success': 'outline-secondary'" @click="get(data.value)">
              {{data.value.substring(data.value.lastIndexOf("/") + 1, data.value.length)}}
            </b-button><br>
            <small><i class="text-secondary">{{data.value.substring(0, data.value.lastIndexOf("/") + 1)}}</i></small>

            <!-- console.log(rest);
            console.log(last); -->
          </template>
        </b-table>
        <div v-else>
          <small><b>context:</b>{{h.result['@context']}}</small><br>
          {{ delete(h.result['@context']) && h.result }}

        </div>






        <!-- <b-list-group>
        <b-list-group-item v-for="(r,i) in h.result" :key="i">
        {{r.subject}} {{r.predicate}} {{r.object}}
      </b-list-group-item>
    </b-list-group> -->
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
  },
  methods:{
    get(val){
      let crud = {
        action: "get",
        what: val,
        limit:26, // return the last 25 things created
        start: Date.now()
      }
      console.log(crud)
      this.$io_ld_crud(crud)
    }
  },

}
</script>

<style-scoped>
.scroll{
  max-height: 65vh;
  /*margin-bottom: 10px;*/
  overflow-y:scroll;
  overflow-x:hidden;
  -webkit-overflow-scrolling: touch;
}
.scroll-group{
  min-height: 25vh;
  max-height: 65vh;
  /*margin-bottom: 10px;*/
  overflow-y:scroll;
  overflow-x:hidden;
  -webkit-overflow-scrolling: touch;
}
</style>
