<?php
// jak na odesílání dat:
// $.ajax("stats.php", {data:{stats: JSON.stringify(progress)}, method:"POST"})
if (isset($_POST["stats"])) {
	$ip = $_SERVER['REMOTE_ADDR'];
	file_put_contents("stats.json", $ip . ": " . $_POST["stats"] . "\n", FILE_APPEND);
}
?>
