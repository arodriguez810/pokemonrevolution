<?php
include_once 'dataheader.php';
$root = "{$GLOBALS['resourcesFolder']}animations/System";
$response = array();

function getDirContents($dir, &$results = array())
{
    $root = "{$GLOBALS['resourcesFolder']}animations/System";
    $fileType = "png";
    $files = scandir($dir);
    $numbers = array();
    foreach ($files as $key => $value) {
        $path = realpath($dir . DIRECTORY_SEPARATOR . $value);
        if (strpos($path, '.' . $fileType) !== false) {
            $url = explode("animations\System", $path);
            $url = str_replace("\\", "/", $url[1]);
            array_push($numbers, str_replace("." . $fileType, "", $value));
            $url = "$root$url";
            array_push($results, $url);
        }
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

