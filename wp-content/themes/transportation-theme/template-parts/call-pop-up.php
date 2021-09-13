<div class="call-pop-up-wrap pop-up hidden disabled" data-pop-up="call">
  <div class="container-size">
    <div class="pop-up__content">

      <form action="<?php echo esc_url(admin_url('admin-post.php')); ?>" method="POST" class="call-pop-up js-form">
        <div class="contact-block__ornament">
          <img class="contact-block__ornament-item" src="<?php echo get_template_directory_uri(); ?>/assets/img/ornament.svg" alt="">
          <img class="contact-block__ornament-item" src="<?php echo get_template_directory_uri(); ?>/assets/img/ornament.svg" alt="">
          <img class="contact-block__ornament-item" src="<?php echo get_template_directory_uri(); ?>/assets/img/ornament.svg" alt="">
          <img class="contact-block__ornament-item" src="<?php echo get_template_directory_uri(); ?>/assets/img/ornament.svg" alt="">
        </div>
        <!-- /.contact-block__ornament -->
        <div class="call-pop-up__content" data-pop-up-content>
          <div class="call-pop-up__title"><?php the_global_field('call-pop-up-title'); ?></div>
          <div class="call-pop-up__descr"><?php the_global_field('call-pop-up-descr'); ?></div>
          <label class="calc__input call-pop-up__input js-calc-input deactivated js-form-field" for="call-pop-up-name">
            <div class="calc__input-content call-pop-up__input-content">
              <div class="calc__input-placeholder call-pop-up__input-placeholder"><?php the_global_field('call-pop-up-placeholder-name'); ?><span class="call-pop-up__input-required">*</span></div>
              <div class="calc__input-value call-pop-up__input-value"><input id="call-pop-up-name" type="text" name="name" class="calc__input-value-field call-pop-up__input-value-field js-calc-input-value js-form-input"></div>
            </div>
          </label>
          <!-- /.calc__input -->
          <label class="calc__input call-pop-up__input js-calc-input deactivated js-form-field" for="call-pop-up-phone">
            <div class="calc__input-content call-pop-up__input-content">
              <div class="calc__input-placeholder call-pop-up__input-placeholder"><?php the_global_field('call-pop-up-placeholder-phone'); ?><span class="call-pop-up__input-required">*</span></div>
              <div class="calc__input-value call-pop-up__input-value"><input id="call-pop-up-phone" type="tel" name="phone" class="calc__input-value-field call-pop-up__input-value-field js-calc-input-value js-phone-field js-form-input"></div>
            </div>
          </label>
          <!-- /.calc__input -->
          <input type="hidden" name="token" value="<?php echo CSRF::createToken(); ?>">
          <input type="hidden" name="action" value="call_form">
          <button class="call-pop-up__button accent-button" type="submit">
            <div class="accent-button__inner-border">
              <div class="call-pop-up__button-content accent-button__content">
                <div class="accent-button__text">Заказать звонок</div>
                <img src="<?php echo get_template_directory_uri(); ?>/assets/img/arrow.svg" alt="" class="call-pop-up__button-arrow accent-button__arrow">
              </div>
            </div>
          </button>
          <!-- /.call-pop-up__button -->
        </div>
        <!-- /.call-pop-up__content -->
      </form>
      <!-- /.call-pop-up -->

    </div>
    <!-- /.pop-up__content -->
  </div>
  <!-- /.container-size -->
</div>
<!-- /.pop-up -->