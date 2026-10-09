/* Rutas públicas con HTML propio. Las guías conservan sus recorridos interactivos. */
window.BEMA_ROUTING = (() => {
  const pages=[
    ['index.html','inicio','Bema Vita · Autoconocimiento aplicado a decisiones','Conócete. Elige con claridad. Avanza con intención. Evaluación Benziger e interpretación profesional para tus estudios, trabajo, proyectos y decisiones.'],
    ['como-funciona.html','proceso','Cómo funciona · Bema Vita','Conocerte, comprenderte, explorar y avanzar. Descubre cómo relacionamos la evaluación Benziger con tu historia y tus decisiones.'],
    ['para-tu-momento.html','acompanamientos','Autoconocimiento para tu momento · Bema Vita','Comprenderte mejor, elegir estudios, desarrollarte o explorar un cambio. Conoce distintas aplicaciones del autoconocimiento.'],
    ['autoconocimiento.html','acompanamiento/autoconocimiento','Quiero entenderme mejor · Bema Vita','Explora tus preferencias de pensamiento y tus experiencias con evaluación Benziger e interpretación profesional.'],
    ['elegir-carrera.html','acompanamiento/elegir-carrera','Elegir estudios y carrera · Bema Vita','Comprende tus preferencias y compara opciones académicas con tus intereses, habilidades, circunstancias y experiencias.'],
    ['desarrollar-tu-trayectoria.html','acompanamiento/desarrollo','Desarrollar tus capacidades y trayectoria · Bema Vita','Explora formas de aprender, ambientes de trabajo, habilidades y posibilidades dentro de tu profesión o tus proyectos.'],
    ['reorientacion-profesional.html','acompanamiento/reorientacion','Explorar un cambio de dirección · Bema Vita','Revisa lo que quieres conservar, cambiar o explorar en tu trabajo y proyectos, con autoconocimiento e interpretación profesional.'],
    ['mapa-personal.html','mapa-personal','Tu mapa personal · Bema Vita','Integra preferencias, experiencias y preguntas en un mapa personal. Conoce un ejemplo ficticio de cómo convertir patrones en acciones.'],
    ['metodologia.html','metodologia','Benziger y nuestra metodología · Bema Vita','Evaluación Benziger por profesionales certificados, interpretación en tu contexto y una explicación clara del alcance de las herramientas.'],
    ['sobre-bema-vita.html','sobre','Sobre Bema Vita · Acompañamiento humano','Conocernos sirve para tomar mejores decisiones. Conoce el propósito de Bema Vita y su enfoque de autoconocimiento con acompañamiento.'],
    ['modalidades.html','primer-paso','Modalidades y precios · Bema Vita','Evaluación Benziger con retroalimentación por correo por $2,500 MXN o con conversación personal por $3,500 MXN. Conoce qué incluye cada modalidad.'],
    ['por-correo.html','primer-paso/correo','Evaluación con retroalimentación por correo · Bema Vita','Evaluación Benziger e interpretación personalizada por correo por $2,500 MXN. Revisa el alcance y los pasos del proceso.'],
    ['conversacion-personal.html','primer-paso/conversacion','Evaluación con conversación personal · Bema Vita','Evaluación Benziger, retroalimentación y conversación personal con un profesional por $3,500 MXN. Conoce el proceso.'],
    ['preguntas-frecuentes.html','preguntas-frecuentes','Preguntas frecuentes · Bema Vita','Resuelve tus dudas sobre Benziger, el mapa personal, las modalidades, los precios y el acompañamiento profesional.'],
    ['contacto.html','contacto','Contacto · Bema Vita','Conoce cómo preparar tu pregunta sobre el proceso, la evaluación Benziger y las modalidades de acompañamiento.'],
    ['recursos.html','recursos','Recursos de autoconocimiento · Bema Vita','Lecturas prácticas y guías gratuitas para reflexionar. Los ejercicios demostrativos son distintos de la evaluación Benziger contratada.'],
    ['guias.html','evaluaciones','Guías gratuitas de reflexión · Bema Vita','Ejercicios originales y demostrativos para reflexionar sobre tus respuestas. No son la evaluación Benziger ni incluyen revisión profesional.'],
    ['mi-espacio.html','mi-espacio','Mis guías guardadas · Bema Vita','Retoma las guías gratuitas guardadas en tu navegador. Este espacio no muestra pagos ni el estado de evaluaciones contratadas.'],
    ['privacidad.html','privacidad','Privacidad y guardado · Bema Vita','Conoce la diferencia entre el guardado local de las guías gratuitas y la atención del servicio de evaluación Benziger.'],
    ['leer-perfil.html','recursos/leer-perfil','Cómo leer los resultados de una guía · Bema Vita','Aprende a leer los promedios de las guías demostrativas y a contrastar tus respuestas con experiencias reales.'],
    ['guia-pensamiento.html','evaluacion/pensamiento','Guía gratuita de preferencias de pensamiento · Bema Vita','Ejercicio original y demostrativo para reflexionar. No es la evaluación Benziger ni una medición del cerebro.'],
    ['guia-personalidad.html','evaluacion/personalidad','Guía gratuita de personalidad · Bema Vita','Ejercicio original y demostrativo para observar tus respuestas en distintos contextos. Sin validación psicométrica.'],
    ['guia-intereses.html','evaluacion/intereses','Guía gratuita de intereses · Bema Vita','Ejercicio demostrativo para explorar actividades que te interesan. No determina una carrera ni sustituye la evaluación formal.'],
    ['investigar-opciones.html','recursos/explorar-carrera','Cómo investigar opciones de carrera · Bema Vita','Preguntas prácticas para comparar estudios y profesiones con sus actividades, ambientes y experiencias reales.'],
    ['preparar-siguiente-paso.html','recursos/siguiente-paso','Preparar tu siguiente paso · Bema Vita','Convierte una pregunta de autoconocimiento en una experiencia pequeña que puedas probar y revisar.']
  ].map(([file,route,title,description])=>({file,route,title,description,path:file==='index.html'?'/':'/'+file}));
  const aliases={'como-funciona':'metodologia','inicio/faq':'preguntas-frecuentes'};
  function page(route){return pages.find(p=>p.route===(aliases[route]||route));}
  function links(html){return html.replace(/href="#([^"\s]+)"/g,(all,route)=>{const p=page(route);return p?`href="${p.path}"`:all;}).replace(/src="assets\//g,'src="/assets/');}
  return {pages,page,links,origin:'https://bemavita.vercel.app',searchConsoleVerification:''};
})();
