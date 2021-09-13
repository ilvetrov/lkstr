<?php
/**
 * transportation-theme functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package transportation-theme
 */

if ( ! defined( '_S_VERSION' ) ) {
	// Replace the version number of the theme on each release.
	define( '_S_VERSION', '2.1.1' );
}

if ( ! function_exists( 'transportation_theme_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function transportation_theme_setup() {
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on transportation-theme, use a find and replace
		 * to change 'transportation-theme' to the name of your theme in all the template files.
		 */
		load_theme_textdomain( 'transportation-theme', get_template_directory() . '/languages' );

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		// This theme uses wp_nav_menu() in one location.
		register_nav_menus(
			array(
				'first-screen-services' => esc_html__( 'Услуги на первом экране', 'transportation-theme' ),
				'social-networks-on-bottom' => esc_html__( 'Социальные сети внизу некоторых экранов', 'transportation-theme' ),
				'header-menu' => esc_html__( 'Подробное меню шапки', 'transportation-theme' ),
			)
		);

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support(
			'html5',
			array(
				'search-form',
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
				'style',
				'script',
			)
		);

		// Set up the WordPress core custom background feature.
		add_theme_support(
			'custom-background',
			apply_filters(
				'transportation_theme_custom_background_args',
				array(
					'default-color' => 'ffffff',
					'default-image' => '',
				)
			)
		);

		// Add theme support for selective refresh for widgets.
		add_theme_support( 'customize-selective-refresh-widgets' );

		/**
		 * Add support for core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
		add_theme_support(
			'custom-logo',
			array(
				'height'      => 250,
				'width'       => 250,
				'flex-width'  => true,
				'flex-height' => true,
			)
		);
	}
endif;
add_action( 'after_setup_theme', 'transportation_theme_setup' );

function set_mail_content_type() {
	return "text/html";
}
add_filter('wp_mail_content_type', 'set_mail_content_type');

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function transportation_theme_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'transportation_theme_content_width', 640 );
}
add_action( 'after_setup_theme', 'transportation_theme_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function transportation_theme_widgets_init() {
	register_sidebar(
		array(
			'name'          => esc_html__( 'Услуги на первом экране', 'transportation-theme' ),
			'id'            => 'first-screen-services',
			'description'   => esc_html__( 'Редактируйте услуги здесь. Не добавляйте заголовок. Чтобы работала ссылка, после редактирования в панели "Текст" переместите "</a>" в самый конец.', 'transportation-theme' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<span class="disabled">',
			'after_title'   => '</span>',
		)
	);
}
add_action( 'widgets_init', 'transportation_theme_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function transportation_theme_scripts() {
	wp_enqueue_style( 'transportation-theme-united-styles', get_template_directory_uri() . '/assets/css/styles.css', array(), _S_VERSION );
	wp_enqueue_script( 'transportation-theme-united-scripts', get_template_directory_uri() . '/assets/js/scripts.js', array(), _S_VERSION, true );
}
add_action( 'wp_enqueue_scripts', 'transportation_theme_scripts' );

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Images blanks.
 */
require get_template_directory() . '/inc/img-blanks.php';

require get_template_directory() . '/inc/carbon-fields/index.php';

require get_template_directory() . '/inc/get-cities.php';

require get_template_directory() . '/inc/acf-to-admin-menu.php';

require get_template_directory() . '/inc/lead-to-mail.php';

require get_template_directory() . '/inc/CSRF.php';
CSRF::init();

require get_template_directory() . '/inc/post-requests.php';

require get_template_directory() . '/inc/calc-table-processor.php';

require get_template_directory() . '/inc/disable-defaults.php';

/**
 * Load Jetpack compatibility file.
 */
if ( defined( 'JETPACK__VERSION' ) ) {
	require get_template_directory() . '/inc/jetpack.php';
}

add_image_size('service-size-110x100', 110, 100, true);
add_image_size('employee-size-272x200', 272, 200, true);

if (is_admin()) {
	add_filter('filesystem_method', function($a)
	{
		return "direct";
	});
	define( 'FS_CHMOD_DIR', 0764 );
}

function register_post_types()
{
	$cities = get_cities();
	
	register_post_type('employee', [
		'labels' => [
			'menu_name' => 'Сотрудники',
			'name' => 'Сотрудники (все города)',
			'singular_name' => 'Сотрудник (все города)',
			'add_new' => 'Добавить нового для всех городов',
			'add_new_item' => 'Добавить нового сотрудника (все города)',
			'edit_item' => 'Редактировать информацию о сотруднике (для всех городов)',
			'new_item' => 'Новый сотрудник',
			'view_item' => 'Посмотреть информацию о сотруднике',
			'search_items' => 'Найти сотрудника',
			'not_found' => 'Сотрудники не были найдены',
			'not_found_in_trash' => 'Сотрудники не были найдены в корзине',
		],
		'description' => 'Сотрудники компании. Отображаются в блоке «Наша команда»',
		'public' => false,
		'show_ui' => true,
		'menu_position' => 22,
		'menu_icon' => 'dashicons-groups',
		'supports' => [
			'title',
			'thumbnail',
			'custom-fields',
			'revisions',
		],
		'has_archive' => true,
		'rewrite' => false,
		'query_var' => false,
		'delete_with_user' => false,
	]);

	foreach ($cities as $city) {
		register_post_type($city['employee_name'], [
			'labels' => [
				'menu_name' => $city['name'],
				'name' => 'Сотрудники • ' . $city['name'] . ' • code: ' . $city['code_name'] . '',
				'singular_name' => 'Сотрудник • ' . $city['name'],
				'add_new' => 'Добавить нового',
				'add_new_item' => 'Добавить нового сотрудника',
				'edit_item' => 'Редактировать информацию о сотруднике • ' . $city['name'],
				'new_item' => 'Новый сотрудник города ' . $city['name'] . '',
				'view_item' => 'Посмотреть информацию о сотруднике города ' . $city['name'] . '',
				'search_items' => 'Найти сотрудника города ' . $city['name'] . '',
				'not_found' => 'Сотрудники города ' . $city['name'] . ' не были найдены',
				'not_found_in_trash' => 'Сотрудники города ' . $city['name'] . ' не были найдены в корзине',
			],
			'description' => 'Сотрудники компании города ' . $city['name'] . '. Отображаются в блоке «Наша команда» при выборе своего города',
			'public' => false,
			'show_ui' => true,
			'show_in_menu' => 'edit.php?post_type=employee',
			'supports' => [
				'title',
				'thumbnail',
				'custom-fields',
				'revisions',
			],
			'has_archive' => true,
			'rewrite' => false,
			'query_var' => false,
			'delete_with_user' => false,
		]);
	}
}
add_action('init', 'register_post_types');

require get_template_directory() . '/inc/shortcodes.php';

// Custom settings
function add_custom_settings(){
	register_setting('general', 'phone');
	add_settings_field( 
		'custom-setting-company-phone', 
		'Номер телефона', 
		'create_setting_input', 
		'general', 
		'default', 
		array( 
			'id' => 'custom-setting-company-phone', 
			'option_name' => 'phone'
		)
	);
}
add_action('admin_menu', 'add_custom_settings');

function create_setting_input( $val ){
	$id = $val['id'];
	$option_name = $val['option_name'];
	?>
	<input 
		type="text" 
		name="<? echo $option_name ?>" 
		id="<? echo $id ?>" 
		value="<? echo esc_attr( get_option($option_name) ) ?>" 
	/>
	<?php
}

function getSendingCitiesFromTableArray($tableArray)
{
	$cities = [];
	foreach ($tableArray as $path) {
		$city = $path[0]['c'];
		if (!in_array($city, $cities)) {
			$cities[] = $city;
		}
	}
	return $cities;
}