// Telas automáticas (sem botão)
const autoScreens = ["Auto1", "Auto2", "Auto3", "Auto4", "Auto5", "Auto6", "Auto7", "Auto8"];

// Ordem completa das telas
const proposalOrder = [
  ...autoScreens,
  "SpaChoice"
];

let currentProposalIndex = 0;
let autoTimeout = null;

function startJourney() {
    document.getElementById('StartScreen').style.display = 'none';
    showScreen(0);
}

function showScreen(index) {
    document.querySelectorAll('.proposal-screen').forEach(el => {
        el.style.display = 'none';
        el.classList.remove('fadeInCustom', 'fadeOutCustom');
    });
    const currId = proposalOrder[index];
    const screen = document.getElementById(currId);
    if (screen) {
        screen.style.display = 'block';
        screen.classList.add('fadeInCustom');
        animateSticker(currId);

        // Avança sozinho após 8 segundos se for auto-step
        if (autoScreens.includes(currId)) {
            autoTimeout = setTimeout(() => {
                screen.classList.remove('fadeInCustom');
                screen.classList.add('fadeOutCustom');
                setTimeout(() => nextProposal(), 700);
            }, 8000);
        }
    }
    showLoveTip();
}


function nextProposal() {
    if (autoTimeout) { clearTimeout(autoTimeout); autoTimeout = null; }
    currentProposalIndex++;
    if (currentProposalIndex < proposalOrder.length) {
        showScreen(currentProposalIndex);
    }
}

// Animação sticker
function animateSticker(screenId) {
    const sticker = document.querySelector(`#${screenId} .sticker`);
    if (sticker) {
        sticker.classList.remove('heart-pop');
        void sticker.offsetWidth;
        sticker.classList.add('heart-pop');
    }
}

// Dicas do topo (removidas, mas mantendo função vazia)
function showLoveTip() {
    // Removido
}

// Confirmação final
function showConfirmation() {
    document.querySelectorAll('.proposal-screen').forEach(el => el.style.display = 'none');
    document.getElementById('Confirmation').style.display = 'block';
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.7 } });
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.proposal-screen').forEach(el => el.style.display = 'none');
    document.getElementById('StartScreen').style.display = 'block';
    showLoveTip();

});

window.startJourney = startJourney;
window.nextProposal = nextProposal;