(() => {
  'use strict';
  const DATA = window.CAMINO_DATA;
  const SITE = window.BEMA_SITE;
  const KEY = 'tu-camino-v1';
  const main = document.getElementById('main');
  let storageAvailable = true;
  let store = { drafts: {}, results: [], plans: {} };
  let toastTimer;
  let filter = 'Todas';
  let previousRoute = '';
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const findAssessment = id => DATA.assessments.find(a => a.id === id);
  const validAnswer = n => Number.isInteger(n) && n >= 1 && n <= 5;
  const paths = {
    layers:'<rect x="3" y="3" width="13" height="13" rx="2"/><rect x="8" y="8" width="13" height="13" rx="2"/>',
    list:'<path d="m3 6 1 1 2-2M9 6h12M3 12h3M9 12h12M3 18h3M9 18h12"/>',
    search:'<circle cx="10.5" cy="10.5" r="7.5"/><path d="m16 16 5 5"/>',
    compass:'<circle cx="12" cy="12" r="9"/><path d="m16 8-3 5-5 3 3-5z"/>',
    people:'<circle cx="9" cy="7" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M17 4a3 3 0 0 1 0 6M18 13a5 5 0 0 1 4 5v3"/>',
    person:'<circle cx="12" cy="7" r="4"/><path d="M4 22v-3a8 8 0 0 1 16 0v3"/>',
    heart:'<path d="M20.5 5.5a5 5 0 0 0-7 0L12 7l-1.5-1.5a5 5 0 0 0-7 7L12 21l8.5-8.5a5 5 0 0 0 0-7z"/>',
    leaf:'<path d="M20 3C8 3 3 8 5 15c6 4 14-1 15-12ZM3 22c2-7 7-12 12-15"/>',
    check:'<path d="m5 12 4 4L20 5"/>',
    file:'<path d="M14 2H5v20h14V7zM14 2v5h5M8 12h8M8 16h8"/>',
    flag:'<path d="M5 22V3m0 0c5-4 9 4 15 0v10c-6 4-10-4-15 0"/>',
    pen:'<path d="m4 16 12-12 4 4L8 20l-5 1zM13 7l4 4"/>',
    tool:'<path d="M15 3a6 6 0 0 0-6 8L3 17a3 3 0 0 0 4 4l6-6a6 6 0 0 0 8-6l-4 4-5-5 4-4z"/>',
    menu:'<path d="M3 6h18M3 12h18M3 18h18"/>',
    print:'<path d="M6 8V3h12v5M6 17H3V8h18v9h-3M6 14h12v8H6zM17 11h1"/>',
    trash:'<path d="M3 6h18M9 6V3h6v3M5 6l1 16h12l1-16M10 10v8M14 10v8"/>',
    book:'<path d="M12 5v16M12 5C8 2 4 3 2 4v16c4-2 7-1 10 1 3-2 6-3 10-1V4c-4-2-7-1-10 1z"/>'
  };
  const icon = name => `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${paths[name] || paths.compass}</svg>`;
  const brand = () => `<a class="brand" href="#inicio" aria-label="${esc(SITE.settings.name)}, inicio"><img src="assets/favicon.svg" alt="" width="37" height="37"><span>${esc(SITE.settings.name)}<small>Conócete. Explora. Prueba. Decide.</small></span></a>`;
  const date = ms => new Date(ms).toLocaleDateString('es-MX', {day:'numeric',month:'long',year:'numeric'});

  function loadStore() {
    try {
      const value = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (!value || typeof value !== 'object') return;
      for (const a of DATA.assessments) {
        const d = value.drafts?.[a.id];
        if (d?.version === DATA.version && Array.isArray(d.answers) && d.answers.length === a.items.length) {
          store.drafts[a.id] = {version:DATA.version,answers:d.answers.map(x=>validAnswer(x)?x:null),index:Math.max(0,Math.min(a.items.length-1,Number.isInteger(d.index)?d.index:0)),updated:Number.isFinite(d.updated)?d.updated:Date.now()};
        }
      }
      if (Array.isArray(value.results)) store.results = value.results.filter(r => {
        const a = findAssessment(r?.assessment);
        return a && r.version===DATA.version && typeof r.id==='string' && /^[a-zA-Z0-9_-]{1,80}$/.test(r.id) && Number.isFinite(r.created) && Array.isArray(r.answers) && r.answers.length===a.items.length && r.answers.every(validAnswer);
      }).slice(0,60).map(r=>({id:r.id,assessment:r.assessment,version:r.version,created:r.created,answers:r.answers}));
      for(const r of store.results) if(typeof value.plans?.[r.id]==='string') store.plans[r.id]=value.plans[r.id].slice(0,2000);
    } catch { storageAvailable = false; }
  }
  loadStore();
  function persist() {
    try { localStorage.setItem(KEY,JSON.stringify(store));storageAvailable=true;return true; }
    catch { storageAvailable=false;return false; }
  }
  function notify(message) {
    const toast=document.getElementById('toast');toast.textContent=message;toast.classList.add('show');
    clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),5000);
  }
  const warning = () => storageAvailable?'':'<div class="storage-warning" role="status">El navegador no permite guardar. Puedes continuar, pero el avance se perderá al cerrar o recargar esta página.</div>';
  function header(route, quiz=false) {
    const el=document.getElementById('site-header');el.className=quiz?'quiz-top':'';
    el.innerHTML=quiz?`<div class="container header-inner">${brand()}<button class="btn secondary small" data-action="exit-quiz">Salir y guardar</button></div>`:
      `<div class="container header-inner">${brand()}<button class="menu-toggle" aria-label="Abrir menú" aria-expanded="false" aria-controls="navigation" data-action="menu">${icon('menu')}</button><nav id="navigation" class="nav" aria-label="Navegación principal">${[['inicio','Inicio'],['acompanamientos','Acompañamientos'],['proceso','El proceso'],['metodologia','Metodología'],['sobre','Sobre el proyecto'],['preguntas-frecuentes','Preguntas frecuentes']].map(([id,label])=>`<a href="#${id}" ${route===id?'class="active" aria-current="page"':''}>${label}</a>`).join('')}<a class="btn secondary small" href="#mi-espacio">Mi espacio</a></nav></div>`;
    document.getElementById('site-footer').hidden=quiz;
  }
  function footer() {
    document.getElementById('site-footer').innerHTML=`<div class="container"><div class="footer-top">${brand()}<div class="footer-links"><a href="#metodologia">Metodología</a><a href="#evaluaciones">Guías de reflexión</a><a href="#recursos">Recursos</a><a href="#privacidad">Privacidad y guardado</a><a href="#preguntas-frecuentes">Preguntas frecuentes</a></div></div><div class="footer-bottom"><p>Orientación para construir una trayectoria con sentido. Las guías de esta web son ejercicios demostrativos; no sustituyen una evaluación formal.</p><span>Bema Vita · Conócete. Explora. Prueba. Decide.</span></div></div>`;
  }
  footer();
  function card(a, compact=false) {
    return `<article class="assessment-card">${compact?'':`<img class="card-image" src="assets/${a.id==='personalidad'?'hero':'paths'}.webp" alt="" width="1536" height="1024" loading="lazy">`}<div class="card-content"><span class="tag">${a.category}</span><h3>${a.title}</h3><p>${a.intro}</p>${compact?'':`<ul class="benefits"><li>${icon('list')} ${a.items.length} preguntas</li>${a.delivers.map(x=>`<li>${icon('check')} ${x}</li>`).join('')}</ul>`}<div class="actions"><a class="${compact?'text-link':'btn small'}" href="#evaluacion/${a.id}">${compact?'Explorar':'Conocer la guía'}</a></div></div></article>`;
  }
  function home() { return SITE.home(icon); }
  function catalog(goal) {
    if(goal==='autoconocimiento') filter='Autoconocimiento';
    else if(goal==='vocacion') filter='Orientación vocacional';
    else if(goal==='siguiente') filter='Todas';
    const entries=DATA.assessments.filter(a=>filter==='Todas'||a.category===filter);
    return `<div class="container page"><div class="breadcrumb"><a href="#inicio">Inicio</a><span>/</span>Guías de reflexión</div><div class="page-intro"><div><p class="eyebrow">Recursos de autoconocimiento</p><h1>Guías para empezar a reflexionar</h1><p class="lead">Ejercicios originales para observar tus respuestas y hacerte nuevas preguntas. Son demostrativos y no sustituyen el acompañamiento personal.</p></div><img src="assets/paths.webp" alt="" width="1536" height="1024"></div><div class="filters" aria-label="Filtrar guías de reflexión">${['Todas','Autoconocimiento','Orientación vocacional'].map(f=>`<button class="filter ${f===filter?'active':''}" aria-pressed="${f===filter}" data-action="filter" data-filter="${f}">${f}</button>`).join('')}</div><div class="grid-3">${entries.map(a=>card(a)).join('')}</div><div class="help-band"><div><h3>¿No sabes por dónde empezar?</h3><p>Conoce cómo la reflexión se convierte en experiencias y decisiones.</p></div><a class="btn small" href="#proceso">Conocer el proceso</a></div><p class="center small muted" style="margin-top:25px">Estas guías no son la evaluación Benziger. Exploran tus respuestas y no determinan qué carrera debes elegir.</p></div>`;
  }
  function detail(a) {
    const draft=store.drafts[a.id];
    return `<div class="container page"><div class="breadcrumb"><a href="#evaluaciones">Guías de reflexión</a><span>/</span>${a.title}</div>${warning()}<div class="detail-grid"><div><span class="badge">Guía exploratoria · Versión inicial</span><h1 style="margin-top:20px">${a.title}</h1><p class="lead">${a.intro}</p><p class="muted">${a.purpose}</p><div class="dimension-list">${a.dimensions.map(d=>`<span class="tag">${d.name}</span>`).join('')}</div><div class="note"><strong>Para interpretar el resultado</strong><br>Esta guía utiliza preguntas originales y no está validada. Los resultados resumen tus respuestas; no miden capacidades ni actividad cerebral y no determinan qué carrera debes elegir.</div></div><aside class="panel"><img class="detail-art" src="assets/${a.id==='personalidad'?'hero':'paths'}.webp" alt="" width="1536" height="1024"><h3>Qué recibirás</h3><ul class="check-list">${a.delivers.map(x=>`<li>${icon('check')}${x}</li>`).join('')}</ul><p class="small muted">${a.items.length} preguntas · A tu ritmo<br>Avance guardado en este dispositivo, si el navegador lo permite.</p><button class="btn" data-action="start" data-id="${a.id}">${draft?'Continuar cuestionario':'Responder cuestionario'}</button>${draft?`<p class="small muted" style="margin:14px 0 0">${draft.answers.filter(validAnswer).length} de ${a.items.length} respuestas guardadas.</p>`:''}</aside></div></div>`;
  }
  function start(id) {
    const a=findAssessment(id);if(!a)return;
    if(!store.drafts[id])store.drafts[id]={version:DATA.version,answers:Array(a.items.length).fill(null),index:0,updated:Date.now()};
    persist();location.hash=`cuestionario/${id}`;
  }
  function quiz(a,review=false) {
    const d=store.drafts[a.id];
    if(!d)return detail(a);
    const count=d.answers.filter(validAnswer).length;
    if(review)return `<div class="quiz-page">${warning()}<section class="panel quiz-panel"><p class="eyebrow">${a.title}</p><h1>Revisa tus respuestas</h1><p class="muted">Puedes cambiar cualquier respuesta antes de ver tu resultado.</p><ul class="review-answers">${a.items.map((q,i)=>`<li><div><strong>${i+1}. ${q[1]}</strong><p>${validAnswer(d.answers[i])?a.anchors[d.answers[i]-1]:'Sin respuesta'}</p></div><button class="btn secondary small" data-action="edit-answer" data-index="${i}" data-id="${a.id}">Cambiar<span class="visually-hidden"> respuesta ${i+1}</span></button></li>`).join('')}</ul><div class="quiz-navigation"><button class="btn secondary" data-action="quiz-back" data-id="${a.id}">Volver</button><button class="btn" data-action="finish" data-id="${a.id}" ${count<a.items.length?'disabled':''}>Ver mi resultado</button></div></section></div>`;
    const index=d.index;
    return `<div class="quiz-page">${warning()}<div class="quiz-status"><span>${a.title}</span><span>Guardado ${storageAvailable?'en este dispositivo':'no disponible'}</span></div><section class="panel quiz-panel"><p class="eyebrow">${a.title}</p><div class="progress-row"><progress max="${a.items.length}" value="${count}" aria-label="Respuestas completadas">${count} de ${a.items.length}</progress><span>Pregunta ${index+1} de ${a.items.length}</span></div><h1 id="question-title">${a.items[index][1]}</h1><p class="muted small">${a.questionIntro}</p><form id="answer-form"><fieldset aria-labelledby="question-title"><legend>Selecciona una respuesta</legend>${a.anchors.map((label,i)=>`<label class="answer"><input type="radio" name="answer" value="${i+1}" ${d.answers[index]===i+1?'checked':''}><span>${label}</span></label>`).join('')}</fieldset><div class="quiz-navigation"><button type="button" class="btn secondary" data-action="previous" data-id="${a.id}" ${index===0?'disabled':''}>Anterior</button><button type="submit" class="btn" ${validAnswer(d.answers[index])?'':'disabled'}>${index===a.items.length-1?'Revisar respuestas':'Siguiente'}</button></div></form></section><p class="quiz-foot">Puedes revisar tus respuestas antes de terminar.</p></div>`;
  }
  function calculate(a,answers) {
    return a.dimensions.map(dim=>{
      const vals=a.items.map((item,i)=>item[0]===dim.id?(item[2]?6-answers[i]:answers[i]):null).filter(x=>x!==null);
      return {...dim,score:vals.reduce((sum,x)=>sum+x,0)/vals.length};
    });
  }
  const example={id:'ejemplo',assessment:'pensamiento',version:1,created:0,answers:[5,5,3,3,4,4,3,4,5,5,4,3]};
  function result(record,tab='resumen',sample=false) {
    const a=findAssessment(record.assessment);const scores=calculate(a,record.answers);const sorted=[...scores].sort((x,y)=>y.score-x.score);const strongest=scores.filter(d=>sorted[0].score-d.score<.16);
    const noCareer=a.id==='personalidad';const options=noCareer?[]:strongest.flatMap(d=>d.areas.map(name=>({name,dim:d.name,desc:d.description}))).slice(0,9);
    const resultRoute=sample?'ejemplo':`resultado/${record.id}`;
    const summary=strongest.length===scores.length?'En tus respuestas, las dimensiones presentan promedios similares. Explora sus diferencias con ejemplos de tu vida.':`En tus respuestas ${strongest.length===1?'destaca':'destacan'} ${new Intl.ListFormat('es',{type:'conjunction'}).format(strongest.map(d=>d.name.toLowerCase()))}. Toma este resultado como punto de partida para observar tus experiencias.`;
    const allowedTabs=['resumen','cotidiano','opciones','pasos'];if(!allowedTabs.includes(tab))tab='resumen';
    return `<div class="container page result-page"><div class="breadcrumb"><a href="#mi-espacio">Mi espacio</a><span>/</span>Resultados</div>${warning()}<div class="results-intro"><div><p class="eyebrow">${a.title}</p><h1>Comprende tu perfil y explora tu siguiente paso</h1><span class="badge">${sample?'Ejemplo ficticio':'Guía exploratoria'}</span><p class="result-date">${sample?'Respuestas ficticias para mostrar cómo se presenta un resultado.':`Realizada el ${date(record.created)}`}</p></div><div class="result-toolbar"><a class="btn secondary small" href="#mi-espacio">Mi espacio</a><button class="btn secondary small" data-action="print">${icon('print')} Imprimir / PDF</button></div></div><nav class="tabs" aria-label="Secciones del resultado">${[['resumen','Resumen'],['cotidiano','En tu vida cotidiana'],['opciones','Opciones para explorar'],['pasos','Próximos pasos']].map(([id,t])=>`<a href="#${resultRoute}/${id}" class="${id===tab?'active':''}" ${id===tab?'aria-current="page"':''}>${t}</a>`).join('')}</nav>
    <section class="tab-panel" ${tab==='resumen'?'':'hidden'}><div class="result-grid"><article class="panel"><h2 style="font-size:1.5rem">${a.id==='intereses'?'Tus áreas de interés':'Tus respuestas por dimensión'}</h2><p class="small muted">Promedio de respuestas en una escala de 1 a 5. No es un percentil ni una comparación con otras personas.</p><div class="profile-scores">${scores.map(d=>`<div class="score-card ${strongest.includes(d)?'primary':''}">${icon(d.icon)}<h3>${d.name}</h3><p>${d.description}</p><span class="score-value">${d.score.toLocaleString('es-MX',{minimumFractionDigits:1,maximumFractionDigits:1})}<small> / 5</small></span><div class="score-track" aria-hidden="true"><span style="width:${(d.score-1)/4*100}%"></span></div></div>`).join('')}</div><div class="profile-summary"><h3>Un punto de partida para reflexionar</h3><p>${summary}</p></div></article><aside class="panel daily-card"><img src="assets/paths.webp" alt="" width="1536" height="1024"><h3>Llévalo a tu vida cotidiana</h3><ul><li>Busca un ejemplo en el que te reconozcas.</li><li>Considera otro en el que el contexto cambió tu respuesta.</li><li>Elige una actividad y observa qué aprendes.</li></ul></aside></div></section>
    <section class="tab-panel" ${tab==='cotidiano'?'':'hidden'}><h2>Observa tu perfil en situaciones reales</h2><div class="grid-2">${scores.map(d=>`<article class="panel"><div class="icon-circle">${icon(d.icon)}</div><h3>${d.name}</h3><p class="muted">${d.daily}</p><p class="small muted">Contrasta esta descripción con tu experiencia. Es una invitación a reflexionar, no una conclusión sobre tu capacidad.</p></article>`).join('')}</div></section>
    <section class="tab-panel" ${tab==='opciones'?'':'hidden'}><h2>${noCareer?'Experiencias para conocerte':'Áreas que puedes investigar'}</h2><p class="lead">${noCareer?'Explora cómo actúas en distintos contextos, sin convertir tus rasgos en una elección de carrera.':'Estas áreas se relacionan de forma orientativa con las actividades de la guía. No representan una compatibilidad calculada ni una recomendación profesional validada.'}</p><div class="grid-3">${noCareer?sorted.slice(0,3).map(d=>`<article class="panel area-card"><span class="dimension-label">${d.name}</span><h3 style="margin-top:12px">Una experiencia para observarte</h3><p>${d.action}</p></article>`).join(''):options.map(o=>`<article class="panel area-card"><span class="dimension-label">Para explorar ${o.dim.toLowerCase()}</span><h3 style="margin-top:12px">${o.name}</h3><p>${o.desc}</p><a class="text-link" href="#recursos/explorar-carrera">Cómo investigar esta opción</a></article>`).join('')}</div></section>
    <section class="tab-panel" ${tab==='pasos'?'':'hidden'}><h2>Actividades que puedes probar</h2><div class="grid-3">${sorted.slice(0,3).map(d=>`<article class="panel activity-card"><div class="icon-circle">${icon(d.icon)}</div><h3>Explora ${d.name.toLowerCase()}</h3><p>${d.action}</p><a class="text-link" href="#recursos/siguiente-paso">Cómo aprender de la experiencia</a></article>`).join('')}</div><div class="panel plan-box section"><h3>Tu siguiente paso</h3><p class="muted">Elige una actividad pequeña y anota qué quieres descubrir con ella.</p><label for="plan">Mi actividad y lo que quiero aprender</label><textarea id="plan" maxlength="2000" placeholder="Esta semana voy a…" ${sample?'readonly':''}>${sample?'Este espacio te permitirá guardar una actividad cuando completes tu propio cuestionario.':esc(store.plans[record.id]||'')}</textarea>${sample?'<p class="small muted">Este es un ejemplo. Completa un cuestionario para guardar tu propio plan.</p><a class="btn" href="#evaluaciones">Explorar guías de reflexión</a>':`<div class="actions"><button class="btn" data-action="save-plan" data-result="${record.id}">Guardar mi siguiente paso</button><span class="small muted">En este dispositivo.</span></div>`}</div></section><div class="note"><strong>Cómo leer este resultado</strong><br>Esta guía propia no cuenta con validación psicométrica. El promedio refleja tus respuestas a sus enunciados y no mide actividad cerebral, inteligencia ni aptitud. <a class="text-link" href="#como-funciona">Ver metodología</a></div></div>`;
  }
  function space() {
    const drafts=Object.entries(store.drafts);
    return `<div class="container page"><p class="eyebrow">Tu recorrido</p><h1>Mi espacio</h1><p class="lead">Retoma un cuestionario o vuelve a lo que descubriste.</p><p class="small muted">Este espacio pertenece a este navegador y dispositivo. No requiere cuenta ni se sincroniza con otros equipos.</p>${warning()}${drafts.length?`<section class="section"><h2>Para continuar</h2><div class="stack">${drafts.map(([id,d])=>{const a=findAssessment(id);return `<article class="panel saved-row"><div class="saved-label"><span class="icon-circle">${icon(a.icon)}</span><div><h3>${a.title}</h3><p>${d.answers.filter(validAnswer).length} de ${a.items.length} respuestas · ${date(d.updated)}</p></div></div><div class="actions"><a class="btn small" href="#cuestionario/${id}">Continuar</a><button class="btn ghost small" data-action="delete-draft" data-id="${id}">Eliminar avance</button></div></article>`}).join('')}</div></section>`:''}
      <section class="section"><h2>Mis resultados</h2>${store.results.length?`<div class="stack">${store.results.map(r=>{const a=findAssessment(r.assessment);return `<article class="panel saved-row"><div class="saved-label"><span class="icon-circle">${icon(a.icon)}</span><div><h3>${a.title}</h3><p>${date(r.created)}${store.plans[r.id]?' · Con un siguiente paso guardado':''}</p></div></div><div class="actions"><a class="btn small" href="#resultado/${r.id}">Ver resultado</a><button class="btn ghost small" data-action="delete-result" data-result="${r.id}">Eliminar</button></div></article>`}).join('')}</div>`:`<div class="panel empty"><div class="icon-circle">${icon('compass')}</div><h3>Tu recorrido empieza con una pregunta</h3><p>Cuando completes un cuestionario, podrás volver aquí para consultar su resultado.</p><a class="btn" href="#evaluaciones">Explorar guías de reflexión</a></div>`}</section></div>`;
  }
  function methodology() { return SITE.methodology(); }
  function resources(id) {
    const r=DATA.resources.find(r=>r.id===id);
    if(r)return `<article class="container page prose"><div class="breadcrumb"><a href="#recursos">Recursos</a><span>/</span>Guía</div><p class="eyebrow">Una idea para tu recorrido</p><h1>${r.title}</h1><p class="lead">${r.intro}</p>${r.paragraphs.map(p=>`<p>${p}</p>`).join('')}<div class="actions" style="margin-top:30px"><a class="btn" href="#mi-espacio">Volver a mi espacio</a><a class="text-link" href="#recursos">Ver otros recursos</a></div></article>`;
    return `<div class="container page"><p class="eyebrow">Para seguir explorando</p><h1>Ideas que puedes llevar a tu vida</h1><p class="lead">Preguntas y experiencias para conocerte, comparar caminos y decidir tu siguiente paso.</p><a class="text-link" href="#evaluaciones">Explorar las guías de reflexión ↗</a><div class="grid-3 section">${DATA.resources.map(r=>`<article class="panel resource-card"><div class="icon-circle">${icon(r.icon)}</div><h3>${r.title}</h3><p>${r.intro}</p><a class="text-link" href="#recursos/${r.id}">Leer la guía</a></article>`).join('')}</div></div>`;
  }
  function privacy() {
    return `<div class="container page prose"><p class="eyebrow">Privacidad y guardado</p><h1>Tu recorrido se guarda en este navegador.</h1><p class="lead">Esta versión no tiene cuentas de usuario ni envía tus respuestas a un servidor.</p><h2>Qué se guarda</h2><p>Si tu navegador lo permite, se guardan las respuestas, el avance, la fecha de cada cuestionario, sus resultados y las notas de tu siguiente paso. No pedimos nombre, correo ni datos de contacto.</p><h2>Quién puede verlo</h2><p>Una persona con acceso a este navegador o a sus datos puede consultar el contenido de Mi espacio. El almacenamiento local no sustituye una cuenta privada protegida. En un dispositivo compartido, elimina tus avances y resultados al terminar.</p><h2>Qué puede perderse</h2><p>Al borrar los datos del sitio, utilizar navegación privada o cambiar de navegador o dispositivo, el recorrido puede no estar disponible. Puedes conservar una copia de un resultado con Imprimir / PDF.</p><h2>Servicios externos</h2><p>La página utiliza archivos e ilustraciones incluidos en el proyecto y no incorpora analítica, publicidad ni fuentes remotas. El proveedor que aloja la página puede registrar solicitudes de acceso conforme a sus propias condiciones; las respuestas de los cuestionarios no se incluyen en esas solicitudes.</p><h2>Eliminar mi recorrido</h2><p>Puedes borrar un avance o resultado desde Mi espacio, o eliminar todo el recorrido guardado en este navegador.</p><button class="btn secondary" data-action="clear-all">Eliminar todo mi recorrido</button><p class="small muted" style="margin-top:20px">Esta eliminación no borra las copias PDF que hayas guardado por separado.</p></div>`;
  }
  function missing() {return '<div class="container page"><div class="panel empty"><h1>No encontramos esta página</h1><p>El resultado puede haber sido eliminado o pertenecer a otro navegador.</p><a class="btn" href="#mi-espacio">Ir a mi espacio</a></div></div>';}
  function render() {
    const parts=location.hash.slice(1).split('/');const route=parts[0]||'inicio';const id=parts[1];const isQuiz=route==='cuestionario'&&findAssessment(id)&&store.drafts[id];
    header(route==='acompanamiento'?'acompanamientos':route==='inicio'&&id==='faq'?'preguntas-frecuentes':route,isQuiz);
    let html;
    switch(route){
      case 'inicio':html=id==='faq'?SITE.faqPage():home();break;
      case 'preguntas-frecuentes':html=SITE.faqPage();break;
      case 'evaluaciones':html=catalog(id);break;
      case 'evaluacion':html=findAssessment(id)?detail(findAssessment(id)):missing();break;
      case 'cuestionario':html=findAssessment(id)?quiz(findAssessment(id),parts[2]==='revisar'):missing();break;
      case 'ejemplo':html=result(example,id,true);break;
      case 'resultado':{const r=store.results.find(r=>r.id===id);html=r?result(r,parts[2]):missing();break;}
      case 'mi-espacio':html=space();break;
      case 'como-funciona':
      case 'metodologia':html=methodology();break;
      case 'proceso':html=SITE.process();break;
      case 'acompanamientos':html=SITE.accompaniment(null,icon);break;
      case 'acompanamiento':html=SITE.accompaniment(id,icon);break;
      case 'sobre':html=SITE.about();break;
      case 'primer-paso':html=SITE.firstStep(icon);break;
      case 'recursos':html=resources(id);break;
      case 'privacidad':html=privacy();break;
      default:html=missing();
    }
    main.innerHTML=html;
    const title=main.querySelector('h1')?.innerText.replace(/\s+/g,' ').trim()||'Inicio';document.title=route==='inicio'&&id!=='faq'?`${SITE.settings.name} · Orientación vocacional y profesional`:`${title} · ${SITE.settings.name}`;
    if(previousRoute!==location.hash){window.scrollTo(0,0);main.focus({preventScroll:true});previousRoute=location.hash;}
  }
  function currentQuiz(){const id=location.hash.slice(1).split('/')[1];return {a:findAssessment(id),d:store.drafts[id]};}
  document.addEventListener('change',event=>{
    if(event.target.matches('input[name="answer"]')){
      const {a,d}=currentQuiz();if(!a||!d)return;
      d.answers[d.index]=Number(event.target.value);d.updated=Date.now();
      if(!persist())notify('No se pudo guardar. Conservaremos el avance mientras esta página siga abierta.');
      const next=document.querySelector('#answer-form button[type="submit"]');if(next)next.disabled=false;
      const progress=document.querySelector('progress');if(progress)progress.value=d.answers.filter(validAnswer).length;
    }
  });
  document.addEventListener('submit',event=>{
    if(event.target.id!=='answer-form')return;event.preventDefault();
    const {a,d}=currentQuiz();if(!a||!d||!validAnswer(d.answers[d.index]))return;
    if(d.index===a.items.length-1){location.hash=`cuestionario/${a.id}/revisar`;return;}
    d.index++;persist();render();main.focus({preventScroll:true});window.scrollTo(0,0);
  });
  document.addEventListener('click',event=>{
    if(event.target.closest('.skip-link')){event.preventDefault();main.focus();main.scrollIntoView();return;}
    const button=event.target.closest('[data-action]');if(!button)return;
    const action=button.dataset.action;const id=button.dataset.id;
    switch(action){
      case 'menu':{const nav=document.getElementById('navigation');const open=nav.classList.toggle('open');button.setAttribute('aria-expanded',String(open));button.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');break;}
      case 'filter':filter=button.dataset.filter;location.hash='evaluaciones';render();break;
      case 'start':start(id);break;
      case 'exit-quiz':{const saved=persist();location.hash='mi-espacio';notify(saved?'Avance guardado en este dispositivo.':'El guardado no está disponible. No cierres la página si quieres continuar.');break;}
      case 'previous':{const d=store.drafts[id];if(d&&d.index>0){d.index--;persist();render();main.focus({preventScroll:true});}break;}
      case 'edit-answer':{const d=store.drafts[id];if(!d)return;d.index=Number(button.dataset.index);persist();location.hash=`cuestionario/${id}`;break;}
      case 'quiz-back':location.hash=`cuestionario/${id}`;break;
      case 'finish':{
        const a=findAssessment(id),d=store.drafts[id];if(!a||!d||!d.answers.every(validAnswer))return;
        const resultId=`r${Date.now().toString(36)}${Math.random().toString(36).slice(2,8)}`;
        store.results.unshift({id:resultId,assessment:id,version:DATA.version,created:Date.now(),answers:[...d.answers]});delete store.drafts[id];
        // Bound the local history while keeping associated plans coherent.
        if(store.results.length>60){const removed=store.results.splice(60);removed.forEach(r=>delete store.plans[r.id]);}
        const saved=persist();location.hash=`resultado/${resultId}`;notify(saved?'Tu resultado está guardado en Mi espacio.':'Tu resultado está disponible ahora, pero no se pudo guardar. Puedes obtener una copia PDF.');break;
      }
      case 'save-plan':{const rid=button.dataset.result;if(!store.results.some(r=>r.id===rid))return;store.plans[rid]=document.getElementById('plan').value.slice(0,2000);notify(persist()?'Tu siguiente paso está guardado.':'No se pudo guardar. Puedes copiar tu nota antes de cerrar la página.');break;}
      case 'print':window.print();break;
      case 'delete-draft':if(confirm('¿Eliminar este avance? Tendrás que responder el cuestionario desde el principio.')){delete store.drafts[id];const saved=persist();render();notify(saved?'Avance eliminado.':'Avance eliminado de esta sesión. No se pudo actualizar el guardado del navegador.');}break;
      case 'delete-result':{const rid=button.dataset.result;if(confirm('¿Eliminar este resultado y su siguiente paso guardado?')){store.results=store.results.filter(r=>r.id!==rid);delete store.plans[rid];const saved=persist();render();notify(saved?'Resultado eliminado.':'Resultado eliminado de esta sesión. No se pudo actualizar el guardado del navegador.');}break;}
      case 'clear-all':if(confirm('¿Eliminar todos los avances, resultados y notas de este navegador?')){store={drafts:{},results:[],plans:{}};try{localStorage.removeItem(KEY);storageAvailable=true;}catch{storageAvailable=false;}location.hash='mi-espacio';notify('Recorrido eliminado de esta sesión.');}break;
    }
  });
  document.addEventListener('keydown',event=>{if(event.key==='Escape'){const nav=document.getElementById('navigation');nav?.classList.remove('open');const b=document.querySelector('.menu-toggle');b?.setAttribute('aria-expanded','false');b?.setAttribute('aria-label','Abrir menú');}});
  window.addEventListener('hashchange',render);
  window.addEventListener('beforeprint',()=>{const text=document.getElementById('plan');if(text){let printed=document.getElementById('print-plan');if(!printed){printed=document.createElement('div');printed.id='print-plan';printed.className='print-plan';text.after(printed);}printed.textContent=text.value;}});
  render();
})();
