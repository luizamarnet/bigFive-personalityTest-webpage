const questions = [
  { id: "EXT1", text: "Eu sou a vida da festa." },
  { id: "EXT2", text: "Eu não falo muito." },
  { id: "EXT3", text: "Eu me sinto confortável perto de pessoas." },
  { id: "EXT4", text: "Eu fico em segundo plano." },
  { id: "EXT5", text: "Eu inicio conversas." },
  { id: "EXT6", text: "Eu tenho pouco a dizer." },
  { id: "EXT7", text: "Eu converso com muitas pessoas em festas." },
  { id: "EXT8", text: "Eu não gosto de chamar atenção para mim." },
  { id: "EXT9", text: "Eu não me importo em ser o centro das atenções." },
  { id: "EXT10", text: "Eu sou quieto(a) perto de estranhos." },

  { id: "EST1", text: "Eu fico estressado(a) facilmente." },
  { id: "EST2", text: "Eu sou relaxado(a) na maior parte do tempo." },
  { id: "EST3", text: "Eu me preocupo com as coisas." },
  { id: "EST4", text: "Eu raramente me sinto triste." },
  { id: "EST5", text: "Eu sou facilmente perturbado(a)." },
  { id: "EST6", text: "Eu fico chateado(a) facilmente." },
  { id: "EST7", text: "Eu mudo meu humor frequentemente." },
  { id: "EST8", text: "Eu tenho oscilações de humor frequentes." },
  { id: "EST9", text: "Eu me irrito facilmente." },
  { id: "EST10", text: "Eu frequentemente me sinto triste." },

  { id: "AGR1", text: "Eu sinto pouca preocupação pelos outros." },
  { id: "AGR2", text: "Eu me interesso por pessoas." },
  { id: "AGR3", text: "Eu insulto pessoas." },
  { id: "AGR4", text: "Eu simpatizo com os sentimentos dos outros." },
  { id: "AGR5", text: "Eu não me interesso pelos problemas dos outros." },
  { id: "AGR6", text: "Eu tenho um coração bondoso." },
  { id: "AGR7", text: "Eu não estou realmente interessado(a) nos outros." },
  { id: "AGR8", text: "Eu dedico tempo aos outros." },
  { id: "AGR9", text: "Eu sinto as emoções dos outros." },
  { id: "AGR10", text: "Eu faço as pessoas se sentirem à vontade." },

  { id: "CSN1", text: "Eu estou sempre preparado(a)." },
  { id: "CSN2", text: "Eu deixo minhas coisas espalhadas." },
  { id: "CSN3", text: "Eu presto atenção nos detalhes." },
  { id: "CSN4", text: "Eu bagunço as coisas." },
  { id: "CSN5", text: "Eu faço as tarefas imediatamente." },
  { id: "CSN6", text: "Eu frequentemente esqueço de guardar as coisas no lugar." },
  { id: "CSN7", text: "Eu gosto de ordem." },
  { id: "CSN8", text: "Eu fujo das minhas obrigações." },
  { id: "CSN9", text: "Eu sigo um cronograma." },
  { id: "CSN10", text: "Eu sou exigente no meu trabalho." },

  { id: "OPN1", text: "Eu tenho um vocabulário rico." },
  { id: "OPN2", text: "Eu tenho dificuldade em entender ideias abstratas." },
  { id: "OPN3", text: "Eu tenho uma imaginação vívida." },
  { id: "OPN4", text: "Eu não me interesso por ideias abstratas." },
  { id: "OPN5", text: "Eu tenho ótimas ideias." },
  { id: "OPN6", text: "Eu não tenho boa imaginação." },
  { id: "OPN7", text: "Eu entendo as coisas rapidamente." },
  { id: "OPN8", text: "Eu uso palavras difíceis." },
  { id: "OPN9", text: "Eu passo tempo refletindo sobre as coisas." },
  { id: "OPN10", text: "Eu sou cheio(a) de ideias." },
];

const container = document.getElementById("questions");

// Instruções
const instructions = document.getElementById("instructions");
instructions.innerHTML = `
  <p>Avalie cada afirmação de 1 a 5, onde 1 = Discordo Totalmente e 5 = Concordo Totalmente.</p>
`;

questions.forEach((q) => {
  const block = document.createElement("div");
  block.classList.add("question-block");
  block.innerHTML = `
    <p><strong>${q.text}</strong></p>
    <div class="options">
      ${[1, 2, 3, 4, 5]
        .map(
          (val) => `
        <label>
          <input type="radio" name="${q.id}" value="${val}" required />
          ${val}
        </label>`
        )
        .join("")}
    </div>
    <hr/>
  `;
  container.appendChild(block);
});

// Mensagem personalizada sem causar erros em cascata
document.querySelectorAll(".options").forEach(group => {
  const radios = group.querySelectorAll("input[type=radio]");
  const firstRadio = radios[0];

  // Apenas o primeiro radio do grupo recebe a mensagem personalizada
  firstRadio.addEventListener("invalid", function () {
    if (![...radios].some(r => r.checked)) {
      firstRadio.setCustomValidity("Por favor, selecione uma das opções.");
    }
  });

  // Ao escolher qualquer opção, limpa a mensagem
  radios.forEach(radio => {
    radio.addEventListener("input", function () {
      firstRadio.setCustomValidity("");
    });
  });
});


document.getElementById("bigfive-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const answers = {};
  for (const [key, value] of formData.entries()) {
    answers[key] = parseInt(value);
  }

  if (Object.keys(answers).length !== 50) {
    alert("Por favor, responda todas as perguntas.");
    return;
  }

  try {
    const response = await fetch("<YOUR_MODEL_URL>/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers }),
    });

    const result = await response.json();

    const resultEl = document.getElementById("result");
    resultEl.innerHTML = "<h2>Resultados da Análise do Modelo de Machine Learning:</h2>";
    const initialsMap = {
      "Extraversion": "Extroversão (Ext.)",
      "Neuroticism": "Neuroticismo (Neu.)",
      "Agreeableness": "Agradabilidade (Agr.)",
      "Conscientiousness": "Conscienciosidade (Con.)",
      "Openness": "Abertura (Abe.)"
    };

    for (const [trait, score] of Object.entries(result.scores)) {
      resultEl.innerHTML += `<p><strong>${initialsMap[trait]}:</strong> ${score.toFixed(2)}</p>`;
    }
    console.log("Scores Recebidos:", result.scores);
    desenharGraficoRadar(result.scores);
    
  } catch (err) {
    alert("Falha ao enviar respostas.");
    console.error(err);
  }
});

function desenharGraficoRadar(scores) {
  const ctx = document.getElementById("radarChart").getContext("2d");

  if (window.radarInstance) {
    window.radarInstance.destroy();
  }

  const initialsMap = {
    "Extraversion": "Ext.",
    "Neuroticism": "Neu.",
    "Agreeableness": "Agr",
    "Conscientiousness": "Con.",
    "Openness": "Abe."
  };
  
  window.radarInstance = new Chart(ctx, {
    type: "radar",
    data: {
      labels: Object.values(initialsMap),
      datasets: [{
        label: "Perfil de Personalidade",
        data: [
          scores["Extraversion"],
          scores["Neuroticism"],
          scores["Agreeableness"],
          scores["Conscientiousness"],
          scores["Openness"]
        ],
        backgroundColor: "rgba(102, 51, 153, 0.2)",
        borderColor: "rgba(102, 51, 153, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(102, 51, 153, 1)"
      }]
    },
    options: {
      scales: {
        r: {
          suggestedMin: 0,
          suggestedMax: 1,
          ticks: { stepSize: 0.2 }
        }
      },
      responsive: true,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          //text: "Gráfico Radar – Big Five",
          font: { size: 16 }
        }
      }
    }
  });
}
