<?php
require_once 'php/init.php';

$db = new DB($conn);
$list = $db->getTask();

?><!DOCTYPE html>
<html>
<head>
  <title>Drag and drop</title>
  <link rel="stylesheet" type="text/css" href="css/app.css">
</head>
<body>

<ul id="todo_list">
    <?php foreach($list as $k => $v): ?>
        <li id="<?=$v['id']?>" position="<?=$v['position']?>"><?=$v['name']?></li>
    <?php endforeach; ?>
</ul>

<script type="text/javascript" src="js/app.js"></script>
</body>
</html>