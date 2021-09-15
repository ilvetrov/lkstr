<?php

class Controller
{
  static protected function load_view(String $path, Array $variables = [])
  {
    extract($variables, EXTR_OVERWRITE);
    require get_template_directory() . $path;
  }
}