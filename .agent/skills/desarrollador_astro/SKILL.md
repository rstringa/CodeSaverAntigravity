---
name: desarrollador_astro
description: Especialista en desarrollo frontend con Astro, experto en JavaScript nativo, CSS puro, arquitectura de islas y optimización de rendimiento.
---

# Desarrollador Experto en Astro (JavaScript & CSS Nativo)

Esta habilidad te convierte en un experto en el framework Astro, enfocado en crear sitios web ultra rápidos y modernos utilizando JavaScript estándar y CSS puro, siguiendo la filosofía de simplicidad y alto rendimiento.

## Contexto
Usa esta habilidad cuando el usuario necesite:
- Crear un nuevo proyecto o componente en Astro usando JavaScript (no TypeScript).
- Diseñar interfaces con CSS nativo, variables CSS y layouts modernos (Flexbox/Grid).
- Optimizar el rendimiento de un sitio web existente (mejorar LCP, CLS, FID).
- Implementar "Component Islands" para hidratación parcial.
- Gestionar contenido mediante "Content Collections".
- Configurar despliegues SSG (Static Site Generation) o SSR (Server-Side Rendering).

## Instrucciones y Mejores Prácticas

### 1. Arquitectura de Islas
- Prioriza el uso de componentes de Astro (`.astro`) para HTML estático.
- Solo usa frameworks de UI cuando sea estrictamente necesaria la interactividad compleja.
- Aplica las directivas de hidratación (`client:*`) de forma estratégica:
  - `client:load`: Para elementos críticos.
  - `client:visible`: Para optimizar carga inicial (Lazy load de islas).

### 2. Gestión de Contenido (JS)
- Utiliza **Content Collections** para datos estructurados.
- Define esquemas con `zod` en `src/content/config.js` (usando archivos `.js`).
- Aprovecha los archivos Markdown o MDX para el contenido.

### 3. Estilos y Diseño (CSS Puro)
- **Evita frameworks utilitarios como Tailwind** a menos que se solicite explícitamente.
- Prefiere el uso de estilos compartimentados (scoped CSS) dentro de la etiqueta `<style>` de cada componente `.astro`.
- Utiliza CSS Variables para el sistema de diseño (colores, espaciados, tipografía).
- Implementa layouts modernos con CSS Grid y Flexbox.

### 4. Assets y Optimización
- Utiliza el componente `<Image />` de `astro:assets` para optimización automática.
- Mantén el JavaScript en el cliente al mínimo absoluto.

### 5. Configuración
- El proyecto debe configurarse para usar archivos `.js` en lugar de `.ts`.
- Usa JSDoc si se requiere documentación de tipos básica sin la complejidad de TypeScript.

## Herramientas Útiles
- **Astro CLI**: `npm create astro@latest` (seleccionando la opción de No TypeScript).
- **Integraciones**: `@astrojs/sitemap`, `@astrojs/mdx`.
- **Navegador**: DevTools para auditar Core Web Vitals.

## Ejemplos

### Creando un Componente de Astro con JS y CSS Nativo
```astro
---
// Component Script (Server-side - JavaScript nativo)
const { title, description, highlight = false } = Astro.props;
---
<article class:list={["card", { highlighted: highlight }]}>
  <h2>{title}</h2>
  <p>{description}</p>
</article>

<style>
  .card {
    padding: 1.5rem;
    border-radius: 12px;
    background: #ffffff;
    border: 1px solid #eaeaea;
    transition: transform 0.2s ease;
  }

  .card:hover {
    transform: translateY(-4px);
  }

  .highlighted {
    border-color: #3b82f6;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
  }

  h2 {
    margin-top: 0;
    color: #1a1a1a;
  }
</style>
```

### Configurando una Colección de Contenido (JavaScript)
```javascript
// src/content/config.js
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    author: z.string(),
    tags: z.array(z.string()),
  }),
});

export const collections = { blog };
```
