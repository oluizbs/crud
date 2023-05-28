const $btnAlterar = document.querySelector('#alterar');
$btnAlterar.addEventListener('click', function(event){
    event.preventDefault();
    usuarioAlterarFetch()
    $("#modal-formulario-alterar").modal('hide')
});
let usuarioAlterarFetch = function(){
    let formAlterar = document.querySelector("#form-alterar")
    let usuario = {
        "id": formAlterar.querySelector('#id').value,
        "nome": formAlterar.querySelector('#nome').value,
        "login": formAlterar.querySelector('#login').value,
        "senha": formAlterar.querySelector('#senha').value
    };
let configMetodo = {
        method: "PUT",
        body: JSON.stringify(usuario),
        headers: {
            "Content-Type":"application/json;charset=UTF-8"
        }
    };
    fetch("../controller/usuarioAlterar.php", configMetodo)
        .then(function(resposta){
            if(!resposta.ok===true){
                let msg = resposta.status + " - " + resposta.statusText;
                throw new Error(msg)
            }
            else
                return resposta.json();
        })
        .then(function(respostaJSON){
            if(respostaJSON.erro===false)
                cbSucessoAlterarUsuario(respostaJSON);
            else
            cbSErroAlterarUsuario(respostaJSON.msgErro);
        })
        .catch(function(erro){
            document.querySelector('#msgErro').textContent = erro;
        });
}
const $btnCancelar = document.querySelector('#cancelar');
$btnCancelar.addEventListener('click', function(){
    if(confirm('Deseja mesmo cancelar a alteração?'))
        window.location.href = "../view/generos.html";
})
function cbSucessoAlterarUsuario(respostaJSON){
    document.querySelector('#msgSucesso').textContent = respostaJSON.msgSucesso;
    setTimeout(function(){
        limpaSpans()
        usuarioListarFetch()
    }, 1500);
}
function cbErroAlterarUsuario(erro){
    document.querySelector("#msgErro").textContent = erro
    setTimeout(function(){
        limpaSpans()
    }, 1500)
}