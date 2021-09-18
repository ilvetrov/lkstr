<?php
defined('ABSPATH') or die('Cannot access pages directly.');
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html lang="ru">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width">
</head>

<body border="0" style="margin:0; padding:0; font-family: Arial, sans-serif;">
  <table border="0" cellpadding="0" cellspacing="0" style="margin:0; padding:0" width="100%">
    <tr>
      <td align="center">
        <center style="max-width: 600px; width: 100%;">
          <!--[if gte mso 9]>
          <table border="0" cellpadding="0" cellspacing="0" style="margin:0; padding:0"><tr><td>
          <![endif]-->
          <table border="0" cellpadding="0" cellspacing="0" style="margin:0; padding:0" width="100%">
            <tr>
              <td>
                <table border="0" cellpadding="0" cellspacing="0" style="padding: 65px 15px;">

                  <tr>
                    <td align="center">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" align="center">
                        <tr>
                          <td style="font-size: 16px; letter-spacing: 0.05em; line-height: 24px;">
                            Заявка с сайта 
                            <a href="https://<?php echo $_SERVER['SERVER_NAME']; ?>" style="color: #333333; font: 16px Arial, sans-serif; line-height: 24px; letter-spacing: 0.05em; -webkit-text-size-adjust:none;" target="_blank"><?php echo $_SERVER['SERVER_NAME']; ?></a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td align="center">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" align="center">
                        <tr>
                          <td style="font-size: 35px; font-weight: 700; padding: 25px 0 0 0; line-height: 38px; word-break: break-word;">
                            <?php echo esc_html($name); ?>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 15px 0 10px 0;">
                            <a href="tel:<?php echo preg_replace("/[^0-9+]/", "", esc_html($phone)); ?>" style="color: #bb00ff; font: 20px Arial, sans-serif; line-height: 24px; -webkit-text-size-adjust:none; display: block; text-decoration: none; word-break: break-word;" target="_blank"><?php echo $phone; ?></a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <?php if (carbon_get_theme_option('selected_city_text_turn_on')): ?>
                    <tr>
                      <td align="center">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" align="center">
                          <tr>
                            <td style="padding: 20px 0 10px 0;">
                              <span><?php echo carbon_get_theme_option('selected_city_text'); ?>: </span><span style="font-weight: 700;"><?php echo get_current_city_value('name'); ?></span>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  <?php endif; ?>

                  <?php if (empty(@$additional['calc_data']) || $additional['calc_data']['is_empty']): ?>
                    <tr>
                      <td align="center">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" align="center">
                          <tr>
                            <td style="padding: 20px 0 0 0; font-size: 14px;">
                              <span>Клиент не указал данных по доставке.</span>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  <?php endif; ?>

                  <?php if (!empty(@$additional['calc_data']) && !$additional['calc_data']['is_empty']): ?>

                    <?php if (!$additional['calc_data']['all_data_is_filled']): ?>
                      <tr>
                        <td align="center">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" align="center">
                            <tr>
                              <td style="padding: 20px 0 0 0;">
                                <span style="color: #ff0000;">Клиент заполнил данные не полностью.</span>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    <?php endif; ?>
  
                    <?php if (!empty(@$additional['calc_data']['sending_city'])): ?>
                      <tr>
                        <td align="center">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" align="center">
                            <tr>
                              <td style="padding: 20px 0 0 0;">
                                <span style="font-weight: 700;">Отправление:</span>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 7px 0 0 0;">
                                <?php echo esc_html($additional['calc_data']['sending_city']); ?>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    <?php endif; ?>

                    <?php if (!empty(@$additional['calc_data']['recipient_city'])): ?>
                      <tr>
                        <td align="center">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" align="center">
                            <tr>
                              <td style="padding: 20px 0 0 0;">
                                <span style="font-weight: 700;">Прибытие:</span>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 7px 0 0 0;">
                                <?php echo esc_html($additional['calc_data']['recipient_city']); ?>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    <?php endif; ?>

                    <?php if (!empty(@$additional['calc_data']['volume'])): ?>
                      <tr>
                        <td align="center">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" align="center">
                            <tr>
                              <td style="padding: 20px 0 0 0;">
                                <span style="font-weight: 700;">Объём:</span>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 7px 0 0 0;">
                                <?php echo esc_html($additional['calc_data']['volume']); ?> м³ <?php if ($additional['calc_data']['volume'] < 1) echo '(расчёт по 1 м³)'; ?>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    <?php endif; ?>

                    <?php if (!empty(@$additional['calc_data']['weight'])): ?>
                      <tr>
                        <td align="center">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" align="center">
                            <tr>
                              <td style="padding: 20px 0 0 0;">
                                <span style="font-weight: 700;">Вес:</span>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 7px 0 0 0;">
                                <?php echo esc_html($additional['calc_data']['weight']); ?> кг
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    <?php endif; ?>

                    <?php if ($additional['calc_data']['all_data_is_filled']): ?>
                      <?php if (!empty(@$additional['calc_data']['calculated_tariff']) && carbon_get_theme_option('tariff_in_mail')): ?>
                        <tr>
                          <td align="center">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" align="center">
                              <tr>
                                <td style="padding: 20px 0 0 0;">
                                  <span style="font-weight: 700;">Тариф</span>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding: 7px 0 0 0;">
                                  <?php echo esc_html($additional['calc_data']['calculated_tariff']); ?>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      <?php endif; ?>
  
                      <?php if (!empty(@$additional['calc_data']['calculated_price']) && carbon_get_theme_option('price_in_mail')): ?>
                        <tr>
                          <td align="center">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" align="center">
                              <tr>
                                <td style="padding: 30px 0 0 0;">
                                  <span style="font-weight: 700;">Цена</span>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding: 7px 0 0 0;">
                                  <?php echo esc_html($additional['calc_data']['calculated_price']); ?> ₽
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      <?php endif; ?>
                    <?php endif; ?>

                    <?php if (!empty(@$additional['calc_data']['refine_the_data']) && carbon_get_theme_option('refine_calc_data')): ?>
                      <tr>
                        <td align="center">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" align="center">
                            <tr>
                              <td style="padding: 30px 0 0 0; font-weight: 700;">
                                <span style="color: #ff0000;">• <?php echo carbon_get_theme_option('refine_calc_data_title'); ?></span>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 7px 0 0 0;">
                                <span><?php echo carbon_get_theme_option('refine_calc_data_text'); ?></span>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    <?php endif; ?>

                  <?php endif; ?>

                  <tr>
                    <td align="center" style="padding: 42px 0 0 0;">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" align="center" bgcolor="#ff88ff">
                        <tr style="height: 5px;">
                        </tr>
                      </table>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
          <!--[if gte mso 9]>
          </td></tr></table>
          <![endif]-->
        </center>
      </td>
    </tr>
  </table>
</body>

</html>