
//import "../js/socket.io.min.js"
//window.socket = io(':3000');
import { io } from "socket.io-client";

const plugin = {
  install(Vue, opts = {}) {
    let store = opts.store
    let socket
    Vue.prototype.$socket_connect = async function(){
      let server = store.state.vatch.host
      let port = store.state.vatch.port

      console.log(server, port)

      socket = Vue.prototype.$socket = io(server+":"+port);

      socket.on("connect_error", (error) => {
        console.info(error)

      });

      socket.on('connect', () => {
        store.commit("vatch/setUser", socket.id)
        socket.on('init', function(init) {
          console.log('init',init)
          store.commit("vatch/updatepathSep", init.pathsep)
        });

        socket.on('users', function(users) {
          console.log("users",users)
          store.commit("vatch/setUsers", users)
        });

        socket.on('watcher event', function(ressources) {
          console.log("Watcher event",ressources)
          store.commit("vatch/updateLocalResources", ressources)
        });

        socket.on('walker', function(ressources) {
          console.log("Walker",ressources)
          store.commit("vatch/updateLocalResources", ressources)
        });

        socket.on('cat file', function(file) {
          console.log(file)
          if(file.callback != undefined){
            store.dispatch(file.callback, file)
          }else{
            console.log("TODO PROCESSFILE cat file", file)
            store.commit("vatch/setFile", file)
          }

        });

        socket.on('chat message', function(msg) {
          console.log('chat message',msg)
          store.commit("vatch/addChatMessage", msg)
        });

        socket.on('disconnect', () => {
          store.commit("vatch/setUser", null)
        });

        socket.on('ld_test', function(result) {
          console.log(result)
          store.commit("ld/setLdTestResult", result)
        });

        socket.on('ld_crud', function(result) {
          console.log(result)


          switch (result.action) {
            case "ld_object":
            store.commit("graph/addNode",result.obj)
            break;
            case "create":
            store.commit("crud/addHistory", result)
            break;
            case "getById":
            store.commit("graph/setCurrentNode", result.obj)
            break;
            default:
            console.log("OHOHOH no handle for ", result)
          }


          // if (result.action == "ld_object"){
          //   store.commit("graph/addNode",result.obj)
          // }else{
          //   if(result.status == "ok"){
          //     store.commit("crud/addHistory", result)
          //     //  store.commit("graph/updateGraph", Vue.prototype.$resultToGraph(result))
          //   }else{
          //     alert(result.err)
          //   }
          // }
        });


      });
    }


    Vue.prototype.$io_ld_crud= async function(params){
      console.log(params)
      socket.emit("ld_crud", params)
    }

    Vue.prototype.$io_ld_test = async function(params){
      console.log(params)
      socket.emit("ld_test", params)
    }


  },
}

// Auto-install
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
