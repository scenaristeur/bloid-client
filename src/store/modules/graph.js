import Vue from 'vue'
const state = () => ({
  graph: null,
  highlightNodes: new Set(),
  highlightLinks: new Set(),
  hoverNode: null,
  search: null,
  nodes: [],
  links: []
})


const mutations = {
  setGraph(state, g){
    state.graph = g
  },
  setCurrentNode(state, n){
    state.currentNode = n
  },
  setLinks(state, l){
    state.links = l
  },
  setHighlightNodes(state, nodes){
    state.highlightNodes.clear();
    state.highlightLinks.clear();
    nodes.forEach(item => {
      console.log(item)
      state.highlightNodes.add(item)
    })
    Vue.prototype.$updateHighlight()
  },
  updateGraph(state, g){
    console.log(g)
  //  let {nodes, links} = state.graph.graphData()
    // let nodes = this.nodes.map(a => {return {...a}})
    // let links = this.links.map(a => {return {...a}})
    state.graph.graphData(g)
  }
  // setCreateParams(state, p){
  //   let params = {array: p}
  //   state.createParams = params
  // },
  // setThing(state, t){
  //   state.Thing = t
  // },
  // addHistory(state, a){
  //   state.history.unshift(a)
  //   console.log("state.history", state.history)
  // },
  // setPodStorage(state,s){
  //   state.podStorage = s
  // },

}


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

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
