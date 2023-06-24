import { exibirMensagem,exibirMensagemErro,limparSpan } from "../utilJs/funcoesUtil.js";
//Para fechar o modal de alterar via jquery
$("#btn-fechar-jquery-alterar").click(function(){
    $("#modal-formulario-alterar").modal({backdrop: 'static'});
    $("#modal-formulario-alterar").modal('hide');
});

let filmeBuscarFetch = function(id){  
    fetch("../controller/filmeBuscar.php?id="+id+"")
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
                fcSucessoBuscarFilme(respostaJSON);
            else
                fcErroBuscarFilme(respostaJSON.msgErro);
            return respostaJSON.dados.genero_id;
        }) //Grande vantagem de se trabalhar com promise
        .then(function(idGeneroAtual){
            buscarEposicionarGeneros(idGeneroAtual);
        })
        .catch(function(erro){
            exibirMensagemErro('#msg',erro);
        });
};

function fcSucessoBuscarFilme(respostaJSON){
    $("#modal-formulario-alterar").modal({backdrop: 'static'});
	$("#modal-formulario-alterar").modal('show');
    let formAlterarFilme = document.querySelector('#form-alterar');
    let filme = respostaJSON.dados;
    formAlterarFilme.querySelector('#id').value = filme.id;
    formAlterarFilme.querySelector('#titulo').value = filme.titulo;
    formAlterarFilme.querySelector('#avaliacao').value = filme.avaliacao;
}
function fcErroBuscarFilme(erro){
    exibirMensagemErro('#msg',erro);
}

function buscarEposicionarGeneros(idGeneroAtual){
    fetch("../controller/generoListar.php")
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
            if(respostaJSON.erro===false){
                fcSucessoListarGeneroBuscar(respostaJSON,idGeneroAtual);
                exibirMensagem('#msg',respostaJSON.msgSucesso);
                setTimeout(function(){
                    limparSpan('#msg')
                },1500);
            }else
            fcErroListarGeneroBuscar(respostaJSON.msgErro);
        })
        .catch(function(erro){
            exibirMensagemErro('#msg',erro);
        });
}

//Funções que podem ser de callback de listarGenero p/ inserir 
function fcSucessoListarGeneroBuscar(respostaJSON,idGeneroAtual){
    console.log("id", idGeneroAtual)
    let generos = respostaJSON.dados;
    if(generos!=null)
        montarSelectGeneros(generos,idGeneroAtual);
}
function fcErroListarGeneroBuscar(erro){
    exibirMensagemErro('#msg',erro);
}

function montarSelectGeneros(generos, idGeneroAtual){
    let formAlterarFilme = document.querySelector('#form-alterar');
    formAlterarFilme.querySelector('#cmbGeneros').innerHTML="";
    for (const i in generos) {
        let genero = generos[i];
        let $opt = document.createElement('option');
        $opt.value= genero.id;
        if(genero.id == idGeneroAtual)
            $opt.setAttribute('selected', 'selected');
        $opt.textContent = genero.descricao;
        formAlterarFilme.querySelector('#cmbGeneros').appendChild($opt);
    }
}

export {filmeBuscarFetch}
