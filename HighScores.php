<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html" charset="utf-8"/>
    <title>MazeWalker High Scores</title>
	
    <style>
        html, body {
            overflow: hidden;
            width   : 100%;
            height  : 100%;
            margin  : 0;
            padding : 0;
        }

        #renderCanvas {
            width   : 100%;
            height  : 100%;
            touch-action: none;
        }
    </style>

</head>
<body>
	<?php
	
		$level = $_POST["level"];
		$player = $_POST["player"];
		
		echo "<h1>MazeWalker High Scores</h1>";
		echo "<p><a href=\"index.html\">Back to Start Menu</a></p>";
		echo "<br/>";
		echo "<p>Player: ".$player." Level: ".$level."</p>";
		echo "<br/>";
		echo "<table style=\"width:5%\">";
		echo "<tr>";
		echo "<th> High Scores </th>";
		echo "</tr>";
		
		$mysqli = new mysqli("mysql.eecs.ku.edu", "rmanweiler", "hello", "rmanweiler");

		/* check connection */
		if ($mysqli->connect_errno) {
   			printf("Connect failed: %s\n", $mysqli->connect_error);
    		exit();
		}

		$query = "SELECT * FROM MazeWalkerHighScores";

		if ($result = $mysqli->query($query)) {
			$count = 0;
			while ($row = $result->fetch_assoc()) {
				echo "<tr>";
				echo "<td>".$row["Scores"]."</td>";
				echo "</tr>";
			}

			$result->free();
		}
		
		echo "</table>";
		$mysqli->close();

	?>
</body>
</html>