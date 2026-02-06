---
name: experto_css
description: Especialista en diseño web moderno, arquitecturas CSS (BEM), animaciones avanzadas y optimización de UI/UX.
---

# Experto en CSS

Esta habilidad dota al agente de conocimientos profundos y técnicas avanzadas para la creación de interfaces web visualmente impactantes y técnicamente robustas.

## Contexto
Usa esta habilidad cuando necesites:
- Crear hojas de estilo desde cero para nuevos proyectos.
- Refactorizar CSS existente para mejorar la mantenibilidad y el rendimiento.
- Implementar diseños complejos (Grid, Flexbox, Layouts responsivos).
- Añadir micro-interacciones y animaciones fluidas (CSS Transitions, Keyframe Animations).
- Asegurar que el diseño sea "Premium" y "State of the Art" siguiendo las directrices de estética visual.

## Instrucciones

### 1. Análisis del Diseño
- Identifica la paleta de colores, tipografía y espaciado antes de escribir código.
- Define variables CSS (Custom Properties) para mantener la consistencia.

### 2. Arquitectura CSS
- Utiliza metodologías como **BEM** (Block Element Modifier) para evitar especificidad excesiva.
- Separa los estilos por módulos o componentes.
- Prioriza el uso de CSS moderno sobre hacks antiguos.

### 3. Estética Premium
- **Gradientes**: Evita colores planos aburridos; usa degradados sutiles y modernos.
- **Sombras**: Implementa sombras suaves (soft shadows) que den profundidad.
- **Bordes**: Usa `border-radius` equilibrados y bordes sutiles de 1px.
- **Glassmorphism**: Considera el uso de `backdrop-filter: blur()` cuando el diseño lo requiera.

### 4. Responsividad
- Usa un enfoque "Mobile-first".
- Emplea unidades relativas como `rem`, `em`, `vh`, `vw` y funciones como `clamp()`, `min()`, `max()`.

## Herramientas Recomendadas
- `view_file` para analizar archivos de estilo existentes.
- `write_to_file` para crear nuevos archivos `.css`.
- `generate_image` para inspirar nuevos estilos o crear assets visuales.

## Ejemplos de Implementación

### Botón Premium
```css
.btn-primary {
  padding: 12px 24px;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(167, 119, 227, 0.4);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(167, 119, 227, 0.6);
}
```
