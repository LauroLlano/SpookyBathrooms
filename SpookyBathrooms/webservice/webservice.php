<?php
	$actionPost = $_POST['action'];
	$serverAnswer="";
	$serverData="";
	
	if($actionPost=="login") 		
		loginUser();
	else if($actionPost=="signup")
		addUser();
	else if($actionPost=="checkScore")
		checkScore();
	else if($actionPost=="getRecords")
		globalRecords();

	function connect() {
		$databasehost = "DATABASE_HOST";
		$databasename = "DATABASE_NAME";
		$databaseuser = "DATABASE_USER";
		$databasepass = "DATABASE_PASS";

		$mysqli = new mysqli($databasehost, $databaseuser, $databasepass, $databasename);
		if ($mysqli->connect_errno) {
			$GLOBALS['serverAnswer']= "SERVER-ERROR";
			$GLOBALS['serverData']="Problema con la conexion a la base de datos, intente más tarde";
		}
		return $mysqli;
	}


	function loginUser()
	{
		$arrayJson=array();
		$connection=connect();
		if($connection->connect_errno)
		{
			$arrayJson[0]=$GLOBALS['serverAnswer'];
			$arrayJson[1]=$GLOBALS['serverData'];
			echo json_encode($arrayJson);
			mysqli_close($connection);
			return;
		}

		
		$readUser=$_POST["user"];
		$readPass=$_POST["pass"];
		$loginAnswer=getBooleanProcedure($connection, "LOGIN-CHECKUSER", $readUser, $readPass, 0);
		if($loginAnswer=="SUCCESS")
		{
			$loginAnswer="EMPTY";
			$loginAnswer=bringUserData($connection, "LOGIN-BRINGDATA", $readUser, $readPass, 0);
			if($loginAnswer=="SUCCESS")
			{
				$GLOBALS['serverAnswer']="LOGIN-SUCCESS";
			}
			else
			{
				$GLOBALS['serverAnswer']="LOGIN-ERROR";
				$GLOBALS['serverData']="Hubo un problema para cargar los datos del usuario, intente más tarde";
			}
			
		}
		else if($loginAnswer=="FAILURE")
		{
			$GLOBALS['serverAnswer']="LOGIN-DENIED";
			$GLOBALS['serverData']="Usuario y/o contraseña incorrecta";
		}
		$arrayJson[0]=$GLOBALS['serverAnswer'];
		$arrayJson[1]=$GLOBALS['serverData'];
		echo json_encode($arrayJson);
		mysqli_close($connection);
	}

	function addUser()
	{
		$arrayJson=array();
		$connection=connect();
		if($connection->connect_errno)
		{
			$arrayJson[0]=$GLOBALS['serverAnswer'];
			$arrayJson[1]=$GLOBALS['serverData'];
			echo json_encode($arrayJson);
			mysqli_close($connection);
			return;
		}

		$readUser=$_POST["user"];
		$readPass=$_POST["pass"];
		$signupAnswer=getBooleanProcedure($connection, "SIGNUP-CHECKUSER", $readUser, $readPass, 0);
		$canAddUser=false;
		if($signupAnswer=="SUCCESS")
		{
			$canAddUser=true;
		}
		else if($signupAnswer=="FAILURE")
		{
			$canAddUser=false;
			$GLOBALS['serverAnswer']="SIGNUP-DENIED";
			$GLOBALS['serverData']="El nombre de usuario ya ha sido tomado";
		}

		if($canAddUser)
		{
			$signupAnswer=getBooleanProcedure($connection, "SIGNUP-ADDUSER", $readUser, $readPass, 0);
			if($signupAnswer=="SUCCESS")
			{
				$newData=array('user' => $readUser, 'score' => 0);
				$GLOBALS['serverAnswer']="SIGNUP-SUCCESS";
				$GLOBALS['serverData']=$newData;
			}
			else
			{
				$GLOBALS['serverAnswer']="SIGNUP-ERROR";
				$GLOBALS['serverData']="Hubo un problema al registrar al usuario, intente más tarde";
			}
		}

		$arrayJson[0]=$GLOBALS['serverAnswer'];
		$arrayJson[1]=$GLOBALS['serverData'];
		echo json_encode($arrayJson);
		mysqli_close($connection);	
	}

	function checkScore()
	{
		$arrayJson=array();
		$connection=connect();
		if($connection->connect_errno)
		{
			$arrayJson[0]=$GLOBALS['serverAnswer'];
			$arrayJson[1]=$GLOBALS['serverData'];
			echo json_encode($arrayJson);
			mysqli_close($connection);
			return;
		}
	
		$readUser=$_POST["user"];
		$readScore=$_POST["score"];
		$scoreAnswer=getBooleanProcedure($connection, "SCORE-ISNEWSCORE", $readUser, "EMPTY", $readScore);
		if($scoreAnswer=="SUCCESS")
		{
			$GLOBALS['serverAnswer']="MYSCORE-NEWSCORE";
			$GLOBALS['serverData']="TRUE";			
		}
		else if($scoreAnswer=="FAILURE")
		{
			$GLOBALS['serverAnswer']="MYSCORE-NEWSCORE";
			$GLOBALS['serverData']="FALSE";
		}
		$arrayJson[0]=$GLOBALS['serverAnswer'];
		$arrayJson[1]=$GLOBALS['serverData'];

		echo json_encode($arrayJson);
		mysqli_close($connection);
	}

	function globalRecords()
	{
		$arrayJson=array();
		$connection=connect();
		if($connection->connect_errno)
		{
			$arrayJson[0]=$GLOBALS['serverAnswer'];
			$arrayJson[1]=$GLOBALS['serverData'];
			echo json_encode($arrayJson);
			mysqli_close($connection);
			return;
		}
		
		$readUser=$_POST["user"];
		$readScore=$_POST["score"];
		$scoreAnswer=getBooleanProcedure($connection, "SCORE-ISGLOBALRECORD", $readUser, "EMPTY", $readScore);

		$scoreTables=obtainTopUsers($connection, "SCORE-GETGLOBALRECORDS", $readUser, "EMPTY", $readScore);

		if($scoreTables=="SUCCESS")
		{
			$GLOBALS['serverAnswer']="GLOBALSCORE-SUCCESS";
		}
		else if($scoreTables=="FAILURE")
		{
			$GLOBALS['serverAnswer']="GLOBALSCORE-ERROR";
			$GLOBALS['serverData']="Hubo un error al obtener los usuarios con mejor puntaje";
		}

		$arrayJson[0]=$GLOBALS['serverAnswer'];
		$arrayJson[1]=$GLOBALS['serverData'];
		echo json_encode($arrayJson);
		mysqli_close($connection);
	}

	function getBooleanProcedure($connection, string $operation, string $getUser, string $getPass, int $getScore)
	{
		$existence="EMPTY";
		$action=$operation;
		$userUser=$getUser;
		$userPass=$getPass;
		$userScore=$getScore;

		$mysqli = $connection;
		
		$getOutput=false;
		if($mysqli)
		{
			$queryCall = $mysqli->prepare("CALL Usuario_SP(?, ?, ?, ?, @output)");
			$queryGetData=$mysqli->prepare("SELECT @output");

			$queryCall->bind_Param('sssi', $action, $userUser, $userPass, $userScore);
			$result = $queryCall->execute();
			$queryCall->close();

			$result2=$queryGetData->execute();
			if($result2)
			{
				$queryGetData->bind_result($output);

				while ($queryGetData->fetch()) 
					$getOutput=$output;
			}
			$queryGetData->close();
				
			if (!$result||!$result2) 
			{
				$GLOBALS['serverData']= ":DETALLES-Problema al hacer un query " . $mysqli->error;
				return "FAILURE";
			} 
			if($getOutput)
				$existence="SUCCESS";
			else
				$existence="FAILURE";	
			
		}
		return $existence;
	}

	function bringUserData($connection, string $operation, string $getUser, string $getPass, int $getScore)
	{
		$existence="EMPTY";
		$action=$operation;
		$userUser=$getUser;
		$userPass=$getPass;
		$userScore=$getScore;

		//Connect to database
		$mysqli = $connection;

		$getOutput=false;

		$getData=array();
		if($mysqli)
		{
		    $result = $mysqli->query("SELECT
			usuarioUser AS 'user',
            usuarioHighscore AS 'score'
            FROM Usuario
			WHERE '". $userUser."'=usuarioUser");
			
			while( $r = $result->fetch_assoc()) {
				$getData[] = $r;
			}			
            
            
			if (!$result) 
			{
				$GLOBALS['serverData']= ":DETALLES-Problema al hacer un llamado " . $mysqli->error;
				$existence="FAILURE";
				return "FAILURE";
			} 
            else
            {
                $GLOBALS['serverData']=$getData;
                $existence="SUCCESS";
            }
		}
		return $existence;
	}

	function obtainTopUsers($connection, string $operation, string $getUser, string $getPass, int $getScore)
	{
		$existence="EMPTY";
		$action=$operation;
		$userUser=$getUser;
		$userPass=$getPass;
		$userScore=$getScore;

		//Connect to database
		$mysqli = $connection;

		$getOutput=false;

		$getData=array();
		if($mysqli)
		{
		    $result = $mysqli->query("SELECT usuarioUser AS 'user', usuarioHighscore AS 'score' FROM Usuario AS U INNER JOIN TopUsuario AS TU
	       		ON U.usuarioID = TU.usuarioID
	       		ORDER BY usuarioHighscore DESC 
	       		LIMIT 10");
			
			while( $r = $result->fetch_assoc()) {
				$getData[] = $r;
			}			
	        
	        
			if (!$result) 
			{
				$GLOBALS['serverData']= ":DETALLES-Problema al hacer un llamado " . $mysqli->error;
				$existence="FAILURE";
				return "FAILURE";
			} 
	        else
	        {
	            $GLOBALS['serverData']=$getData;
	            $existence="SUCCESS";
	        }
		}
		return $existence;
	}

?>