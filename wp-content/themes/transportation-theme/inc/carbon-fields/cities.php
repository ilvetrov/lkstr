<?php

use Carbon_Fields\Container;
use Carbon_Fields\Field;

add_action('carbon_fields_register_fields', 'crb_attach_cities_options');
function crb_attach_cities_options()
{
  $main_options_container = Container::make('theme_options', 'Настройки темы')
  ->set_icon('dashicons-admin-site')
  ->set_page_menu_position(21)
  ->add_tab('Города', [
    Field::make('complex', 'cities', 'Города')
    ->setup_labels([
      'plural_name' => 'города',
      'singular_name' => 'город'
    ])
    ->add_fields([
      Field::make('text', 'name', 'Название')
        ->set_help_text('Когда пользователь выбирает город, он видит это название.'),
      Field::make('text', 'code_name', 'Техническое название')
        ->set_help_text('Три-четыре буквы, обозначающие город на латинице. Маленькими буквами без спец. знаков. Например: Москва - mscv, Санкт-Петербург - snpt, Иркутск - irkt, Новосибирск - nvsb и т.д. Связывает город, сотрудников и код. Нигде не выводится. Укажите один раз и <strong>не меняйте</strong>. Если для города появились сотрудники, значит название указано верно.')
        ->set_required(),
      Field::make('text', 'phone_number', 'Номер телефона')
        ->set_help_text('Выводится, например, в верхнем меню. Можно писать в любом виде, с любыми символами, скобками и тире — номер всё также будет открываться по нажатию.'),
      Field::make('text', 'address', 'Адрес')
        ->set_help_text('Например: г. Москва, Варшавское шоссе, 20'),
      Field::make('text', 'address_link', 'Ссылка на адрес')
        ->set_help_text('Опционально. Ссылка на Яндекс.Карты. Если добавить, то эта ссылка будет открываться при нажатии на адрес.'),
      Field::make('text', 'map_code', 'Код карты')
        ->set_help_text('Инструкция по добавлению: <a href="/" target="_blank">ссылка</a>'),
      Field::make('text', 'email', 'Email')
        ->set_help_text('Электронный почтовый адрес (email), который будет выводиться, например, в контактах. По нему можно будет кликнуть и откроется почтовый клиент. Пишите адрес слитно.'),
      Field::make('complex', 'work_time', 'Время работы')
        ->set_help_text('Выводятся в подвале сайта при выборе этого города. Если не добавлять промежутки, то будет использовано значение первого города.')
        ->setup_labels([
          'plural_name' => 'промежутки',
          'singular_name' => 'промежуток'
        ])
        ->add_fields([
          Field::make('text', 'week_day', 'День недели'),
          Field::make('text', 'time', 'Время'),
          Field::make('checkbox', 'accent', 'Акцент')
            ->set_help_text('Окрасить время в красный цвет.'),
        ]),
      Field::make('complex', 'files', 'Файлы')
        ->set_help_text('Выводятся в подвале сайта при выборе этого города. Файлы для всех городов добавляются в <a href="/wp-admin/admin.php?page=crb_carbon_fields_container__1.php">"Настройки темы" → "Файлы (общие)"</a>.')
        ->setup_labels([
          'plural_name' => 'файлы',
          'singular_name' => 'файл'
        ])
        ->add_fields([
          Field::make('text', 'name', 'Название'),
          Field::make('file', 'id', 'Файл')
            ->set_help_text('Загрузите файл или используйте ссылку в поле ниже. Можно выбрать уже загруженный.'),
          Field::make('text', 'link', 'Ссылка')
            ->set_help_text('Если загружен файл, то ссылка не используется. Можно добавить ссылку на любой сайт.'),
        ])
    ])
  ])
  ->add_tab('Общие данные', [
    Field::make('text', 'bank-name', 'Банк')
      ->set_help_text('Банк, который будет показан, например, внизу сайта.'),
    Field::make('text', 'bank-account-number', 'Расчётный счёт')
      ->set_help_text('Показывается, например, внизу сайта.'),
    Field::make('text', 'bank-correspondent-number', 'Корреспондентский счёт')
      ->set_help_text('Показывается, например, внизу сайта.'),
    Field::make('text', 'bank-bik', 'БИК банка')
      ->set_help_text('Показывается, например, внизу сайта.'),
  ]);

  $general_files_options_container = Container::make('theme_options', 'Файлы (общие)')
  ->set_page_parent($main_options_container)
  ->add_fields([
    Field::make('complex', 'general_files', 'Ощие файлы')
      ->set_help_text('Выводятся для всех городов после их собственных файлов. Собственные файлы добавляются в секции города.')
      ->setup_labels([
        'plural_name' => 'файлы',
        'singular_name' => 'файл'
      ])
      ->add_fields([
        Field::make('text', 'name', 'Название'),
        Field::make('file', 'id', 'Файл')
          ->set_help_text('Загрузите файл или используйте ссылку в поле ниже. Можно выбрать уже загруженный.'),
        Field::make('text', 'link', 'Ссылка')
          ->set_help_text('Если загружен файл, то ссылка не используется. Можно добавить ссылку на любой сайт.'),
      ])
  ]);
}