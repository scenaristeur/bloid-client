(function(){"use strict";var e={6440:function(e,t,o){var n=o(8935),r=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("b-container",{attrs:{fluid:"",id:"app"}},[o("router-view")],1)},a=[],i={name:"App"},s=i,l=o(1001),c=(0,l.Z)(s,r,a,!1,null,null,null),d=c.exports,u=o(563);(0,u.z)("/bloid-client/service-worker.js",{ready(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered(){console.log("Service worker has been registered.")},cached(){console.log("Content has been cached for offline use.")},updatefound(){console.log("New content is downloading.")},updated(){console.log("New content is available; please refresh."),alert("This app has been updated, please, close and reopen.")},offline(){console.log("No internet connection found. App is running in offline mode.")},error(e){console.error("Error during service worker registration:",e)}});var h=o(2809),p=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"home"},[o("SocketConnect"),o("b-row",[o("b-col",{attrs:{md:"6"}},[o("TerminalView")],1),o("b-col",{attrs:{md:"6"}},[o("GraphView")],1)],1),o("BrainsView"),o("CrudHistory"),o("CrudLet"),o("LogView")],1)},f=[],g={name:"HomeView",components:{SocketConnect:()=>o.e(377).then(o.bind(o,5377)),TerminalView:()=>o.e(555).then(o.bind(o,7555)),LogView:()=>o.e(476).then(o.bind(o,3476)),CrudLet:()=>o.e(299).then(o.bind(o,3299)),CrudHistory:()=>o.e(424).then(o.bind(o,1424)),GraphView:()=>o.e(216).then(o.bind(o,1216)),BrainsView:()=>o.e(298).then(o.bind(o,8298))}},m=g,b=(0,l.Z)(m,p,f,!1,null,null,null),v=b.exports;n["default"].use(h.Z);const w=[{path:"/",name:"home",component:v},{path:"/about",name:"about",component:()=>o.e(443).then(o.bind(o,5830))}],y=new h.Z({mode:"history",base:"/bloid-client/",routes:w});var k=y,T=o(4665);const C=()=>({pathsep:"/",users:[],localResources:[],netWork:{},user:null,chatMessages:[],file:{},storage:null,input:"",resourceToTag:null,networkAdds:{},host:"http://localhost",port:"5000"}),N={processMetaFile(e,t){try{let o=JSON.parse(t.content);o.path=t.path,e.commit("addToNetwork",o)}catch(o){console.log(t,"->",o),alert(o+" in "+t.path)}}},O={setServer(e,t){e.host=t.host,e.port=t.port},setInput(e,t){e.input=t},setPodStorage(e,t){e.podStorage=t},setUser(e,t){console.log(t),e.user=t},setUsers(e,t){e.users=t},updatepathSep(e,t){e.pathsep=t},updateLocalResources(e,t){e.localResources=t},addChatMessage(e,t){e.chatMessages.push(t)},setFile(e,t){e.file=t},setResourceToTag(e,t){e.resourceToTag=t},addToNetwork(e,t){console.log("addToNetwork",t),e.networkAdds=t}};var x={namespaced:!0,state:C,actions:N,mutations:O};const j=()=>({ldTestResult:null}),_={},D={setLdTestResult(e,t){e.ldTestResult=t}};var A={namespaced:!0,state:j,actions:_,mutations:D};const L=()=>({createParams:null,history:[],thing:{}}),E={},S={setCreateParams(e,t){let o={array:t};e.createParams=o},setThing(e,t){e.Thing=t},addHistory(e,t){e.history.unshift(t),console.log("state.history",e.history)}};var P={namespaced:!0,state:L,actions:E,mutations:S};const H=()=>({graph:null,highlightNodes:new Set,highlightLinks:new Set,hoverNode:null,search:null,nodes:[],links:[],brains:[],toobar_disabled:!0,currentNode:null}),B={stash(e,t){let{nodes:o,links:n}=e.graph.graphData();t.nodes=o,t.links=n,t.date=Date.now(),e.brains.push(t),e.graph.graphData({nodes:[],links:[]}),this.commit("graph/setToolBarDisabled")},clear(e){e.graph.graphData({nodes:[],links:[]}),this.commit("graph/setToolBarDisabled")},setGraph(e,t){e.graph=t,this.commit("graph/setToolBarDisabled")},setCurrentNode(e,t){console.log("set ",t),e.currentNode=t},setCurrentNodeById(e,t){console.log("set ",t);let o={action:"getById","@id":t};n["default"].prototype.$socket.emit("ld_crud",o)},setLinks(e,t){e.links=t},setHighlightNodes(e,t){e.highlightNodes.clear(),e.highlightLinks.clear(),t.forEach((t=>{e.highlightNodes.add(t)})),n["default"].prototype.$updateHighlight()},updateGraph(e,t){e.graph.graphData(t),this.commit("graph/setToolBarDisabled")},addNode(e,t){let{nodes:o,links:n}=e.graph.graphData();var r=o.findIndex((e=>e["@id"]==t["@id"]));-1===r?o.push(t):Object.assign(o[r],t),e.graph.graphData({nodes:o,links:n}),this.commit("graph/setToolBarDisabled")},setToolBarDisabled(e){let{nodes:t,links:o}=e.graph.graphData();console.log(t,o),e.toobar_disabled=void 0==t||0==t.length}},$={};var V={namespaced:!0,state:H,actions:$,mutations:B};n["default"].use(T.ZP);var R=new T.ZP.Store({state:{},mutations:{},actions:{},modules:{vatch:x,ld:A,crud:P,graph:V}}),M=o(7812);const I={install(e,t={}){let o,n=t.store;e.prototype.$socket_connect=async function(){let t=n.state.vatch.host,r=n.state.vatch.port;console.log(t,r),o=e.prototype.$socket=(0,M.io)(t+":"+r),o.on("connect_error",(e=>{console.info(e)})),o.on("connect",(()=>{n.commit("vatch/setUser",o.id),o.on("init",(function(e){console.log("init",e),n.commit("vatch/updatepathSep",e.pathsep)})),o.on("users",(function(e){console.log("users",e),n.commit("vatch/setUsers",e)})),o.on("watcher event",(function(e){console.log("Watcher event",e),n.commit("vatch/updateLocalResources",e)})),o.on("walker",(function(e){console.log("Walker",e),n.commit("vatch/updateLocalResources",e)})),o.on("cat file",(function(e){console.log(e),void 0!=e.callback?n.dispatch(e.callback,e):(console.log("TODO PROCESSFILE cat file",e),n.commit("vatch/setFile",e))})),o.on("chat message",(function(e){console.log("chat message",e),n.commit("vatch/addChatMessage",e)})),o.on("disconnect",(()=>{n.commit("vatch/setUser",null)})),o.on("ld_test",(function(e){console.log(e),n.commit("ld/setLdTestResult",e)})),o.on("ld_crud",(function(e){switch(console.log(e),e.action){case"ld_object":n.commit("graph/addNode",e.obj);break;case"create":n.commit("crud/addHistory",e);break;case"getById":n.commit("graph/setCurrentNode",e.obj);break;default:console.log("OHOHOH no handle for ",e)}}))}))},e.prototype.$io_ld_crud=async function(e){console.log(e),o.emit("ld_crud",e)},e.prototype.$io_ld_test=async function(e){console.log(e),o.emit("ld_test",e)}}};"undefined"!==typeof window&&window.Vue&&window.Vue.use(I);var W=I,F=(o(6699),o(225)),z=o(3971),Z=o(9953),U=o(3226);const G={install(e,t={}){let o=t.store,n=r();function r(){return{w:window.innerWidth>768?window.innerWidth/2:window.innerWidth,h:window.innerWidth>768?.9*window.innerHeight:.8*window.innerHeight}}function a(e){return null!=o.state.graph.search&&o.state.graph.search.text.length>0&&e.name.includes(o.state.graph.search.text)}function i(e){console.log(e)}function s(e){let t,o,n=null,r=null,a=new U.YBo({color:e.color||Math.round(Math.random()*Math.pow(2,24)),transparent:!0,opacity:.75}),i=null;switch(e.shape){case"box":r=new U.DvJ(20,20,20);break;case"cylinder":r=new U.fHI(10,10,20);break;case"cone":r=new U.b_z(10,20);break;case"dodecahedron":r=new U.Kgo(10);break;case"sphere":r=new U.xo$(10);break;case"torus":r=new U.XvJ(10,2);break;case"torusKnot":r=new U.FE5(10,2);break;case"base64":t=new Image,t.src=e.base64,o=new U.xEZ,o.image=t,t.onload=function(){o.needsUpdate=!0},a=new U.xeV({map:o}),i=new U.jyi(a),i.scale.set(2,2);break;default:}if(null!=i)n=i;else if(null==r){const t=document.createElement("div");t.textContent=e.name,t.style.color=e.color||"#ffffff",t.className="node-label",n=new z.j(t)}else n=new U.Kj0(r,a);return n}async function l(e){console.log("node",e),o.commit("graph/setCurrentNodeById",e["@id"]);const t=40;let n={x:t,y:t,z:t};if(0!=e.x&&0!=e.y&&0!=e.z){const o=1+t/Math.hypot(e.x,e.y,e.z);n={x:e.x*o,y:e.y*o,z:e.z*o}}o.state.graph.graph.cameraPosition(n,e,3e3),o.commit("graph/setCurrentNodeById",e["@id"])}window.addEventListener("resize",(function(){null!=o.state.graph.graph&&(n=r(),o.state.graph.graph.width(n.w),o.state.graph.graph.height(n.h))})),e.prototype.$graphInit=async function(t){let r={nodes:[],links:[]},c=o.state.graph.highlightNodes,d=o.state.graph.highlightLinks,u=o.state.graph.hoverNode,h=(0,F.Z)({extraRenderers:[new z.M]})(t.domElement).graphData(r);h.width(n.w).height(n.h/2).backgroundColor("#eafaff").nodeLabel("name").nodeAutoColorBy("type").nodeColor((e=>a(e)?"yellow":c.has(e)?e===u?"rgb(255,0,0,1)":"rgba(255,160,0,0.8)":e.color)).onNodeClick((e=>l(e))).onLinkClick((e=>i(e))).nodeThreeObjectExtend((e=>void 0==e.shape||null==e.shape)).nodeThreeObject((e=>s(e))).linkCurvature("curvature").linkCurveRotation("rotation").linkThreeObjectExtend(!0).linkThreeObject((e=>{if(void 0!=e.label){const t=new Z.Z(`${e.label}`);return t.color="lightgrey",t.textHeight=1.5,t}})).linkDirectionalArrowLength(3.5).linkDirectionalArrowRelPos(1).linkPositionUpdate(((e,{start:t,end:o})=>{if(void 0!=e){const n=Object.assign(...["x","y","z"].map((e=>({[e]:t[e]+(o[e]-t[e])/4}))));Object.assign(e.position,n)}})).linkWidth((e=>d.has(e)?4:1)).linkDirectionalParticles((e=>d.has(e)?4:0)).linkDirectionalParticleWidth(4).onNodeHover((t=>{!t&&!c.size||t&&u===t||(c.clear(),d.clear(),t&&c.add(t),u=t||null,e.prototype.$updateHighlight())})).onLinkHover((t=>{c.clear(),d.clear(),t&&(d.add(t),c.add(t.source),c.add(t.target)),e.prototype.$updateHighlight()})),o.commit("graph/setGraph",h)},e.prototype.$updateHighlight=function(){let e=o.state.graph.graph;e.nodeColor(e.nodeColor()).linkWidth(e.linkWidth()).linkDirectionalParticles(e.linkDirectionalParticles())}}};"undefined"!==typeof window&&window.Vue&&window.Vue.use(G);var K=G,q=o(905);const J={install(e,t={}){function o(e,t,o){if(void 0==e.reverse&&(e.reverse={}),void 0==e.reverse[t])e.reverse[t]={id:o.id,name:o.name};else switch(typeof e.reverse[t]){case"string":console.log("TODO string",e.reverse[t]);break;default:if(Array.isArray(e.reverse[t]))e.reverse[t].push({id:o.id,name:o.name});else{let n=e.reverse[t];e.reverse[t]=[],e.reverse[t].push(n),e.reverse[t].push({id:o.id,name:o.name})}}return console.log(e),e}function n(e,t,o){console.log(typeof e[t],e[t],o);let n=o.name,r=o.id;if(void 0==e[t])e[t]={id:r,name:n};else switch(typeof e[t]){case"string":console.log("TODO string",e[t]),e[t]=[e[t]],e[t].push({id:r,name:n});break;default:if(Array.isArray(e[t]))e[t].push({id:r,name:n});else{let o=e[t];e[t]=[],e[t].push(o),e[t].push({id:r,name:n})}}return console.log(e),e}!t||console.log(t),e.prototype.$newNode=async function(t={}){if(void 0!=t.name&&t.name.startsWith("http")){console.log("search",t);let o=await e.prototype.$loadNeurone(t.name);return console.log("neurone",o),o}{let e={name:"http://xmlns.com/foaf/0.1/name",knows:"http://xmlns.com/foaf/0.1/knows","@base":"http://local/","@vocab":"https://scenaristeur.github.io/agent/",id:"@id",type:"@type",reverse:"@reverse",homepage:{"@id":"http://xmlns.com/foaf/0.1/homepage","@type":"@id"}},o={"@context":Object.assign(e,t["@context"]),id:t["@id"]||t.id||(0,q.Z)(),name:t.name&&t.name["@value"]||t.name||"",type:t.type||"neurone",homepage:"https://scenaristeur.github.io/agent/"};return void 0!=t.base64&&(o.shape="base64",o.base64=t.base64,o.type=t.type),void 0!=t.neurones&&(o.neurones=t.neurones),o}},e.prototype.$addProp=function(e){let t=e.node,o=e.propertie,n=e.value,r=t[o];return console.log(typeof r,r),void 0==r?t[o]=n:Array.isArray(r)?t[o].push(n):t[o]=[r,n],t},e.prototype.$addLink=function(e){console.log(e);let t=e.subject,r=e.predicate,a=e.object;return t=n(t,r,a),a=o(a,r,t),[t,a]}}};"undefined"!==typeof window&&window.Vue&&window.Vue.use(J);var X=J,Y=o(8262),Q=o(3266);o(44);n["default"].use(W,{store:R}),n["default"].use(K,{store:R}),n["default"].use(X,{store:R}),n["default"].use(Y.XG7),n["default"].use(Q.A7),n["default"].config.productionTip=!1,new n["default"]({router:k,store:R,render:e=>e(d)}).$mount("#app")}},t={};function o(n){var r=t[n];if(void 0!==r)return r.exports;var a=t[n]={exports:{}};return e[n](a,a.exports,o),a.exports}o.m=e,function(){var e=[];o.O=function(t,n,r,a){if(!n){var i=1/0;for(d=0;d<e.length;d++){n=e[d][0],r=e[d][1],a=e[d][2];for(var s=!0,l=0;l<n.length;l++)(!1&a||i>=a)&&Object.keys(o.O).every((function(e){return o.O[e](n[l])}))?n.splice(l--,1):(s=!1,a<i&&(i=a));if(s){e.splice(d--,1);var c=r();void 0!==c&&(t=c)}}return t}a=a||0;for(var d=e.length;d>0&&e[d-1][2]>a;d--)e[d]=e[d-1];e[d]=[n,r,a]}}(),function(){o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,{a:t}),t}}(),function(){o.d=function(e,t){for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){o.f={},o.e=function(e){return Promise.all(Object.keys(o.f).reduce((function(t,n){return o.f[n](e,t),t}),[]))}}(),function(){o.u=function(e){return"js/"+(443===e?"about":e)+"."+{153:"ce809e32",216:"3c26db4c",298:"a9cb302d",299:"cfb89970",377:"423d89db",424:"66e3087e",443:"356e88a7",476:"b76ba29c",555:"4c2b2f29"}[e]+".js"}}(),function(){o.miniCssF=function(e){return"css/"+e+"."+{216:"d97e7fdf",299:"1a6439c6",555:"115bf7ab"}[e]+".css"}}(),function(){o.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="bloid-client:";o.l=function(n,r,a,i){if(e[n])e[n].push(r);else{var s,l;if(void 0!==a)for(var c=document.getElementsByTagName("script"),d=0;d<c.length;d++){var u=c[d];if(u.getAttribute("src")==n||u.getAttribute("data-webpack")==t+a){s=u;break}}s||(l=!0,s=document.createElement("script"),s.charset="utf-8",s.timeout=120,o.nc&&s.setAttribute("nonce",o.nc),s.setAttribute("data-webpack",t+a),s.src=n),e[n]=[r];var h=function(t,o){s.onerror=s.onload=null,clearTimeout(p);var r=e[n];if(delete e[n],s.parentNode&&s.parentNode.removeChild(s),r&&r.forEach((function(e){return e(o)})),t)return t(o)},p=setTimeout(h.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=h.bind(null,s.onerror),s.onload=h.bind(null,s.onload),l&&document.head.appendChild(s)}}}(),function(){o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){o.p="/bloid-client/"}(),function(){var e=function(e,t,o,n){var r=document.createElement("link");r.rel="stylesheet",r.type="text/css";var a=function(a){if(r.onerror=r.onload=null,"load"===a.type)o();else{var i=a&&("load"===a.type?"missing":a.type),s=a&&a.target&&a.target.href||t,l=new Error("Loading CSS chunk "+e+" failed.\n("+s+")");l.code="CSS_CHUNK_LOAD_FAILED",l.type=i,l.request=s,r.parentNode.removeChild(r),n(l)}};return r.onerror=r.onload=a,r.href=t,document.head.appendChild(r),r},t=function(e,t){for(var o=document.getElementsByTagName("link"),n=0;n<o.length;n++){var r=o[n],a=r.getAttribute("data-href")||r.getAttribute("href");if("stylesheet"===r.rel&&(a===e||a===t))return r}var i=document.getElementsByTagName("style");for(n=0;n<i.length;n++){r=i[n],a=r.getAttribute("data-href");if(a===e||a===t)return r}},n=function(n){return new Promise((function(r,a){var i=o.miniCssF(n),s=o.p+i;if(t(i,s))return r();e(n,s,r,a)}))},r={143:0};o.f.miniCss=function(e,t){var o={216:1,299:1,555:1};r[e]?t.push(r[e]):0!==r[e]&&o[e]&&t.push(r[e]=n(e).then((function(){r[e]=0}),(function(t){throw delete r[e],t})))}}(),function(){var e={143:0};o.f.j=function(t,n){var r=o.o(e,t)?e[t]:void 0;if(0!==r)if(r)n.push(r[2]);else{var a=new Promise((function(o,n){r=e[t]=[o,n]}));n.push(r[2]=a);var i=o.p+o.u(t),s=new Error,l=function(n){if(o.o(e,t)&&(r=e[t],0!==r&&(e[t]=void 0),r)){var a=n&&("load"===n.type?"missing":n.type),i=n&&n.target&&n.target.src;s.message="Loading chunk "+t+" failed.\n("+a+": "+i+")",s.name="ChunkLoadError",s.type=a,s.request=i,r[1](s)}};o.l(i,l,"chunk-"+t,t)}},o.O.j=function(t){return 0===e[t]};var t=function(t,n){var r,a,i=n[0],s=n[1],l=n[2],c=0;if(i.some((function(t){return 0!==e[t]}))){for(r in s)o.o(s,r)&&(o.m[r]=s[r]);if(l)var d=l(o)}for(t&&t(n);c<i.length;c++)a=i[c],o.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return o.O(d)},n=self["webpackChunkbloid_client"]=self["webpackChunkbloid_client"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=o.O(void 0,[998],(function(){return o(6440)}));n=o.O(n)})();
//# sourceMappingURL=app.229e92a5.js.map