<?php

function sendMail($name, $phone, Array $additional = [])
{
  $recipients = get_global_field('call-pop-up-recipients');
  if ($recipients) {
    $emailSubject = get_global_field('call-pop-up-email-subject') ? get_global_field('call-pop-up-email-subject') : 'Новая заявка с сайта lkstr.ru';

    return wp_mail($recipients, $emailSubject, getMailHtml($name, $phone, $additional), [
      'content-type' => 'text/html'
    ]);
  }
}
function getMailHtml($name, $phone, Array $additional = [])
{
  ob_start();
  require get_template_directory() . '/template-parts/mail.php';
  return ob_get_clean();
}