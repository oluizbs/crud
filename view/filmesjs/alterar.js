const $bntAlterar = document.querySelector('#alterar');
$bntAlterar.addEventListener('click', function(event) {
    event.preventDefault();
    filmeAlterarFetch();
    $("#modal-formulario-alterar").modal('hide');
});

let filmeAlterarFetch = function(){
    let formAlterarFilme = document.querySelector('#form-alterar');

    let filme = {
        "id": formAlterarFilme.querySelector('#id').value,
        "titulo": formAlterarFilme.querySelector('#titulo').value,
        "avaliacao": parseFloat(formAlterarFilme.querySelector('#avaliacao').value),
        "genero_id": parseInt(formAlterarFilme.querySelector('#cmbGeneros').value)
    };
    
    let configMetodo = {
        method:"PUT", 
        body: JSON.stringify(filme),
        headers: {'Content-Type': 'application/json;charset=UTF-8'}
    }

    //Envia o filme a ser alterado
    fetch("../controller/filmeAlterar.php", configMetodo)
        .then(function(resposta) {
            if(!resposta.ok===true){
                let msg = resposta.status + " - " + resposta.statusText;
                throw new Error(msg);
            }else
                return resposta.json();
        })
        .then(function(respostaJSON) {
            if(respostaJSON.error===false)
                cbSucessoAlterarFilme(respostaJSON);
            else
                cbErroAlterarFilme(respostaJSON.erro);
        })
        .catch(function(erro){
            document.querySelector('#msgErro').textContent = erro;
        });
}

const $btnCancelar = document.querySelector('#cancelar');
$btnCancelar.addEventListener('click', function() {
    if(confirm('Deseja cancelar a alteração?'))
        window.location.href="../view/filmes.html";
})

function cbSucessoAlterarFilme(respostaJSON) {
    document.querySelector('#msgSucesso').textContent = respostaJSON.msgSucesso;
    setTimeout(function() {
        window.location.href("../view/filmes.html");
    }, 1000);
}

function cbErroAlterarFilme(erro){
    document.querySelector('#msgErro').textContent = erro;
    setTimeout(function() {
        limparSpans();
    },1500);
};  