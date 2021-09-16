<a href="<?php echo @$args['file']['id'] ? wp_get_attachment_url($args['file']['id']) : $args['file']['link']; ?>" class="contact-block__list-item <?php echo @$args['show_only_on_city'] && get_current_city()['code_name'] !== $args['show_only_on_city'] ? 'disabled' : ''; ?>" <?php echo @$args['show_only_on_city'] ? 'data-show-only-on-city="' . $args['show_only_on_city'] . '"' : ''; ?>>
  <img <?php imgAsyncSrc('file.svg'); ?> alt="Файл" class="contact-block__list-item-icon">
  <div class="contact-block__list-item-wrap">
    <div class="contact-block__list-item-value">
      <?php echo $args['file']['name']; ?>
    </div>
    <!-- /.contact-block__list-item-value -->
  </div>
  <!-- /.contact-block__list-item-wrap -->
</a>
<!-- /.contact-block__list-item -->