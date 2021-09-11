<?php

defined('ABSPATH') or die('Cannot access pages directly.');

function add_custom_settings(){
	// register_setting('general', 'phone');
	// add_settings_field( 
	// 	'custom-setting-company-phone', 
	// 	'Номер телефона', 
	// 	'create_setting_input', 
	// 	'general', 
	// 	'default', 
	// 	array( 
	// 		'id' => 'custom-setting-company-phone', 
	// 		'option_name' => 'phone'
	// 	)
	// );
}
add_action('admin_menu', 'add_custom_settings');

function create_setting_input($val) {
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