
//import "../js/socket.io.min.js"
//window.socket = io(':3000');
import { io } from "socket.io-client";

const plugin = {
  install(Vue, opts = {}) {
    let store = opts.store
    // vatch-vue hosted on github can access your local storage
    //let socket = Vue.prototype.$socket = io('http://localhost:3000');
    // share your localhost storage on your localnetwork
    let location = window.location.toString()
    console.log("location",location)
    let def_server = 'http://localhost'
    let def_port = "5000"
    if(location.startsWith("https://scenaristeur.github.io/vatch-vue/")){
      console.info("Vatch Client Location: "+location+" -> Connecting to your local filesystem through socket.io on ", def_server)
    }else{
      //server = ':3000'
      console.info("Vatch Client Location: "+location+" -> Sharing your local filesystem to your local network through socket.io on ", def_server)
    }

    // console.log("server",ws)
    //let socket = Vue.prototype.$socket = io(server);
    let socket


    Vue.prototype.$socket_connect = async function(server= def_server, port= def_port){
      // let sock
      // console.log("try",server, port, io)
      // while(sock == undefined || port == "5000"){
      //   socket = Vue.prototype.$socket = io(server+port);
      // setTimeout(() => {
      //   console.log("try to connect / Retardée d'une seconde.", server, port);
      // //  sock = io(server+port);
      //   port++
      // }, "1000")
      //
      //   socket = Vue.prototype.$socket = sock
      //
      // }

      socket = Vue.prototype.$socket = io(server+":"+port);
    }

Vue.prototype.$socket_connect()

    // socket.onAny((event, ...args) => {
    //   console.log(`reçu ${event}, ${args}`);
    // });

    socket.on("connect_error", (error) => {
      console.log(error)

    });


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

    socket.on('connect', () => {
      store.commit("vatch/setUser", socket.id)
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
      store.commit("crud/addHistory", result)
    });


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
