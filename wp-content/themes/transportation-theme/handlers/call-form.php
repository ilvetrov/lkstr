<?php

$data = $_POST;
if (!empty(@$data['name'])
  && !empty(@$data['phone'])
  && !empty(@$data['token'])
  && CSRF::checkToken($data['token'])
  ) {
  $additional = [];
  if (
    !empty(@$data['additional'])
    && is_json(stripslashes($data['additional']))
  ) {
    $additional = json_decode(stripslashes($data['additional']), true);
    if (!empty(@$additional['calc_data'])) {
      $additional['calc_data']['is_empty'] = !(
        !empty(@$additional['calc_data']['sending_city'])
        || !empty(@$additional['calc_data']['recipient_city'])
        || !empty(@$additional['calc_data']['volume'])
        || !empty(@$additional['calc_data']['weight'])
      );
      $additional['calc_data']['all_data_is_filled'] = (
        !empty(@$additional['calc_data']['sending_city'])
        && !empty(@$additional['calc_data']['recipient_city'])
        && !empty(@$additional['calc_data']['volume'])
        && !empty(@$additional['calc_data']['weight'])
      );
    }
    
  }
  
  $resultSuccess = sendMail($data['name'], $data['phone'], $additional);

  wp_redirect('/form-success', '302');
  exit;
}

wp_redirect('/form-fail', '302');
exit;