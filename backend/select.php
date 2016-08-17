<?php
include "connectdb.php";

$query="select * from eee";
$rs= $dbhandle->query($query);

while($row=$rs->fetch_assoc()){
	$data[]=$row;
}

print json_encode($data);
?>