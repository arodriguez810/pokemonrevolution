<?php
include_once 'dataheader.php';
try {
    if ($data) {
        $newresponse = array();
        if ($data->folder) {
            if (!is_dir("{$GLOBALS['dataFolder']}$data->folder"))
                die(json_encode($response));

            @$filesInFolder = scandir("{$GLOBALS['dataFolder']}$data->folder");
            if (@$filesInFolder) {
                array_shift($filesInFolder);
                array_shift($filesInFolder);
                foreach ($filesInFolder as $key => $value) {
                    $path = "{$GLOBALS['dataFolder']}$data->folder/$value/data.json";
                    $file = fopen($path, "r");
                    $read = fread($file, filesize($path));
                    fclose($file);
                    array_push($newresponse, json_decode($read));
                }
                die(json_encode($newresponse));
            } else {
                $response["status"] = "not found";
                $response["message"] = "not found";
                die(json_encode($response));
            }
        }
    }
} catch (Exception $e) {
    $response["exception"] = $e;
    $response["message"] = $e->getMessage();
    die(json_encode($response));
}

