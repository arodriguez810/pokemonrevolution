<?php
include_once 'dataheader.php';
try {
    if ($data) {
        $newresponse = array();
        if ($data->folder) {
            @$filesInFolder = scandir("$root$data->folder");
            if (@$filesInFolder) {
                array_shift($filesInFolder);
                array_shift($filesInFolder);
                if (isset($data->name)) {

                    $myfile = fopen("$root$data->folder/$data->name.json", "w+") or die("Unable to open file!");
                    fwrite($myfile, json_encode($data->data));
                    fclose($myfile);
                    array_push($newresponse, $data->data);
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

