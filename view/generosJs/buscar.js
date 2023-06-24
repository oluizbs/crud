import { exibirMensagem,exibirMensagemErro,limparSpan } from "../utilJs/funcoesUtil.js";
//Ao carregar a página
/*window.onload = function(){
    //Pegue o parâmetro id contido na query string da url
    let qs = window.location.search.replace('?','');
    let parametrosBuscar = qs.split('=');
    let id = parametrosBuscar[1];
    generoBuscarFetch(id);   
}*/
function generoBuscarFetch(id){  
    //fetch enviando o id do genero a ser recuperado
    fetch("../controller/generoBuscar.php?id="+id+"")
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
            if(respostaJSON.erro===false){
                fcSucessoBuscarGenero(respostaJSON);
                exibirMensagem('#msg',respostaJSON.msgSucesso);
                setTimeout(function(){
                    limparSpan('#msg');
                },1500);
            }else
                fcErroBuscarGenero(respostaJSON.msgErro);
        })
        .catch(function(erro){
            fcErroBuscarGenero(erro);
        });
}

function fcSucessoBuscarGenero(respostaJSON){
    $("#modal-formulario-alterar").modal({backdrop: 'static'});
	$("#modal-formulario-alterar").modal('show');
    let formAlterar = document.querySelector('#form-alterar');
    let genero = respostaJSON.dados;
    formAlterar.querySelector('#id').value = genero.id;
    formAlterar.querySelector('#descricao').value = genero.descricao;
}

function fcErroBuscarGenero(erro){
    exibirMensagemErro('#msg',erro);
    setTimeout(function(){
        limparSpan('#msg');
    },1500);
}

export {generoBuscarFetch};


