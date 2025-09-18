let nome = document.querySelector('#nome');
let documento = document.querySelector('#documento');
let email = document.querySelector('#email');
let senha = document.querySelector('#senha');
let confirmaSenha = document.querySelector('#confirma-senha');
const toggleSenhaBtn = document.getElementById('toggle-senha');
const toggleSenhaConfBtn = document.getElementById('toggle-senha-conf');
const iconeOlho = document.getElementById('icone-olho');
const iconeOlhoCortado = document.getElementById('icone-olho-cortado');
const iconeOlhoConf = document.getElementById('icone-olho-conf');
const iconeOlhoCortadoConf = document.getElementById('icone-olho-cortado-conf');

toggleSenhaBtn.addEventListener('click', function() {
const isPassword = senha.type === 'password';


if (isPassword) {
    senha.type = 'text';
    iconeOlho.style.display = 'none';
    iconeOlhoCortado.style.display = 'block';
} else {
    senha.type = 'password';
    iconeOlho.style.display = 'block';
    iconeOlhoCortado.style.display = 'none';
}
});

toggleSenhaConfBtn.addEventListener('click', function() {
const isconfPassword = confirmaSenha.type === 'password';
if (isconfPassword) {
    confirmaSenha.type = 'text';
    iconeOlhoConf.style.display = 'none';
    iconeOlhoCortadoConf.style.display = 'block';
} else {
    confirmaSenha.type = 'password';
    iconeOlhoConf.style.display = 'block';
    iconeOlhoCortadoConf.style.display = 'none';
}
});



document.getElementById("submit").addEventListener("click", async function (event) {
    if (nome.value == '' || documento.value == '' || email.value == '' || senha.value == '' || confirmaSenha.value == '') {
        alert("Preencha todos os campos")
        event.preventDefault();
        if (nome.value == '') {
            nome.focus();
        } else if (documento.value == '') {
            documento.focus();
        } else if (email.value == '') {
            email.focus();
        } else if (senha.value == '') {
            senha.focus();
        } else if (confirmaSenha.value == '') {
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
        nome: 'henrique',//nome.value.trim(),
        cnpj: '1', //documento.value.trim(),
        email: '1', //email.value.trim(),
        senha: '123' //senha.value
        
    };

    params = new URLSearchParams(userData);


    var link = `${url}usuario?${params.toString()}`

    console.log(link)


    const response = await fetch((link), {
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