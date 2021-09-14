<div class="city-button js-contact-city-button" title="Сменить город" data-contact-city="<?php echo $city_name; ?>" data-pop-up-button="contact_cities" <?php echo $fixed ? 'data-pop-up-fixed' : ''; ?> <?php echo $pseudo_city; ?> <?php if ($values): ?> data-values="<?php echo esc_html(json_encode($values)); ?>"<?php endif; ?>>
  <span class="city-button__name js-contact-city-output"><?php echo trim_city_name($city_name); ?></span>
  <img class="city-button__arrow" src="<?php echo get_template_directory_uri(); ?>/assets/img/city-arrow.svg" alt="Сменить город">
</div>
<!-- /.city-button -->