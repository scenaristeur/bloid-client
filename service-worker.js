if(!self.define){let e,i={};const l=(l,s)=>(l=new URL(l+".js",s).href,i[l]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=l,e.onload=i,document.head.appendChild(e)}else e=l,importScripts(l),i()})).then((()=>{let e=i[l];if(!e)throw new Error(`Module ${l} didn’t register its module`);return e})));self.define=(s,n)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let o={};const r=e=>l(e,c),t={module:{uri:c},exports:o,require:r};i[c]=Promise.all(s.map((e=>t[e]||r(e)))).then((e=>(n(...e),o)))}}define(["./workbox-2d118ab0"],(function(e){"use strict";e.setCacheNameDetails({prefix:"bloid-client"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/bloid-client/css/497.115bf7ab.css",revision:null},{url:"/bloid-client/css/567.1a6439c6.css",revision:null},{url:"/bloid-client/css/app.96cd9d57.css",revision:null},{url:"/bloid-client/css/chunk-vendors.1944359c.css",revision:null},{url:"/bloid-client/index.html",revision:"64c3ee16741cd69084fc4552a07c3551"},{url:"/bloid-client/js/276.40af8b6c.js",revision:null},{url:"/bloid-client/js/497.2e1907b9.js",revision:null},{url:"/bloid-client/js/567.cf5704e7.js",revision:null},{url:"/bloid-client/js/883.b3f6f275.js",revision:null},{url:"/bloid-client/js/about.356e88a7.js",revision:null},{url:"/bloid-client/js/app.6f09dafc.js",revision:null},{url:"/bloid-client/js/chunk-vendors.07f3cd02.js",revision:null},{url:"/bloid-client/manifest.json",revision:"ecdab825e831cba6905dc783e715c3c5"},{url:"/bloid-client/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
