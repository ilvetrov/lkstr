<?php

function imgAsyncSrc(String $src, $scroll = true, $isBackground = false, $fullPath = false, $manual = false)
{
  $outputSrc = $fullPath ? $src : (get_template_directory_uri() . '/assets/img/' . $src);
  $serverPath = $fullPath ? (getcwd() . explode(get_site_url(), $src)[1]) : (get_template_directory() . '/assets/img/' . $src);
  if (preg_match('/\.svg$/', $src)) {
    echo " src=\"$outputSrc\" loading=\"lazy\"";
    return;
  }
  if (!$isBackground) {
    $imageSize = getimagesize($outputSrc);
    $width = $imageSize[0];
    $height = $imageSize[1];
    $blankForSrc = createBlankForSrc($width, $height);
  }
  $asyncData = [
    "scroll" => $scroll,
    "isBackground" => $isBackground,
    "manual" => $manual,
    "src" => $outputSrc,
    "size" => filesize($serverPath)
  ];

  $htmlOfBlank = !$isBackground ? 'src="' . $blankForSrc . '" loading="lazy"' : '';
  $htmlOfAsyncAttribute = 'data-async-image="' . htmlspecialchars(json_encode($asyncData)) . '"';
  
  $htmlOutput = trim($htmlOfBlank . ' ' . $htmlOfAsyncAttribute);

  echo $htmlOutput;
}

function createBlankForSrc($width, $height)
{
  return "data:image/svg+xml," . str_replace('+', '%20', urlencode(createBlank($width, $height)));
}

function createBlank($width, $height)
{
  return '<svg xmlns="http://www.w3.org/2000/svg" width="' . $width . '" height="' . $height . '"></svg>';
}