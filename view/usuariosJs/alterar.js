import {exibirMensagem, exibirMensagemErro, limparSpan, fazFetch} from "../utilJs/funcoesUtil.js";
//importa tais funcoes que estão no arquivo funcoesUtil
import {usuarioListarFetch} from "./listar.js";
//importa a funcao "usuarioListarFetch" do arquivo listar.js
const $btnAlterar = document.querySelector("#alterar");
//declara uma variavel e liga ao botão alterar do html
$btnAlterar.addEventListener('click', function(event){
//adiciona o evento de click que vai chamar a funcao event
    event.preventDefault();
    //o preventDefault impede que o comportamento padrão ocorra
    usuarioAlterarFetch();
    //chama a funcao usuarioAlterarFetch
    $("#modal-formulario-alterar").modal('hide');
    //esconde o modal
});

let usuarioAlterarFetch = function(){
    //declara a variavel usuarioAlterarFetch e atribui uma funcao a ela  
    let formAlterar = document.querySelector('#form-alterar');
    //declara a variavel que pega o id do botão form alterar 
    let usuario = {
        //declara um array
        "id": formAlterar.querySelector('#id').value,
        "nome": formAlterar.querySelector("#nome").value
    };
    fazFetch("../controller/usuarioAlterar.php", "PUT", usuario, fcErroAlterarusuario, fcSucessoAlterarusuario)
    // let configMetodo = {
    //     method: "PUT",
    //     body: JSON.stringify(usuario),
    //     headers:{"Content-Type":"application/JSON;charset=UTF-8"}
    // };
    // fetch("../controller/usuarioAlterar.php", configMetodo)
    // .then(function(resposta){
    //     if(!resposta.ok===true){
    //         if(resposta.status===401)
    //             window.location.href = "../view/index.html";
    //         let msg = resposta.status + " - " + resposta.statusText;
    //         throw new Error(msg);
    //     }
    //     else 
    //         return resposta.json();
    // })
    // .then(function(respostaJSON){
    //     if(respostaJSON.erro===false)
    //         fcSucessoAlterarusuario(respostaJSON);
    //     else
    //         fcErroAlterarusuario(respostaJSON.msgErro);
    // })
    // .catch(function(erro){
    //     exibirMensagemErro('#msg', erro);
    // });
}

const $btnCancelar = document.querySelector('#cancelar');
$btnCancelar.addEventListener('click', function(){
    if(confirm('Deseja mesmo cancelar a alteracao?'))
        window.location.href = "../view/usuarios.html";
})

function fcSucessoAlterarusuario(respostaJSON){
    exibirMensagem('#msg', respostaJSON.msgSucesso);
    setTimeout(function(){
        limparSpan('#msg');
        usuarioListarFetch();
    }, 1500);
}

function fcErroAlterarusuario(erro){
    exibirMensagemErro('#msg', erro);
    setTimeout(function(){
        limparSpan('#msg');
    }, 1500);
}