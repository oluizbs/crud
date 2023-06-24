import { exibirMensagem, exibirMensagemErro, limparSpan } from "../utilJs/funcoesUtil.js";
import { filmeBuscarFetch } from "./buscar.js";
import { filmeExcluirFetch } from "./excluir.js";
import { filmeListarGeneroInserirFetch } from "./inserir.js";

$("#btn-novo-jquery").click(function(){
    filmeListarGeneroInserirFetch();
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
    filmeListarFetch();
}

let filmeListarFetch = function(){
    document.querySelector('tbody').innerHTML="";
    fetch("../controller/filmeListar.php")
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
                fcSucessoListarFilme(respostaJSON);
            else
                fcErroListarFilme(respostaJSON.msgErro);
        })
        .catch(function(erro){
            exibirMensagemErro('#msg',erro);
        });
};

function fcSucessoListarFilme(respostaJSON){
    montarTabela(respostaJSON.dados);
}
function fcErroListarFilme(erro){
    exibirMensagemErro('#msg',erro);
}

//Recebe um array de objetos filme e monta a tabela linha a linha
function montarTabela(dados){
    for (const i in dados) {
        let filme = dados[i];
        const $tr = document.createElement('tr');
        //p/ cada atributo faça
        criarTDePendurar($tr, filme.id , false);
        criarTDePendurar($tr, filme.titulo , false);
        criarTDePendurar($tr, filme.avaliacao , false);
        criarTDePendurar($tr, filme.genero_descricao , false);
        let links = "<a href=# '>[Editar]</a>";
        links+= "<a href=#  '>[Excluir]</a>"
        criarTDePendurar($tr, links , true);
        //Pendura a linha criada a cada iteração no tbody da tabela
        document.querySelector('tbody').appendChild($tr);
    }//Fim do for in
}//Fim da função

//recebe um nó pai, um filme e um boleano informando se é um código HTML ou não
//Essa função cria uma td e pendura no nó pai (sempre uma tr)
function criarTDePendurar(noPai, informacao, ehHtml){
    let td = document.createElement('td');
    if(ehHtml)
        td.innerHTML = informacao;
    else
        td.textContent = informacao;
    noPai.appendChild(td);
}

//Recupera o elemento tbody
const $corpoTabela = document.querySelector('tbody');
//Ao clicar no tbody, verifica-se se o alvo é uma ãncora (link) e se é para excluir ou Editar
$corpoTabela.addEventListener('click',function(event){
    //Se for uma âncora (link)
    if(event.target.tagName==='A'){
        let link = event.target;
        //função que obtem o valor da coluna id navegando pelos nós da linha da tabela
        let filmeId = obterValorDaColunaId(link);
        if(filmeId>0 && link.textContent === "[Excluir]")
            filmeExcluirFetch(filmeId); 
        else if(filmeId>0 && link.textContent === "[Editar]")
            filmeBuscarFetch(filmeId);        
    }  
});

//Essa função obtém o valor da coluna id a partir de um link dentro de uma td irmã
function obterValorDaColunaId(link){
    let coluna = link.parentNode;
    let linha = coluna.parentNode;
    let idText = linha.firstChild;
    return parseInt(idText.textContent);
}

export {filmeListarFetch}









       