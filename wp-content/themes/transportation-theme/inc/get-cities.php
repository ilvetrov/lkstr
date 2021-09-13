<?php

$cached_cities = [];

function get_cities($secure = false)
{
  global $cached_cities;
  if (!empty($cached_cities)) return $cached_cities;
  
  $cities = carbon_get_theme_option('cities');
  foreach ($cities as &$city) {
    if (!$secure) $city['employee_name'] = 'city_' . $city['code_name'] . '_employee';
  }

  $cached_cities = $cities;
  return $cities;
}

function get_cities_names($secure = false)
{
  $cities = get_cities($secure);
  $cities_names = [];
  foreach ($cities as $city) {
    $cities_names[$city['code_name']] = $city['name'];
  }
  return $cities_names;
}