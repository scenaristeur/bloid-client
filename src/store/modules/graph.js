import Vue from 'vue'
const state = () => ({
  graph: null,
  highlightNodes: new Set(),
  highlightLinks: new Set(),
  hoverNode: null,
  search: null,
  nodes: [],
  links: [],
  brains: [],
  toobar_disabled: true,
  currentNode: null
})


const mutations = {
  stash(state, params){
    let {nodes, links} = state.graph.graphData()
    params.nodes = nodes
    params.links = links
    params.date = Date.now()
    state.brains.push(params)
    state.graph.graphData({nodes: [], links: []})
    this.commit('graph/setToolBarDisabled')
  },
  clear(state){
    state.graph.graphData({nodes: [], links: []})
    this.commit('graph/setToolBarDisabled')
  },
  setGraph(state, g){
    state.graph = g
    this.commit('graph/setToolBarDisabled')
  },
  setCurrentNode(state, n){
    console.log("set ", n)
    state.currentNode = n
  },
  setCurrentNodeById(state, i){
    console.log("set ", i)
    let params = {'action': 'getById', '@id': i }
    Vue.prototype.$socket.emit('ld_crud', params)
    //  state.currentNode = i
  },
  setLinks(state, l){
    state.links = l
  },
  // setNodes(state, n){
  //   state.nodes = n
  // },
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
    this.commit('graph/setToolBarDisabled')
  },
  addNode(state, n){
    let {nodes, links} = state.graph.graphData()
    var index = nodes.findIndex(x => x['@id']==n['@id']);
    index === -1 ? nodes.push(n) : Object.assign(nodes[index], n)

    state.graph.graphData({nodes:nodes, links: links})
    state.nodes = nodes
    state.links = links
    this.commit('graph/setToolBarDisabled')
  },
  addLink(state, l){
    let {nodes, links} = state.graph.graphData()
    console.log(nodes)

    var index = links.findIndex(x => /*x['@id']==l['@id'] || */ x.source == l.source && x.label == l.label && x.target == l.target );
    index === -1 ? links.push(l) : Object.assign(links[index], l)
    // links.push(l)
    console.log(links)

    state.graph.graphData({nodes:nodes, links: links})
    //  state.nodes = nodes
    state.links = links
  },
  setToolBarDisabled(state){
    let {nodes, links} = state.graph.graphData()
    console.log(nodes,links)
    state.toobar_disabled = nodes == undefined ||nodes.length ==0
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
