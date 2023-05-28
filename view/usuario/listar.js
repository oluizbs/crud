window.onload = () => {
    generoListarFetch()
}
let generoListarFetch = function() {
    document.querySelector('tbody').innerHTML = ""
    fetch("../controller/usuarioListar.php")
    .then(function(resposta){
        if(! resposta.ok===true){
            let msg = resposta.status + " - " + resposta.statusText;
            throw new Error(msg)
        }else
            return resposta.json();
    })
    .then(function(respostaJSON){
        if(respostaJSON.erro===false)
            cbSucessoListarGenero(respostaJSON);
        else
            cbErroListarGenero(respostaJSON.msgErro)
    })
    .catch(function(erro){
        document.querySelector('#msgErro').textContent = erro;
    })
}
function cbSucessoListarGenero(respostaJSON){
    montarTabela(respostaJSON.dados);
}
function cbErroListarGenero(erro) {
    document.querySelector('#msgErro').textContent = erro
}
function montarTabela(dados){
    for (const i in dados) {
        let genero = dados[i];
        const $tr = document.createElement('tr');
        criarTDePendurar($tr, genero.id , false);
        criarTDePendurar($tr, genero.descricao , false);
        // 
        let links = "<a href=# '>[Editar]</a>"
        // 
        links+= "<a href=#  '>[Excluir]</a>" 
        criarTDePendurar($tr, links , true);
        document.querySelector('tbody').appendChild($tr);
    }
}
const $corpoTabela = document.querySelector('tbody');
$corpoTabela.addEventListener('click',function(event){
    if(event.target.tagName==='A'){
        let link = event.target;
        let generoId = obterValorDaColunaId(link)
        if(generoId > 0 && link.textContent === "[Excluir]")
            generoExcluirFetch(generoId)
        else if(generoId >0 && link.textContent === "[Editar]")
            generoBuscarFetch(generoId)      
    } 
});
function obterValorDaColunaId(link){
    if(link.textContent === "[Excluir]" || link.textContent === "[Editar]"){
        
        let coluna = link.parentNode;
        let linha = coluna.parentNode;
        
        let idText = linha.firstChild;
        return parseInt(idText.textContent);
    }
    return null;
}
function criarTDePendurar(noPai, informacao, ehHtml){
    let td = document.createElement('td');
    if(ehHtml)
        td.innerHTML = informacao;
    else
        td.textContent = informacao;
    noPai.appendChild(td);
}