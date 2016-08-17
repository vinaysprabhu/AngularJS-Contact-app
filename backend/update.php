<?php
include "connectdb.php";


$data = json_decode(file_get_contents("php://input"));

$id= $dbhandle->real_escape_string($data->id);
$name= $dbhandle->real_escape_string($data->name);
$date= $dbhandle->real_escape_string($data->date);
$org= $dbhandle->real_escape_string($data->org);
$eorg= $dbhandle->real_escape_string($data->eorg);
$venue= $dbhandle->real_escape_string($data->venue);
$descrip= $dbhandle->real_escape_string($data->descrip);



$query = "update eee set name = '".$name."', date = '".$date."', venue = '".$venue."',description = '".$descrip."', organizer = '".$org."', oemail='".$eorg."' where eventID = $id";

$dbhandle->query($query);
?>