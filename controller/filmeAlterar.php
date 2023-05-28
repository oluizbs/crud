<?php
  require_once('../model/conexao.php');
  $filmePut = file_get_contents('php://input');
  $filmeMatriz = json_decode($filmePut, true);
  //Validação e higienização
  $id = (isset($filmeMatriz["id"]) && $filmeMatriz["id"] >0) 
  ? strtoupper($filmeMatriz["id"]) : ""; 
  $titulo = (isset($filmeMatriz["titulo"]) && $filmeMatriz["titulo"] != null) 
  ? strtoupper($filmeMatriz["titulo"]) : "";
  $avaliacao = (isset($filmeMatriz["avaliacao"]) && $filmeMatriz["avaliacao"] != null) 
  ? $filmeMatriz["avaliacao"] : "";
  $generoId = (isset($filmeMatriz["genero_id"]) && $filmeMatriz["genero_id"] > 0) 
  ? $filmeMatriz["genero_id"] : "";
  //Monta a resposta padrão
  $resposta["erro"] = false;
  $resposta["msgErro"] = "";
  $resposta["msgSucesso"] = "";
  $resposta["dados"] = null;
  if( $titulo != "" && $avaliacao != ""){
    try {
        $sql = "UPDATE filmes_assistidos SET titulo=?,avaliacao=?, genero_id = ? WHERE id=?";
        $stmt = $conexao->prepare($sql);
        $stmt->bindParam(1, $titulo );
        $stmt->bindParam(2, $avaliacao);
        $stmt->bindParam(3, $generoId);
        $stmt->bindParam(4, $id);  
        $stmt->execute();
        $resposta["msgSucesso"] = "{$stmt->rowCount()} filme alterado com sucesso! O id do filme alterado foi {$id}"; 
    }catch(PDOException $e) {
      $resposta["erro"] = true;
      $resposta["msgErro"] = "Erro: Não foi possível efetuar a alteração no BD".$e->getMessage();
    }finally{
      echo json_encode($resposta); 
    }
  }
?>
