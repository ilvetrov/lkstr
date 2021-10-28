<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package transportation-theme
 */

get_header();
?>

	<main id="primary" class="site-main inner-page" <?php imgAsyncSrc('inner-page-text-background.jpg', false, true); ?>>
		<div class="container-size">
			<div class="inner-page__wrap">
				<section class="error-404 not-found">
					<div class="inner-page__content">

						<div class="inner-page__left-side">
							<div class="inner-page__left-side-top">
								<h1 class="inner-page__title">Ничего не найдено</h1>
								<div class="inner-page__text">
									<p>
										Такой страницы не существует. Попробуйте вернуться на <a href="/">главную</a>
									</p>
								</div>
								<!-- /.inner-page__text -->
							</div>
							<!-- /.inner-page__left-side-top -->
						</div>
						<!-- /.inner-page__left-side -->
					</div>
					<!-- /.inner-page__content -->
				</section>
				<!-- /.inner-page__content -->
			</div>
			<!-- /.inner-page__wrap -->
	</main><!-- #main -->

<?php
get_footer();
