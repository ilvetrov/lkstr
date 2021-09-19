<?php

use Carbon_Fields\Container;
use Carbon_Fields\Field;

add_action('carbon_fields_register_fields', 'crb_attach_employee_options');
function crb_attach_employee_options()
{
  $employee_options_container = Container::make('post_meta', 'Данные сотрудника')
  ->where('post_type', '=', 'employee');

  $cities = get_cities();
  foreach ($cities as $city) {
    $employee_options_container->or_where('post_type', '=', $city['employee_name']);
  }

  $employee_options_container
  ->add_fields([
    Field::make('text', 'crb_position', 'Должность')
      ->set_required()
      ->set_help_text('Например: менеджер, аналитик и т.д.'),
    Field::make('text', 'crb_phone', 'Телефон')
      ->set_help_text('Старайтесь поддерживать единый вид номеров на всём сайте.'),
    Field::make('text', 'crb_email', 'Email')
      ->set_help_text('В формате name@example.com'),
  ]);
}