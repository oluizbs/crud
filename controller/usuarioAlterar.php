<?php

    require_once('..model/autenticar.php');
    require_once('..model/conexao.php');

    $usuarioPut = file_get_contents('php://input');
    $usuarioMatriz = json_decode($usuarioPut, true);
    $id = (isset($usuarioMatriz["id"]) && $usuarioPut["id"] >0) ? $usuarioMatriz["id"] : null;
    $nome = (isset($usuarioMatriz["nome"]) && $usuarioMatriz["nome"] != null) ? $usuarioMatriz["nome"]:"";
    $resposta["erro"] = false;
    $resposta["msgErro"] = "";
    $resposta["msgSucesso"] = "";
    $resposta["dados"] = null;
    if($nome != "" && $id != "" && $autenticado===true){
        try{
            $sql = "UPDATE usuarios SET nome=? WHERE id=?";
            $stmt = $conexao->prepare($sql);
            $stmt->bindParam(1, $nome);
            $stmt->bindParam(2, $id);
            $stmt->execute();
            $resposta["msgSucesso"] = "{$stmt->rowCount()} usuario alterado com sucesso! O id do usuario alterado foi {$id}";
        }catch(PDOException $e){
            $resposta["erro"] = true;
            $resposta["msgErro"] = "Erro: Não foi possível efetuar a alteração no Banco de Dados.".$e->getMessage();
        }finally{
            echo json_encode($resposta);
        }
    }
?>
