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
      // console.log(item)
      state.highlightNodes.add(item)
    })
    Vue.prototype.$updateHighlight()
  },
  updateGraph(state, g){
    state.graph.graphData(g)
  },
  addNode(state, n){
    let {nodes, links} = state.graph.graphData()
    var index = nodes.findIndex(x => x['@id']==n['@id']);
    index === -1 ? nodes.push(n) : Object.assign(nodes[index], n)

    state.graph.graphData({nodes:nodes, links: links})
  }
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
