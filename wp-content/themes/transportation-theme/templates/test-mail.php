<?php
/*
Template Name: Тестовое письмо контактной формы — файл
*/

defined('ABSPATH') or die('Cannot access pages directly.');

echo getMailHtml(get_field('test-mail-name'), get_field('test-mail-phone'));