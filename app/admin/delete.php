<?php
include_once 'dataheader.php';
function delete_directory($dirname)
{
    if (is_dir($dirname))
        $dir_handle = opendir($dirname);
    if (!$dir_handle)
        return false;
    while ($file = readdir($dir_handle)) {
        if ($file != "." && $file != "..") {
            if (!is_dir($dirname . "/" . $file))
                unlink($dirname . "/" . $file);
            else
                delete_directory($dirname . '/' . $file);
        }
    }
    closedir($dir_handle);
    rmdir($dirname);
    return true;
}

try {
    if ($data) {
        $newresponse = array();
        if ($data->folder) {
            @$filesInFolder = scandir("$root$data->folder");
            if (@$filesInFolder) {
                $response["status"] = "success";
                $response["message"] = "deleted";
                unlink("$root$data->folder/$data->name.json");
                if (file_exists("$root$data->folder" . "_file/$data->name")) {
                    delete_directory("$root$data->folder" . "_file/$data->name");
                }
                die(json_encode($response));
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

