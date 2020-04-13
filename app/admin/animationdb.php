<?php
include_once 'dataheader.php';
$root = "../resources/animations";
$response = array();

function getDirContents($dir, &$results = array())
{
    $files = scandir($dir);
    foreach ($files as $key => $value) {
        $path = realpath($dir . DIRECTORY_SEPARATOR . $value);
        if (!is_dir($path)) {
            if (strpos($path, '.png') !== false) {
                $data = explode(".", $value)[0];
                $url = explode("animations", $path);
                $directory = explode("\\", $path)[count(explode("\\", $path)) - 2];
                $url = str_replace("\\", "/", $url[1]);
                $url = "../resources/animations$url";
                $prop = array(
                    "url" => $url,
                    "file" => str_replace('.png', '', $value)
                );
                $results[$directory][] = $prop;
            }
        } else if ($value != "." && $value != "..") {
            getDirContents($path, $results);
        }
    }


    return $results;
}

try {
    getDirContents($root, $response);
    die(json_encode($response));
} catch (Exception $e) {
    $response["exception"] = $e;
    $response["message"] = $e->getMessage();
    die(json_encode($response));
}

