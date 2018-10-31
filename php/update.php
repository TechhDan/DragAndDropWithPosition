<?php

header("Content-Type: application/json");
$payload = json_decode(stripslashes(file_get_contents("php://input")));

require_once 'init.php';
$db = new DB($conn);

if ($db->updateTask($payload)) {
    die('true');
} else {
    die('false');
}