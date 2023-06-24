import { exibirMensagemErro, exibirMensagem, limparSpan } from "../utilJs/funcoesUtil.js";
import { filmeListarFetch } from "./listar.js";

//Recupera o elemento (Também poderíamos usar o form e o evento submit)        
const $btnEnviar = document.querySelector('#enviar');
$btnEnviar.addEventListener('click', function(event){
    event.preventDefault();    
    filmeInserirFetch();
    $("#modal-formulario-inserir").modal('hide');
})

//Carregando os generos no combo 
let filmeListarGeneroInserirFetch = function(){
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
            if(respostaJSON.erro===false)
                fcSucessoListarGeneroInserir(respostaJSON);
            else
                fcErroListarGeneroInserir(respostaJSON.msgErro);
        })
        .catch(function(erro){
            exibirMensagemErro('#msg',erro);
        });
};
//funções que poderiam ser de callback p/ listar os gêneros no select do form
function fcSucessoListarGeneroInserir(respostaJSON){
    montarSelect(respostaJSON.dados);
}
function fcErroListarGeneroInserir(erro){
    exibirMensagemErro('#msg',erro);
}
//Monta o select de gêneros
function montarSelect(dados){
    //Limpa o select
    document.querySelector('#cmbGeneros').innerHTML="";
    //Preenche o select com os generos recebidos (dados)
    for (const i in dados) {
        let genero = dados[i];
        let $opt = document.createElement('option');
        $opt.value= genero.id;
        $opt.textContent = genero.descricao;
        document.querySelector('#cmbGeneros').appendChild($opt);
    }
}

//fetch enviando o filme a ser inserido
let filmeInserirFetch = function(){
    //Monta um objeto filme recuperando os elementos do DOM
    let filme = {
        "titulo": document.querySelector('#titulo').value,
        "avaliacao" : parseFloat(document.querySelector('#avaliacao').value),
        "genero_id" : parseInt(document.querySelector('#cmbGeneros').value)
    };
    let configMetodo = {
        method : "POST"
        ,body : JSON.stringify(filme)
        ,headers :  {"Content-Type" : "application/json;charset=UTF-8"}
    };
    fetch("../controller/filmeInserir.php", configMetodo)
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
                fcSucessoInserirFilme(respostaJSON);
            else
                fcErroInserirFilme(respostaJSON.msgErro);
        })
        .catch(function(erro){
            fcErroInserirFilme(erro);
        });
};

function fcSucessoInserirFilme(respostaJSON){
    exibirMensagem('#msg',respostaJSON.msgSucesso);
    setTimeout(function(){
        limparSpan('#msg');
        filmeListarFetch();
    },1500);
}

function fcErroInserirFilme(erro){
    exibirMensagemErro('#msg',erro);
    setTimeout(function(){
        limparSpan('#msgS');
    },1500);
}

export {filmeListarGeneroInserirFetch}

