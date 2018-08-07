<?php

header('Access-Control-Allow-Origin: *');

header('Content-Type: application/json');

$encq=$_REQUEST['id'];

$json = json_decode($encq, true);

$fp = fopen('trello.json', 'w');
fwrite($fp, json_encode($json, JSON_UNESCAPED_UNICODE));
fclose($fp);
?>
