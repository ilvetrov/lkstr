<?php

defined('ABSPATH') or die('Cannot access pages directly.');

add_filter('use_block_editor_for_post', 'disable_gutenberg_on_settings_page', 5, 2);

function disable_gutenberg_on_settings_page($can, $post) {
  if ($post) {
    if($post->post_name === "site-settings") {
      return false;
    }
  }
  return $can;
}

function hide_settings_page($query) {
  if (!is_admin() && !is_main_query()) {
    return;
  }    
  global $typenow;
  if ($typenow === "page") {
    $settings_page = get_page_by_path("site-settings", NULL, "page")->ID;
    $query->set('post__not_in', array($settings_page));
  }
  return;
}

add_action('pre_get_posts', 'hide_settings_page');

function add_site_settings_to_menu() {
  add_menu_page('Настройки темы', 'Настройки темы', 'manage_options', 'post.php?post=' . get_page_by_path("site-settings", NULL, "page")->ID . '&action=edit', '', 'dashicons-admin-generic', '61.31');
}
add_action( 'admin_menu', 'add_site_settings_to_menu' );

add_filter('parent_file', 'higlight_custom_settings_page');

function higlight_custom_settings_page($file) {
  global $parent_file;
  global $pagenow;
  global $typenow, $self;

  $settings_page = get_page_by_path("site-settings", NULL, "page")->ID;

  if (!empty($_GET["post"])) {
    $post = (int) $_GET["post"];
    if ($pagenow === "post.php" && $post === $settings_page) {
      $file = "post.php?post=$settings_page&action=edit";
    }
  }
  return $file;
}

function edit_site_settings_title() {
  global $post, $title, $action, $current_screen;
  if (isset($current_screen->post_type) && $current_screen->post_type === 'page' && $action == 'edit' && $post->post_name === "site-settings") {
    $title = 'Настройки темы';
    ?>
    <style type="text/css">
      #post-body-content, #minor-publishing-actions, #misc-publishing-actions, #delete-action {
        display: none;
      }
      .wrap .wp-heading-inline+.page-title-action {
        display: none;
      }
      #message a {
        display: none;
      }
    </style>
    <?php
  }
  return $title;  
}

add_action( 'admin_title', 'edit_site_settings_title' );

function prefix_redirect_function() {
  if (is_page(getGlobalSettingsPageId())) {
    global $wp_query;
    $wp_query->set_404();
    status_header(404);
    get_template_part('404');
    exit;
  }
}
add_action( 'template_redirect', 'prefix_redirect_function', 9 );

function getGlobalSettingsPageId()
{
  return get_page_by_path('site-settings')->ID;
}

// Functions for access

function get_global_field($fieldName)
{
  return get_field($fieldName, getGlobalSettingsPageId());
}

function the_global_field($fieldName)
{
  echo get_global_field($fieldName);
}