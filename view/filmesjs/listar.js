// Ao carregar a página
window.onload = () => {
    filmeListarFetch() //Trás os filmes com uma requisión AJAX
}

//Uma função que fez um fetch e com o método GET para default
let filmeListarFetch = () => {
    document.querySelector('tbody').innerHTML = ""
    fetch("../controller/filmeListar.php")
        .then(function(resposta){
            if(!resposta.ok === true) {
                let msg = resposta.status + " - " + resposta.statusText 
                throw new Error(msg)
            } else {
                return resposta.json()
            }
        })

        .then(function(respostaJSON) {
            if(respostaJSON.erro === false)
                cbSucessoListarFilme(respostaJSON)
            else
                cbErroListarFilme(respostaJSON.msgErro)
        })

        .catch(function(erro){
            document.querySelector('#msgErro').textContent = erro
        })
}

//Essas funções poderiam ser de callback
function cbSucessoListarFilme(respostaJSON) {
    montarTabela(respostaJSON.dados)
}

function cbErroListarFilme(erro){
    document.querySelector('#msgErro').textContent = erro
}

//Recebe um array de objetos filme e monta a tabela linha por linha 
function montarTabela(dados){
    for(const i in dados) {
        let filme = dados[i] 
        const $tr = document.createElement('tr')

        criarTDePendurar($tr, filme.id, false)
        criarTDePendurar($tr, filme.titulo, false)
        criarTDePendurar($tr, filme.avaliacao, false)
        criarTDePendurar($tr, filme.genero_descricao, false)

        let links = "<a href=# '>[Editar]</a>"
        links += "<a href=# '>[Excluir]</a>"

        criarTDePendurar($tr, links, true)

        document.querySelector('tbody').appendChild($tr)
    }
}
// Fim da função linha por linha

function criarTDePendurar(noPai, informacao, ehHtml) {
    let td = document.createElement('td')
    if(ehHtml)
        td.innerHTML = informacao
    else
        td.textContent = informacao
    
        noPai.appendChild(td)
}

//recupera o tbody
const $corpoTabela = document.querySelector('tbody')

$corpoTabela.addEventListener('click', function(event){
    if(event.target.tagName === 'A') {
        let link = event.target
        let filmeId = obterValorDaColuna(link)
        if(filmeId > 0 && link.textContent === "[Excluir]")
            filmeExcluirFetch(filmeId)
        else if(filmeId > 0 && link.textContent === "[Editar]")
            filmeBuscarFetch(filmeId)
    }
})

function obterValorDaColuna(link) {
    let coluna = link.parentNode
    let linha = coluna.parentNode
    let idText = linha.firstChild

    return parseInt(idText.textContent)
}

//Função para limpar spans
function limparSpans() {
    document.querySelector("#msgErro").textContent = ""
    document.querySelector("#msgSucesso").textContent = ""
}