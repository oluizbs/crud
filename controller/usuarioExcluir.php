<?php
    require_once('../model/autenticar.php');
    require_once('../model/conexao.php');
    $usuarioDelete = file_get_contents('php://input');
    $usuarioMatriz = json_decode($usuarioDelete, true);
    $id = (isset($usuarioMatriz["id"]) && $usuarioMatriz["id"] != null) ? $usuarioMatriz["id"] : null;
    $resposta["erro"] = false;
    $resposta["msgErro"] = "";
    $resposta["msgSucesso"] = "";
    $resposta["dados"] = null;
    if( $id != null && $autenticado===true){
        try{
            $sql = "DELETE FROM usuarios WHERE id=?";
            $stmt = $conexao->prepare($sql);
            $stmt->bindParam(1,$id);
            $stmt->execute();
            $resposta["msgSucesso"] = "Usuario de id $id excluido com sucesso";
        }catch(PDOException $e){
            $resposta["erro"] = true;
            $resposta["msgErro"] = "Erro ao excluir usuario. " .$e->getMessage();
        }finally{
            echo json_encode($resposta);
        }
    }
?>
