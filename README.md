# Bema Vita

Autoconocimiento aplicado a decisiones. Sitio publicado en https://bemavita.vercel.app/ desde el repositorio JunnoZsul/BEMA-VITA, conectado a Vercel.

## Enfoque

Conócete. Elige con claridad. Avanza con intención. La evaluación Benziger, aplicada e interpretada por profesionales certificados según la información del responsable del proyecto, se relaciona con experiencias y contexto. Elegir carrera es una aplicación; también se presentan autoconocimiento, desarrollo y reorientación.

El mapa personal integra resultados y la información adicional que aporte la persona. Intereses, valores y circunstancias no se atribuyen todos al examen. El ejemplo de Alex es ficticio, ilustrativo y no reproduce un reporte oficial.

## Modalidades

- Por correo: $2,500 MXN, con evaluación Benziger, revisión profesional y retroalimentación personalizada escrita.
- Con conversación personal: $3,500 MXN, con evaluación, retroalimentación y conversación con un profesional.

No se han inventado plazos, duración de sesiones, perfiles profesionales, testimonios ni condiciones de nuevas evaluaciones. Se confirman antes de activar la contratación.

## Páginas y generación

Las páginas públicas tienen archivos HTML propios, navegación normal, contenido inicial completo, título, descripción, canonical, Open Graph y Twitter Card. `sitemap.xml` incluye las páginas públicas y `robots.txt` indica su ubicación. Mis guías guardadas se marca como noindex. Los enlaces con fragmentos de versiones anteriores siguen funcionando con JavaScript.

Los archivos HTML generados se incluyen en el repositorio: Vercel puede servirlos directamente, sin servidor de aplicaciones. El generador se ejecuta antes de subir cambios de contenido. No hay que cambiar la configuración actual de alojamiento.

```sh
npm run check
npm run generate
npm start
```

`content.js` contiene textos, equipo, contacto y configuración de las modalidades. `routes.js` define rutas, títulos, descripciones, origen y el campo opcional de verificación de Search Console. `build-pages.cjs` genera el HTML usando las mismas funciones de presentación que utiliza `app.js`. El generador solo procesa archivos propios, con un DOM mínimo y sin acceso a servicios externos.

Para modificar textos: editar fuentes, ejecutar check y generate, y subir fuentes y todos los HTML resultantes juntos. No editar solamente el HTML generado. El dominio canónico actual es bemavita.vercel.app; actualizar `routes.js` y regenerar al cambiarlo.

## Evaluación formal y guías gratuitas

La evaluación Benziger se aplica fuera de los ejercicios de esta web, siguiendo las instrucciones del equipo. Las tres guías gratuitas son originales, demostrativas y sin validación psicométrica. No son BTSA ni instrumentos oficiales. No envían respuestas al equipo. Sus recorridos, puntuaciones y guardado local se conservan.

Respuestas y notas de guías gratuitas se guardan en localStorage con la clave `tu-camino-v1`, hasta 60 resultados, si el navegador lo permite. No hay cuenta ni sincronización. Mis guías guardadas no es un panel de seguimiento del servicio contratado.

## Activar contacto y pagos

Completar `settings` en content.js con nombres, biografías, fotografías reales y denominación exacta de las certificaciones. Completar el contacto HTTPS autorizado.

En `settings.evaluation`: configurar supportEmail, los enlaces checkoutUrl propios de cada modalidad y ready=true solo cuando el proceso esté operativo. El botón de cada modalidad requiere precio positivo, correo válido y URL HTTPS sin credenciales. Tener un enlace para una modalidad no habilita la otra.

Antes de activar: definir plazos, formato y duración de conversación, entregables, condiciones, política de cambios/cancelación y aviso de privacidad del servicio con datos reales. Cualquier evaluación adicional se aclara antes de continuar.

El sitio no confirma pagos, no registra pedidos ni envía correos automáticamente. El equipo debe confirmar la transacción con el proveedor y gestionar la evaluación y retroalimentación. Un retorno al sitio nunca confirma el pago. Una futura automatización requiere verificación en servidor; no incluir claves privadas en el código público.

## SEO, analítica y pendientes

Search Console: añadir el valor de verificación real en routes.js, regenerar, verificar la propiedad y enviar https://bemavita.vercel.app/sitemap.xml. No se presume indexación ni verificación de propiedad.

Analytics no está conectado: falta la propiedad elegida y definir el tratamiento de privacidad. La medición futura debe limitarse a navegación y contratación; no enviar respuestas, resultados o textos personales de evaluaciones. No se incorporó seguimiento ficticio.

Faltan perfiles reales del equipo, contacto, condiciones y conexión de cobro. El sitio presenta el servicio y los precios, pero los pagos permanecen deshabilitados.
