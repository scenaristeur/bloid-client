const state = () => ({
  createParams: null,
  history: [],
  thing : {}
})

const actions = {
  // processMetaFile(context,file){
  //   try{
  //     let graph = JSON.parse(file.content)
  //     graph.path = file.path
  //     context.commit('addToNetwork', graph)
  //   }catch(e){
  //     console.log(file, "->", e)
  //     alert(e+" in "+file.path)
  //   }
  // }
}

const mutations = {
  setCreateParams(state, p){
    let params = {array: p}
    state.createParams = params
  },
  setThing(state, t){
    state.Thing = t
  },
  addHistory(state, a){
    state.history.unshift(a)
    console.log("state.history", state.history)
  },
  // setPodStorage(state,s){
  //   state.podStorage = s
  // },

}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
