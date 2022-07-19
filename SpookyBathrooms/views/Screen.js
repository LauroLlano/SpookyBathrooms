class Screen{

	///////////////////////////////////SKEEEEP

	static mainScreen()
	{

		var html="<div id='MainMenu'>";
				html+="<div class= 'row'>";
					html+="<div class= 'col-12'>";
						html+="<h1 id='game-title'>Spooky Bathrooms!</h1>";
					html+="</div>";
				html+="</div>";
				html+="<div class= 'row'>";
					html+="<div class='col-2'></div>";
					html+="<div class= 'text-center col-8' >";
						html+="<button class='btn btn-primary btn-block' id='game-start'>Iniciar</button>";
					html+="</div>";
					html+="<div class='col-2'></div>";
				html+="</div>";
			html+="</div>";
		return html;
	}

///////////////////////////////////SKEEEEP	
	static loginScreen()
	{

		var html="<form id='login'>";
				html+="<div class= 'row'>";
					html+="<div class='col'>";
						html+="<h1 class='center-text'>¡Ingresa con tu cuenta!</h1>";
					html+="</div>";
				html+="</div>";

				html+="<div class='form-row'>";
					html+="<div class='col-2'></div>";
					html+="<div class='form-group col-8'>";
						html+="<label for='loginUser' class='form-label'>Usuario:</label>";
	                  	html+="<input type='text' class='form-control' name='loginUser' id='loginUser'>";
					html+="</div>";
					html+="<div class='col-2'></div>";
				html+="</div>";

				html+="<div class='form-row'>";
					html+="<div class='form-group col-2'></div>";
					html+="<div class='form-group col-8'>";
						html+="<label for='loginPass' class='form-label'>Contraseña:</label>";
	                  	html+="<input type='password' class='form-control' name='loginPass' id='loginPass'>";
					html+="</div>";
					html+="<div class='form-group col-2'></div>";
				html+="</div>";

				html+="<div class='form-row'>";
					html+="<div class='form-group col-2'></div>";
					html+="<div class='form-group col-8 form-check'>";
						html+="<label class='form-check-label customLabel'>Recordar mi cuenta";
	              			html+="<input class='form-check-input'type='checkbox' value='' id='loginKeepUser'>";
	              			html+="<span class='checkmark'></span>";
	            			html+="</label>";
	            		html+="</div>";
	            		html+="<div class='form-group col-2'></div>";
				html+="</div>";

				html+="<div class='form-row'>";
					html+="<div class='form-group col-2'></div>";
					html+="<div class='form-group col-8'>";
						html+="<button class='btn btn-primary btn-block' id='btnLogin'>Iniciar sesión</button>";
					html+="</div>";
					html+="<div class='form-group col-2'></div>";
				html+="</div>";

				html+="<div class='form-row'>";
					html+="<div class='form-group col-2'></div>";
					html+="<div class='form-group col-8'>";
						html+="<button class='btn btn-danger btn-block' id='btnNewRegister'>Crear una cuenta</button>";
					html+="</div>";
					html+="<div class='form-group col-2'></div>";
				html+="</div>";
			html+="</form>";

		return html;
	}

	static playerSelectScreen()
	{
		var html="<div id='menuPlayers'>"
				html+="<div class='row'>"
					html+="<div class='col'>"
						html+="<h1 class='center-text'>Seleccione el número de jugadores</h1>"
					html+="</div>"
				html+="</div>"
				html+="<div class='row'>"
					html+="<div class='col-2'></div>"
					html+="<div class='col-8'>"
						html+="<button class='btn btn-success btn-block' id='btnSingleGame'>Un jugador</button>"
					html+="</div>"
					html+="<div class='col-2'></div>"
				html+="</div>"
				html+="<div class='row'>"
					html+="<div class='col-2'></div>"
					html+="<div class='col-8'>"
						html+="<button class='btn btn-warning btn-block' id='btnMultiGame'>Dos jugadores</button>"
					html+="</div>"
					html+="<div class='col-2'></div>"
				html+="</div>"
			html+="</div>"

		return html;
	}

	static playerDifficultyScreen()
	{
		var html="<div id='menuOptions'>";

				html+="<div class='row'>";
					html+="<div class='col'>";
						html+="<h1 class='center-text'>Seleccione la dificultad de la IA</h1>";
					html+="</div>";
				html+="</div>";

				html+="<div class='row'>";
					html+="<div class='col-2'></div>";
					html+="<div class='col-8'>";
						html+="<button class='btn btn-primary btn-block' id='btnEasy'>Fácil</button>";
					html+="</div>";
					html+="<div class='col-2'></div>";
				html+="</div>";

				html+="<div class='row'>";
					html+="<div class='col-2'></div>";
					html+="<div class='col-8'>";
						html+="<button class='btn btn-warning btn-block' id='btnNormal'>Normal</button>";
					html+="</div>";
					html+="<div class='col-2'></div>";
				html+="</div>";

				html+="<div class='row'>";
					html+="<div class='col-2'></div>";
					html+="<div class='col-8'>";
						html+="<button class='btn btn-danger btn-block' id='btnHard'>Difícil</button>";
					html+="</div>";
					html+="<div class='col-2'></div>";
				html+="</div>";

		html+="</div>";

		return html;
	}

	static notification(notifType, notifText)
	{
		var html="<div class='modal' tabindex='-1' id='screenNotif' role='dialog' data-backdrop='static' data-keyboard='false'>";
      			html+="<div class='modal-dialog' role='document'>";
        			html+="<div class='modal-content'>";
          				html+="<div class='modal-header'>";
            				html+="<h5 class='modal-title'>"+notifType+"</h5>";
            				html+="<button type='button' class='close' data-dismiss='modal' id='btnCloseX' aria-label='Close'>";
            	  				html+="<span aria-hidden='true'>&times;</span>";
            				html+="</button>";
          				html+="</div>";
          				html+="<div class='modal-body'>";
            				html+="<p id='screenNotif-text'>"+notifText+"</p>";
          				html+="</div>";
          				html+="<div class='modal-footer'>";
            				html+="<button data-target='#screenNotif' data-toggle='modal'  button type='button' class='btn modal-close' id='btnModalClose' data-dismiss='modal'>Cerrar</button>";
          				html+="</div>";
        			html+="</div>";
      			html+="</div>";
    		html+="</div>";

    	return html;
	}


	static pauseScreen()
	{
		var html="<div id='pauseMenu'>";
			html+="	<div class= 'row'>";
				html+="<div class= 'col-12'>";
					html+="<h1 id='pause-title'>PAUSA</h1>";
				html+="</div>";
			html+="</div>";
			html+="<div class= 'row'>";
				html+="<div class='col-2'></div>";
				html+="<div class= 'text-center col-8' >";
					html+="	<button class='btn btn-primary btn-block' id='pauseContinue'>Continuar</button>";
				html+="</div>";
				html+="<div class='col-2'></div>";
			html+="</div>";
		html+="</div>";

		return html;
	}

	static prepareRow(index, user, userScore)
	{
		var html="<tr>";
		  		html+="<th scope='row'>"+index+"</th>";
		  		html+="<td>"+user+"</td>";
		  		html+="<td>"+userScore+"</td>";
		   html+="</tr>";

		return html;
	}

	static prepareFullTable(arrayData)
	{
		var html="<div class= 'row'>";
				html+="<div class= 'col-2'></div>";
				html+="<div class= 'col-8'>";
					html+="<table class='table  table-striped table-light' id='scoreTable'>";
						html+="<thead class='thead-dark'>";
							html+="<tr>";
								html+="<th scope='col'>Posición</th>";
								html+="<th scope='col'>Usuario</th>";
								html+="<th scope='col'>Puntaje</th>";
							html+="</tr>";
						html+="</thead>";
						html+="<tbody>"    
							for(var i=0; i<arrayData.length; i++)
							{
								html+=Screen.prepareRow(i+1, arrayData[i].getUser(), arrayData[i].getScore());
							}
						html+="</tbody>";
					html+="</table>";
				html+="</div>";
				html+="<div class='col-2'></div>";
			html+="</div>";

		 return html;
	}

	static resultScreen(isNewScore, myScore, endResults)
	{
		var html="<div id='resultScreen'>"
				html+="<div class= 'row'>"
					html+="<div class= 'col-12'>"
						html+="<h1 id='resultTitle'>RESULTADOS</h1>"
					html+="</div>"
				html+="</div>"

				html+="<div class= 'row'>"
					html+="<div class='col-2'></div>"
					html+="<div class= 'col-8'>"
						html+="<h1 id='resultText'>"+endResults+"</h1>"
					html+="</div>"
					html+="<div class='col-2'></div>"
				html+="</div>"


				html+="<div class= 'row'>"
					html+="<div class='col-2'></div>"
					html+="<div class= 'col-8'>"
						html+="<h1 id='resultScoreText'>Puntaje del jugador 1:</h1>"
					html+="</div>"
					html+="<div class='col-2'></div>"
				html+="</div>"

				html+="<div class= 'row'>"
					html+="<div class= 'col-12'>"
						html+="<h1 id='resultScore'>"+myScore+" puntos</h1>"
					html+="</div>"
				html+="</div>"

				if(isNewScore){
					html+="<div class= 'row'>"
						html+="<div class='col-2'></div>"
						html+="<div class= 'col-8'>"
							html+="<h1 id='isANewScore'>¡Nuevo record!</h1>"
						html+="</div>"
						html+="<div class='col-2'></div>"
					html+="</div>"
				}

				/*html+="<div class= 'row'>"
					html+="<div class='col-3'></div>"
					html+="<div class= 'text-center col-6' >"
						html+="<button class='btn btn-primary btn-block' id='btnShareScore'>¡Comparte tu puntaje en Facebook!</button>"
					html+="</div>"
					html+="<div class='col-3'></div>"
				html+="</div>"*/

				html+="<div class= 'row'>"
					html+="<div class='col-2'></div>"
					html+="<div class= 'text-center col-8' >"
						html+="<button class='btn btn-success btn-block' id='btnShowTopPlayers'>Siguiente</button>"
					html+="</div>"
					html+="<div class='col-2'></div>"
				html+="</div>"
	
				
		html+="</div>"

		return html;
	}

	static topPlayersScreen(arrayData)
	{
		var html="<div id='topPlayerScreen'>"
				html+="<div class= 'row'>"
					html+="<div class= 'text-center col-12' >"
						html+="<h1 id='textTopPlayers'>Leaderboards</h1>"
					html+="</div>"
				html+="</div>"
				html+=Screen.prepareFullTable(arrayData);
		
				html+="<div class= 'row'>"
					html+="<div class='col-2'></div>"
					html+="<div class= 'text-center col-8' >"
						html+="<button class='btn btn-danger btn-block' id='btnExitGame'>Regresar al menú principal</button>"
					html+="</div>"
					html+="<div class='col-2'></div>"
				html+="</div>"
			html+="</div>"

		return html;
	}
}