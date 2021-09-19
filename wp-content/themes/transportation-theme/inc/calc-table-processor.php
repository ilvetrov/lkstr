<?php

defined('ABSPATH') or die('Cannot access pages directly.');

function getPaths()
{
  $mainPageId = get_option('page_on_front');
  $calcData = get_field('calc-cities', $mainPageId);
  $rawPaths = $calcData['body'];

  $paths = [];
  foreach ($rawPaths as $rawPath) {
    $sendingCity = $rawPath[0]['c'];

    $paths[$sendingCity][] = [
      'recipient_city' => $rawPath[1]['c'],
      'weight_price' => $rawPath[2]['c'],
      'volume_price' => $rawPath[3]['c'],
    ];
  }

  return $paths;
}