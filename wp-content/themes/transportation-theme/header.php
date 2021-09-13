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
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">
	<link rel="apple-touch-icon" sizes="180x180" href="<?php echo get_template_directory_uri(); ?>/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="<?php echo get_template_directory_uri(); ?>/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="<?php echo get_template_directory_uri(); ?>/favicon-16x16.png">
	<link rel="manifest" href="<?php echo get_template_directory_uri(); ?>/site.webmanifest">
	<link rel="mask-icon" href="<?php echo get_template_directory_uri(); ?>/safari-pinned-tab.svg" color="#db384e">
	<meta name="msapplication-TileColor" content="#db384e">
	<meta name="theme-color" content="#ffffff">

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
							<?php require get_template_directory() . '/template-parts/city-button.php'; ?>
						</div>
						<!-- /.phone-block__city-button -->
						<a href="tel:<?php echo preg_replace("/[^0-9+]/", "", esc_html(get_global_field('company-phone'))); ?>" class="phone not-link-style">
							<span class="phone__text"><?php echo esc_html(get_global_field('company-phone')); ?></span>
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
	require get_template_directory() . '/template-parts/call-pop-up.php';
	?>