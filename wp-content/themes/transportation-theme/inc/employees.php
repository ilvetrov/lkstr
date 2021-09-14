<?php

function get_employees()
{
  $cities = get_cities();

  $cities_employees_is_shown = carbon_get_theme_option('cities_employees_is_shown');
  $general_employees_is_shown = carbon_get_theme_option('general_employees_is_shown');
  if ($general_employees_is_shown) {
    $general_employees_is_separated = carbon_get_theme_option('general_employees_is_separated');
    if (!$general_employees_is_separated) {
      $general_employees_order = carbon_get_theme_option('general_employees_order');
    }
  }

  $employees = [];
  if ($cities_employees_is_shown) {
    foreach ($cities as $city) {
      $employees[$city['code_name']] = get_posts([
        'post_type' => $city['employee_name'],
        'numberposts' => -1,
        'order' => 'ASC'
      ]);
    }
  }

  if ($general_employees_is_shown) {
    $general_employees = get_posts([
      'post_type' => 'employee',
      'numberposts' => -1,
      'order' => 'ASC'
    ]);
    if ($cities_employees_is_shown) {
      if ($general_employees_is_separated) {
        $employees = array_merge([
          'general' => $general_employees
        ], $employees);
      } else {
        foreach ($employees as &$employees_of_city) {
          switch ($general_employees_order) {
            case 'end':
              array_push($employees_of_city, ...$general_employees);
              break;
    
            case 'random':
              array_push($employees_of_city, ...$general_employees);
              shuffle($employees_of_city);
              break;
            
            // 'start'
            default:
              array_unshift($employees_of_city, ...$general_employees);
              break;
          }
        }
      }
    } else {
      $employees['general'] = $general_employees;
    }
    
  }

  return $employees;
}

function get_employees_cities()
{
  $employees_cities = [];
  if (carbon_get_theme_option('general_employees_is_shown') && carbon_get_theme_option('general_employees_is_separated')) {
    $employees_cities[] = [
      'code_name' => 'general',
      'name' => carbon_get_theme_option('general_employees_separated_text')
    ];
  }
  foreach (get_cities() as $city) {
    if (!!get_posts([
      'post_type' => $city['employee_name'],
      'numberposts' => 1,
      'order' => 'ASC'
    ])) {
      $employees_cities[] = [
        'code_name' => $city['code_name'],
        'name' => $city['name'],
      ];
    }
  }
  return $employees_cities;
}