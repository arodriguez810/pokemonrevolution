<?php
include_once 'dataheader.php';
$root = "{$GLOBALS['resourcesFolder']}character";
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
                $url = explode("character", $path);
                $gender = explode("\\", $path)[count(explode("\\", $path)) - 2];
                $url = str_replace("\\", "/", $url[1]);
                $url = "{$GLOBALS['resourcesFolder']}character$url";
                //var_dump($data);
                $prop = array(
                    "url" => $url,
                    "file" => $value,
                    "part" => $data["0"] ?? null,
                    "category" => $data["1"],
                    "item" => $data["2"] ?? null,

                    "layerNum" => str_replace("c", "", $data["3"] ?? 1),
                    "model" => $data["4"] ?? "m000"
                );
                if (isset($data["3"])) {
                    $prop["layer"] = ($data["3"] == "c" ? "c1" : $data["3"]);
                } else {
                    $prop["layer"] = "c1";
                }
                $results[$gender][$prop["part"]][$prop["category"]][$prop["item"]][$prop["layer"]] = $prop;
            }
        } else if ($value != "." && $value != "..") {
            getDirContents($path, $results);
        }
    }


    return $results;
}

try {
    getDirContents($root, $response);
    foreach ($response["Male"]["FG"]["Eyes"] as $key => $value) {
        foreach (array('SV', 'TV', 'TVD') as $i => $v) {
            $response["Female"][$v]["Eyes"][$key] = $response["Female"][$v]["Eyes"]["p01"];
            $response["Male"][$v]["Eyes"][$key] = $response["Male"][$v]["Eyes"]["p01"];
        }
    }
    die(json_encode($response));
} catch (Exception $e) {
    $response["exception"] = $e;
    $response["message"] = $e->getMessage();
    die(json_encode($response));
}

