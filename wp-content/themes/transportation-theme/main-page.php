<?php
get_header();
?>

<main class="site-main">
  <section class="first-screen background-size">
    <div class="first-screen__background-wrap">
      <div class="first-screen__truck-on-background <?php if (get_field('first-screen-truck-animation')) { echo 'truck-animation'; } ?>"></div>
      <div class="first-screen__container-size container-size">
        <div class="first-screen__content">
          <div class="first-screen__subtitle"><?php echo get_post_meta(get_the_ID(), 'subtitle-part-1', true); ?> <span class="first-screen__subtitle-accent"><?php echo get_post_meta(get_the_ID(), 'subtitle-part-2', true); ?></span></div>
          <h1 class="first-screen__title screen-title"><?php echo get_post_meta(get_the_ID(), 'title', true); ?></h1>
          <div class="first-screen__description"><?php echo get_post_meta(get_the_ID(), 'description', true); ?></div>
          <div class="accent-button first-screen__button" data-pop-up-button="call">
            <div class="accent-button__inner-border">
              <div class="accent-button__content">
                <div class="accent-button__text"><?php echo get_post_meta(get_the_ID(), 'first-screen-button-text', true); ?></div>
                <img src="<?php echo get_template_directory_uri(); ?>/assets/img/arrow.svg" alt="Перейти" class="accent-button__arrow">
              </div>
            </div>
          </div>
        </div>
        <!-- /.first-screen__content -->
      </div>
      <!-- /.first-screen__container-size -->
    </div>
    <!-- /.first-screen__background-wrap -->
    <div class="first-screen__services">
      <div class="first-screen__container-size container-size">
        <?php wp_nav_menu([
          'theme_location' => 'first-screen-services'
        ]); ?>
      </div>
      <!-- /.first-screen__container-size -->
    </div>
    <!-- /.first-screen__services -->
  </section>
  <!-- /.first-screen -->

  <section class="about-screen background-size" id="about-company" <?php imgAsyncSrc('about-screen-background.jpg', true, 'background'); ?>>
    <div class="about-screen__container-size container-size">
      <div class="about-screen__content section-content">
        <h2 class="about-screen__title screen-title"><?php echo get_post_meta(get_the_ID(), 'about-screen-title', true); ?></h2>
        <div class="about-screen__description">
          <?php the_field('about-screen-description'); ?>
        </div>
        <!-- /.about-screen__description -->
        <div class="about-screen__advantages">
          <ul class="about-screen__advantages-list">
            <li class="about-screen__advantage about-screen__advantage_first">
              <div class="about-screen__advantage-icon-wrap">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/img/skills-gear.svg" alt="" class="about-screen__advantage-icon">
              </div>
              <div class="about-screen__advantage-text">
                <?php the_field('about-screen-advantage-1'); ?>
              </div>
            </li>
            <li class="about-screen__advantage about-screen__advantage_second">
              <div class="about-screen__advantage-icon-wrap">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/img/calc-and-coin.svg" alt="" class="about-screen__advantage-icon">
              </div>
              <div class="about-screen__advantage-text">
                <?php the_field('about-screen-advantage-2'); ?>
              </div>
            </li>
            <li class="about-screen__advantage about-screen__advantage_third">
              <div class="about-screen__advantage-icon-wrap">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/img/person-with-diagram.svg" alt="" class="about-screen__advantage-icon">
              </div>
              <div class="about-screen__advantage-text">
                <?php the_field('about-screen-advantage-3'); ?>
              </div>
            </li>
          </ul>
          <!-- /.about-screen__advantages-list -->
        </div>
        <!-- /.about-screen__advantages -->
        <div class="about-screen__social-networks">
          <?php get_template_part('template-parts/social-networks'); ?>
        </div>
        <!-- /.about-screen__social-networks -->
      </div>
      <!-- /.about-screen__content -->
      <div class="about-screen__container-on-background <?php if (get_field('about-screen-container-animation')) { echo 'prepare-container-animation'; } ?>" <?php imgAsyncSrc('container.png', false, 'background'); ?>></div>
    </div>
    <!-- /.about-screen__container size -->
  </section>
  <!-- /.about-screen -->

  <?php if (carbon_get_theme_option('cities_employees_is_shown') || carbon_get_theme_option('general_employees_is_shown')): ?>
    <section class="team-screen background-size" id="our-team" <?php imgAsyncSrc('team-screen-background.jpg', true, 'background') ?>>
      <div class="team-screen__container-size container-size">
        <div class="team-screen__content section-content" data-contact-city-group="employees" data-contact-city-default="<?php echo $default_employees_city_name; ?>" data-contact-city-changing-delay="100">
          <h2 class="team-screen__title screen-title"><?php the_field('team-screen-title'); ?></h2>
          <?php $all_employees = get_employees(); ?>
          <?php if (carbon_get_theme_option('cities_employees_is_shown')): ?>
            <div class="team-screen__city-button">
              <?php
              if (carbon_get_theme_option('general_employees_is_shown') && carbon_get_theme_option('general_employees_is_separated') && !empty($all_employees['general'])) {
                insert_city_button([
                  'general' => carbon_get_theme_option('general_employees_separated_text') ? carbon_get_theme_option('general_employees_separated_text') : 'Общие'
                ]);
              } else {
                insert_city_button();
              }
              ?>
            </div>
            <!-- /.team-screen__city-button -->
          <?php endif; ?>

          <div class="team-screen__employees-blocks smooth-changing-blocks" data-init-only-max-height="employees">
            <?php foreach ($all_employees as $employees_city => $employees): ?>
              <?php if (empty($employees)) continue; ?>

              <div class="team-screen__employees smooth-changing-block smooth-changing-block_with-translate js-carousel-container <?php echo (($show_default_employees && $default_employees_city_name !== $employees_city) || (!$show_default_employees && $employees_city !== get_current_city()['code_name'])) ? 'hidden obedient' : ''; ?>" data-show-on-contact-city="<?php echo $employees_city; ?>" data-show-on-contact-city-group="employees" data-only-max-height="employees">
                <div class="team-screen__carousel-controls-wrap team-screen__side">
                  <div class="team-screen__carousel-controls">
                    <div class="team-screen__carousel-control inactive js-slider-left" data-employees-carousel-control-left="employees-<?php echo $employees_city; ?>">
                      <img src="<?php echo get_template_directory_uri(); ?>/assets/img/carousel-left.svg" alt="Кнопка. Предыдущий сотрудник" class="team-screen__carousel-control-img">
                    </div>
                    <div class="team-screen__carousel-control js-slider-right" data-employees-carousel-control-right="employees-<?php echo $employees_city; ?>">
                      <img src="<?php echo get_template_directory_uri(); ?>/assets/img/carousel-right.svg" alt="Кнопка. Следующий сотрудник" class="team-screen__carousel-control-img">
                    </div>
                  </div>
                  <!-- /.team-screen__carousel-controls -->
                </div>
                <!-- /.team-screen__carousel-controls-wrap -->
                <div class="team-screen__carousel">
                  <ul class="team-screen__carousel-wrap" data-employees-carousel="employees-<?php echo $employees_city; ?>">
                    <?php
                    foreach ($employees as $employee):
                      $employeeId = $employee->ID;
                      ?>
                      <li class="team-screen__employee-wrap">
                        <div class="team-screen__employee">
                          <div class="team-screen__employee-img">
                            <?php echo get_the_post_thumbnail($employeeId, 'employee-size-272x200'); ?>
                          </div>
                          <div class="team-screen__employee-content">
                            <div class="team-screen__employee-title">
                              <?php echo esc_html(get_the_title($employeeId)); ?>
                            </div>
                            <div class="team-screen__employee-position">
                              <?php the_field('position', $employeeId); ?>
                            </div>
                            
                            <?php if (get_field('phone', $employeeId)): ?>
                              <?php if (get_field('employee-data-as-link')): ?>
                                <a href="tel:<?php echo preg_replace("/[^0-9+]/", "", get_field('phone', $employeeId)); ?>" class="team-screen__employee-data">
                              <?php else: ?>
                                <div class="team-screen__employee-data">
                              <?php endif; ?>
                                  <img src="<?php echo get_template_directory_uri(); ?>/assets/img/employee-phone.svg" alt="Номер телефона" class="team-screen__employee-data-icon">
                                  <div class="team-screen__employee-data-text">
                                    <?php the_field('phone', $employeeId); ?>
                                  </div>
                              <?php if (get_field('employee-data-as-link')): ?>
                                </a>
                              <?php else: ?>
                                </div>
                              <?php endif; ?>
                            <?php endif; ?>
          
                            <?php if (get_field('email', $employeeId)): ?>
                              <?php if (get_field('employee-data-as-link')): ?>
                                <a href="mailto:<?php the_field('email', $employeeId); ?>" class="team-screen__employee-data">
                              <?php else: ?>
                                <div class="team-screen__employee-data">
                              <?php endif; ?>
                                  <img src="<?php echo get_template_directory_uri(); ?>/assets/img/employee-email.svg" alt="Адрес Email" class="team-screen__employee-data-icon">
                                  <div class="team-screen__employee-data-text">
                                    <span><?php preg_match('/^(.+?)@/', get_field('email', $employeeId), $employee_email); echo $employee_email[1]; ?></span><span class="team-screen__employee-non-break"><?php preg_match('/@.+$/', get_field('email', $employeeId), $employee_email); echo $employee_email[0]; ?></span>
                                  </div>
                              <?php if (get_field('employee-data-as-link')): ?>
                                </a>
                              <?php else: ?>
                                </div>
                              <?php endif; ?>
                            <?php endif; ?>
                          </div>
                          <!-- /.team-screen__employee-content -->
                        </div>
                        <!-- /.team-screen__employee -->
                      </li>
                      <!-- /.team-screen__employee-wrap -->
                    <?php endforeach; ?>
                  </ul>
                  <!-- /.team-screen__carousel-wrap -->
                </div>
                <!-- /.team-screen__carousel -->
                <div class="void team-screen__side"></div>
                <!-- /.void -->
              </div>
              <!-- /.team-screen__employees -->
              
            <?php endforeach; ?>

          </div>
          <!-- /.team-screen__employees-blocks -->

          <div class="team-screen__social-networks">
            <?php get_template_part('template-parts/social-networks'); ?>
          </div>
          <!-- /.team-screen__social-networks -->
        </div>
        <!-- /.team-screen__content -->
      </div>
      <!-- /.team-screen__container-size -->
    </section>
    <!-- /.team-screen -->
  <?php endif; ?>

  <?php if (!get_field('image-gallery-screen-disabled')): ?>
    <section class="image-gallery-screen background-size" id="photo-gallery" <?php imgAsyncSrc('image-gallery-screen-background.jpg', true, 'background'); ?>>
      <div class="image-gallery-screen__container-size container-size section-content">
        <h2 class="image-gallery-screen__title screen-title"><?php the_field('image-gallery-screen-title'); ?></h2>
        <!-- /.image-gallery-screen__title -->
        <div class="image-gallery-screen__content">
          <div class="image-gallery-screen__left-side">
            <div class="gallery-changer">
              <div class="gallery-changer__item active" data-block-changer="image-gallery-1" data-block-group-of-changer="image-galleries">
                <img <?php imgAsyncSrc('active-gallery-changer.svg'); ?> alt="Активная галерея" class="gallery-changer__item-img">
                <div class="gallery-changer__item-text">
                  Автопарк
                </div>
                <!-- /.gallery-changer__item-text -->
              </div>
              <!-- /.gallery-changer__item -->
              <div class="gallery-changer__item js-show-image-gallery-2" data-block-changer="image-gallery-2" data-block-group-of-changer="image-galleries">
                <img <?php imgAsyncSrc('active-gallery-changer.svg'); ?> alt="Активная галерея" class="gallery-changer__item-img">
                <div class="gallery-changer__item-text">
                  Примеры погрузок
                </div>
                <!-- /.gallery-changer__item-text -->
              </div>
              <!-- /.gallery-changer__item -->
            </div>
            <!-- /.gallery-changer -->
          </div>
          <!-- /.image-gallery-screen__left-side -->
          <div class="image-gallery-screen__gallery-blocks changing-galleries">
            <div class="image-gallery-screen__gallery-block gallery-block" data-changing-block="image-gallery-1" data-block-group="image-galleries">
              <div class="image-gallery-screen__right-side">
                <div class="image-gallery-screen__controls-wrap">
                  <div class="image-gallery-screen__controls">
                    <div class="image-gallery-screen__control inactive js-slider-image-gallery-1-left">
                      <img src="<?php echo get_template_directory_uri(); ?>/assets/img/carousel-left.svg" alt="Кнопка. Предыдущий сотрудник" class="team-screen__carousel-control-img" draggable="false">
                    </div>
                    <div class="image-gallery-screen__control js-slider-image-gallery-1-right">
                      <img src="<?php echo get_template_directory_uri(); ?>/assets/img/carousel-right.svg" alt="Кнопка. Следующий сотрудник" class="team-screen__carousel-control-img" draggable="false">
                    </div>
                  </div>
                  <!-- /.image-gallery-screen__controls -->
                </div>
                <!-- /.image-gallery-screen__controls-wrap -->
                <div class="image-gallery-screen__gallery">
                  <div class="image-gallery-screen__carousel">
                    <ul class="image-gallery-screen__carousel-wrap js-slider-image-gallery-1">
                      <?php
                      $images = acf_photo_gallery('image-gallery-screen-images', get_the_ID());
    
                      $iteration = 0;
                      foreach($images as $image):
                        $id = $image['id'];
                        $title = $image['title'];
                        $caption = $image['caption'];
                        $full_image_url = $image['full_image_url'];
                        $url = $image['url'];
                        $target = $image['target'];
                        $alt = get_field('photo_gallery_alt', $id);
                        ?>
                        <li class="image-gallery-screen__carousel-item-wrap">
                          <div class="image-gallery-screen__carousel-item">
                            <?php if (!empty($url)) { ?><a href="<?php echo $url; ?>" <?php echo ($target == 'true' ) ? 'target="_blank"' : ''; ?> class="image-gallery-screen__image-link"><?php } ?>
                              <img <?php imgAsyncSrc($full_image_url, true, 'img', true); ?> alt="<?php echo $alt; ?>" <?php echo ($title) ? 'title="' . $title . '"' : ''; ?> class="image-gallery-screen__image img-cover">
                              <div class="image-gallery-screen__carousel-item-black-cover"></div>
                            <?php if (!empty($url)) { ?></a><?php } ?>
                          </div>
                          <!-- /.image-gallery-screen__carousel-item -->
                        </li>
                        <!-- /.image-gallery-screen__carousel-item-wrap -->
                        
                      <?php $iteration++; endforeach; ?>
                    </ul>
                    <!-- /.image-gallery-screen__carousel-wrap -->
                  </div>
                  <!-- /.image-gallery-screen__carousel -->
                </div>
                <!-- /.image-gallery-screen__gallery -->
              </div>
              <!-- /.image-gallery-screen__right-side -->
            </div>
            <!-- /.image-gallery-screen__gallery-block -->

            <div class="image-gallery-screen__gallery-block gallery-block hidden-to-bottom disabled" data-changing-block="image-gallery-2" data-block-group="image-galleries">
              <div class="image-gallery-screen__right-side">
                <div class="image-gallery-screen__controls-wrap">
                  <div class="image-gallery-screen__controls">
                    <div class="image-gallery-screen__control inactive js-slider-image-gallery-2-left" data-carousel-left="image-gallery-2">
                      <img src="<?php echo get_template_directory_uri(); ?>/assets/img/carousel-left.svg" alt="Кнопка. Предыдущий сотрудник" class="team-screen__carousel-control-img" draggable="false">
                    </div>
                    <div class="image-gallery-screen__control js-slider-image-gallery-2-right" data-carousel-right="image-gallery-2">
                      <img src="<?php echo get_template_directory_uri(); ?>/assets/img/carousel-right.svg" alt="Кнопка. Следующий сотрудник" class="team-screen__carousel-control-img" draggable="false">
                    </div>
                  </div>
                  <!-- /.image-gallery-screen__controls -->
                </div>
                <!-- /.image-gallery-screen__controls-wrap -->
                <div class="image-gallery-screen__gallery">
                  <div class="image-gallery-screen__carousel" data-carousel-name="image-gallery-2" data-carousel-can-be-disabled="false">
                    <ul class="image-gallery-screen__carousel-wrap js-slider-image-gallery-2">
                      <?php
                      $images = acf_photo_gallery('image-gallery-screen-images-2', get_the_ID());
    
                      $iteration = 0;
                      foreach($images as $image):
                        $id = $image['id'];
                        $title = $image['title'];
                        $caption = $image['caption'];
                        $full_image_url = $image['full_image_url'];
                        $url = $image['url'];
                        $target = $image['target'];
                        $alt = get_field('photo_gallery_alt', $id);
                        ?>
                        <li class="image-gallery-screen__carousel-item-wrap">
                          <div class="image-gallery-screen__carousel-item <?php if ($iteration == 0) { echo 'active-carousel-item'; } ?>">
                            <?php if (!empty($url)) { ?><a href="<?php echo $url; ?>" <?php echo ($target == 'true' ) ? 'target="_blank"' : ''; ?> class="image-gallery-screen__image-link"><?php } ?>
                              <img <?php imgAsyncSrc($full_image_url, true, 'img', true); ?> alt="<?php echo $alt; ?>" <?php echo ($title) ? 'title="' . $title . '"' : ''; ?> class="image-gallery-screen__image img-cover">
                              <div class="image-gallery-screen__carousel-item-black-cover"></div>
                            <?php if (!empty($url)) { ?></a><?php } ?>
                          </div>
                          <!-- /.image-gallery-screen__carousel-item -->
                        </li>
                        <!-- /.image-gallery-screen__carousel-item-wrap -->
                        
                      <?php $iteration++; endforeach; ?>
                    </ul>
                    <!-- /.image-gallery-screen__carousel-wrap -->
                  </div>
                  <!-- /.image-gallery-screen__carousel -->
                </div>
                <!-- /.image-gallery-screen__gallery -->
              </div>
              <!-- /.image-gallery-screen__right-side -->
            </div>
            <!-- /.image-gallery-screen__gallery-block -->
          </div>
          <!-- /.image-gallery-screen__gallery-blocks -->
          <div class="image-gallery-screen__void"></div>
        </div>
        <!-- /.image-gallery-screen__content -->
      </div>
      <!-- /.image-gallery-screen__container-size -->
    </section>
    <!-- /.image-gallery-screen -->
  <?php endif; ?>

  <section class="calc-screen background-size" id="calc" <?php imgAsyncSrc('calc-screen-background.jpg', true, 'background'); ?>>
    <div class="calc-screen__mobile-background">
      <div class="calc-screen__mobile-background-top"></div>
      <div class="calc-screen__mobile-background-bottom"></div>
      <div class="calc-screen__mobile-background-lines background-size" <?php imgAsyncSrc('background-lines.png', true, 'background'); ?>></div>
    </div>
    <!-- /.calc-screen__mobile-background -->
    <div class="calc-screen__container-size container-size">
      <div class="calc-screen__content section-content">
        <div class="calc-screen__planet-side">
          <div class="calc-screen__planet-animation-container">
            <div class="calc-screen__planet-wrap">
              <img <?php imgAsyncSrc('planet.png', true); ?> alt="Планета" class="calc-screen__planet <?php if (get_field('calc-screen-planet-animation')) { echo 'prepare-planet-animation'; } ?>">
              <div class="calc-screen__planet-shadow-wrap">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/img/planet-shadow.png" alt="Тень от планеты" class="calc-screen__planet-shadow">
              </div>
            </div>
            <!-- /.calc-screen__planet-wrap -->
          </div>
          <!-- /.calc-screen__planet-animation-container -->
        </div>
        <!-- /.calc-screen__planet-side -->
        <div class="calc-screen__calc-side">
          <h2 class="calc-screen__title screen-title"><?php the_field('calc-screen-title'); ?></h2>
          <div class="calc-screen__calc calc">
            <div class="calc__left-side">
              <div class="calc__left-side-ornament">
                <img class="calc__left-side-ornament-item" src="<?php echo get_template_directory_uri(); ?>/assets/img/ornament.svg" alt="">
                <img class="calc__left-side-ornament-item" src="<?php echo get_template_directory_uri(); ?>/assets/img/ornament.svg" alt="">
              </div>
              <!-- /.calc__left-side-ornament -->
              <div class="calc__left-side-wrap">
                <div class="calc__list js-list-menu collapsed list-disabled js-calc-sending-cities <?php if (count(getSendingCitiesFromTableArray(get_field('calc-cities')['body'])) == 1) { echo 'list-menu_one-item'; } ?>">
                  <div class="calc__input calc__input-view calc__input_list deactivated js-list-menu-button">
                    <div class="calc__input-content calc__input-view-content">
                      <div class="calc__input-placeholder calc__input-view-placeholder">Отправление</div>
                      <div class="calc__list-output calc__input-value calc__input-view-value js-calc-list-output js-list-menu-output js-calc-sending-city-output"></div>
                    </div>
                    <div class="calc__list-arrow-wrap">
                      <img <?php imgAsyncSrc('list-arrow.svg'); ?> alt="Выбрать" class="calc__list-arrow">
                    </div>
                  </div>
                  <!-- /.calc__input -->
                  <div class="list-menu calc__list-items <?php if (get_field('calc-list-own-background')) { echo 'list-menu_with-background'; } ?>">
                    <div class="list-menu__search">
                      <input type="text" class="list-menu__search-input js-list-menu-items-search" placeholder="Поиск города...">
                    </div>
                    <div class="js-list-menu-items"></div>
                  </div>
                  <!-- /.list-menu -->
                  <img <?php imgAsyncSrc('circle-arrow.svg'); ?> alt="Выберите города" class="calc__circle-arrow">
                </div>
                <!-- /.calc__list -->
                <div class="calc__list js-list-menu collapsed list-disabled js-calc-recipient-cities">
                  <div class="calc__input calc__input-view calc__input_list deactivated js-list-menu-button">
                    <div class="calc__input-content calc__input-view-content">
                      <div class="calc__input-placeholder calc__input-view-placeholder">Прибытие</div>
                      <div class="calc__list-output calc__input-value calc__input-view-value js-calc-list-output js-list-menu-output js-calc-recipient-city-output"></div>
                    </div>
                    <div class="calc__list-arrow-wrap">
                      <img <?php imgAsyncSrc('list-arrow.svg'); ?> alt="Выбрать" class="calc__list-arrow">
                    </div>
                  </div>
                  <!-- /.calc__input -->
                  <div class="list-menu calc__list-items <?php if (get_field('calc-list-own-background')) { echo 'list-menu_with-background'; } ?>">
                    <div class="list-menu__search">
                      <input type="text" class="list-menu__search-input js-list-menu-items-search" placeholder="Поиск города...">
                    </div>
                    <div class="list-menu__output js-list-menu-items"></div>
                  </div>
                  <!-- /.list-menu -->
                </div>
                <!-- /.calc__list -->
                <label class="calc__input calc__input-view js-calc-input deactivated" for="calc-volume">
                  <div class="calc__input-content calc__input-view-content">
                    <div class="calc__input-placeholder calc__input-view-placeholder">Объем</div>
                    <div class="calc__input-value calc__input-view-value"><input id="calc-volume" type="number" min="0" class="calc__input-value calc__input-value-field calc__input-view-value-field js-calc-input-volume js-calc-input-value"><span class="calc__input-value calc__input-value-sign calc__input-view-value-sign js-calc-input-value-sign hidden">м³</span></div>
                  </div>
                </label>
                <!-- /.calc__input -->
                <label class="calc__input calc__input-view js-calc-input deactivated" for="calc-weight">
                  <div class="calc__input-content calc__input-view-content">
                    <div class="calc__input-placeholder calc__input-view-placeholder">Вес</div>
                    <div class="calc__input-value calc__input-view-value"><input id="calc-weight" type="number" min="0" class="calc__input-value calc__input-value-field calc__input-view-value-field js-calc-input-weight js-calc-input-value"><span class="calc__input-value calc__input-value-sign calc__input-view-value-sign js-calc-input-value-sign hidden">кг</span></div>
                  </div>
                </label>
                <!-- /.calc__input -->
                <div class="calc__bottom-descr">
                  <div class="calc__bottom-descr-content js-calc-status">
                    <div class="calc__bottom-descr-content-text js-calc-status-output">Введите данные</div>
                    <img <?php imgAsyncSrc('calc-arrow-to.svg'); ?> alt="Доставить в" class="calc__address-arrow calc__bottom-descr-content-arrow">
                  </div>
                  <!-- /.calc__bottom-descr-content -->
                </div>
                <!-- /.calc__bottom-descr -->
              </div>
              <!-- /.calc__left-side-wrap -->
            </div>
            <!-- /.calc__left-side -->
            <div class="calc__right-side">
              <div class="calc__title">
                Результат стоимости
              </div>
              <!-- /.calc__title -->
              <div class="calc__data">
                <div class="calc__data-row">
                  <div class="calc__data-left js-calc-address-from-container"><span class="js-calc-address-from">Отправление</span></div>
                  <img <?php imgAsyncSrc('calc-arrow-to.svg'); ?> alt="Доставить в" class="calc__address-arrow">
                  <div class="calc__data-right js-calc-address-to-container"><span class="js-calc-address-to">Прибытие</span></div>
                </div>
                <!-- /.calc__data-row -->
                <div class="calc__data-row">
                  <div class="calc__data-left">Объем</div>
                  <div class="calc__data-right js-calc-volume-container"><span class="js-calc-volume">0</span> <span class="calc__data-symbol js-calc-volume-symbol">м³</span></div>
                </div>
                <!-- /.calc__data-row -->
                <div class="calc__data-row">
                  <div class="calc__data-left">Вес</div>
                  <div class="calc__data-right js-calc-weight-container"><span class="js-calc-weight">0</span> <span class="calc__data-symbol js-calc-weight-symbol">кг</span></div>
                </div>
                <!-- /.calc__data-row -->
                <div class="calc__total-cost js-calc-total-cost-container"><span class="js-calc-total-cost">0</span><span class="calc__total-cost-accent-symbol"> ₽</span></div>
                <div class="calc__order-button accent-button" data-pop-up-button="call" data-pop-up-from-calc>
                  <div class="accent-button__inner-border">
                    <div class="accent-button__content calc__order-button-content">
                      <div class="accent-button__text">Оформить заявку</div>
                      <img src="<?php echo get_template_directory_uri(); ?>/assets/img/arrow.svg" alt="" class="accent-button__arrow">
                    </div>
                  </div>
                </div>
                <!-- /.calc__order-button -->
              </div>
              <!-- /.calc__data -->
            </div>
            <!-- /.calc__right-side -->
          </div>
          <!-- /.calc-screen__calc -->
          <div class="calc-screen__bottom-text">
            Для Клиентов с большими объемами, а так же транспортным компаниям действуют понижающие коэффициенты, а так же договорные расценки.
            <br>Мы всегда стараемся идти на встречу Клиентам
          </div>
          <!-- /.calc-screen__bottom-text -->
        </div>
        <!-- /.calc-screen__calc-side -->
      </div>
      <!-- /.calc-screen__content -->
    </div>
    <!-- /.calc-screen__container-size -->
  </section>
  <!-- /.calc-screen -->

  <section class="contact-screen background-size" id="contacts" <?php imgAsyncSrc('contact-screen-background.jpg', true, 'background'); ?>>
    <div class="contact-screen__container-size container-size">
      <div class="contact-screen__content section-content">
        <div class="contact-screen__left-side">
          <div class="contact-screen__title screen-title">Контакты</div>
          <div class="contact-block">
            <div class="contact-block__ornament increased-animation" data-js-animation="increased-animation">
              <img class="contact-block__ornament-item" src="<?php echo get_template_directory_uri(); ?>/assets/img/ornament.svg" alt="">
              <img class="contact-block__ornament-item" src="<?php echo get_template_directory_uri(); ?>/assets/img/ornament.svg" alt="">
              <img class="contact-block__ornament-item" src="<?php echo get_template_directory_uri(); ?>/assets/img/ornament.svg" alt="">
              <img class="contact-block__ornament-item" src="<?php echo get_template_directory_uri(); ?>/assets/img/ornament.svg" alt="">
            </div>
            <!-- /.contact-block__ornament -->
            <div class="contact-block__wrap">
              <div class="contact-block__main-part">
                <div class="contact-block__city-button">
                  <?php insert_city_button(); ?>
                </div>
                <!-- /.contact-block__city-button -->
                <div class="contact-block__data-blocks">
                  <div class="contact-block__data">
                    <a href="tel:<?php echo preg_replace("/[^0-9+]/", "", esc_html(get_current_city_value('phone_number'))); ?>" class="contact-block__list-item" <?php insert_cities_dependent_values('phone_number', [
                      "href" => function(String $value)
                      {
                        return 'tel:' . preg_replace("/[^0-9+]/", "", esc_html($value));
                      }
                    ]); ?>>
                      <img <?php imgAsyncSrc('phone.svg'); ?> alt="Телефон" class="contact-block__list-item-icon">
                      <div class="contact-block__list-item-wrap">
                        <div class="contact-block__list-item-value" <?php insert_cities_dependent_values('phone_number', [
                          "innerText" => function(String $value)
                          {
                            return esc_html($value);
                          }
                        ]); ?>>
                          <?php echo esc_html(get_current_city_value('phone_number')); ?>
                        </div>
                        <!-- /.contact-block__list-item-value -->
                      </div>
                      <!-- /.contact-block__list-item-wrap -->
                    </a>
                    <!-- /.contact-block__list-item-value -->
                    <a href="mailto:<?php echo esc_html(get_current_city_value('email')); ?>" class="contact-block__list-item" <?php insert_cities_dependent_values('email', [
                      "href" => function(String $value)
                      {
                        return 'mailto:' . esc_html($value);
                      }
                    ]); ?>>
                      <img <?php imgAsyncSrc('email.svg'); ?> alt="Email" class="contact-block__list-item-icon">
                      <div class="contact-block__list-item-wrap">
                        <div class="contact-block__list-item-value" <?php insert_cities_dependent_values('email', [
                          "innerText" => function(String $value)
                          {
                            return esc_html($value);
                          }
                        ]); ?>>
                          <?php echo esc_html(get_current_city_value('email')); ?>
                        </div>
                        <!-- /.contact-block__list-item-value -->
                      </div>
                      <!-- /.contact-block__list-item-wrap -->
                    </a>
                    <!-- /.contact-block__list-item-value -->
                    <a <?php echo (get_current_city(true)['address'] ? get_current_city(true)['address_link'] : get_current_city_value('address_link', true)) ? 'href="' . esc_html((get_current_city(true)['address'] ? get_current_city(true)['address_link'] : get_current_city_value('address_link', true))) . '"' : ''; ?> target="_blank" class="contact-block__list-item" data-not-smooth-changing <?php insert_cities_dependent_values('address_link', [
                      "remove-empty--href" => [
                        "dependent_on" => 'address',
                        "handler" => function(String $value)
                        {
                          return $value;
                        }
                      ]
                    ]); ?>>
                      <img <?php imgAsyncSrc('location.svg'); ?> alt="Адрес" class="contact-block__list-item-icon">
                      <div class="contact-block__list-item-wrap">
                        <div class="contact-block__list-item-value" <?php insert_cities_dependent_values('address', [
                          "innerText" => function(String $value)
                          {
                            return esc_html($value);
                          }
                        ]); ?>>
                          <?php echo get_current_city_value('address', true); ?>
                        </div>
                        <!-- /.contact-block__list-item-value -->
                      </div>
                      <!-- /.contact-block__list-item-wrap -->
                    </a>
                    <!-- /.contact-block__list-item-value -->
                    <div class="contact-block__list-item">
                      <img <?php imgAsyncSrc('time.svg'); ?> alt="Время работы" class="contact-block__list-item-icon">
                      <div class="contact-block__list-item-value">
                        <div class="changing-blocks" data-contact-city-group="work-time" data-contact-city-default="<?php echo get_default_city()['code_name']; ?>">
                          <?php foreach (get_cities() as $city): ?>
                            <?php if (!$city['work_time']) continue; ?>
                            
                            <div class="changing-block <?php echo (!show_block_of_city($city, 'work_time') ? 'hidden' : ''); ?>" data-show-on-contact-city="<?php echo $city['code_name']; ?>" data-show-on-contact-city-group="work-time">
                              <?php foreach ($city['work_time'] as $timeLine): ?>
                                <div class="contact-block__time"><span class="contact-block__week-day"><?php echo $timeLine['week_day']; ?></span> <span class="contact-block__time-value <?php if ($timeLine['accent']) { echo 'contact-block__time-value_accent'; } ?>"><?php echo $timeLine['time']; ?></span></div>
                              <?php endforeach; ?>
                            </div>
                            <!-- /.changing-block -->
                          <?php endforeach; ?>
                        </div>
                        <!-- /.changing-blocks -->
                      </div>
                      <!-- /.contact-block__list-item-value -->
                    </div>
                    <!-- /.contact-block__list-item -->
                    <?php foreach (get_cities() as $city): ?>
                      <?php if (!$city['files']) continue; ?>

                        <?php foreach ($city['files'] as $file): ?>
                          <?php get_template_part('template-parts/download-file', null, [
                            "file" => $file,
                            "show_only_on_city" => $city['code_name']
                          ]); ?>
                        <?php endforeach; ?>
                    <?php endforeach; ?>
                    <?php foreach (carbon_get_theme_option('general_files') as $file): ?>
                      <?php get_template_part('template-parts/download-file', null, [
                        "file" => $file,
                      ]); ?>
                    <?php endforeach; ?>
                  </div>
                  <!-- /.contact-block__data -->
                </div>
                <!-- /.contact-block__data-blocks -->
              </div>
              <!-- /.contact-block__main-part -->
              <div class="contact-block__second-part">
                <div class="contact-block__social-networks">
                  <?php get_template_part('template-parts/social-networks'); ?>
                </div>
                <!-- /.contact-block__social-networks -->
              </div>
              <!-- /.contact-block__second-part -->
            </div>
            <!-- /.contact-block__wrap -->
          </div>
          <!-- /.contact-block -->
          <div class="contact-screen__info">
            <div class="contact-screen__info-bank"><?php the_global_field('company-bank'); ?></div>
            <div class="contact-screen__info-juridical">
              <div class="contact-screen__info-juridical-left">
                <div>Р/сч <?php the_global_field('company-bank-account-number'); ?></div>
                <div>К/сч <?php the_global_field('company-bank-correspondent-number'); ?></div>
                <div>БИК <?php the_global_field('company-bik'); ?></div>
              </div>
              <!-- /.contact-screen__info-juridical-left -->
              <div class="contact-screen__info-juridical-right">
                2020@copyright <span class="contact-screen__info-juridical-right-accent">CTP</span>
              </div>
              <!-- /.contact-screen__info-juridical-right -->
            </div>
            <!-- /.contact-screen__info-juridical -->
          </div>
          <!-- /.contact-screen__info -->
        </div>
        <!-- /.contact-screen__left-side -->
        <?php if (!get_field('contact-screen-deactivate-map')): ?>
          <div class="contact-screen__right-side">
            <div class="smooth-changing-blocks" data-contact-city-group="dynamic-maps" data-contact-city-default="<?php echo get_default_city()['code_name']; ?>" data-init-only-max-height="map">
              <?php foreach (get_cities() as $city): ?>
                <?php if (!$city['map_code']) continue; ?>
                <div class="smooth-changing-block <?php echo (!show_block_of_city($city, 'map_code') ? 'hidden obedient' : ''); ?>" data-show-on-contact-city="<?php echo $city['code_name']; ?>" data-show-on-contact-city-group="dynamic-maps" data-only-max-height="map">
                  <div data-dynamic-tag="<?php echo esc_html($city['map_code']); ?>" data-dynamic-tag-when-scroll></div>
                </div>
                <!-- /.smooth-changing-block -->
              <?php endforeach; ?>
            </div>
            <!-- /.smooth-changing-blocks -->
          </div>
          <!-- /.contact-screen__right-side -->
        <?php endif; ?>
      </div>
      <!-- /.contact-screen__content -->
    </div>
    <!-- /.contact-screen__container-size -->
  </section>
  <!-- /.contact-screen -->

  <div class="list-menu-background hidden disabled js-list-menu-background"></div>
</main>
<!-- /.site-main -->

<?php if (false): ?>
<div class="bottom-blur js-change-transform-via-element-position" style="transform: translateY(100%);" data-element=".about-screen"></div>
<?php endif; ?>

<script>
  var employeesSliderByOne = <?php echo get_field('employees-slider-by-one') ? 'true' : 'false'; ?>;
  var calcCitiesData = <?php echo json_encode(get_field('calc-cities')['body']); ?>;
  var densityThreshold = <?php echo get_field('calc-density-threshold'); ?>;
  var minVolumeForCalc = <?php echo get_field('calc-min-volume-for-calc'); ?>;
  var calcFormula = '<?php echo get_field('calc-formula'); ?>';
</script>
<?php
get_footer();