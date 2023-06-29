import {exibirMensagemErro, fazFetch} from "../utilJs/funcoesUtil.js";
//importa a função "exibir mensagem erro" do arquivo "funções uteis"
import {usuarioExcluirFetch} from "./excluir.js";
//importa a função "usuario excluir fetch" do arquivo "funções uteis"
import{usuarioBuscarFetch} from "./buscar.js";
//importa a função "usuario buscar fetch" do arquivo "funções uteis"
$("#btn-novo-jquery").click(function(){
    //resgata o id do botao e adiciona o evento de click que chama a função
    $("#modal-formulario-inserir").modal({backdrop: 'static'});
    //define o modal como estatico
    $("#modal-formulario-inserir").modal('show');
    //mostra o modal  
});
$("#btn-fechar-jquery").click(function(){
    //resgata o id do botao e adiciona o evento de click que chama a função
    $("#modal-formulario-inserir").modal({backdrop: 'static'});
    //define o modal como estatico
    $("#modal-formulario-inserir").modal('hide');
    //esconde o modal  
});
$("#btn-fechar-jquery-alterar").click(function(){
    //resgata o id do botao e adiciona o evento de click que chama a função
    $("#modal-formulario-alterar").modal({backdrop: 'static'})
    //define o modal como estatico
    $("#modal-formulario-alterar").modal('hide');
    //esconde o modal  
});
$("#btn-home-jquery").click(function(){
    //resgata o id do botao e adiciona o evento de click que chama a função
    window.location.href = "index.html";
    //ao clicar no botao sera levado para a pagina inicial "index", e para isso usamos o "location.href" para especificar o local do arquivo
});
window.onload = ()=>{
    usuarioListarFetch();
    //isso quer dizer: ao carregar chama o fetch que lista os usuarios
};

//declarando funcao que sera chamada ao carregar a pagina
let usuarioListarFetch = function(){
    // document.querySelector("tbody").innerHTML="";
    // fetch("../controller/usuarioListar.php")
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
    //         fcSucessoListarUsuario(respostaJSON);
    //     else
    //         fcErroListarUsuario(respostaJSON.msgErro);
    // })
    // .catch(function(erro){
    //     fcErroListarUsuario(erro);
    // });
    // "nome": document.querySelector('#form-inserir').querySelector('#nome').value,
    // "login": document.querySelector('#form-inserir').querySelector('#login').value,
    // "senha": document.querySelector('#form-inserir').querySelector('#senha').value,
    document.querySelector('tbody').innerHTML="";
    fazFetch("../controller/usuarioListar.php", "GET", null, fcSucessoListarUsuario, fcErroListarUsuario)

};

function fcSucessoListarUsuario(respostaJSON){
    montarTabela(respostaJSON.dados);
}
function fcErroListarUsuario(erro){
    exibirMensagemErro('#msg', erro);
}

//funcao que cria linhas da tabela com dados recebidos da controller 
function montarTabela(dados){
    for(const i in dados){
        let obj = dados[i];
        const $tr = document.createElement('tr');
        //para cada atributo faça 
        criarTDePendurar($tr, obj.id, false);
        criarTDePendurar($tr, obj.nome, false);
        //cria os links para as operacoes editar e excluir
        let links = "<a href=# '>[Editar]</a>";
        links+="<a href=# '>[Excluir]</a>";
        //true indica que é um codifo html
        criarTDePendurar($tr, links, true);
        //coloca o "filho" que seria o tr(linha) no tbody da tabela
        document.querySelector('tbody').appendChild($tr);        
    }//termino do for in
}//termino da funcao

//logica para excluir um usuario
const $corpoTabela = document.querySelector('tbody');
$corpoTabela.addEventListener('click', function(event){
    if(event.target.tagName==='A'){
        //target = alvo -> se o alvo selecionado foi o 'A'
        let link =  event.target;
        let objId = obterValorDaColunaId(link);
        if(objId>0 && link.textContent === "[Excluir]")
            usuarioExcluirFetch(objId);
        else if(objId>0 && link.textContent === "[Editar]")
            usuarioBuscarFetch(objId);
    }
});

function obterValorDaColunaId(link){
    let coluna = link.parentNode;
    let linha = coluna.parentNode;

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

export {usuarioListarFetch};

