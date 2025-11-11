window.onload = async function () {
  const apiUrl = "https://oracleapex.com/ords/projeto_8/Circuitsense/dados";
  const REFRESH_INTERVAL = 10000; // tempo de atualização de 10 segundos

  
    async function atualizarGraficos() {

  try {
    console.log("Buscando dados da API...");
    const response = await fetch(apiUrl, { headers: { "Accept": "*/*" } });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    const items = data.items || [];

    console.log(`${items.length} registros recebidos da API.`);
    console.log("Exemplo de dado:", items[0]);

    // 🔹 1. Converter os dados em arrays por campo
    const dataArrays = processarDados(items);
    console.log("Campos encontrados:", Object.keys(dataArrays));

    // 🔹 2. Criar todos os conjuntos de dataPoints com segurança
    const dataPoints = gerarTodosDataPoints(dataArrays);

    criarGraficos(dataPoints);

    document.getElementById("ultimo-update").textContent =
    "Última atualização: " + new Date();
  } catch (error) {
    console.error("Erro na requisição:", error);
  }
    }

  await atualizarGraficos();
  setInterval(atualizarGraficos, REFRESH_INTERVAL);

};

// ===============================
// 🔧 Funções auxiliares
// ===============================

// Agrupa os valores de cada campo em um array
function processarDados(dados) {
  const result = {};
  dados.forEach(entry => {
    for (const key in entry) {
      if (!result[key]) result[key] = [];
      result[key].push(entry[key]);
    }
  });
  return result;
}

// 🔹 Função robusta: cria dataPoints com segurança
function createDataPoints(xValues, yValues) {
  if (!Array.isArray(xValues) || !Array.isArray(yValues)) {
    console.warn("Dados inválidos para dataPoints:", { xValues, yValues });
    return [];
  }

  const length = Math.min(xValues.length, yValues.length);
  if (length === 0) {
    console.warn("Arrays vazios em createDataPoints");
    return [];
  }

  return xValues.slice(0, length).map((x, i) => ({
    x: new Date(x),
    y: parseFloat(yValues[i]) || 0
  }));
}

// 🔹 Função auxiliar para retornar [] caso o campo não exista
function safeGet(obj, key) {
  if (Array.isArray(obj[key])) return obj[key];
  console.warn(`Campo ausente no JSON: ${key}`);
  return [];
}

// Gera todos os dataPoints do dashboard
function gerarTodosDataPoints(dataArrays) {
  const dp = {};

  dp.tensao1 = createDataPoints(dataArrays.data_inc, safeGet(dataArrays, "tensao_1"));
  dp.tensao2 = createDataPoints(dataArrays.data_inc, safeGet(dataArrays, "tensao_2"));
  dp.tensao3 = createDataPoints(dataArrays.data_inc, safeGet(dataArrays, "tensao_3"));

  dp.corrente1 = createDataPoints(dataArrays.data_inc, safeGet(dataArrays, "corrente_1"));
  dp.corrente2 = createDataPoints(dataArrays.data_inc, safeGet(dataArrays, "corrente_2"));
  dp.corrente3 = createDataPoints(dataArrays.data_inc, safeGet(dataArrays, "corrente_3"));

  dp.potAtiva1 = createDataPoints(dataArrays.data_inc, safeGet(dataArrays, "potencia_ativa_1"));
  dp.potAtiva2 = createDataPoints(dataArrays.data_inc, safeGet(dataArrays, "potencia_ativa_2"));
  dp.potAtiva3 = createDataPoints(dataArrays.data_inc, safeGet(dataArrays, "potencia_ativa_3"));
  dp.potAtivaTot = createDataPoints(dataArrays.data_inc, safeGet(dataArrays, "potencia_ativa_tot"));

  dp.potAP1 = createDataPoints(dataArrays.data_inc, safeGet(dataArrays, "potencia_ap_1"));
  dp.potAP2 = createDataPoints(dataArrays.data_inc, safeGet(dataArrays, "potencia_ap_2"));
  dp.potAP3 = createDataPoints(dataArrays.data_inc, safeGet(dataArrays, "potencia_ap_3"));
  dp.potAPTot = createDataPoints(dataArrays.data_inc, safeGet(dataArrays, "potencia_ap_tot"));

  dp.potReat1 = createDataPoints(dataArrays.data_inc, safeGet(dataArrays, "potencia_reat_1"));
  dp.potReat2 = createDataPoints(dataArrays.data_inc, safeGet(dataArrays, "potencia_reat_2"));
  dp.potReat3 = createDataPoints(dataArrays.data_inc, safeGet(dataArrays, "potencia_reat_3"));
  dp.potReatTot = createDataPoints(dataArrays.data_inc, safeGet(dataArrays, "potencia_reat_tot"));

  dp.fp = createDataPoints(dataArrays.data_inc, safeGet(dataArrays, "fator_potencia"));

  return dp;
}

// ===============================
// 📊 Geração dos gráficos CanvasJS
// ===============================

function criarGraficos(dp) {
  const configs = [
    {
      id: "chartContainer",
      unit: "V",
      series: [
        { name: "Tensão 1", data: dp.tensao1 },
        { name: "Tensão 2", data: dp.tensao2 },
        { name: "Tensão 3", data: dp.tensao3 }
      ]
    },
    {
      id: "Corrente",
      unit: "A",
      series: [
        { name: "Corrente 1", data: dp.corrente1 },
        { name: "Corrente 2", data: dp.corrente2 },
        { name: "Corrente 3", data: dp.corrente3 }
      ]
    },
    {
      id: "potenciaAtiva",
      unit: "W",
      series: [
        { name: "Fase 1", data: dp.potAtiva1 },
        { name: "Fase 2", data: dp.potAtiva2 },
        { name: "Fase 3", data: dp.potAtiva3 },
        { name: "Total", data: dp.potAtivaTot }
      ]
    },
    {
      id: "potenciaAP",
      unit: "VA",
      series: [
        { name: "Fase 1", data: dp.potAP1 },
        { name: "Fase 2", data: dp.potAP2 },
        { name: "Fase 3", data: dp.potAP3 },
        { name: "Total", data: dp.potAPTot }
      ]
    },
    {
      id: "PotenciaReat",
      unit: "VAR",
      series: [
        { name: "Fase 1", data: dp.potReat1 },
        { name: "Fase 2", data: dp.potReat2 },
        { name: "Fase 3", data: dp.potReat3 },
        { name: "Total", data: dp.potReatTot }
      ]
    },
    {
      id: "FP",
      unit: "",
      series: [{ name: "FP", data: dp.fp }]
    },
    {
      id: "Potencia1",
      unit: "",
      series: [
        { name: "Potencia Ativa (W)", data: dp.potAtiva1 },
        { name: "Potencia Aparente (VA)", data: dp.potAP1 },
        { name: "Potencia Reativa (VAR)", data: dp.potReat1 }
      ]
    },
    {
      id: "Potencia2",
      unit: "",
      series: [
        { name: "Potencia Ativa (W)", data: dp.potAtiva2 },
        { name: "Potencia Aparente (VA)", data: dp.potAP2 },
        { name: "Potencia Reativa (VAR)", data: dp.potReat2 }
      ]
    },
    {
      id: "Potencia3",
      unit: "",
      series: [
        { name: "Potencia Ativa (W)", data: dp.potAtiva3 },
        { name: "Potencia Aparente (VA)", data: dp.potAP3 },
        { name: "Potencia Reativa (VAR)", data: dp.potReat3 }
      ]
    }

  ];

  configs.forEach(cfg => criarGrafico(cfg));
}

// Cria e renderiza um gráfico individual
function criarGrafico({ id, title, unit, series }) {
  const container = document.getElementById(id);
  if (!container) {
    console.warn(`Div de destino não encontrada: #${id}`);
    return;
  }

  const chart = new CanvasJS.Chart(id, {
    animationEnabled: true,
    zoomEnabled: true,
    title: { text: title },
    axisX: {
      valueFormatString: "DD MMM HH:mm",
      title: "Data e Hora",
      valueType: "dateTime"
    },
    axisY: {
      title,
      includeZero: false,
      suffix: unit ? ` ${unit}` : ""
    },
    data: series.map(s => ({
      type: "line",
      name: s.name,
      showInLegend: true,
      yValueFormatString: `#,##0.00 ${unit}`,
      dataPoints: s.data || []
    }))
  });

  chart.render();
}

