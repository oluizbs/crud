import { exibirMensagem, exibirMensagemErro, limparSpan } from "../utilJs/funcoesUtil.js";
import { filmeListarFetch } from "./listar.js";

function filmeExcluirFetch(id){
    if(confirm('Confirma a exclusão do filme de id '+id+'?')){ 
        let filme = {"id": id};
        let configMetodo = {
            method : "DELETE",
            body : JSON.stringify(filme), //texto JSON serializado
            headers :  {
                "Content-Type" : "application/json;charset=UTF-8"
            }
        };

        fetch("../controller/filmeExcluir.php", configMetodo)
            .then(function(resposta){
                if(!resposta.ok===true){
                    if(resposta.status===401)
                        window.location.href = "../view/index.html";
                    let msg = resposta.status + " - " + resposta.statusText;
                    throw new Error(msg); 
                }else
                    return resposta.json();        
            })
            .then(function(respostaJSON){
                if(respostaJSON.erro===false)
                    fcSucessoExcluirFilme(respostaJSON);
                else
                    fcErroExcluirFilme(respostaJSON.msgErro);
            })
            .catch(function(erro){
                exibirMensagemErro('#msg',erro);
            });
    }
}

function fcSucessoExcluirFilme(respostaJSON){
    exibirMensagem('#msg',respostaJSON.msgSucesso);
    setTimeout(function(){
        limparSpan('#msg');
        filmeListarFetch();
    },1500); 
}

function fcErroExcluirFilme(erro){
    exibirMensagemErro('#msg',erro);
    setTimeout(function(){
        limparSpan('#msg');
    },1500); 
}

export {filmeExcluirFetch}
