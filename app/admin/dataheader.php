<?php
header('Content-Type: application/json');
$root = "data/";
$response = array("status" => "error", "message" => "no folder selected");
$data = json_decode(file_get_contents("php://input"));
