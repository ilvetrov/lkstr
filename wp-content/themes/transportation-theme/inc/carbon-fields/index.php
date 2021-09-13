<?php

add_action( 'after_setup_theme', 'crb_load' );
function crb_load() {
  require_once(ABSPATH . 'vendor/autoload.php');
  \Carbon_Fields\Carbon_Fields::boot();
}

require_once 'cities.php';
require_once 'employee-options.php';