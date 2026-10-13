'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
function view(assessment,answers,tab='opciones'){
  const elements=new Map();
  const element=()=>({innerHTML:'',hidden:false,className:'',classList:{add(){},remove(){}},focus(){},querySelector(selector){if(selector!=='h1')return null;const match=this.innerHTML.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);return match?{innerText:match[1].replace(/<[^>]*>/g,' ')}:null;}});
  const saved={drafts:{},results:[{id:'fixture',assessment,version:1,created:0,answers}],plans:{fixture:'Una nota conservada'}};
  const context={document:{body:{dataset:{route:'inicio'}},getElementById(id){if(!elements.has(id))elements.set(id,element());return elements.get(id);},querySelector(){return null;},addEventListener(){}},location:{hash:`#resultado/fixture/${tab}`},localStorage:{getItem(){return JSON.stringify(saved);}},URL,Intl,Date,console,setTimeout,clearTimeout,confirm(){return false;}};
  context.window=context;context.addEventListener=()=>{};context.scrollTo=()=>{};
  vm.createContext(context);
  for(const file of ['data.js','content.js','routes.js','app.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context,{filename:file});
  return elements.get('main').innerHTML;
}
const neutral=view('pensamiento',Array(12).fill(3));
assert.match(neutral,/promedios similares/);
assert.match(neutral,/>Educación<\/h3>/,'Un empate debe conservar las opciones de Relaciones');
assert.match(neutral,/>Explora relaciones<\/h3>/,'Un empate debe conservar la actividad de Relaciones');
assert.match(neutral,/Una nota conservada/,'Los resultados anteriores deben seguir cargando sus notas');
const interests=view('intereses',Array(18).fill(3));
for(const label of ['Práctico','Investigador','Creativo','Social','Emprendedor','Organizado'])assert.ok(interests.includes(`Para explorar ${label.toLowerCase()}`),`Falta la dimensión empatada ${label}`);
const personality=view('personalidad',Array(15).fill(3));
assert.match(personality,/Sensibilidad ante la presión<\/span>/,'Un empate debe conservar las cinco experiencias de personalidad');
assert.doesNotMatch(personality,/>Finanzas<\/h3>/,'Personalidad no debe recomendar profesiones');
const uneven=view('pensamiento',[5,4,3,3,5,4,3,3,5,4,3,3]);
assert.match(uneven,/>Explora relaciones<\/h3>/,'Debe conservar empates en el tercer lugar de actividades');
assert.doesNotMatch(uneven,/>Educación<\/h3>/,'Las opciones deben seguir correspondiendo a las dimensiones destacadas');
assert.match(neutral,/href="\/modalidades.html"/,'El resultado debe conectar con la comparación de programas');
for(const file of fs.readdirSync(root).filter(f=>f.endsWith('.html'))){
  const html=fs.readFileSync(path.join(root,file),'utf8');
  assert.doesNotMatch(html,/>Empezar\s*</,`CTA desactualizado en ${file}`);
  assert.doesNotMatch(html,/>Mi espacio</,`Nombre inconsistente en ${file}`);
  for(const match of html.matchAll(/(?:href|src)="\/(?!\/)([^"#?]*)(?:[?#][^"]*)?"/g))assert.ok(fs.existsSync(path.join(root,match[1]||'index.html')),`Enlace inexistente ${match[1]} en ${file}`);
}
const programs=fs.readFileSync(path.join(root,'modalidades.html'),'utf8');
assert.match(programs,/<caption>Qué incluye cada programa/);
assert.match(programs,/Contratación|contratación/);
const map=fs.readFileSync(path.join(root,'mapa-personal.html'),'utf8');
assert.match(map,/Ejemplo ficticio · Solo ilustrativo/);
console.log('Correcto: empates en las tres guías, notas anteriores, enlaces y páginas generadas.');
