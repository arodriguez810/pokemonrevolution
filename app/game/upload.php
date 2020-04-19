<?php
include_once 'dataheader.php';
try {
    $folder = $_POST['folder'];
    $name = $_POST['name'];

    foreach (["face", "sv", "tv", "tvd"] as $key => $value) {
        $img = str_replace('data:image/png;base64,', '', $_POST[$value]);
        $img = str_replace(' ', '+', $img);
        $data = base64_decode($img);
        if (!file_exists("data/{$folder}")) {
            mkdir("data/{$folder}", 0777, true);
        }
        $file = "data/{$folder}/{$value}.png";
        file_put_contents($file, $data);
    }

    $response["message"] = "uploaded";
    die(json_encode($response));
} catch (Exception $e) {
    $response["exception"] = $e;
    $response["message"] = $e->getMessage();
    die(json_encode($response));
}

