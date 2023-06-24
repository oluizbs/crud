import { exibirMensagem, exibirMensagemErro, limparSpan } from "../utilJs/funcoesUtil.js";
import { generoListarFetch } from "./listar.js";

function generoExcluirFetch(id){    
    if(confirm('Confirma a exclusão do genero de id '+id+'?')){ 
        let genero = {"id": id};
        let configMetodo = {
            method: "DELETE"
            ,body: JSON.stringify(genero)
            ,headers:{"Content-Type": "application/json;charset=UTF-8"}
        };

        fetch("../controller/generoExcluir.php", configMetodo)
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
                    fcSucessoExcluirGenero(respostaJSON);
                else
                    fcErroExcluirGenero(respostaJSON.msgErro);
            })
            .catch(function(erro){
                fcErroExcluirGenero(erro);
            })
    }
}

function fcSucessoExcluirGenero(respostaJSON){
    exibirMensagem('#msg',respostaJSON.msgSucesso);
    setTimeout(function(){
        limparSpan('#msg');
        generoListarFetch();
    },1500); 
}

function fcErroExcluirGenero(erro){
    exibirMensagemErro('#msg',erro);
    setTimeout(function(){
        limparSpan('#msg');
    },1500); 
}

export {generoExcluirFetch};
