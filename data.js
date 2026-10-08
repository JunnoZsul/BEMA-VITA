/* Original exploratory questionnaires, v1. These are not official BTSA, HBDI,
   Big Five, IPIP or O*NET instruments. Do not label them as validated tests. */
window.CAMINO_DATA = {
  version: 1,
  assessments: [
    {
      id: 'pensamiento', title: 'Estilos de pensamiento', category: 'Autoconocimiento', icon: 'layers',
      intro: 'Explora cómo prefieres analizar, organizar y abordar situaciones.',
      questionIntro: 'Piensa en lo que suele describirte, no en lo que crees que deberías responder.',
      anchors: ['Nada de acuerdo', 'Poco de acuerdo', 'Ni de acuerdo ni en desacuerdo', 'Bastante de acuerdo', 'Muy de acuerdo'],
      delivers: ['Un mapa de tus preferencias', 'Ejemplos para tu vida cotidiana', 'Actividades para explorar'],
      purpose: 'Una primera reflexión sobre distintas formas de abordar las situaciones. Puedes expresar varias preferencias al mismo tiempo.',
      dimensions: [
        { id: 'analisis', name: 'Análisis', icon: 'search', description: 'Comparar opciones, buscar razones y contrastar información.', daily: 'Al tomar una decisión, puedes disfrutar comparando información y preguntándote qué respalda cada alternativa.', action: 'Analiza una decisión cotidiana: escribe tres opciones y los datos que te ayudarían a elegir.', areas: ['Análisis de datos', 'Investigación', 'Finanzas'] },
        { id: 'organizacion', name: 'Organización', icon: 'list', description: 'Dar estructura, cuidar los detalles y avanzar con pasos claros.', daily: 'Puedes sentirte a gusto cuando una tarea tiene pasos, tiempos y responsabilidades bien definidos.', action: 'Organiza un proyecto pequeño. Define sus pasos y observa si planearlo te resulta satisfactorio.', areas: ['Gestión de proyectos', 'Operaciones', 'Administración'] },
        { id: 'exploracion', name: 'Exploración', icon: 'compass', description: 'Imaginar alternativas y probar nuevas maneras de hacer las cosas.', daily: 'Puedes disfrutar cuando hay espacio para imaginar alternativas y experimentar antes de elegir una solución.', action: 'Prueba una manera nueva de resolver una tarea habitual y anota qué aprendiste.', areas: ['Diseño', 'Innovación', 'Comunicación creativa'] },
        { id: 'relaciones', name: 'Relaciones', icon: 'people', description: 'Escuchar perspectivas y considerar a las personas implicadas.', daily: 'Puedes preferir decisiones que consideran cómo se sienten las personas y qué necesitan para colaborar.', action: 'Conversa con alguien sobre una decisión. Escucha su perspectiva antes de proponer una solución.', areas: ['Educación', 'Desarrollo de personas', 'Servicio a la comunidad'] }
      ],
      items: [
        ['analisis','Cuando enfrento un problema, me gusta comparar opciones con datos.'],
        ['organizacion','Antes de empezar una tarea, prefiero tener claros los pasos.'],
        ['exploracion','Disfruto imaginar varias soluciones, incluso si alguna parece poco habitual.'],
        ['relaciones','Antes de decidir, me interesa escuchar a las personas involucradas.'],
        ['analisis','Me gusta revisar qué razones respaldan una afirmación.'],
        ['organizacion','Me resulta satisfactorio ordenar información y cuidar sus detalles.'],
        ['exploracion','Me interesa probar una manera nueva de hacer una tarea conocida.'],
        ['relaciones','Me interesa comprender cómo una decisión afecta a otras personas.'],
        ['analisis','Para elegir entre alternativas, suelo definir criterios de comparación.'],
        ['organizacion','Me siento a gusto trabajando con un plan y revisando mi avance.'],
        ['exploracion','Disfruto conectar ideas de temas diferentes.'],
        ['relaciones','Disfruto ayudar a que un grupo encuentre puntos de acuerdo.']
      ]
    },
    {
      id: 'personalidad', title: 'Personalidad', category: 'Autoconocimiento', icon: 'person',
      intro: 'Reflexiona sobre tus tendencias al actuar y relacionarte.',
      questionIntro: 'Piensa en cómo sueles actuar en distintos momentos de tu vida.',
      anchors: ['Nada de acuerdo', 'Poco de acuerdo', 'Ni de acuerdo ni en desacuerdo', 'Bastante de acuerdo', 'Muy de acuerdo'],
      delivers: ['Cinco aspectos para reflexionar', 'Ejemplos de tus tendencias', 'Preguntas para conocerte mejor'],
      purpose: 'Una guía de reflexión sobre comportamientos que expresas en tus respuestas. No establece un tipo fijo ni realiza diagnósticos.',
      dimensions: [
        { id:'apertura', name:'Curiosidad', icon:'compass', description:'Interés por ideas, experiencias y perspectivas nuevas.', daily:'Observa en qué situaciones buscas novedad y en cuáles prefieres algo familiar.', action:'Explora un tema que no conoces y anota qué despertó tu interés.', areas:[] },
        { id:'constancia', name:'Constancia', icon:'list', description:'Seguimiento de compromisos y organización de tareas.', daily:'Observa qué hábitos y condiciones te ayudan a mantener un compromiso.', action:'Elige un compromiso pequeño para esta semana y define una forma realista de darle seguimiento.', areas:[] },
        { id:'sociabilidad', name:'Sociabilidad', icon:'people', description:'Preferencia expresada por conversar y participar con otras personas.', daily:'Reflexiona sobre cuándo disfrutas la compañía y cuándo valoras tener tiempo a solas.', action:'Después de una actividad social, anota cómo te sentiste y qué tipo de interacción disfrutaste.', areas:[] },
        { id:'cooperacion', name:'Cooperación', icon:'heart', description:'Disposición a escuchar y buscar acuerdos.', daily:'Observa cómo equilibras las necesidades de los demás con tus propios límites.', action:'En una conversación, expresa una necesidad tuya y escucha una de la otra persona.', areas:[] },
        { id:'sensibilidad', name:'Sensibilidad ante la presión', icon:'leaf', description:'Cómo describes tus reacciones ante incertidumbre y contratiempos.', daily:'Piensa qué situaciones te generan tensión y qué recursos cotidianos te ayudan a afrontarlas.', action:'Anota una situación que te generó presión y qué apoyo o pausa te habría ayudado.', areas:[] }
      ],
      items:[
        ['apertura','Me interesa conocer ideas distintas de las mías.'],
        ['constancia','Suelo dar seguimiento a los compromisos que asumo.'],
        ['sociabilidad','Disfruto iniciar conversaciones con otras personas.'],
        ['cooperacion','Busco comprender el punto de vista de los demás cuando no estamos de acuerdo.'],
        ['sensibilidad','La incertidumbre suele hacer que me preocupe.'],
        ['apertura','Disfruto probar actividades que no conozco.'],
        ['constancia','Suelo dejar mis tareas sin terminar aunque tenía intención de completarlas.',true],
        ['sociabilidad','Me gusta participar activamente en conversaciones de grupo.'],
        ['cooperacion','Me interesa encontrar acuerdos que consideren a las personas involucradas.'],
        ['sensibilidad','Después de un contratiempo, me cuesta dejar de pensar en él.'],
        ['apertura','Prefiero evitar temas que cuestionen mis ideas habituales.',true],
        ['constancia','Me resulta útil organizar el tiempo para cumplir mis planes.'],
        ['sociabilidad','Disfruto actividades en las que puedo conocer gente.'],
        ['cooperacion','Cuando alguien necesita ayuda, considero qué puedo ofrecer sin descuidarme.'],
        ['sensibilidad','Suelo mantener la calma ante pequeños imprevistos.',true]
      ]
    },
    {
      id:'intereses', title:'Intereses vocacionales', category:'Orientación vocacional', icon:'compass',
      intro:'Descubre actividades y áreas profesionales que te interesa explorar.',
      questionIntro:'Piensa en cuánto te gustaría realizar la actividad, aunque todavía no tengas experiencia.',
      anchors:['No me gustaría', 'Me gustaría poco', 'No estoy seguro/a', 'Me gustaría', 'Me gustaría mucho'],
      delivers:['Áreas de interés expresadas', 'Opciones para investigar', 'Una actividad para dar el siguiente paso'],
      purpose:'Una exploración inicial de actividades que te atraen. El interés no demuestra habilidad ni determina qué carrera debes elegir.',
      dimensions:[
        {id:'practico',name:'Práctico',icon:'tool',description:'Construir, reparar y trabajar con materiales o herramientas.',daily:'Puedes explorar actividades en las que veas un resultado tangible de tu trabajo.',action:'Prueba un taller de construcción, reparación o trabajo con materiales.',areas:['Ingeniería aplicada','Oficios técnicos','Producción']},
        {id:'investigador',name:'Investigador',icon:'search',description:'Hacer preguntas, investigar y comprender problemas.',daily:'Puedes explorar tareas que permitan observar, contrastar datos y buscar explicaciones.',action:'Investiga una pregunta que te interese y presenta lo que encontraste.',areas:['Ciencias','Análisis de datos','Investigación']},
        {id:'creativo',name:'Creativo',icon:'pen',description:'Crear y expresar ideas mediante distintos medios.',daily:'Puedes explorar entornos con espacio para crear, interpretar y expresar ideas.',action:'Crea una pieza breve: una imagen, un texto, una canción o un diseño.',areas:['Diseño','Artes','Comunicación']},
        {id:'social',name:'Social',icon:'people',description:'Enseñar, acompañar y ayudar a otras personas.',daily:'Puedes explorar actividades de aprendizaje compartido y servicio a otras personas.',action:'Explica a alguien un tema que conoces o participa en una actividad comunitaria.',areas:['Educación','Servicios comunitarios','Desarrollo de personas']},
        {id:'emprendedor',name:'Emprendedor',icon:'flag',description:'Proponer iniciativas, coordinar y comunicar propuestas.',daily:'Puedes explorar situaciones en las que impulses una idea y coordines su desarrollo.',action:'Prepara una propuesta de una página y compártela con alguien para recibir comentarios.',areas:['Negocios','Gestión comercial','Emprendimiento']},
        {id:'organizado',name:'Organizado',icon:'list',description:'Gestionar registros, procesos e información con precisión.',daily:'Puedes explorar tareas que requieren estructura, seguimiento y cuidado de la información.',action:'Organiza un registro o un proceso cotidiano y busca una mejora.',areas:['Administración','Contabilidad','Gestión de procesos']}
      ],
      items:[
        ['practico','Construir o reparar un objeto con herramientas.'],
        ['investigador','Investigar por qué ocurre un fenómeno.'],
        ['creativo','Diseñar una imagen o escribir una historia.'],
        ['social','Ayudar a alguien a comprender un tema.'],
        ['emprendedor','Presentar una propuesta para impulsar un proyecto.'],
        ['organizado','Organizar registros y comprobar que estén completos.'],
        ['practico','Aprender a utilizar equipos para crear un producto.'],
        ['investigador','Analizar información para encontrar patrones.'],
        ['creativo','Crear una pieza artística o una campaña visual.'],
        ['social','Acompañar a personas en una actividad de aprendizaje.'],
        ['emprendedor','Coordinar a un grupo para llevar una idea a la práctica.'],
        ['organizado','Dar seguimiento a gastos, fechas y documentos.'],
        ['practico','Trabajar en un proyecto con materiales y resultados tangibles.'],
        ['investigador','Comparar explicaciones y poner a prueba una hipótesis.'],
        ['creativo','Expresar ideas a través de música, imágenes o palabras.'],
        ['social','Participar en una iniciativa de ayuda a la comunidad.'],
        ['emprendedor','Conversar para negociar y llegar a un acuerdo.'],
        ['organizado','Mejorar un procedimiento para que sea claro y ordenado.']
      ]
    }
  ],
  resources:[
    {id:'leer-perfil',icon:'layers',title:'Cómo leer tu perfil',intro:'Tus respuestas son un punto de partida para reflexionar.',paragraphs:['Cada resultado resume lo que respondiste en un momento concreto. Puede estar influido por tu contexto, tus experiencias y la forma en que interpretaste las preguntas.','Observa varias dimensiones y sus combinaciones. Una puntuación cercana a otra no justifica separar tu perfil en categorías rígidas.','Un promedio alto refleja mayor acuerdo o interés en los enunciados de esa dimensión. Un promedio bajo no demuestra falta de capacidad. Estas guías propias no cuentan con baremos poblacionales ni validación psicométrica.','Contrasta el resultado con ejemplos reales: ¿en qué situaciones te reconoces?, ¿en cuáles no? Conserva tus dudas para una conversación con un orientador.']},
    {id:'explorar-carrera',icon:'compass',title:'Explorar una opción profesional',intro:'Pasa de un nombre de carrera a conocer sus actividades.',paragraphs:['Elige dos o tres áreas que te despierten curiosidad. Investiga qué hacen sus profesionales durante un día habitual y qué formación necesitan.','Habla con una persona de cada área. Pregunta qué disfruta, qué le cuesta y qué desearía haber sabido antes de empezar.','Prueba una actividad pequeña relacionada con cada opción. Puede ser un curso introductorio, un proyecto o una experiencia de observación.','Compara las opciones con tus intereses, tu situación, tus recursos y tus objetivos. Una evaluación ayuda a explorar; la decisión requiere más información.']},
    {id:'siguiente-paso',icon:'leaf',title:'Un siguiente paso que puedas probar',intro:'Elige una experiencia pequeña y aprende de ella.',paragraphs:['Piensa en una actividad que puedas realizar esta semana. Hazla lo suficientemente pequeña para que empezar sea realista.','Antes de hacerla, escribe qué quieres descubrir. Por ejemplo: si disfrutas explicar un tema, organizar un proyecto o investigar un problema.','Después, anota qué disfrutaste, qué te costó y qué condiciones influyeron. Distingue falta de interés de falta de práctica.','Usa lo que aprendiste para elegir tu siguiente experiencia. El autoconocimiento también se construye al actuar.']}
  ]
};
