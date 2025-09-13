let nome = document.querySelector('#usuario');
let senha = document.querySelector('#senha');
const toggleSenhaBtn = document.getElementById('toggle-senha');
const iconeOlho = document.getElementById('icone-olho');
const iconeOlhoCortado = document.getElementById('icone-olho-cortado');

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




document.getElementById("submit").addEventListener("click", async function (event) {
    if (nome.value == '' || senha.value == '') {
        alert("Preencha todos os campos")
        event.preventDefault();
        if (nome.value == '' && senha.value != '') {
            nome.focus();
        } else if (nome.value != '' && senha.value == '' ) {
            senha.focus();
        } 
        return
    } 
     try {
     console.log("Enviando dados para a API...");
     const response = await sendLogin(); // Chamada correta com await

        if (resposta.ok && data.userData === 1) {
      alert("Login bem-sucedido. Bem-vindo!");
      sessionStorage.setItem('usuario', nome);
      window.location.href = '#';
    } else {
      alert(`Erro no Login: ${response.status} - Tente novamente.`);
        console.error("Falha na API:", response);
    }
    } 
     catch (error) {
         alert("Ocorreu um erro de conexão. Verifique sua internet.");
         console.error("Erro ao chamar sendLogin:", error);
     }

    }
);



async function sendLogin(){
    // insert into cliente (nome_cliente, CNPJ, email, senha) values (':nome', lpad(':cnpj',14,'0'), ':email', ':senha')
    let url = "https://oracleapex.com/ords/projeto_8/circuitsense/"
    let params = null;

    const userData = {
        //nome: nome.value.trim(),
        //cnpj: documento.value.trim(),
        email: nome.value.trim(),
        senha: senha.value
        
    };

    params = new URLSearchParams(userData);

    const response = await fetch(`${url}usuario/?${params.toString()}`, {
        method: "GET",
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