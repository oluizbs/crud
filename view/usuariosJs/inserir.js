import { limparSpan, exibirMensagem, exibirMensagemErro, fazFetch } from "../utilJs/funcoesUtil.js";
import { usuarioListarFetch} from "./listar.js";

const $btnEnviar = document.querySelector("#enviar");
$btnEnviar.addEventListener("click", function(event){
    event.preventDefault();
    usuarioInserirFetch();
    $("#modal-formulario-inserir").modal('hide');
});

let usuarioInserirFetch = function(){
    let usuario = {
        "nome":document.querySelector("#form-inserir").querySelector("#nome").value,
        "login":document.querySelector("#form-inserir").querySelector("#login").value,
        "senha": document.querySelector("#form-inserir").querySelector("#senha").value
    };
    fazFetch("../controller/usuarioInserir.php", "POST", usuario, fcErroInserirusuario, fcSucessoInserirusuario );
    // let configMetodo = {
    //     method: "POST"
    //     ,body: JSON.stringify(usuario)
    //     ,headers:{"Content-Type":"application/json;charset=UTF-8"}
    // };
    // fetch("../controller/usuarioInserir.php", configMetodo)
    // .then(function(resposta){
    //     if(!resposta.ok===true){
    //         if(!resposta.status===401)
    //             window.location.href = "../view/index.html";
    //         let msg = resposta.status + " - " + resposta.statusText;
    //         throw new Error(msg);
    //     }else
    //         return resposta.json();
    // })
    // .then(function(respostaJSON){
    //     if(respostaJSON.erro===false)
    //         fcSucessoInserirusuario(respostaJSON);
    //     else
    //         fcErroInserirusuario(respostaJSON.msgErro);
    // })
    // .catch(function(erro){
    //     fcErroInserirusuario(erro);
    // });
};

function fcSucessoInserirusuario(respostaJSON){
    exibirMensagem('#msg', respostaJSON.msgSucesso);
    setTimeout(function(){
        limparSpan('#msg');
        usuarioListarFetch();
    }, 1500);
}

function fcErroInserirusuario(erro){
    exibirMensagemErro('#msg', erro);
    setTimeout(function(){
        limparSpan('#msg');
    }, 1500);
}