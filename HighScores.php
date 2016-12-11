<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html" charset="utf-8"/>
    <title>MazeWalker High Scores</title>
	
    <!--background image help http://hellofieldtrip.com/the-feed/css-create-fullscreen-background-image/-->
    <style>
        body {
            overflow: hidden;
            width   : 100%;
            height  : 100%;
            margin  : 0;
            padding : 0;
			

			background: url("resources/images/background.png") no-repeat 50% 50% fixed; 
			-webkit-background-size: cover;
			-moz-background-size: cover;
			-o-background-size: cover;
			background-size: cover;
			
			text-align: center;
			font-family: verdana;
        }
		h1, h2, p, label, tr, th, td{
			color: #0089F0;
		}
		table.center {
			margin-left:auto; 
			margin-right:auto;
		}
        #renderCanvas {
            width   : 100%;
            height  : 100%;
            touch-action: none;
        }
    </style>

</head>
	<?php
	
		$level = $_POST["level"];
		$player = $_POST["player"];

		
		echo "<h1>MazeWalker High Scores</h1>";
		echo "<p><a href=\"index.html\">Back to Start Menu</a></p>";
		echo "<br/>";
		echo "<h1>Your Score</h1>";
		echo "<h2>".$player.": level ".$level."</h2>";
		echo "<br/>";
	
		$mysqli = new mysqli("mysql.eecs.ku.edu", "rmanweiler", "hello", "rmanweiler");

		/* check connection */
		if ($mysqli->connect_errno) {
   			printf("Connect failed: %s\n", $mysqli->connect_error);
    		exit();
		}
		else {
			$query = "INSERT INTO MazeWalkerHighScores (Score, PlayerName) VALUES ('".$level."','".$player."')";
			if($result1 = $mysqli->query($query)){
				
				$query = "ALTER TABLE `MazeWalkerHighScores` ORDER BY `Score` DESC";
				if($result2 = $mysqli->query($query)){
					
					echo "<table class='center'>";
					echo "<tr>";
					echo "<th>Player</th>";
					echo "<th>Score</th>";
					echo "</tr>";
					$query = "SELECT * FROM MazeWalkerHighScores";
					if ($result3 = $mysqli->query($query)) {
						$first = true;
						while ($row = $result3->fetch_assoc()) {
							echo "<tr>";
							echo "<td>".$row["PlayerName"]."</td>";
							echo "<td>".$row["Score"]."</td>";
							echo "</tr>";
						}
						$result3->free();
					}
					else echo "<p>Select from did not work</p>";
					echo "</table>";
					
					//$result2->free();
				}
				else echo "<p>Order did not work</p>";
	
				//$result1->free();
			}
			else echo "<p>Insert into did not work</p>";
		}
		
		$mysqli->close();

	?>