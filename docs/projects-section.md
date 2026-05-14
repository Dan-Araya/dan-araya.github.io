# Sección de Proyectos — guía de evolución

Estado actual: **un solo proyecto destacado**, en layout horizontal (thumbnail a la izquierda ~38%, contenido a la derecha).

Esta nota explica qué tocar cuando se agreguen más proyectos para que la sección siga viéndose equilibrada.

---

## Decisiones de diseño actuales

- `index.html` — la card vive dentro de `.projects__grid > .project-card.project-card--featured` y tiene un wrapper `.project-card__body` que agrupa título + subtítulo + descripción + tags + link. Ese wrapper es lo que hace funcionar el layout en 2 columnas dentro de la card.
- `styles.css`:
  - `.projects__grid` está en `grid-template-columns: 1fr` (una sola columna a nivel de grid).
  - `.project-card` está en `grid-template-columns: minmax(220px, 38%) 1fr` (thumbnail | body) — esto es lo que da el layout horizontal "featured".
  - El heading dice "Proyecto principal" (singular).

---

## Escenarios

### A) Agregar 1 proyecto más → 2 proyectos en total

**Recomendación:** mantener layout horizontal para ambos, apilados verticalmente. Sigue sintiéndose curado y deja respirar a cada proyecto.

Cambios:
1. `index.html`:
   - Cambiar el heading de `"Proyecto principal"` a `"Proyectos"` o `"Proyectos seleccionados"`.
   - Duplicar el bloque `<article class="project-card project-card--featured animate-in">…</article>` con el contenido del segundo proyecto.
2. `styles.css`: nada que tocar. El `.projects__grid` con `1fr` ya apila verticalmente y el `gap: 24px` los separa.

Riesgo a vigilar: la sección `.section--projects` mide `100vh`. Con dos cards horizontales puede que no quepan sin scroll interno. Si pasa, opciones:
   - Reducir `padding` de `.project-card` (32px → 24px).
   - Reducir `min-height` del thumbnail (220px → 160px).
   - Acortar la descripción.

### B) 3+ proyectos

Una sola card destacada arriba + grid de 2 columnas debajo para los demás.

Cambios:
1. `index.html`:
   - Mantener el primer proyecto con `class="project-card project-card--featured"`.
   - Para los proyectos secundarios usar `class="project-card project-card--compact"` (sin `__body`, layout vertical clásico — thumbnail arriba, contenido abajo).
   - Envolver los secundarios en un `<div class="projects__secondary-grid">` aparte del `.projects__grid` principal.
2. `styles.css`:
   - Restaurar la variante vertical para `.project-card--compact`:
     ```css
     .project-card--compact {
         display: block;       /* anula el grid horizontal */
         padding: 28px;
     }
     .project-card--compact .project-card__thumbnail {
         height: 140px;
         min-height: 0;
         margin-bottom: 20px;
     }
     ```
   - Agregar el grid secundario:
     ```css
     .projects__secondary-grid {
         display: grid;
         grid-template-columns: repeat(2, 1fr);
         gap: 24px;
         margin-top: 32px;
     }
     @media (max-width: 767px) {
         .projects__secondary-grid { grid-template-columns: 1fr; }
     }
     ```
3. La sección casi seguro va a necesitar más espacio vertical. Probablemente toque convertir `.section--projects` a altura `auto` o moverla a un layout con scroll interno. Revisar también `main.js` por si la coreografía de GSAP asume altura fija.

### C) 4+ proyectos

Considerar mover los proyectos secundarios a una página dedicada (`projects.html`) y dejar en home solo el destacado + un link "Ver todos los proyectos →". Mantiene la sensación curada del home.

---

## Checklist al agregar un proyecto nuevo

- [ ] Thumbnail real (no el `background:#C8C4B8` placeholder). Idealmente una imagen o un SVG.
- [ ] Tags coherentes con `.skills__tags` para que el lector vea consistencia con el stack.
- [ ] Link funcional (no `https://github.com/tu-usuario/...` placeholder).
- [ ] Verificar que la sección sigue cabiendo en 100vh sin scroll interno (o ajustar como se indicó arriba).
- [ ] Probar responsive en mobile (`max-width: 767px`) — el media query ya colapsa la card a vertical, confirmar que se ve bien.
