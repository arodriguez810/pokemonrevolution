<?php
include_once 'dataheader.php';
$root = "../resources/colors";
$response = array();

function getDirContents($dir, &$results = array())
{
    $root = "../resources/colors";
    $files = scandir($dir);
    $numbers = array();
    foreach ($files as $key => $value) {
        $path = realpath($dir . DIRECTORY_SEPARATOR . $value);
        if (strpos($path, '.png') !== false) {
            $url = explode("colors", $path);
            $url = str_replace("\\", "/", $url[1]);
            array_push($numbers, str_replace(".png", "", $value));
            $url = "$root$url";

            //array_push($results, $url);
        }
    }
    sort($numbers);
    foreach ($numbers as $key => $value) {
        $path = realpath($dir . DIRECTORY_SEPARATOR . $value . ".png");
        $url = explode("colors", $path);
        $url = str_replace("\\", "/", $url[1]);
        array_push($results, "$root$url");
    }
}

try {
    getDirContents($root, $response);
    die(json_encode($response));
} catch (Exception $e) {
    $response["exception"] = $e;
    $response["message"] = $e->getMessage();
    die(json_encode($response));
}

