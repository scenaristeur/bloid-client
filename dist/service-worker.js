if(!self.define){let l,i={};const e=(e,s)=>(e=new URL(e+".js",s).href,i[e]||new Promise((i=>{if("document"in self){const l=document.createElement("script");l.src=e,l.onload=i,document.head.appendChild(l)}else l=e,importScripts(e),i()})).then((()=>{let l=i[e];if(!l)throw new Error(`Module ${e} didn’t register its module`);return l})));self.define=(s,n)=>{const c=l||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let o={};const r=l=>e(l,c),u={module:{uri:c},exports:o,require:r};i[c]=Promise.all(s.map((l=>u[l]||r(l)))).then((l=>(n(...l),o)))}}define(["./workbox-2d118ab0"],(function(l){"use strict";l.setCacheNameDetails({prefix:"bloid-client"}),self.addEventListener("message",(l=>{l.data&&"SKIP_WAITING"===l.data.type&&self.skipWaiting()})),l.precacheAndRoute([{url:"/bloid-client/css/216.d97e7fdf.css",revision:null},{url:"/bloid-client/css/311.1a6439c6.css",revision:null},{url:"/bloid-client/css/555.115bf7ab.css",revision:null},{url:"/bloid-client/css/872.8837bf60.css",revision:null},{url:"/bloid-client/css/app.96cd9d57.css",revision:null},{url:"/bloid-client/css/chunk-vendors.1944359c.css",revision:null},{url:"/bloid-client/index.html",revision:"bf14cef3dd605cde72c326a130e296fb"},{url:"/bloid-client/js/153.ce809e32.js",revision:null},{url:"/bloid-client/js/216.3c26db4c.js",revision:null},{url:"/bloid-client/js/267.a8572fdf.js",revision:null},{url:"/bloid-client/js/298.a9cb302d.js",revision:null},{url:"/bloid-client/js/311.2f88541c.js",revision:null},{url:"/bloid-client/js/377.423d89db.js",revision:null},{url:"/bloid-client/js/424.66e3087e.js",revision:null},{url:"/bloid-client/js/476.b76ba29c.js",revision:null},{url:"/bloid-client/js/555.4c2b2f29.js",revision:null},{url:"/bloid-client/js/872.67046727.js",revision:null},{url:"/bloid-client/js/about.356e88a7.js",revision:null},{url:"/bloid-client/js/app.b30b882a.js",revision:null},{url:"/bloid-client/js/chunk-vendors.ecb48771.js",revision:null},{url:"/bloid-client/manifest.json",revision:"ecdab825e831cba6905dc783e715c3c5"},{url:"/bloid-client/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
