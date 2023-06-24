<?php
    require_once('../model/autenticar.php');
    require_once('../model/conexao.php');
    $usuarioPost = file_get_contents('php://input');
    $usuarioMatriz = json_decode($usuarioPost, true);
    $nome = (isset($usuarioMatriz["nome"]) && $usuarioMatriz["nome"] !=null) ? $usuarioMatriz["nome"] : "";
    $login = (isset($usuarioMatriz["login"]) && $usuarioMatriz["login"] !=null) ? $usuarioMatriz["login"] : "";
    $senha = (isset($usuarioMatriz["senha"]) && $usuarioMatriz["senha"] !=null) ? $usuarioMatriz["senha"] : "";
    $senha = hash('sha256', $senha);
    $resposta["erro"] = false;
    $resposta["msgErro"] = "";
    $resposta["msgSucesso"] = "";
    $resposta["dados"] = null;
    if($nome != "" && $login != "" && $senha != "" && $autenticado===true){
        try{
            $sql = "INSERT INTO usuarios(nome,login,senha) VALUES(?,?,?)";
            $stmt = $conexao->prepare($sql);
            $stmt->bindParam(1, $nome);
            $stmt->bindParam(2, $login);
            $stmt->bindParam(3, $senha);
            $stmt->execute();
            $resposta["msgSucesso"] = "{$stmt->rowCount()} usuario inserido com sucesso! O id inserido foi {$conexao->lastInsertId()}";

        }catch(PDOException){
            $resposta["erro"] = true;
            $resposta["msgErro"] = "Erro: Não foi possível efetuar a inserção no BD".$e->getMessage();

        }finally{
            echo json_encode($resposta);
        }
    }
?>