<?php

function insert_city_button(Array $options = [])
{
  $city_name = get_current_city(true)['name'];
  $pseudo_city = '';

  $default_options = [];
  $options = array_merge($default_options, $options);

  if (@$options['general'] && !empty($options['general'])) {
    $city_name = $options['general'];
    $pseudo_city = 'data-pseudo-city="general"';
  }

  extract($options, EXTR_OVERWRITE);
  require get_template_directory() . '/template-parts/city-button.php';
}