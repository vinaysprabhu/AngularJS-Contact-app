<?php
include "connectdb.php";


$id = $_GET['editEventId'];

$query="select * from eee where eventID = $id";
$rs= $dbhandle->query($query);

while($row=$rs->fetch_assoc()){
	$data[]=$row;
}

print json_encode($data);


// $query="select * from eee";
// $rs= $dbhandle->query($query);

// while($row=$rs->fetch_assoc()){
// 	$data[]=$row;
// }

// print json_encode($data);
?>