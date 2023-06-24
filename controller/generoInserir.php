<?php
  require_once('../model/autenticar.php');
  require_once('../model/conexao.php');
  $generoPost = file_get_contents('php://input');
  $generoMatriz = json_decode($generoPost, true);
  $descricao = (isset($generoMatriz["descricao"]) && $generoMatriz["descricao"] != null) 
  ? strtoupper($generoMatriz["descricao"]) : "";
  $resposta["erro"] = false; 
  $resposta["msgErro"] = "";
  $resposta["msgSucesso"] = ""; 
  $resposta["dados"] = null;
  if( $descricao != "" && $autenticado===true){
    try {
        $sql = "INSERT INTO generos(descricao) VALUES(?)";
        $stmt = $conexao->prepare($sql);
        $stmt->bindParam(1, $descricao );
        $stmt->execute();
        $resposta["msgSucesso"] = "{$stmt->rowCount()} genero inserido com sucesso! O id inserido 
        foi {$conexao->lastInsertId()}"; 
    }catch(PDOException $e) {
        $resposta["erro"] = true;
        $resposta["msgErro"] = "Erro: Não foi possível efetuar a inserção no BD".$e->getMessage();
    }finally{
        echo json_encode($resposta);  
    }
  }
?>