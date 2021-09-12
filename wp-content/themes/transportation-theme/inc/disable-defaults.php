<?php

function disable_embeds_code_init() {
	remove_action('rest_api_init', 'wp_oembed_register_route');
	add_filter('embed_oembed_discover', '__return_false');
	remove_filter('oembed_dataparse', 'wp_filter_oembed_result', 10);
	remove_action('wp_head', 'wp_oembed_add_discovery_links');
	remove_action('wp_head', 'wp_oembed_add_host_js');
	add_filter('tiny_mce_plugins', 'disable_embeds_tiny_mce_plugin');
	add_filter('rewrite_rules_array', 'disable_embeds_rewrites');
	remove_filter('pre_oembed_result', 'wp_filter_pre_oembed_result', 10);
}
add_action('init', 'disable_embeds_code_init', 9999);

function disable_embeds_tiny_mce_plugin($plugins) {
	return array_diff($plugins, array('wpembed'));
}

function disable_embeds_rewrites($rules) {
	foreach($rules as $rule => $rewrite) {
		if (false !== strpos($rewrite, 'embed=true')) {
			unset($rules[$rule]);
		}
	}
	return $rules;
}

function deregister_embed_script() {
	wp_dequeue_script('wp-embed');
}
add_action('wp_footer', 'deregister_embed_script');

function disable_emojis() {
	remove_action('wp_head', 'print_emoji_detection_script', 7);
	remove_action('admin_print_scripts', 'print_emoji_detection_script');
	remove_action('wp_print_styles', 'print_emoji_styles');
	remove_action('admin_print_styles', 'print_emoji_styles'); 
	remove_filter('the_content_feed', 'wp_staticize_emoji');
	remove_filter('comment_text_rss', 'wp_staticize_emoji'); 
	remove_filter('wp_mail', 'wp_staticize_emoji_for_email');
	add_filter('tiny_mce_plugins', 'disable_emojis_tinymce');
	add_filter('wp_resource_hints', 'disable_emojis_remove_dns_prefetch', 10, 2);
}
add_action('init', 'disable_emojis');

function disable_emojis_tinymce($plugins) {
	if (is_array($plugins)) {
	return array_diff($plugins, array('wpemoji'));
	} else {
	return array();
	}
}

function disable_emojis_remove_dns_prefetch($urls, $relation_type) {
	if ('dns-prefetch' == $relation_type) {
	$emoji_svg_url = apply_filters('emoji_svg_url', 'https://s.w.org/images/core/emoji/2/svg/');

	$urls = array_diff($urls, array($emoji_svg_url));
	}

	return $urls;
}

// add_action('wp_print_styles', 'deregister_dashicons', 100);

// function deregister_dashicons() {
// 	wp_deregister_style('dashicons'); 
// }

function wpassist_remove_block_library_css() {
	wp_dequeue_style('wp-block-library');
}
add_action('wp_enqueue_scripts', 'wpassist_remove_block_library_css');

function deregister_comment_reply_scripts() {
	wp_deregister_script('comment-reply');
}
add_action('init', 'deregister_comment_reply_scripts');