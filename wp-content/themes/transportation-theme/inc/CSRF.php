<?php

class CSRF
{
  private static $encryptKey = '9Nf@JpOiKJEd';
  private static $currentCsrfSecret;

  public static function createToken()
  {
    $randomString = self::getRandomHash(4);
    $csrfToken = self::createTokenViaKey($randomString);
    return $csrfToken;
  }

  private static function createTokenViaKey($key)
  {
    $csrfSecret = self::getCurrentDecryptedCsrfSecret();
    return $key . ':' . sha1($key . $csrfSecret . sha1($key));
  }

  public static function checkToken($token)
  {
    if (!is_null($token) && $token != '' && trim($token) != '' && self::getCurrentDecryptedCsrfSecret() != false) {
      $publicKey = explode(':', $token)[0];
      $createdTokenWithUserCsrfSecret = self::createTokenViaKey($publicKey);
      return $createdTokenWithUserCsrfSecret === $token;
    } else {
      return false;
    }
  }

  public static function getCurrentToken()
  {
    if (isset($_GET['token'])) {
      return $_GET['token'];
    } else if (isset($_POST['token'])) {
      return $_POST['token'];
    } else {
      return NULL;
    }
  }

  public static function csrfSecretToCookie()
  {
    $doubleEncryptedCsrfSecret = self::createEncryptedCsrfSecret();

    setcookie('hash', $doubleEncryptedCsrfSecret, time()+60*60*12, '/', '', false, true);

    self::$currentCsrfSecret = $doubleEncryptedCsrfSecret;
  }

  public static function createEncryptedCsrfSecret()
  {
    $csrfSecret = self::getRandomHash(15);
    $initVector = self::getRandomHash(16);
    $encryptedCsrfSecret = base64_encode(openssl_encrypt($csrfSecret, 'AES-256-CTR', self::$encryptKey, true, $initVector));

    $encryptedCsrfSecretInHalves = [substr($encryptedCsrfSecret, 0, 10), substr($encryptedCsrfSecret, 10)];
    $doubleEncryptedCsrfSecret = $encryptedCsrfSecretInHalves[1] . $initVector . $encryptedCsrfSecretInHalves[0];

    return $doubleEncryptedCsrfSecret;
  }

  public static function getCurrentDecryptedCsrfSecret()
  {
    $doubleEncryptedCsrfSecret = self::getCurrentDoubleEncryptedCsrfSecret();

    if ($doubleEncryptedCsrfSecret === false) {
      return false;
    }

    $encryptedCsrfSecretInHalves = [substr($doubleEncryptedCsrfSecret, 26), substr($doubleEncryptedCsrfSecret, 0, 10)];
    $initVector = substr($doubleEncryptedCsrfSecret, 10, 16);

    $encryptedCsrfSecret = $encryptedCsrfSecretInHalves[0] . $encryptedCsrfSecretInHalves[1];
    $csrfSecret = openssl_decrypt(base64_decode($encryptedCsrfSecret), 'AES-256-CTR', self::$encryptKey, true, $initVector);
    
    return $csrfSecret;
  }

  public static function getCurrentDoubleEncryptedCsrfSecret()
  {
    if (!empty(self::$currentCsrfSecret)) {
      $doubleEncryptedCsrfSecret = self::$currentCsrfSecret;
    } else if (!empty(@$_COOKIE['hash'])) {
      $doubleEncryptedCsrfSecret = @$_COOKIE['hash'];
    } else {
      return false;
    }

    return $doubleEncryptedCsrfSecret;
  }

  public static function tokenToCookie()
  {
    setcookie('csrf_token', self::createToken(), time()+60*60*12, '/', '', false, false);
  }

  public static function getRandomHash($length = 30)
  {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
      $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
  }

  public static function init()
  {
    if (self::getCurrentDoubleEncryptedCsrfSecret() === false) {
      self::csrfSecretToCookie();
    }
  }
}
