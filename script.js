let historiaAtual = "";
let formaAtual = "";

const historias = [
    "OS TRÊS PORQUINHOS",
    "CACHORRO QUE PERDEU A BOLA",
    "CHAPEUZINHO VERMELHO",
    "MENINA QUE ENCONTROU UM GATO",
    "CRIANÇA QUE FEZ UMA BAGUNÇA"
];

const formas = [
    { nome: "MÍMICA", emoji: "💃" },
    { nome: "SONS COM A BOCA", emoji: "🎤" },
    { nome: "DESENHOS", emoji: "🎨" },
    { nome: "EMOJIS E SÍMBOLOS", emoji: "😊🔺⭐" }
];

function sortear() {
    const som = document.getElementById("roleta-som");
    som.currentTime = 0;
    som.play();

    historiaAtual = historias[Math.floor(Math.random() * historias.length)];
    const formaSorteada = formas[Math.floor(Math.random() * formas.length)];
    formaAtual = formaSorteada.nome;

    document.getElementById('historia').textContent = `HISTÓRIA: ${historiaAtual}`;
    document.getElementById('forma').innerHTML = `
        <span class="emoji">${formaSorteada.emoji}</span>
        <div id="formaNome">${formaSorteada.nome}</div>
    `;

    document.getElementById('inicio').classList.add('oculto');
    document.getElementById('resultado').style.display = 'block';


    document.body.classList.add('modo-resultado');
}

function lerResultado() {
    speechSynthesis.cancel();

    const textoParaLer = `História: ${historiaAtual}. Forma de contar: ${formaAtual}.`;
    const utterance = new SpeechSynthesisUtterance(textoParaLer);
    utterance.lang = "pt-BR";
    utterance.rate = 0.9;

    utterance.onstart = () => console.log("Iniciando leitura...");
    utterance.onerror = (e) => console.error("Erro na leitura:", e.error);

    requestAnimationFrame(() => {
        speechSynthesis.speak(utterance);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('sortearBtn').addEventListener('click', sortear);
    document.getElementById('ouvirBtn').addEventListener('click', lerResultado);
});
