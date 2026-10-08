# Bema Vita

Página en español de orientación, autoconocimiento y desarrollo vocacional y profesional. Marca elegida: Bema Vita. Colores: azul marino, naranja oscuro y blanco cálido; ilustraciones originales en acuarela.

## Qué incluye

- Inicio centrado en claridad, autonomía y construcción de una trayectoria.
- Tres acompañamientos: elegir carrera, desarrollo universitario/profesional y reorientación.
- Proceso en cuatro etapas: conocerte, interpretar, explorar, probar y decidir.
- Metodología, propósito del proyecto, preguntas frecuentes y primer paso.
- Catálogo de guías de reflexión con filtros y explicación de cada ejercicio.
- Tres cuestionarios originales: preferencias de pensamiento (12 preguntas), personalidad (15) e intereses vocacionales (18).
- Una pregunta por pantalla, guardado de avance, revisión y edición antes de finalizar.
- Resultados por dimensiones, ejemplos cotidianos, actividades y un siguiente paso personal.
- Mi espacio, recursos, metodología y explicación de privacidad.
- Diseño adaptable a celular y computadora, navegación por teclado y opción de imprimir o guardar resultados como PDF desde el navegador.

## Estado de los cuestionarios

Las preguntas son demostrativas, originales y **no tienen validación psicométrica**. No son BTSA, HBDI, IPIP ni un instrumento oficial de otra marca. No miden actividad cerebral, inteligencia ni aptitud y no calculan compatibilidad profesional validada. Sus resultados son promedios de respuestas para invitar a la reflexión.

Antes de ofrecer pruebas formales se debe elegir el instrumento, verificar licencias, definir su aplicación e interpretación y sustituir el contenido y la puntuación con sus requisitos. El diseño actual permite revisar el recorrido mientras se toman esas decisiones.

## Probar localmente

Con Node.js instalado, abre una terminal en esta carpeta y ejecuta:

```sh
npm start
```

Visita http://127.0.0.1:4173. No requiere instalar dependencias. `npm run check` revisa la sintaxis JavaScript.

También puedes abrir `index.html` directamente para revisar el diseño; para probar el guardado utiliza el servidor local o el sitio publicado.

## Subir a GitHub y publicar con GitHub Pages

1. Crea o elige tu repositorio de GitHub.
2. Sube **el contenido de esta carpeta** a la raíz del repositorio. `index.html`, `styles.css`, `data.js`, `content.js`, `app.js` y `assets/` deben quedar juntos. No subas solamente el ZIP.
3. En el repositorio abre **Settings → Pages**.
4. Elige **Deploy from a branch**, la rama donde subiste los archivos (por ejemplo `main`) y **/(root)**. Guarda.
5. GitHub mostrará la dirección de la página cuando termine de publicarla.

Referencia oficial: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

El sitio usa rutas con `#` y archivos relativos para funcionar también en una dirección de proyecto como `usuario.github.io/repositorio/`. No necesita compilación, servidor de aplicaciones ni claves.

## Verificación de esta entrega

Se probaron los tres cuestionarios completos, revisión y edición, cálculo de promedios e ítems inversos, pausa y reanudación tras recargar, notas guardadas, eliminación y ejemplo ficticio. También se comprobaron la impresión, el guardado bloqueado, navegación por teclado, menú móvil y cinco tamaños de pantalla entre 320 y 1920 píxeles. Las páginas nuevas se comprobaron en seis tamaños, incluidos 320, 390, 768, 1024, 1440 y 1920 píxeles; también sus enlaces, las cuatro etapas, las preguntas frecuentes y la configuración del perfil y contacto. La comprobación de sintaxis JavaScript pasó.

## Archivos

| Archivo | Función |
|---|---|
| `index.html` | Documento principal y metadatos |
| `styles.css` | Paleta, estilos, versión móvil e impresión |
| `content.js` | Narrativa, acompañamientos, preguntas frecuentes y configuración del orientador/contacto |
| `data.js` | Cuestionarios, dimensiones, recomendaciones y recursos |
| `app.js` | Navegación, cuestionarios, resultados y guardado |
| `assets/` | Ilustraciones y símbolo provisional |
| `scripts/serve.cjs` | Servidor opcional para revisión local |

## Guardado y privacidad

Las respuestas, avances, resultados y notas se guardan en `localStorage` de este navegador, con la clave `tu-camino-v1`. No hay cuenta ni sincronización entre dispositivos. El guardado puede fallar si el navegador lo bloquea. El historial conserva hasta 60 resultados; al superar ese límite se descarta el más antiguo y su nota. Borrar datos del navegador elimina el recorrido.

El sitio no integra analítica, cookies de seguimiento, pagos ni envío de respuestas a un servidor. El proveedor de alojamiento puede registrar solicitudes de acceso. La opción para eliminar el recorrido está en Privacidad y guardado.

## Próximas decisiones del proyecto

Antes del lanzamiento: completar el perfil real del orientador (nombre, biografía, formación y certificaciones verificadas), el canal de contacto, modalidad y condiciones del servicio.

Edita `settings` al inicio de `content.js`. El contacto solo se activa con una URL HTTPS real; mientras esté vacío, la página explica que está pendiente y dirige a recursos, sin simular reservas ni enviar solicitudes. El perfil tampoco inventa credenciales o un retrato.

Definir el instrumento formal, condiciones de uso e interpretación; las guías actuales siguen siendo demostrativas. No hay cobros, cuentas, agenda ni envío de solicitudes.

Repositorio de destino: `BEMA-VITA`. El dominio todavía no se ha registrado.
