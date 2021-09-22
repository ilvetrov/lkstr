<?php

function get_current_url()
{
  global $wp;
  return home_url( add_query_arg( array(), $wp->request ) );
}