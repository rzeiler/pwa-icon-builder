if(!self.define){let e,i={};const n=(n,r)=>(n=new URL(n+".js",r).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(r,o)=>{const s=e||("document"in self?document.currentScript.src:"")||location.href;if(i[s])return;let l={};const c=e=>n(e,s),u={module:{uri:s},exports:l,require:c};i[s]=Promise.all(r.map((e=>u[e]||c(e)))).then((e=>(o(...e),l)))}}define(["./workbox-79ffe3e0"],(function(e){"use strict";e.setCacheNameDetails({prefix:"iconbuilder"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/pwa-icon-builder/css/app.1d73183e.css",revision:null},{url:"/pwa-icon-builder/img/logo.6042b8f9.png",revision:null},{url:"/pwa-icon-builder/index.html",revision:"215f98e52920937878acd228d3706e00"},{url:"/pwa-icon-builder/js/app.72114bbe.js",revision:null},{url:"/pwa-icon-builder/js/chunk-vendors.36415fc6.js",revision:null},{url:"/pwa-icon-builder/logo.png",revision:"26ecc757037486da1ac26a9abf9dc790"},{url:"/pwa-icon-builder/manifest.json",revision:"233d8e4220913a6cd412df643e5798b3"},{url:"/pwa-icon-builder/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map