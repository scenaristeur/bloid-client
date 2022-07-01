const state = () => ({
  createParams: null,
  history: [],
  thing : {},
  currentThingExtraProps: {},
  localAutocomplete: {}
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
  addLocalAutocomplete(state, result){
    let obj = result.obj
    let key = result.key
    console.log(obj)
    if (obj != undefined){
      let vals = state.localAutocomplete[key] || []

      let tag = { text: obj.name || obj['@id'] /*"oh"+" ("+obj.description+")"*/, url: obj['@id']/*, item: obj*/ }
      vals.push(tag)

      state.localAutocomplete[key] = vals
      console.log(state.localAutocomplete)
    }else{
      console.log(obj)
    }
  },
  resetLocalAutoComplete(state, key){
    state.localAutocomplete[key] = []
  },
  setCurrentThingExtraProp(state, p){
    console.log(p)
    state.currentThingExtraProps[p.key] = p.tags
  },
  resetCurrentThingExtraProps(state){
    state.currentThingExtraProps = {}
  },
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
