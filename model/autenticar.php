<?php
	$autenticado = false;
	session_start();
	if(!isset($_SESSION['usuario']))
		http_response_code(401);
	else{
		if(isset($_SESSION['ultima_atividade']) && (time() - $_SESSION['ultima_atividade'] > 15)){
			session_unset();
			session_destroy();
			http_response_code(401);
		}else{
			$autenticado=true;
			$_SESSION['ultima_ativade'] = time();
		}
	}
?>
