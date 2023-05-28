
// Controlando o modal de inserir com jquery 
$("#btn-novo-jquery").click(function(){
    filmeListarGeneroInserirFetch()
    $("#modal-formulario").modal({backdrop: 'static'})
    $("#modal-formulario").modal('show')

})

$("#btn-fechar-jquery").click(function(){
    $("#modal-formulario").modal({backdrop: 'static'})
    $("#modal-formulario").modal('hide')
})

const $btnEnviar = document.querySelector('#enviar')
$btnEnviar.addEventListener('click', function(event) {
    event.preventDefault()
    filmeInserirFetch()
    $('#modal-formulario').modal('hide')
})

let filmeListarGeneroInserirFetch = function() {
    fetch('../controller/generoListar.php')
        .then(function(resposta) {
            if(!resposta.ok === true){
                let msg = resposta.status + ' - ' + resposta.statusText
                throw new Error(msg)

            } else {
                return resposta.json()
            }
        })

        .then(function(respostaJSON){
            if(respostaJSON.erro === false)
                cbSucessoListarGeneroInserir(respostaJSON)
            else
                cbErroListarGeneroInserir(respostaJSON.msgErro)
        })

        .catch(function(erro){
            document.querySelector('#msgErro').textContent = erro
        })
}

function cbSucessoListarGeneroInserir(respostaJSON) {
    montarSelect(respostaJSON.dados)
}

function cbErroListarGeneroInserir(erro) {
    document.querySelector('#msgErro').textContent = erro
}

function montarSelect(dados) {
    document.querySelector("#cmbGeneros").innerHTML = ""
    for(const i in dados){
        let genero = dados[i]
        let $opt = document.createElement('option')

        $opt.value = genero.id
        $opt.textContent = genero.descricao

        document.querySelector('#cmbGeneros').appendChild($opt)
    }
}

let filmeInserirFetch = function() {
    let filme = {
        "titulo": document.querySelector('#titulo').value,
        "avaliacao": parseFloat(document.querySelector('#avaliacao').value),
        "genero_id": parseInt(document.querySelector('#cmbGeneros').value)

    }

    let configMetodo = {
        method: "POST", 
        body: JSON.stringify(filme),
        headers: {"Content-Type": "application/json;charset=UTF-8"}
    }

    fetch("../controller/filmeInserir.php", configMetodo)
        .then(function(resposta) {
            if(!resposta === true) {
                let msg = resposta.status + ' - ' + resposta.statusText
                throw new Error(msg)
            } else {
                return resposta.json()
            }
        })

        .then(function(respostaJSON) {
            if(respostaJSON.erro === false)
                cbSucessoInserirFilme(respostaJSON)
            else
                cbErroInserirFilme(respostaJSON.msgErro)
        })

        .catch(function(erro){
            cbErroInserirFilme(erro)
        }) 
}

function cbSucessoInserirFilme(respostaJSON){
    document.querySelector('#msgSucesso').textContent = respostaJSON.msgSucesso
    setTimeout(function(){
        limpaSpans()
        filmeListarFetch()

    }, 2000)
}

function cbErroInserirFilme(erro) {
    document.querySelector('#msgErro').textContent = erro
    setTimeout(function(){
        limparSpans()
    }, 1500)
}