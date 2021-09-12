<?php
/*
Plugin Name: ACF Photo Gallery Field
Plugin URI: http://www.navz.me/
Description: An extension for Advance Custom Fields which lets you add photo gallery functionality on your websites.
Version: 1.6.9
Author: Navneil Naicker
Author URI: http://www.navz.me/
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
*/

// exit if accessed directly
if( ! defined( 'ABSPATH' ) ) exit;


// check if class already exists
if( !class_exists('acf_plugin_photo_gallery') ) :

	class acf_plugin_photo_gallery{
			
		// vars
		var $settings;

		/*
		*  __construct
		*
		*  This function will setup the class functionality
		*
		*  @type	function
		*  @date	17/02/2016
		*  @since	1.0.0
		*
		*  @param	n/a
		*  @return	n/a
		*/
		
		function __construct() {
			
			// vars
			$this->settings = array(
				'version'	=> '1.6.9',
				'url'		=> plugin_dir_url( __FILE__ ),
				'path'		=> plugin_dir_path( __FILE__ )
			);
			
			// set text domain
			// https://codex.wordpress.org/Function_Reference/load_plugin_textdomain
			load_plugin_textdomain( 'acf-photo_gallery', false, plugin_basename( dirname( __FILE__ ) ) . '/lang' ); 
			
			add_action( 'admin_enqueue_scripts', array($this, 'acf_photo_gallery_sortable') );			
			
			// include field
			add_action('acf/include_field_types', array($this, 'include_field_types')); // v5
			add_action('acf/register_fields', array($this, 'include_field_types')); // v4

			//Pull the caption from attachment caption field
			add_filter( 'acf_photo_gallery_caption_from_attachment', '__return_false' );
			
			//Add support for REST API
			add_filter("rest_prepare_page", array($this, 'rest_prepare_post'), 10, 3);

		}
		
		//Add in jquery-ui-sortable script
		function acf_photo_gallery_sortable($hook) {
			if ( 'post.php' == $hook ) { wp_enqueue_script( 'jquery-ui-sortable', 'jquery-ui-sortable', 'jquery', '9999', true); }
		}

		/*
		*  include_field_types
		*
		*  This function will include the field type class
		*
		*  @type	function
		*  @date	17/02/2016
		*  @since	1.0.0
		*
		*  @param	$version (int) major ACF version. Defaults to false
		*  @return	n/a
		*/
		
		function include_field_types( $version = false ) {
			
			// support empty $version
			if( !$version ) $version = 4;
			
			// include
			include_once('fields/acf-photo_gallery-v' . $version . '.php');
			
		}

		function rest_prepare_post( $data, $post, $request ){
			$images = array();
			$field_groups = acf_get_field_groups(array('post_id' => $post->ID));
			foreach ( $field_groups as $group ){
				$fields = get_posts(array(
					'posts_per_page' => -1,
					'post_type' => 'acf-field',
					'orderby' => 'menu_order',
					'order' => 'ASC',
					'suppress_filters' => true,
					'post_parent' => $group['ID'],
					'post_status' => 'publish',
					'update_post_meta_cache' => false
				));
				foreach ( $fields as $field ) {
					$object = get_field_object($field->post_name);
					if( $object['type'] == 'photo_gallery' ){
						$images[] = acf_photo_gallery($object['name'], $post->ID);
						$data->data['acf']['photo_gallery'][$object['name']] = $images;
					}
				}
			}
			return $data;
		}

	}

	// initialize
	new acf_plugin_photo_gallery();

// class_exists check
endif;

//Helper function for pulling the images
require_once( dirname(__FILE__) . '/includes/acf_photo_gallery.php' );

//Resizes the image
require_once( dirname(__FILE__) . '/includes/acf_photo_gallery_resize_image.php' );

//Set the default fields for the edit gallery
require_once( dirname(__FILE__) . '/includes/acf_photo_gallery_image_fields.php' );

//Metabox for the photo edit
require_once( dirname(__FILE__) . '/includes/acf_photo_gallery_edit.php' );

add_action('admin_notices', 'acf_pgf_admin_notice');
function acf_pgf_admin_notice(){
	if( get_option('acf-pgf-dnt-show-msg') == 'yes' ){ ?>
	<div class="notice notice-info is-dismissible">
		<p>ACF Photo Gallery Field is a free to use plugin. It would be nice you could donate $5.00 USD to help in future development of this plugin. To donate please 
		<a href="http://shop.navz.me/donation" 
		   target="_blank" 
		   style="background:#E14D43;color:#fff;text-decoration: none;padding: 5px 12px;border-radius: 3px;margin-left: 5px;">Click here</a> |
		<a href="<?php echo admin_url('admin-ajax.php?action=acf_pgf_dnt_msg_never&nonce='.wp_create_nonce("navz-photo-gallery/navz-photo-gallery.php")); ?>" 
			class="acf-pgf-dnt-msg-never">Don't show me again</a>
		</p>
	</div>
<?php 	}
}

add_action('upgrader_process_complete', 'acf_pgf_upgrader_process_complete',10, 2);
function acf_pgf_upgrader_process_complete($upgrader_object, $options){
	$current_plugin_path_name = 'navz-photo-gallery/navz-photo-gallery.php';
	if ($options['action'] == 'update' && $options['type'] == 'plugin'){
		foreach($options['plugins'] as $each_plugin){
			if ($each_plugin == $current_plugin_path_name){
				update_option('acf-pgf-dnt-show-msg', 'yes');
			}
		}
	}
}

add_action("wp_ajax_acf_pgf_dnt_msg_never", "acf_pgf_dnt_msg_never");
function acf_pgf_dnt_msg_never(){
	update_option('acf-pgf-dnt-show-msg', 'no');
	wp_redirect($_SERVER['HTTP_REFERER']);
	die();
}

add_filter('cron_schedules', 'acf_pgf_schedules');
function acf_pgf_schedules($schedules){
	$schedules['acf_pgf_cron_weekly'] = array('interval' => 604800, 'display' => 'Once Weekly');
	return $schedules;
}

if (!wp_next_scheduled('acf_pgf_cron_weekly')){
	wp_schedule_event(1481799444, 'acf_pgf_cron_weekly', 'acf_pgf_cron_weekly');
}

add_action('acf_pgf_cron_weekly', 'acf_pgf_cron_weekly_exec');
function acf_pgf_cron_weekly_exec(){
	update_option('acf-pgf-dnt-show-msg', 'yes');
}