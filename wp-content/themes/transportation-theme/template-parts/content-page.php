<?php
/**
 * Template part for displaying page content in page.php
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package transportation-theme
 */

$mainPageId = get_option('page_on_front');
?>

<div class="inner-page__header">
	<div class="breadcrumbs">
		<?php $breadcrumbsIds = get_ancestors(get_the_ID(), 'page'); ?>
		<?php
			if (!in_array($mainPageId, $breadcrumbsIds)) {
				array_unshift($breadcrumbsIds, $mainPageId);
			}
			foreach ($breadcrumbsIds as $breadcrumbId): ?>
				<?php $breadcrumbLink = get_permalink($breadcrumbId); ?>
				<ul class="breadcrumbs__list">
					<li class="breadcrumbs__item">
						<?php
						if ($breadcrumbId == $mainPageId) {
							$breadcrumbName = 'главная';
						} else {
							$breadcrumbName = get_field('page-breadcrumbs-current', $breadcrumbId);
							if (!$breadcrumbName) {
								$breadcrumbNameRaw = get_the_title($breadcrumbId);
								$breadcrumbNameExploded = explode(' ', $breadcrumbNameRaw);
								$breadcrumbNameFirstWord = $breadcrumbNameExploded[0];
								array_splice($breadcrumbNameExploded, 0, 1);
								$breadcrumbNameWithoutFirstWord = implode(' ', $breadcrumbNameExploded);
								$breadcrumbName = '<span class="breadcrumbs__item-text_first-word">' . $breadcrumbNameFirstWord . '</span> ' . $breadcrumbNameWithoutFirstWord;
							}
						}
						?>
						<a href="<?php echo $breadcrumbLink; ?>" class="breadcrumbs__link breadcrumbs__item-text"><?php echo $breadcrumbName; ?></a>
					</li>
					<!-- /.breadcrumbs__item -->
				<?php endforeach; ?>
				<li class="breadcrumbs__item">
					<?php
					if (get_the_ID() == $mainPageId) {
						$breadcrumbName = 'главная';
					} else {
						$breadcrumbName = get_field('page-breadcrumbs-current') ? get_field('page-breadcrumbs-current') : get_field('own-page-title');
						if (!$breadcrumbName) {
							$breadcrumbNameRaw = get_the_title();
							$breadcrumbNameExploded = explode(' ', $breadcrumbNameRaw);
							$breadcrumbNameFirstWord = $breadcrumbNameExploded[0];
							array_splice($breadcrumbNameExploded, 0, 1);
							$breadcrumbNameWithoutFirstWord = implode(' ', $breadcrumbNameExploded);
							$breadcrumbName = '<span class="breadcrumbs__item-text_first-word">' . $breadcrumbNameFirstWord . '</span> ' . $breadcrumbNameWithoutFirstWord;
						}
					}
					?>
					<span class="breadcrumbs__item-text"><?php echo $breadcrumbName; ?></span>
				</li>
				<!-- /.breadcrumbs__item -->
			</ul>
	</div>
	<!-- /.breadcrumbs -->
</div>
<!-- /.inner-page__header -->
<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<div class="inner-page__content <?php if (get_the_content() && (get_field('page-table-default') || get_field('page-table') || get_field('page-table-title'))) { echo 'inner-page__content_with-table'; } ?>">

		<div class="inner-page__left-side <?php if (!get_the_content()) { echo 'inner-page__left-side_no-content'; } ?> <?php if (get_the_content() && get_field('page-gallery-images')) { echo 'inner-page__left-side_gallery'; } ?>" style="width: 100%;">
			<div class="inner-page__left-side-top">
				<?php if (get_the_content() && !get_field('page-gallery-images') && get_the_post_thumbnail_url()): ?>
					<div class="inner-page__mobile-main-img">
						<?php transportation_theme_post_thumbnail(); ?>
					</div>
					<!-- /.inner-page__mobile-main-img -->
				<?php endif; ?>
				<h1 class="inner-page__title <?php if (!get_the_content() || get_field('page-gallery-images')) { echo 'inner-page__title_gallery'; } ?>"><?php if (get_field('own-page-title')) { the_field('own-page-title'); } else { the_title(); } ?></h1>
				<?php if (get_the_content()): ?>
					<div class="inner-page__text <?php if (get_field('page-gallery-images')) { echo 'inner-page__text_gallery'; } ?>">
						<?php
						the_content();
			
						wp_link_pages(
							array(
								'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'transportation-theme' ),
								'after'  => '</div>',
							)
						);
						?>
					</div>
					<!-- /.inner-page__text -->
				<?php endif; ?>
			</div>
			<!-- /.inner-page__left-side-top -->
		</div>
		<!-- /.inner-page__left-side -->
		<?php if (get_the_content()): ?>
			<div class="inner-page__right-side inner-page__gallery <?php if (get_field('page-gallery-images')) { echo 'inner-page__right-side_gallery'; } ?>">
				<?php if (!get_field('page-gallery-images')): ?>
					<div class="inner-page__main-img">
						<?php transportation_theme_post_thumbnail(); ?>
					</div>
					<!-- /.inner-page__main-img -->
				<?php else: ?>
					<div class="inner-page__gallery-wrap">
						<div class="image-gallery-screen__controls-wrap">
							<div class="image-gallery-screen__controls">
								<div class="image-gallery-screen__control inactive js-slider-image-gallery-inner-left" data-carousel-left="image-gallery">
									<img src="<?php echo get_template_directory_uri(); ?>/assets/img/carousel-left.svg" alt="Кнопка. Предыдущий сотрудник" class="team-screen__carousel-control-img" draggable="false">
								</div>
								<div class="image-gallery-screen__control js-slider-image-gallery-inner-right" data-carousel-right="image-gallery">
									<img src="<?php echo get_template_directory_uri(); ?>/assets/img/carousel-right.svg" alt="Кнопка. Следующий сотрудник" class="team-screen__carousel-control-img" draggable="false">
								</div>
							</div>
							<!-- /.image-gallery-screen__controls -->
						</div>
						<!-- /.image-gallery-screen__controls-wrap -->
						<div class="image-gallery-screen__gallery inner-page__gallery-from-image-gallery-screen">
							<div class="image-gallery-screen__carousel inner-page__carousel" data-carousel-name="image-gallery" data-carousel-can-be-disabled="false">
								<ul class="image-gallery-screen__carousel-wrap inner-page__carousel-wrap js-slider-image-gallery-inner">
									<?php
									$images = acf_photo_gallery('page-gallery-images', get_the_ID());
			
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
											<div class="image-gallery-screen__carousel-item inner-page__gallery-item <?php if ($iteration == 0) { echo 'active-carousel-item'; } ?>">
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
					<!-- /.inner-page__gallery -->
				<?php endif; ?>
			</div>
			<!-- /.inner-page__right-side -->
		<?php endif; ?>
	</div>
	<!-- /.inner-page__content -->
	<?php if (get_field('page-table-default')): ?>
		<?php get_template_part('template-parts/table-from-calc-data'); ?>
	<?php endif; ?>
	<?php if (!get_field('page-table-default') && get_field('page-table')): ?>
		<?php if (get_field('page-table-title')): ?>
			<div class="inner-page__table-title <?php if (get_the_content()) { echo 'inner-page__table-title_after-content'; } else { echo 'inner-page__table-title_first'; } ?>">
				<?php the_field('page-table-title'); ?>
			</div>
			<!-- /.inner-page__table-title -->
		<?php endif; ?>
		<div class="inner-page__table-section table-wrap">
			<table class="table">
				<tr class="table__line">
					<?php foreach (get_field('page-table')['header'] as $header): ?>
						<th class="table__cell table__header-label"></th>
					<?php endforeach; ?>
				</tr>
				<tr class="table__line">
					<?php foreach (get_field('page-table')['header'] as $header): ?>
						<th class="table__cell table__header"><?php echo $header['c']; ?></th>
					<?php endforeach; ?>
				</tr>
				<?php foreach (get_field('page-table')['body'] as $line): ?>
					<tr class="table__line">
						<?php foreach ($line as $cell): ?>
							<td class="table__cell"><?php echo $cell['c']; ?></td>
						<?php endforeach; ?>
					</tr>
				<?php endforeach; ?>
			</table>
			<!-- /.table -->
		</div>
		<!-- /.inner-page__table-section -->
	<?php endif; ?>
	<div class="inner-page__bottom">
		<div class="contact-screen__info inner-page__info">
			<div class="contact-screen__info-bank"><?php the_global_field('company-bank'); ?></div>
			<div class="contact-screen__info-juridical">
				<div class="contact-screen__info-juridical-left">
					<div>Р/сч <?php the_global_field('company-bank-account-number'); ?></div>
					<div>К/сч <?php the_global_field('company-bank-correspondent-number'); ?></div>
					<div>БИК <?php the_global_field('company-bik'); ?></div>
				</div>
				<!-- /.contact-screen__info-juridical-left -->
			</div>
			<!-- /.contact-screen__info-juridical -->
		</div>
		<!-- /.contact-screen__info -->
	</div>
	<!-- /.inner-page__bottom -->
</article>
<!-- /.#post-<?php the_ID(); ?> -->
