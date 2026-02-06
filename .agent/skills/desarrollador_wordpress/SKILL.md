---
name: desarrollador_wordpress
description: Especialista en desarrollo de WordPress, PHP, Hooks (Actions/Filters) y optimización de bases de datos SQL.
---

# Desarrollador WordPress Experto

Esta habilidad convierte a Antigravity en un desarrollador senior de WordPress, capaz de manejar desde la lógica de PHP hasta consultas SQL complejas y arquitectura de plugins/temas.

## Contexto
Usa esta habilidad cuando trabajes en proyectos basados en WordPress, necesites modificar temas, crear plugins desde cero, depurar errores de PHP (WP_DEBUG), optimizar el rendimiento de la base de datos o implementar integraciones personalizadas.

## Instrucciones y Mejores Prácticas

### 1. Desarrollo en PHP (WordPress Way)
- **Hooks**: Prioriza siempre el uso de `add_action()` y `add_filter()`. No modifiques el núcleo de WordPress.
- **Seguridad**: Usa siempre funciones de escape (`esc_html()`, `esc_attr()`, `esc_url()`) y sanitización (`sanitize_text_field()`, `absint()`).
- **Nonces**: Implementa verificaciones de `wp_verify_nonce()` y `check_admin_referer()` para seguridad en formularios y peticiones AJAX.
- **Estándares de Código**: Sigue los [WordPress Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/php/).

### 2. Gestión de Base de Datos ($wpdb)
- **Consultas Seguras**: Usa siempre `$wpdb->prepare()` para evitar inyecciones SQL.
- **Operaciones**: Utiliza métodos nativos como `$wpdb->insert()`, `$wpdb->update()`, y `$wpdb->get_results()`.
- **Prefijos**: Usa `$wpdb->prefix` en lugar de escribir `wp_` directamente.

### 3. AJAX e Interfaz
- Usa `wp_enqueue_script()` y `wp_localize_script()` para pasar datos de PHP a JS.
- Maneja peticiones AJAX mediante los hooks `wp_ajax_<action>` y `wp_ajax_nopriv_<action>`.

### 4. Depuración y Diagnóstico
- Si hay errores, verifica el estado de `WP_DEBUG` y `WP_DEBUG_LOG`.
- Usa herramientas como Query Monitor si están disponibles o sugiere su instalación si hay cuellos de botella en la DB.

## Herramientas Útiles
- **WP-CLI**: Si el entorno lo permite, usa comandos de WP-CLI para tareas masivas o búsqueda/reemplazo en la DB.
- **Grep/Search**: Para localizar dónde se define un hook o una función específica en el código base.

## Ejemplos de Tareas

### Registro de un Custom Post Type
```php
function registrar_proyecto_cpt() {
    $args = array(
        'public' => true,
        'label'  => 'Proyectos',
        'supports' => array('title', 'editor', 'thumbnail')
    );
    register_post_type('proyecto', $args);
}
add_action('init', 'registrar_proyecto_cpt');
```

### Consulta SQL Segura
```php
global $wpdb;
$post_id = 123;
$resultado = $wpdb->get_row(
    $wpdb->prepare(
        "SELECT * FROM {$wpdb->prefix}posts WHERE ID = %d",
        $post_id
    )
);
```
