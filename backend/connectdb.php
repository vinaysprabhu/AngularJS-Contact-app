<?php
define("HOSTNAME", "localhost");
define("USERNAME", "root");
define("PASSWORD", "root");
define("DATABASE", "eventsDB");
$dbhandle= new mysqli(HOSTNAME,USERNAME,PASSWORD,DATABASE) or die("unable to connect");

?>