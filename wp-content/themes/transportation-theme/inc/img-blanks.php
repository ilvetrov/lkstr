<?php

function imgAsyncSrc($src, $scroll = true, $type = 'img', $fullPath = false)
{
  if ($fullPath) {
    $webPath = $src;
    
    $explodedFullPath = explode(get_site_url(), $src);
    $serverPath = getcwd() . $explodedFullPath[1];
  } else {
    $webPath = get_template_directory_uri() . '/assets/img/' . $src;
    $serverPath = get_template_directory() . '/assets/img/' . $src;
  }

  $explodedSrc = explode('.', $src);
  $extension = $explodedSrc[count($explodedSrc) - 1];
  $attributeName = 'data-async';

  if ($scroll) {
    $attributeName = $attributeName . '-scroll';
  }
  $attributeName = $attributeName . '-' . $type;

  if ($extension == 'svg' && $type != 'background') {
    echo 'src="'. $webPath .'"';
  } else {
    if ($type != 'background') {
      $sizes = getimagesize($serverPath);
      $srcPart = ' src="' . getImgBlank($sizes) . '"';
    } else {
      $srcPart = '';
    }
    
    echo $attributeName . '="'. $webPath .'"' . $srcPart;
  }
}

function getImgBlank($sizes)
{
  if ($sizes != NULL) {
    $width = $sizes[0];
    $height = $sizes[1];

    $dirPath = get_template_directory() . '/assets/img/blanks';
    $filesInDir = scandir($dirPath);
    $fileName = 'blank-' . $width . 'x' . $height . '.svg';

    if (!in_array($fileName, $filesInDir)) {
      $creatingFile = fopen($dirPath . '/' . $fileName, 'w+');
      $data = '<svg xmlns="http://www.w3.org/2000/svg" width="' . $width . '" height="' . $height . '"></svg>';
      fwrite($creatingFile, $data);
      fclose($creatingFile);
    }
    
    return get_template_directory_uri() . '/assets/img/blanks/' . $fileName;
  }
}