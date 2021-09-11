<?php

function call_form_handler() {
  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    require get_template_directory() . '/handlers/call-form.php';
  }
}
add_action( 'admin_post_nopriv_call_form', 'call_form_handler' );
add_action( 'admin_post_call_form', 'call_form_handler' );