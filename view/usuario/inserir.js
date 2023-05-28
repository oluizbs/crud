const $Enviar = document.querySelector('#enviar');
$Enviar.addEventListener('click', function(event){
    event.preventDefault();-
    usurarioInserir()
    $("#modal-formulario").modal('hide')
})
let usurarioInserir = function(){
    let usuario = {
        "nome": document.querySelector("#form-inserir").querySelector('#nome').value,
        "login":document.querySelector("#form-inserir").querySelector('#login').value,
        "senha":document.querySelector("#form-inserir").querySelector('#senha').value
    };
    let configMetodo = {
        method: "POST",
        body: JSON.stringify(usuario),
        headers: {"Content-Type":"application/json;charset=UTF-8"}
    };
    fetch("../controller/generoInserir.php", configMetodo)
    .then(function(resposta){
        if(!resposta.ok===true){
            let msg = resposta.status + " - " + resposta.statusText;
            // document.querySelector('#msgErro').textContent = msg;
            throw new Error(msg)
        }
        else
            return resposta.json();
    })
    .then(function(respostaJSON){
        if(respostaJSON.erro===false)
            cbSucessoInserirGenero(respostaJSON);
        else
            cbErroInserirGenero(respostaJSON.msgErro)
    })
    .catch(function(erro){
        cbErroInserirGenero(erro)
    }); 
    function limpaSpans() {
        document.querySelector('#msgErro').textContent = ""
        document.querySelector('#msgSucesso').textContent = ""
    }
    function cbSucessoInserirGenero(respostaJSON){
        document.querySelector('#msgSucesso').textContent = respostaJSON.msgSucesso;
        setTimeout(function(){
            limpaSpans()
            generoListarFetch()
        }, 1500);
    }
    function cbErroInserirGenero(erro) {
        document.querySelector('#msgErro').textContent = erro
        setTimeout(function(){
            limpaSpans()
        }, 1500)
    }
}