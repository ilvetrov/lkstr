<?php

define('CITY_COOKIE_CODE_NAME', 'selected_city');

$cached_cities = [];
$cached_secure_cities = [];
$cached_cities_names = [];

function get_cities($secure = false)
{
  global $cached_cities, $cached_secure_cities;
  if ($secure) {
    if (!empty($cached_secure_cities)) return $cached_secure_cities;
  } else {
    if (!empty($cached_cities)) return $cached_cities;
  }
  
  $cities = carbon_get_theme_option('cities');
  foreach ($cities as &$city) {
    if (!$secure) $city['employee_name'] = 'city_' . $city['code_name'] . '_employee';
  }

  if ($secure) {
    $cached_secure_cities = $cities;
  } else {
    $cached_cities = $cities;
  }
  return $cities;
}

function get_coded_cities($secure = false)
{
  $cities = [];
  foreach (get_cities($secure) as $city) {
    $cities[$city['code_name']] = $city;
  }
  return $cities;
}

function get_cities_names()
{
  global $cached_cities_names;
  if (!empty($cached_cities_names)) return $cached_cities_names;
  
  $cities = get_cities();
  $cities_names = [];
  foreach ($cities as $city) {
    $cities_names[$city['code_name']] = $city['name'];
  }

  $cached_cities_names = $cities_names;
  return $cities_names;
}

function get_city_value($name, Array $city, Bool $secure = false)
{
  if (!$name || empty($name)) return null;
  return (!empty($city[$name])) ? $city[$name] : get_default_city_value($name, $secure);
}

function get_cities_dependent_values(String $name, Array $properties, Bool $secure = false)
{
  $values_in_cities = [];
  foreach (get_cities($secure) as $city) {
    $values = [];
    foreach ($properties as $property_name => $property_data) {
      $property_handler = is_array($property_data) ? $property_data['handler'] : $property_data;
      $is_special = preg_match('/^(.+?)--/', $property_name, $specials);
      $special = $is_special ? $specials[1] : '';
      switch ($special) {
        case 'remove-empty':
          $value = $city[@$property_data['dependent_on']] ? $city[$name] : get_city_value($name, $city, $secure);
          break;
        
        default:
          $value = get_city_value($name, $city, $secure);
          break;
      }
      $values[$property_name] = $property_handler($value);
    }
    $values_in_cities[$city['code_name']] = $values;
  }
  return $values_in_cities;
}

function insert_cities_dependent_values(String $name, Array $properties, Bool $secure = false)
{
  echo 'data-cities-values="' . esc_html(json_encode(get_cities_dependent_values($name, $properties, $secure))) . '"';
}

function get_current_city($secure = false)
{
  if (@$GLOBALS['current_city']) return $GLOBALS['current_city'];

  $current_city = get_coded_cities($secure)[$_COOKIE[CITY_COOKIE_CODE_NAME]] ?? get_default_city($secure);
  $GLOBALS['current_city'] = $current_city;
  return $current_city;
}

function get_current_city_value($name, $secure = false)
{
  return get_city_value($name, get_current_city($secure), $secure);
}

function set_current_city($code_name)
{
  $city = get_coded_cities($code_name);
  if ($city) {
    $GLOBALS['current_city'] = $city;
  }
  return !!$city;
}

function get_default_city($secure = false)
{
  $default_city_code_name = carbon_get_theme_option('default_city');

  return get_coded_cities($secure)[$default_city_code_name] ?? get_cities()[0];
}

function get_default_city_value($name, $secure = false)
{
  return get_default_city($secure)[$name];
}

function trim_city_name(String $city_name)
{
  if (strlen($city_name) <= 15) return $city_name;
  $trimmed_name = mb_substr($city_name, 0, 12);
  return "$trimmed_name...";
}

function show_block_of_city(Array $city, String $name)
{
  if (get_current_city()['code_name'] === $city['code_name'] && !!get_current_city()[$name]) {
    return true;
  } else if (get_default_city()['code_name'] === $city['code_name'] && !get_current_city()[$name]) {
    return true;
  }
  return false;
}