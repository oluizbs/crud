import { limparSpan, exibirMensagem, exibirMensagemErro } from "../utilJs/funcoesUtil.js";
import { usuarioListarFetch } from "./listar.js";
function usuarioExcluirFetch(id){
    if (confirm('Confirma a exclusao do usuario de id '+id+'?')){
        let usuario = {"id" : id};
        let configMetodo = {
            method: "DELETE"
            ,body: JSON.stringify(usuario)
            ,headers:{"Content-Type": "application/json;charset=UTF-8"}

        };
        //fetch que envia o id do usuario que estara sendo excluido
        fetch("../controller/usuarioExcluir.php",configMetodo)
            .then(function(resposta){
                if(!resposta.ok===true){
                    if(resposta.status===401)
                        window.location.href="../view/index.html";
                    let msg = resposta.status + " - " + resposta.statusText;
                    throw new Error(msg);
                }else 
                    return resposta.json();
            })
        .then(function(respostaJSON){
            if(respostaJSON.erro===false)
                fcSucessoExcluirUsuario(respostaJSON)
            else 
                fcErroExcluirUsuario(respostaJSON.msgErro);
        })
        .catch(function(erro){
            fcErroExcluirUsuario(erro);
        })
    }
}

function fcSucessoExcluirUsuario(respostaJSON){
    exibirMensagem('#msg', respostaJSON.msgSucesso)
    setTimeout(function(){
        limparSpan("#msg");
        usuarioListarFetch();
    },1500);
}

function fcErroExcluirUsuario(erro){
    exibirMensagemErro('#msg', erro);
    setTimeout(function(){
        limparSpan('#msg');
    },1500);
}

export {usuarioExcluirFetch};