<?php
include "connectdb.php";


$data = json_decode(file_get_contents("php://input"));

$id= $dbhandle->real_escape_string($data->id);

$query = "DELETE FROM eee where eventID = $id";

$dbhandle->query($query);
?>