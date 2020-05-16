<?php
include_once 'dataheader.php';
$root = "{$GLOBALS['resourcesFolder']}tilesets";
$response = array();

function getDirContents($dir, &$results = array())
{
    $files = scandir($dir);
    foreach ($files as $key => $value) {
        $path = realpath($dir . DIRECTORY_SEPARATOR . $value);
        if (!is_dir($path)) {
            if (strpos($path, '.png') !== false) {
                $data = explode(".", $value)[0];
                $data = explode("_", $data);
                $url = explode("tilesets", $path);
                $url = str_replace("\\", "/", $url[1]);
                $url = "{$GLOBALS['resourcesFolder']}tilesets$url";
                //var_dump($data);
                $prop = array(
                    "url" => $url,
                    "file" => $value,
                    "part" => $data["0"] ?? null,
                    "item" => $data["1"],
                );
                $results[$prop["part"]][$prop["item"]] = $prop;
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

