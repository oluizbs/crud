import { limparSpan, exibirMensagem, exibirMensagemErro } from "../utilJs/funcoesUtil";
import { usuarioListarFetch} from "./listar";

const $btnEnviar = document.querySelector("#enviar");
$btnEnviar.addEventListener("click", function(event){
    event.preventDefault();
    usuarioInserirFetch();
    $("#modal-formulario-inserir").modal('hide');
});

let usuarioInserirFetch = function(){
    let usuario = {
        "nome":document.querySelector("#form-inserir").querySelector("#nome").value,
        "login":document.querySelector("#form-inserir").querySelector("#login").value,
        "senha": document.querySelector("#form-inserir").querySelector("#senha").value
    };
    let configMetodo = {
        method: "POST"
        ,body: JSON.stringify(usuario)
        ,headers:{"Content-Type":"application/json;charset=UTF-8"}
    };
    
}