function generoExcluirFetch(id){
    if(confirm('Confirma a exclusão do usuario de id '+id+'?')){ 
        let usuario = {"id": id};
        let configMetodo = {
            method: "DELETE",
            body: JSON.stringify(usuario),
            headers:{
                "Content-Type": "application/json;charset=UTF-8"
            }
        };
        fetch("../controller/usuarioExcluir.php", configMetodo)
            .then(function(resposta){
                if(!resposta.ok===true){
                    let msg = resposta.status + " - " + resposta.statusText;
                    throw new Error(msg)
                }else
                    return resposta.json();
            })
            .then(function(respostaJSON){
                if(respostaJSON.erro===false)
                    cbSucessoExcluirUsuario(respostaJSON);
                else
                cbErroExcluirUsuario(respostaJSON.msgErro)
            })
            .catch(function(erro){
                cbErroExcluirUsuario(erro)
            })
    }
}

function cbSucessoExcluirUsuario(respostaJSON){
    document.querySelector('#msgSucesso').textContent = respostaJSON.msgSucesso;
    setTimeout(function(){
        limpaSpans()
            UsuarioListarFetch()
    },1500); 
}
// 
function cbErroExcluirUsuario(erro){
    document.querySelector('#msgErro').textContent = erro
    setTimeout(function(){
        limpaSpans()
    },1500); 
}

function limpaSpans() {
    document.querySelector('#msgErro').textContent = ""
    document.querySelector('#msgSucesso').textContent = ""
}