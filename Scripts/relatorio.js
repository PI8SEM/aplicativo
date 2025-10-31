document.getElementById("submit").addEventListener("click", async function (event) {
     
     try {
     console.log("Enviando dados para a API...");
     const response = await baixarPDF(); // Chamada correta com await

        if (response.status == "200") {
      alert("Login bem-sucedido. Bem-vindo!");
      
      // window.location.href = '#';
    } else {
      alert(`Erro no Login: ${response.status} - Tente novamente.`);
        console.error("Falha na API:", response);
    }
    } 
     catch (error) {
         alert("Ocorreu um erro de conexão. Verifique sua internet.");
         console.error("Erro ao chamar baixarPDF:", error);
     }

    }
);


async function baixarPDF(){
    // insert into cliente (nome_cliente, CNPJ, email, senha) values (':nome', lpad(':cnpj',14,'0'), ':email', ':senha')
    let url = "https://projeto-integrador-api-documento.wnmocf.easypanel.host/"
    let params = null;

    const response = await fetch(`${url}relatorio?${params.toString()}`, {
        method: "GET",
        headers: {
            //"Content-Type": "application/json",
            "Accept": "*/*/"
        },
    });
    console.log(response)
    const data = await response.json();

    return {
        "status": response.status
    }

    

}