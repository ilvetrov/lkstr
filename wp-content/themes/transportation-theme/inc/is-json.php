<?php

function is_json($string)
{
  return is_string($string) && is_array(json_decode($string, true));
}