function filmeExcluirFetch(id) {
    if(confirm('Confirmar exclusão do filme com id: ' + id + '?')){
        let filme = {"id": id}
        let configMetodo = {
            method: "DELETE",
            body: JSON.stringify(filme),
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            }
        }

        fetch("../controller/filmeExcluir.php", configMetodo)
            .then(function(resposta) {
                if(!resposta.ok === true) {
                    let msg = resposta.status + " - " + resposta.statusText
                    throw new Error(msg)
                } else
                    return resposta.json()
            })
            .then(function(respostaJSON){
                if(respostaJSON.erro === false)
                    cbSuccessoExcluirFilme(respostaJSON)
                else
                    cbErroExcluirFilme(resposta.msgErro)
            })
            .catch(function(erro){
                document.querySelector("#msgErro").textContent = erro
            })
    }
}

function cbSuccessoExcluirFilme(respostaJSON) {
    document.querySelector('#msgSucesso').textContent = respostaJSON.msgSucesso
    setTimeout(function(){
        limpaSpans()
        filmeListarFetch()
        
    }, 3500)
}

function cbErroExcluirFilme(respostaJSON) {
    document.querySelector('#msgErro').textContent = respostaJSON.msgErro
    setTimeout(function(){
        limpaSpans()

    }, 1500)
}