import{exibirMensagem, exibirMensagemErro, limparSpan, fazFetch} from "../utilJs/funcoesUtil.js";
const formLogin = document.querySelector("#form-login");
formLogin.addEventListener('submit', function(event){
    event.preventDefault();
    usuarioLogarFetch();
    $("#modal-login").modal({backdrop: 'static'});
    $("#modal-login").modal('hide');
});

let usuarioLogarFetch = function(){
    let usuario = {
        "login" : document.querySelector("#login").value,
        "senha" : document.querySelector("#senha").value
    };
    fazFetch("../controller/usuarioLogar.php", "POST", usuario, fcErroLogarUsuario, fcSucessoLogarUsuario);
    // let configMetodo = {
    //     method: "POST",
    //     body: JSON.stringify(usuario),
    //     headers: {"Content-Type":"application/json;charset=UTF-8"}
    // };
    // fetch("../controller/usuarioLogar.php", configMetodo)
    // .then(function(resposta){
    //     console.log(resposta);
    //     if(!resposta.ok===true){
    //         let msg = resposta.status + " - " + resposta.statusText;
    //         throw new Error(msg);
    //     }else
    //         return resposta.json();
    //     })
    // .then(function(respostaJSON){
    //     if(respostaJSON.erro===false)
    //         fcSucessoLogarUsuario(respostaJSON);
    //     else 
    //         fcErroLogarUsuario(respostaJSON.msgErro);
    // })
    // .catch(function(erro){
    //     fcErroLogar(erro);
    // })
}

function fcErroLogarUsuario(erro){
    exibirMensagemErro('#msg', erro);
    setTimeout(function(){
        limparSpan("#msg");
    }, 1500);
    window.location.href = "../view/index.html";
}

function fcSucessoLogarUsuario(respostaJSON){
    console.log(respostaJSON.dados[0])
}