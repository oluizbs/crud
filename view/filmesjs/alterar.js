import { exibirMensagem, exibirMensagemErro, limparSpan } from "../utilJs/funcoesUtil.js";
import { filmeListarFetch } from "./listar.js";
//Recupera o botão alterar (Também poderíamos usar o form e o evento submit)        
const $btnAlterar = document.querySelector('#alterar');
$btnAlterar.addEventListener('click', function(event){
    event.preventDefault();
    filmeAlterarFetch();
    $("#modal-formulario-alterar").modal('hide');
});

let filmeAlterarFetch = function(){
    let formAlterar = document.querySelector('#form-alterar');
    let filme = {
        "id": formAlterar.querySelector('#id').value,"titulo": formAlterar.querySelector('#titulo').value,
        "avaliacao" : parseFloat(formAlterar.querySelector('#avaliacao').value),
        "genero_id" : parseInt(formAlterar.querySelector('#cmbGeneros').value)
    };
    let configMetodo = {
        method : "PUT"
        , body : JSON.stringify(filme)
        , headers :  {"Content-Type" : "application/json;charset=UTF-8"}//texto JSON
    }
    fetch("../controller/filmeAlterar.php", configMetodo)
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
                fcSucessoAlterarFilme(respostaJSON);
            else
                fcErroAlterarFilme(respostaJSON.msgErro);
        })
        .catch(function(erro){
            exibirMensagemErro('#msg',erro);
        });
};

const $btnCancelar = document.querySelector('#cancelar');
$btnCancelar.addEventListener('click',function(){
    if(confirm('Deseja mesmo cancelar a alteração?'))
        window.location.href = "../view/filmes.html";
})

function fcSucessoAlterarFilme(respostaJSON){
    exibirMensagem('#msg',respostaJSON.msgSucesso);
    setTimeout(function(){
        limparSpan('#msg');
        filmeListarFetch();
    },1500);
}

function fcErroAlterarFilme(erro){
    exibirMensagemErro('#msg',erro);
    setTimeout(function(){
        limparSpan('#msg');
    },1500);
}