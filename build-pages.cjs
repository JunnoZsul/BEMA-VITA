'use strict';
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=__dirname;
function render(route){
  const elements=new Map();
  const element=()=>({innerHTML:'',hidden:false,className:'',classList:{add(){},remove(){}},focus(){},querySelector(selector){if(selector==='h1'){const match=this.innerHTML.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);return match?{innerText:match[1].replace(/<br\s*\/?\s*>/g,' ').replace(/<[^>]*>/g,'')}:null;}return null;}});
  const document={title:'',body:{dataset:{route}},getElementById(id){if(!elements.has(id))elements.set(id,element());return elements.get(id);},querySelector(){return null;},addEventListener(){}};
  const context={document,location:{hash:''},localStorage:{getItem(){return null;}},URL,Intl,Date,console,setTimeout,clearTimeout,confirm(){return false;}};
  context.window=context;context.addEventListener=()=>{};context.scrollTo=()=>{};
  vm.createContext(context);
  for(const file of ['data.js','content.js','routes.js','app.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context,{filename:file});
  return {context,header:elements.get('site-header').innerHTML,main:elements.get('main').innerHTML,footer:elements.get('site-footer').innerHTML};
}
const first=render('inicio');
const routing=first.context.BEMA_ROUTING;
const escape=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
for(const page of routing.pages){
  const view=page.route==='inicio'?first:render(page.route);
  const url=routing.origin+page.path;
  const noindex=page.route==='mi-espacio';
  const html=`<!doctype html>
<html lang="es"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#14263d">
<title>${escape(page.title)}</title><meta name="description" content="${escape(page.description)}"><link rel="canonical" href="${url}">
${noindex?'<meta name="robots" content="noindex,follow">':''}${routing.searchConsoleVerification?`<meta name="google-site-verification" content="${escape(routing.searchConsoleVerification)}">`:''}
<meta property="og:type" content="website"><meta property="og:locale" content="es_MX"><meta property="og:site_name" content="Bema Vita"><meta property="og:title" content="${escape(page.title)}"><meta property="og:description" content="${escape(page.description)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${routing.origin}/assets/paths.webp"><meta property="og:image:width" content="1536"><meta property="og:image:height" content="1024"><meta property="og:image:alt" content="Ilustración de una conversación de autoconocimiento en Bema Vita."><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escape(page.title)}"><meta name="twitter:description" content="${escape(page.description)}"><meta name="twitter:image" content="${routing.origin}/assets/paths.webp">
<link rel="icon" type="image/svg+xml" href="/assets/favicon.svg"><link rel="stylesheet" href="/styles.css">
<script defer src="/data.js"></script><script defer src="/content.js"></script><script defer src="/routes.js"></script><script defer src="/app.js"></script>
<noscript><style>.menu-toggle{display:none!important}.nav{display:flex!important;position:static!important;flex-wrap:wrap;box-shadow:none!important}.header-inner{height:auto!important;flex-wrap:wrap;padding-top:16px;padding-bottom:16px}</style></noscript>
</head><body data-route="${page.route}"><a class="skip-link" href="#main">Saltar al contenido</a><header id="site-header">${view.header}</header><main id="main" tabindex="-1">${view.main}</main><footer id="site-footer">${view.footer}</footer><div id="toast" class="toast" role="status" aria-live="polite"></div><noscript><p class="container small">Puedes leer el sitio sin JavaScript. Para responder y guardar las guías gratuitas, activa JavaScript.</p></noscript></body></html>\n`;
  fs.writeFileSync(path.join(root,page.file),html);
}
fs.writeFileSync(path.join(root,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routing.pages.filter(p=>p.route!=='mi-espacio').map(p=>`<url><loc>${routing.origin+p.path}</loc></url>`).join('')}</urlset>\n`);
fs.writeFileSync(path.join(root,'robots.txt'),`User-agent: *\nAllow: /\nSitemap: ${routing.origin}/sitemap.xml\n`);
console.log(`Generadas ${routing.pages.length} páginas con contenido HTML y metadatos propios.`);

module.exports={render};
