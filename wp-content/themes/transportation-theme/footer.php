<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package transportation-theme
 */

?>

	<?php if (false): ?>
	<footer id="colophon" class="site-footer">
		
	</footer>
	<!-- #colophon -->
	<?php endif; ?>
	<script>var callPopUpPhoneMask = <?php echo get_global_field('call-pop-up-phone-mask') ? 'true' : 'false'; ?>;</script>
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
