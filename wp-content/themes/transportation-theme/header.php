<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package transportation-theme
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo('charset'); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">
	<link rel="apple-touch-icon" sizes="180x180" href="<?php echo get_template_directory_uri(); ?>/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="<?php echo get_template_directory_uri(); ?>/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="<?php echo get_template_directory_uri(); ?>/favicon-16x16.png">
	<link rel="manifest" href="<?php echo get_template_directory_uri(); ?>/site.webmanifest">
	<link rel="mask-icon" href="<?php echo get_template_directory_uri(); ?>/safari-pinned-tab.svg" color="#db384e">
	<meta name="msapplication-TileColor" content="#db384e">
	<meta name="theme-color" content="#ffffff">
	
	<meta property="og:site_name" content="<?php echo esc_html(get_bloginfo('name')); ?>">
	<meta property="og:title" content="<?php echo esc_html(get_the_title()); ?>">
	<meta property="twitter:title" content="<?php echo esc_html(get_the_title()); ?>">
	<meta property="og:type" content="website">
	<meta property="og:url" content="<?php echo esc_html(get_current_url()); ?>">
	<meta property="og:locale" content="ru_RU">

	<?php if (get_post_thumbnail_id()) { ?>
		<meta property="og:image" content="<?php echo wp_get_attachment_url(get_post_thumbnail_id()); ?>">
		<meta property="twitter:image" content="<?php echo wp_get_attachment_url(get_post_thumbnail_id()); ?>">
	<?php } else if (!empty(acf_photo_gallery('page-gallery-images', get_the_ID()))) { ?>
		<meta property="og:image" content="<?php echo acf_photo_gallery('page-gallery-images', get_the_ID())[0]['full_image_url']; ?>">
		<meta property="twitter:image" content="<?php echo acf_photo_gallery('page-gallery-images', get_the_ID())[0]['full_image_url']; ?>">
	<?php } ?>

	<?php if (get_the_excerpt()) { ?>
		<meta property="og:description" content="<?php esc_html(get_the_excerpt()); ?>">
		<meta property="twitter:description" content="<?php esc_html(get_the_excerpt()); ?>">
	<?php } else if (trim(get_bloginfo('description'))) { ?>
		<meta property="og:description" content="<?php echo esc_html(get_bloginfo('description')); ?>">
		<meta property="twitter:description" content="<?php echo esc_html(get_bloginfo('description')); ?>">
	<?php } else { ?>
		<meta property="og:description" content="<?php echo esc_html(get_post_meta(get_option('page_on_front'), 'description', true)); ?>">
		<meta property="twitter:description" content="<?php echo esc_html(get_post_meta(get_option('page_on_front'), 'description', true)); ?>">
	<?php } ?>

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div id="page" class="site">
	<header id="masthead" class="site-header js-for-replace-scrollbar">
		<div class="site-header__container-size container-size">
			<div class="site-header__content">
				<div class="site-header__menu-button-wrap site-header__side">
					<div class="site-header__menu-button js-open-header-menu js-header-button-animation">
						<div class="site-header__menu-button-line"></div>
						<div class="site-header__menu-button-line site-header__menu-button-line_center"></div>
						<div class="site-header__menu-button-line"></div>
					</div>
					<!-- /.site-header__menu-button -->
				</div>
				<!-- /.site-header__menu-button-wrap -->
				<a href="/" class="site-header__logo-wrap">
					<img src="<?php echo get_template_directory_uri(); ?>/assets/img/logo.svg" alt="<?php bloginfo( 'name' ); ?>" class="site-header__logo">
				</a>
				<!-- /.site-header__logo -->

				<div class="site-header__phone site-header__side">
					<img src="<?php echo get_template_directory_uri(); ?>/assets/img/phone.svg" alt="Наш номер телефона" class="site-header__phone-icon">
					<div class="phone-block site-header__phone-block">
						<div class="phone-block__city-button">
							<?php insert_city_button([
								'fixed' => true
							]); ?>
						</div>
						<!-- /.phone-block__city-button -->
						<a href="tel:<?php echo preg_replace("/[^0-9+]/", "", esc_html(get_current_city_value('phone_number'))); ?>" class="phone not-link-style" <?php insert_cities_dependent_values('phone_number', [
							"innerText" => function(String $value)
							{
								return esc_html($value);
							},
							"href" => function(String $value)
							{
								return 'tel:' . preg_replace("/[^0-9+]/", "", esc_html($value));
							}
						]); ?>>
							<span class="phone__text"><?php echo esc_html(get_current_city_value('phone_number')); ?></span>
						</a>
						<!-- /.phone -->
					</div>
					<!-- /.phone-block -->
				</div>
				<!-- /.site-header__phone -->
				<div class="site-header__void-mobile site-header__side"></div>
			</div>
			<!-- /.site-header__content -->
		</div>
		<!-- /.site-header__container-size -->
		<div class="site-header__background-blur js-change-transform-via-scroll" style="transform: translateY(-100%);" data-scroll-mod="0.9"></div>
	</header><!-- #masthead -->
	<?php
	require get_template_directory() . '/template-parts/header-menu.php';
	require get_template_directory() . '/template-parts/cities-menu.php';
	require get_template_directory() . '/template-parts/call-pop-up.php';
	?>