<?php
    require_once('../model/autenticar.php');
    require_once('../model/conexao.php');
    $resposta["erro"] = false ;
    $resposta["dados"] = null ;
    $resposta["msgErro"] = "";
    $resposta["msgSucesso"] = "";
    if($autenticado===true){
        try{
            $sql = "SELECT id, nome FROM usuarios ORDER BY nome";
            $stmt = $conexao->prepare($sql);
            $stmt -> execute();
            $resposta["dados"] = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $resposta["msgSucesso"] = "Usuarios listados com sucesso";
        }catch(PDOException $e){
            $resposta["erro"] = true;
            $resposta["msgErro"] = "Erro ao listar usuarios".$e->getMessage();
        }finally{
            echo json_encode($resposta);
        }
    }
?>
