<?php
include_once 'dataheader.php';
try {
    $folder = $_POST['folder'];
    $name = $_POST['name'];

    $img = str_replace('data:image/png;base64,', '', $_POST["bg"]);
    $img = str_replace(' ', '+', $img);
    $data = base64_decode($img);
    if (!file_exists("data/{$folder}")) {
        mkdir("data/{$folder}", 0777, true);
    }
    $file = "data/{$folder}/bg.png";
    file_put_contents($file, $data);

    for ($i = 1; $i <= 9; $i++) {
        $img = str_replace('data:image/png;base64,', '', $_POST["W_{$i}A"]);
        $img = str_replace(' ', '+', $img);
        $data = base64_decode($img);
        if (!file_exists("data/{$folder}")) {
            mkdir("data/{$folder}", 0777, true);
        }
        $file = "data/{$folder}/W_{$i}A.png";
        file_put_contents($file, $data);

        $img = str_replace('data:image/png;base64,', '', $_POST["W_{$i}B"]);
        $img = str_replace(' ', '+', $img);
        $data = base64_decode($img);
        if (!file_exists("data/{$folder}")) {
            mkdir("data/{$folder}", 0777, true);
        }
        $file = "data/{$folder}/W_{$i}B.png";
        file_put_contents($file, $data);

        $img = str_replace('data:image/png;base64,', '', $_POST["W_{$i}C"]);
        $img = str_replace(' ', '+', $img);
        $data = base64_decode($img);
        if (!file_exists("data/{$folder}")) {
            mkdir("data/{$folder}", 0777, true);
        }
        $file = "data/{$folder}/W_{$i}C.png";
        file_put_contents($file, $data);
    }

    $response["message"] = "uploaded";
    die(json_encode($response));
} catch (Exception $e) {
    $response["exception"] = $e;
    $response["message"] = $e->getMessage();
    die(json_encode($response));
}

