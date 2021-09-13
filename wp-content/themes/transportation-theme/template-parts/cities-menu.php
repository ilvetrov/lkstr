<div class="cities-pop-up hidden disabled" data-pop-up="contact_cities" data-pop-up-save-scroll data-pop-up-center-content-on-button data-pop-up-is-list>
  <div class="cities-pop-up__wrap">
    <div class="cities-menu cities-pop-up__menu" data-pop-up-content>
      <div class="list-menu cities-pop-up__list list-menu_static list-menu_dark list-menu_with-background">
        <?php
        $contactCities = get_cities(true);
        ?>
        <?php if (count($contactCities) > 5): ?>
          <div class="list-menu__search">
            <input type="text" class="list-menu__search-input js-list-menu-items-search" placeholder="Поиск города...">
          </div>
        <?php endif; ?>
        <div class="js-list-menu-items"></div>
        <script>
          var contactCitiesData = <?php echo json_encode($contactCities); ?>;
        </script>
      </div>
      <!-- /.list-menu -->
    </div>
    <!-- /.cities-menu -->
  </div>
  <!-- /.cities-pop-up__wrap -->
</div>
<!-- /.cities-pop-up -->