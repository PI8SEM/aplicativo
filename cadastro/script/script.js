let nome = document.querySelector('#nome');
let documento = document.querySelector('#documento');
let email = document.querySelector('#email');
let senha = document.querySelector('#senha');
let confirmaSenha = document.querySelector('#confirma-senha');


document.getElementById("submit").addEventListener("click", async function (event) {
var response = createAccount()
    if (nome.value == '' || documento.value == '' || email.value == '' || senha.value == '' || confirmaSenha.value == '') {
        alert("Preencha todos os campos mula")
        event.preventDefault();
        if (nome.value == '' && documento.value != '' && email.value != '' && senha.value != '' && confirmaSenha.value != '') {
        nome.focus();
        } else if (nome.value != '' && documento.value == '' && email.value != '' && senha.value != '' && confirmaSenha.value != '') {
            documento.focus();
        } else if (nome.value != '' && documento.value != '' && email.value == '' && senha.value != '' && confirmaSenha.value != '') {
            email.focus();
        } else if (nome.value!= '' && documento.value != '' && email.value != '' && senha.value == '' && confirmaSenha.value != '') {
            senha.focus();
        } else if (nome.value != '' && documento.value != '' && email.value != '' && senha.value != '' && confirmaSenha.value == '') {
            confirmaSenha.focus();
        }
        return
    } else if (senha.value != confirmaSenha.value) {
            alert("As senhas informadas não conferem!")
            confirmaSenha.focus()
            event.preventDefault()
            return
    } 
    try {
    console.log("Enviando dados para a API...");
    const response = await createAccount(); // Chamada correta com await

    if (response.status === 201 || response.status === 200) {
        alert("Usuário cadastrado com sucesso!");
        window.location.href = "../../login/login.html"; // Redirecionamento
    } else {
        alert(`Erro no cadastro: ${response.status} - Tente novamente.`);
        console.error("Falha na API:", response);
    }
    } 
    catch (error) {
        alert("Ocorreu um erro de conexão. Verifique sua internet.");
        console.error("Erro ao chamar createAccount:", error);
    }
    }
);



async function createAccount(){
    // insert into cliente (nome_cliente, CNPJ, email, senha) values (':nome', lpad(':cnpj',14,'0'), ':email', ':senha')
    let url = "https://oracleapex.com/ords/projeto_8/circuitsense/"
    let params = null;

    const userData = {
        nome: nome.value.trim(),
        cnpj: documento.value.trim(),
        email: email.value.trim(),
        senha: senha.value
        
    };

    params = new URLSearchParams(userData);

    const response = await fetch(`${url}usuario/?${params.toString()}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
    });

    const data = await response.json();

    return {
        "status": response.status,
        "userData": data.items[0]
    }
}