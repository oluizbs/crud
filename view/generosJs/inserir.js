import { exibirMensagem,exibirMensagemErro,limparSpan } from "../utilJs/funcoesUtil.js";
import { generoListarFetch } from "./listar.js";

//Recupera o elemento input:submit(Também poderíamos usar o form e o mesmo evento submit)        
const $btnEnviar = document.querySelector('#enviar');
$btnEnviar.addEventListener('click', function(event){
    event.preventDefault();
    generoInserirFetch();
    $("#modal-formulario-inserir").modal('hide');
});

let generoInserirFetch = function(){
    let genero = {
        "descricao": document.querySelector('#form-inserir').querySelector('#descricao').value,
    };
    let configMetodo = {
        method: "POST"
        ,body: JSON.stringify(genero)
        ,headers: {"Content-Type":"application/json;charset=UTF-8"}
    };
    fetch("../controller/generoInserir.php", configMetodo)
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
            fcSucessoInserirGenero(respostaJSON);
        else
            fcErroInserirGenero(respostaJSON.msgErro);
    })
    .catch(function(erro){
        fcErroInserirGenero(erro);
    });
};

function fcSucessoInserirGenero(respostaJSON){
    exibirMensagem('#msg',respostaJSON.msgSucesso);
    setTimeout(function(){
        limparSpan('#msg');
        generoListarFetch();
    },1500);
}

function fcErroInserirGenero(erro){
    exibirMensagemErro('#msg',erro);
    setTimeout(function(){
        limparSpan('#msg');
    },1500);
}
