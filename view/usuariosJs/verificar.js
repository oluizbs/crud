window.onload=function(){
    usuarioVerificarFetch();
}

let usuarioVerificarFetch = function(){
    fetch("../model/autenticar.php")
    .then(function(resposta){
        console.log(resposta);
        if(!resposta.ok===true){
            if(resposta.status===401){
                // console.log('endereco', window.location.pathname);
                let partes = window.location.pathname.split('/');
                let pagina = partes[partes.length-1];
                if(pagina==='index.html'){
                    $("#modal-login").modal({backdrop: 'static'});
                    $("#modal-login").modal('show');
                }else
                    window.location.href = "../view/index.html";
            }
        }
    })
}