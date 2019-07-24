<?php
/**
 * Plugin Name: Todolist WP REST API
 * Description: Setup a todolist for the wp rest api
 * Author: Ed Daoust
 * Author URI: https://github.com/Eddaoust
 * Version: 1.0
 */

add_action('init', 'add_todo_post_type');

function add_todo_post_type() {
    $labels = [
        'name' => 'Todos',
        'all_items' => 'Tous les todos',  // affiché dans le sous menu
        'singular_name' => 'Todo',
        'add_new_item' => 'Ajouter un todo',
        'edit_item' => 'Modifier le todo',
        'menu_name' => 'Todos'
    ];

    $args = [
        'labels' => $labels,
        'public' => true,
        'show_in_rest' => true,
        'has_archive' => true,
        'supports' => ['title', 'editor'],
        'menu_position' => 5,
        'menu_icon' => 'dashicons-list-view',
    ];

    register_post_type('todos', $args);
}


