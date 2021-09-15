<?php
/*
Template Name: Главная страница — контроллер
*/

require 'controller.php';

class MainPageController extends Controller
{
  static public function run()
  {
    $all_employees = get_employees();

    self::load_view('/main-page.php', [
      'all_employees' => $all_employees,
      'show_default_employees' => carbon_get_theme_option('general_employees_is_separated') || !$all_employees[get_current_city()['code_name']],
      'default_employees_city_name' => (carbon_get_theme_option('general_employees_is_shown') && carbon_get_theme_option('general_employees_is_separated')) ? 'general' : get_default_city()['code_name']
    ]);
  }
}
MainPageController::run();
