<?php

$cached_cities = [];

function get_cities()
{
  global $cached_cities;
  if (!empty($cached_cities)) return $cached_cities;
  
  $cities = carbon_get_theme_option('cities');
  foreach ($cities as &$city) {
    $city['employee_name'] = 'city_' . $city['code_name'] . '_employee';
  }

  $cached_cities = $cities;
  return $cities;
}