<?php

defined('ABSPATH') or die('Cannot access pages directly.');

$paths = getPaths();
?>

<?php $iteration = 0; foreach ($paths as $sendingCity => $cityPaths): ?>
  <div class="inner-page__table-title <?php if (get_the_content()) { echo 'inner-page__table-title_after-content'; } else if ($iteration == 0) { echo 'inner-page__table-title_first'; } ?> <?php if ($iteration > 0) { echo 'inner-page__table-title_after-table'; } ?>">
    Сборная отправка из города <?php echo $sendingCity; ?>
  </div>
  <!-- /.inner-page__table-title -->
  <div class="inner-page__table-section table-wrap">
    <table class="table">
      <tr class="table__line">
        <th class="table__cell table__header-label"></th>
        <th class="table__cell table__header-label"></th>
        <th class="table__cell table__header-label"></th>
      </tr>
      <tr class="table__line">
        <th class="table__cell table__header">Город</th>
        <th class="table__cell table__header">Цена за 1 кг</th>
        <th class="table__cell table__header">Цена за 1 м³</th>
      </tr>
      <?php foreach ($path as $line): ?>
        <tr class="table__line">
          <?php foreach ($line as $cell): ?>
            <td class="table__cell"><?php echo $cell['c']; ?></td>
          <?php endforeach; ?>
        </tr>
      <?php endforeach; ?>
      <?php foreach ($cityPaths as $path): ?>
        <tr class="table__line">
          <td class="table__cell"><?php echo $path['recipient_city']; ?></td>
          <td class="table__cell"><?php echo $path['weight_price']; ?></td>
          <td class="table__cell"><?php echo $path['volume_price']; ?></td>
        </tr>
      <?php endforeach; ?>
    </table>
    <!-- /.table -->
    <div class="inner-page__bottom-advanced-text-wrap">
      <?php if (get_field('page-table-link')): ?>
        <a href="<?php echo get_field('page-table-link')['link']; ?>" class="inner-page__bottom-advanced-text"><?php echo get_field('page-table-link')['text']; ?></a>
      <?php endif; ?>
    </div>
    <!-- /.inner-page__bottom-advanced-text-wrap -->
  </div>
  <!-- /.inner-page__table-section -->
  
<?php $iteration++; endforeach; ?>