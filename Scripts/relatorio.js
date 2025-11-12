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


async function baixarPDF() {
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

// ...existing code...
document.addEventListener('DOMContentLoaded', function () {
  const multiselect = document.getElementById('analise-multiselect');
  const dropdown = document.getElementById('analise-list');
  const selectedContainer = document.getElementById('multi-selected');
  const form = document.getElementById('relatorio-form');

  if (!multiselect || !dropdown || !selectedContainer) return;

  // Toggle dropdown
  const toggle = multiselect.querySelector('.multiselect-toggle');
  function openDropdown() { dropdown.hidden = false; multiselect.setAttribute('aria-expanded', 'true'); }
  function closeDropdown() { dropdown.hidden = true; multiselect.setAttribute('aria-expanded', 'false'); }

  toggle.addEventListener('click', (e) => { e.stopPropagation(); dropdown.hidden ? openDropdown() : closeDropdown(); });
  multiselect.addEventListener('click', () => openDropdown());

  // close on outside click
  document.addEventListener('click', (e) => {
    if (!multiselect.contains(e.target)) closeDropdown();
  });

  // build state and hidden inputs
  function refreshSelection() {
    // remove existing hidden inputs
    form.querySelectorAll('input[name="analise[]"]').forEach(i => i.remove());

    // clear chips
    selectedContainer.innerHTML = '';

    const checked = Array.from(dropdown.querySelectorAll('input[type="checkbox"]:checked'));
    if (checked.length === 0) {
      const placeholder = document.createElement('span');
      placeholder.className = 'placeholder';
      placeholder.textContent = 'Selecione a(s) análise(s)';
      selectedContainer.appendChild(placeholder);
    }

    checked.forEach(chk => {
      const li = chk.closest('li');
      const value = li.dataset.value;
      const desc = li.dataset.desc;
      const labelText = li.textContent.trim();

      // hidden input for form submit
      const hidden = document.createElement('input');
      hidden.type = 'hidden';
      hidden.name = 'analise[]';
      hidden.value = value;
      form.appendChild(hidden);

      // chip
      const chip = document.createElement('span');
      chip.className = 'chip';
      chip.title = desc; // tooltip on hover shows full description
      const spanLabel = document.createElement('span');
      spanLabel.className = 'chip-label';
      spanLabel.textContent = labelText;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'chip-remove';
      btn.innerHTML = '✕';
      btn.addEventListener('click', (ev) => {
        ev.stopPropagation();
        chk.checked = false;
        refreshSelection();
      });

      chip.appendChild(spanLabel);
      chip.appendChild(btn);
      selectedContainer.appendChild(chip);
    });
  }

  // handle checkbox changes
  dropdown.querySelectorAll('input[type="checkbox"]').forEach(chk => {
    chk.addEventListener('change', refreshSelection);
  });

  // keyboard: Esc to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDropdown();
  });

  // initial refresh
  refreshSelection();


  
}
);
// ...existing code...