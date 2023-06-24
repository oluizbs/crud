<?php
    require_once('../model/autenticar.php');
    require_once('../model/conexao.php');
    $resposta["erro"] = false; 
    $resposta["dados"] = null;
    $resposta["msgErro"] = ""; 
    $resposta["msgSucesso"] = ""; 
    if($autenticado===true){
        try{
            $sql = "SELECT f.*,g.descricao as genero_descricao FROM filmes_assistidos f 
            JOIN generos g ON(f.genero_id=g.id) ORDER BY titulo";
            $stmt = $conexao->prepare($sql);
            $stmt->execute();
            $resposta["dados"] = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $resposta["msgSucesso"] = "Filmes listados com sucesso!";
        }catch(PDOException $e){
            $resposta["erro"] = true;
            $resposta["msgErro"] = "Erro ao listar filmes. ".$e->getMessage();
        }finally{
            echo json_encode($resposta);
        }
    }
?>