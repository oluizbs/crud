<?php
    require_once('../model/autenticar.php');
    require_once('../model/conexao.php');
    $resposta["erro"] = false;
    $resposta["dados"] = null;
    $resposta["msgErro"] = "";
    $resposta["msgSucesso"] = ""; 
    if($autenticado===true){
        try{
            $sql = "SELECT * FROM generos ORDER BY descricao";
            $stmt = $conexao->prepare($sql);
            $stmt->execute();
            $resposta["dados"] = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $resposta["msgSucesso"] = "Generos listados com sucesso!";
        }catch(PDOException $e){
            $resposta["erro"] = true;
            $resposta["msgErro"] = "Erro ao listar generos. ".$e->getMessage();
        }finally{
            echo json_encode($resposta);
        }
    }
?>
