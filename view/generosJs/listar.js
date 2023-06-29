import { exibirMensagem, exibirMensagemErro, limparSpan, fazFetch } from "../utilJs/funcoesUtil.js";
import { generoExcluirFetch } from "./excluir.js";
import { generoBuscarFetch } from "./buscar.js";

$("#btn-novo-jquery").click(function(){
    $("#modal-formulario-inserir").modal({backdrop: 'static'});
    $("#modal-formulario-inserir").modal('show');
});
$("#btn-fechar-jquery").click(function(){
    $("#modal-formulario-inserir").modal({backdrop: 'static'});
    $("#modal-formulario-inserir").modal('hide');
});
$("#btn-fechar-jquery-alterar").click(function(){
    $("#modal-formulario-alterar").modal({backdrop: 'static'});
    $("#modal-formulario-alterar").modal('hide');
});
$("#btn-home-jquery").click(function(){
    window.location.href = "index.html";
});

window.onload = ()=>{
    generoListarFetch();
}

let generoListarFetch = function(){
    // document.querySelector('tbody').innerHTML="";
    // fetch("../controller/generoListar.php")
    // .then(function(resposta){
    //     if(! resposta.ok===true){
    //         if(resposta.status===401)
    //             window.location.href = "../view/index.html";
    //         let msg = resposta.status + " - " + resposta.statusText;
    //         throw new Error(msg); 
    //     }else
    //         return resposta.json();
    // })
    // .then(function(respostaJSON){
    //     if(respostaJSON.erro===false)
    //         fcSucessoListarGenero(respostaJSON);
    //     else
    //         fcErroListarGenero(respostaJSON.msgErro);
    // })
    // .catch(function(erro){
    //     exibirMensagemErro('#msg',erro);
    // });
    document.querySelector('tbody').innerHTML="";
    fazFetch("../controller/generoListar.php", "GET", null, fcSucessoListarGenero, fcErroListarGenero);
};

function fcSucessoListarGenero(respostaJSON){
    montarTabela(respostaJSON.dados);
}
function fcErroListarGenero(erro){
    exibirMensagemErro('#msg',erro);
}
//Esta função cria as linhas da tabela com os dados recebidos da CONTROLLER
function montarTabela(dados){
    for (const i in dados) {
        let genero = dados[i];
        const $tr = document.createElement('tr');
        //p/ cada atributo faça
        criarTDePendurar($tr, genero.id , false);
        criarTDePendurar($tr, genero.descricao , false);;
        let links = "<a href=# '>[Editar]</a>";
        links+= "<a href=#  '>[Excluir]</a>" 
        criarTDePendurar($tr, links , true);
        //Pendura a linha criada a cada iteração no tbody da tabela
        document.querySelector('tbody').appendChild($tr);
    }//Fim do for in
}//Fim da função

//Lógica de exclusão de um gênero. A função excluirGenero está em generosjs/excluir.js
const $corpoTabela = document.querySelector('tbody');
$corpoTabela.addEventListener('click',function(event){
    if(event.target.tagName==='A'){
        let link = event.target;
        let generoId = obterValorDaColunaId(link);
        if(generoId>0 && link.textContent === "[Excluir]"){
            generoExcluirFetch(generoId); 
        }
        else if(generoId>0 && link.textContent === "[Editar]"){
            generoBuscarFetch(generoId);
        }        
    } 
});

function obterValorDaColunaId(link){
    //parentNode = nó pai
    let coluna = link.parentNode;
    let linha = coluna.parentNode;
    //firstChild = primeiro filho
    let idText = linha.firstChild;
    return parseInt(idText.textContent);
}

function criarTDePendurar(noPai, informacao, ehHtml){
    let td = document.createElement('td');
    if(ehHtml)
        td.innerHTML = informacao;
    else
        td.textContent = informacao;
    noPai.appendChild(td);
}

export {generoListarFetch};
