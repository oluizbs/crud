import { exibirMensagem, exibirMensagemErro, limparSpan } from "../utilJs/funcoesUtil.js";
import { generoListarFetch } from "./listar.js";

//Recupera o botão alterar (Também poderíamos usar o form e o evento submit)        
const $btnAlterar = document.querySelector('#alterar');
$btnAlterar.addEventListener('click', function(event){
    event.preventDefault();
    generoAlterarFetch();
    $("#modal-formulario-alterar").modal('hide');
});

let generoAlterarFetch = function(){
    let formAlterar = document.querySelector('#form-alterar');
    let genero = {
        "id": formAlterar.querySelector('#id').value,
        "descricao": formAlterar.querySelector('#descricao').value
    };
    let configMetodo = {
        method: "PUT"
        ,body: JSON.stringify(genero)
        ,headers: {"Content-Type":"application/json;charset=UTF-8"}
    };

    fetch("../controller/generoAlterar.php", configMetodo)
        .then(function(resposta){
            if(!resposta.ok===true){
                if(resposta.status===401)
                    window.location.href = "../view/index.html";
                let msg = resposta.status + " - " + resposta.statusText;
                throw new Error(msg);
            }
            else
                return resposta.json();
        })
        .then(function(respostaJSON){
            if(respostaJSON.erro===false)
                fcSucessoAlterarGenero(respostaJSON);
            else
                fcErroAlterarGenero(respostaJSON.msgErro);
        })
        .catch(function(erro){
            fcErroAlterarGenero(erro);
        });
}

const $btnCancelar = document.querySelector('#cancelar');
$btnCancelar.addEventListener('click',function(){
    if(confirm('Deseja mesmo cancelar a alteração?'))
        window.location.href = "../view/generos.html";
})

function fcSucessoAlterarGenero(respostaJSON){
    exibirMensagem('#msg',respostaJSON.msgSucesso);
    setTimeout(function(){
        limparSpan('#msg');
        generoListarFetch();
    },1500);
}

function fcErroAlterarGenero(erro){
    exibirMensagemErro('#msg',erro);
    setTimeout(function(){
        limparSpan('#msg');
    },1500);
}