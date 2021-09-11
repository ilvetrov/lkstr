<?php

defined('ABSPATH') or die('Cannot access pages directly.');

?>

<div class="header-menu hidden disabled js-header-menu">
  <div class="header-menu__container-size container-size js-header-menu-container">
    <div class="header-menu__wrap">
      <div class="header-menu__top">
        <div class="header-menu__button js-close-header-menu js-header-button-animation">
          <div class="header-menu__button-line"></div>
          <div class="header-menu__button-line header-menu__button-line_center"></div>
          <div class="header-menu__button-line"></div>
        </div>
        <!-- /.header-menu__button -->
        <div class="header-menu__close-button js-close-header-menu">
          <div class="header-menu__close-button-line"></div>
          <div class="header-menu__close-button-line"></div>
        </div>
        <!-- /.header-menu__close-button -->
      </div>
      <!-- /.header-menu__top -->
      <div class="header-menu__content">
        <div class="header-menu__center">
          <?php wp_nav_menu([
            'theme_location' => 'header-menu',
            'menu_class' => 'header-menu__list'
          ]); ?>
        </div>
        <!-- /.header-menu__center -->
        <div class="header-menu__social-networks">
          <?php get_template_part('template-parts/social-networks'); ?>
        </div>
        <!-- /.header-menu__social-networks -->
      </div>
      <!-- /.header-menu__content -->

    </div>
    <!-- /.header-menu__wrap -->
  </div>
  <!-- /.header-menu__container-size -->
</div>
<!-- /.header-menu -->