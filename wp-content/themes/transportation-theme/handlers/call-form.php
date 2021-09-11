<?php

$data = $_POST;
if (!empty(@$data['name'])
  && !empty(@$data['phone'])
  && !empty(@$data['token'])
  && CSRF::checkToken($data['token'])
  ) {
  
  $resultSuccess = sendMail($data['name'], $data['phone']);
  $resultSuccess = true;
  
  if ($resultSuccess) {
    wp_redirect('/form-success', '302');
    exit;
  }
}

wp_redirect('/form-fail', '302');
exit;