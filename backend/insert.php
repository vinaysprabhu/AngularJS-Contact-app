<?php
include "connectdb.php";

$result="SELECT eventID FROM eee ORDER BY eventID DESC LIMIT 1";

$id = $result + 1;


$data = json_decode(file_get_contents("php://input"));

$id= $dbhandle->real_escape_string($data->id);
$name= $dbhandle->real_escape_string($data->name);
$date= $dbhandle->real_escape_string($data->date);
$organizer= $dbhandle->real_escape_string($data->organizer);
$oemail= $dbhandle->real_escape_string($data->oemail);
$venue= $dbhandle->real_escape_string($data->venue);
$description= $dbhandle->real_escape_string($data->description);


$query = "insert into eee values('".$id."','".$name."','".$date."','".$venue."','".$description."','".$organizer."','".$oemail."')";

$dbhandle->query($query);


?>