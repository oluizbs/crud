//Ao carregar a página
// window.onload = function(){
//     //Pegue o parâmetro id contido na query string da url
//     let qs = window.location.search.replace('?','');
//     let parametrosBuscar = qs.split('=');
//     let id = parametrosBuscar[1];
//     buscarGenero(id);   
// }
//Busca um gênero com base no id recuperado na queryString
function generoBuscarFetch(id){  
    //fetch enviando o id do genero a ser recuperado
    fetch("../controller/generoBuscar.php?id="+id+"")
        .then(function(resposta){
            if(!resposta.ok===true){
                let msg = resposta.status + " - " + resposta.statusText;
                throw new Error(msg)
                // document.querySelector('#msgErro').textContent = msg; 
            }
            else
                return resposta.json();
        })
        .then(function(respostaJSON){
            if(respostaJSON.erro===false){
                cbSucessoBuscarGenero(respostaJSON);
                document.querySelector('#msgSucesso').textContent = respostaJSON.msgSucesso;
                setTimeout(function(){
                    document.querySelector('#msgSucesso').textContent = "";
                },1500);
            }else
                cbErroBuscarGenero(respostaJSON.msgErro)
                // document.querySelector('#msgSucesso').textContent = respostaJSON.msgErro;
        })
        .catch(function(erro){
            document.querySelector('#msgSucesso').textContent = erro;
        });
}
//Função de callback
function cbSucessoBuscarGenero(respostaJSON){
    $("#modal-formulario-alterar").modal({backdrop: 'static'})
    $("#modal-formulario-alterar").modal('show')
    let formAlterar = document.querySelector("#form-alterar")
    let genero = respostaJSON.dados;
    //Preencha os inputs com os dados trazidos
    formAlterar.querySelector('#id').value = genero.id;
    formAlterar.querySelector('#descricao').value = genero.descricao;
}

function cbErroBuscarGenero(erro) {
    document.querySelector("#msgErro").textContent = erro
    setTimeout(function(){
        limpaSpans()
    }, 1500)
}



