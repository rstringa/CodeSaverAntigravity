---
name: creador_de_habilidades
description: Una habilidad diseñada para guiar al usuario en la creación de nuevas habilidades para Antigravity en español.
---

# Creador de Habilidades Antigravity

Esta habilidad te permite crear nuevas habilidades de manera estructurada y en español. Sigue los pasos a continuación para generar una nueva habilidad.

## Flujo de Trabajo

### 1. Recopilación de Información
Pregunta al usuario los siguientes detalles sobre la nueva habilidad:
- **Nombre de la habilidad**: (ejemplo: `gestor_de_base_de_datos`)
- **Descripción**: ¿Qué hace esta habilidad?
- **Objetivo principal**: ¿Qué problema resuelve?

### 2. Estructura de la Habilidad
Una vez que tengas la información, crea la estructura de directorios necesaria:
- Directorio: `.agent/skills/<nombre_habilidad>`
- Archivo principal: `.agent/skills/<nombre_habilidad>/SKILL.md`

### 3. Creación del Archivo SKILL.md
Genera el contenido para el archivo `SKILL.md` siguiendo esta plantilla:

```markdown
---
name: <nombre_habilidad>
description: <breve_descripcion_en_espanol>
---

# <Nombre de la Habilidad en Mayúsculas>

Aquí debes detallar las instrucciones específicas para esta habilidad.
Incluye secciones como:
- **Contexto**: ¿Cuándo se debe usar esta habilidad?
- **Instrucciones**: Paso a paso de lo que debe hacer el agente.
- **Herramientas**: ¿Qué herramientas son más útiles para esta tarea?
- **Ejemplos**: Ejemplos de entradas y salidas esperadas.
```

### 4. Opcionales (Scripts y Recursos)
Si la habilidad requiere scripts o recursos adicionales, crea las siguientes carpetas:
- `.agent/skills/<nombre_habilidad>/scripts/`
- `.agent/skills/<nombre_habilidad>/resources/`

## Reglas de Oro
- Mantén las instrucciones claras y concisas.
- Asegúrate de que el frontmatter (name y description) sea preciso.
- Utiliza siempre el idioma español para las descripciones internas si así lo prefiere el usuario.
