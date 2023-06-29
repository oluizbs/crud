<?php
    require_once('../model/conexao.php');
    $usuarioPost = file_get_contents('php://input');
    $usuarioMatriz = json_decode($usuarioPost, true);
    $login = (isset($usuarioMatriz["login"]) && $usuarioMatriz["login"] !=null)
    ? $usuarioMatriz["login"] : "";
    $senha = (isset($usuarioMatriz["senha"]) && $usuarioMatriz["senha"] !=null)
    ? $usuarioMatriz["senha"] : "";
    $senha = hash('sha256', $senha);
    // resposta padrão
    $resposta["erro"] = false;
    $resposta["msgErro"] = "";
    $resposta["msgSucesso"] = "";
    $resposta["dados"] = null;
    if($login != "" && $senha != ""){
        try{
            $sql = "SELECT id, nome FROM usuarios WHERE login=? and senha=?";
            $stmt = $conexao->prepare($sql);
            $stmt -> bindParam(1, $login);
            $stmt -> bindParam(2, $senha);
            $stmt -> execute();
            if($stmt->rowCount()>0){
                $dados = $stmt->fetchAll(PDO::FETCH_ASSOC);
                $resposta["dados"] = $dados;
                $resposta["msgSucesso"] = "usuario logado com sucesso";
                if(session_status() === PHP_SESSION_NONE){
                    session_start();
                    $_SESSION['usuario'] = $dados[0]["nome"];
                    $_SESSION['usuario_id'] = $dados[0]["id"];
                    $_SESSION['ultima_atividade'] = time();
                    $resposta["mensagem"] = "Sessao criada com sucesso";
                    $resposta["data"] = $dados[0];   
                }
            }else{
                $resposta["erro"] = true;
                $resposta["msgErro"] = "Erro: usuario não logado.";
            }
        }catch(PDOException $e){
            $resposta["erro"] = true;
            $resposta["msgErro"] = "Erro: usuario não logado".$e->getMessage();
        }finally{
            echo json_encode($resposta);
        }
    }
?>