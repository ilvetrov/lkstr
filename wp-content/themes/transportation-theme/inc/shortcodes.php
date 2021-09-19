<?php

defined('ABSPATH') or die('Cannot access pages directly.');


add_shortcode('services_menu', 'get_services_menu_for_header_menu');

function get_services_menu_for_header_menu($attributes)
{
  ob_start();
  ?>
  <li class="menu-item header-menu-services">
    <div class="header-menu-services__header js-header-menu-services-button">
      <div class="header-menu-services__title">Услуги</div>
      <svg class="header-menu-services__arrow" viewbox="0 0 19 13" width="19" height="13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.025 0L.49 3.536l8.485 8.485 3.535-3.536L4.025 0z" fill="#fff"/><path d="M18.02 3.536L14.486 0 6 8.485l3.535 3.536 8.486-8.485z" fill="#fff"/></svg>
    </div>
    <!-- /.header-menu-services__header -->
    <div class="header-menu-services__list-wrap hidden js-header-menu-services-list">
      <?php wp_nav_menu([
        'theme_location' => 'first-screen-services',
        'menu_class' => 'header-menu-services__list'
      ]); ?>
    </div>
    <!-- /.header-menu-services__list-wrap -->
  </li>

  <?php
  return ob_get_clean();
}

add_shortcode('call_button', 'get_call_button_html');

function get_call_button_html($attributes)
{
  ob_start();
  ?>
  <div class="accent-button" data-pop-up-button="call">
    <div class="accent-button__inner-border">
      <div class="accent-button__content">
        <div class="accent-button__text">Заказать звонок</div>
        <img src="<?php echo get_template_directory_uri(); ?>/assets/img/arrow.svg" alt="" class="accent-button__arrow">
      </div>
    </div>
  </div>
  <!-- /.accent-button -->
  <?php
  return ob_get_clean();
}