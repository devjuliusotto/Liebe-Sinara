// Telas automáticas (sem botão)
const autoScreens = ["Auto1", "Auto2", "Auto3", "Auto4", "Auto5", "Msg6"];

// Ordem completa das telas
const proposalOrder = [
  ...autoScreens,
  "Quiz1", "Choice1", "Input1", "Trip1",
  "Truth1", "Msg3", "Msg4", "proposal-1", "proposal-yes"
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

        // Adiciona o evento do botão "não"
        if (currId === "proposal-1") {
            const moveRandomBtn = document.getElementById('move-random');
            if (moveRandomBtn && !moveRandomBtn._hasMoveEvent) {
                moveRandomBtn.addEventListener('mouseenter', (e) => moveRandomEl(e.target));
                moveRandomBtn._hasMoveEvent = true;
            }
        }

        // Avança sozinho após 5 segundos se for auto-step
        if (autoScreens.includes(currId)) {
            autoTimeout = setTimeout(() => {
                screen.classList.remove('fadeInCustom');
                screen.classList.add('fadeOutCustom');
                setTimeout(() => nextProposal(), 700);
            }, 5000);
        }
    }
    showLoveTip();
}


function nextProposal() {
    if (autoTimeout) { clearTimeout(autoTimeout); autoTimeout = null; }
    currentProposalIndex++;
    if (currentProposalIndex < proposalOrder.length) {
        showScreen(currentProposalIndex);
    } else {
        showProposal('proposal-yes');
    }
}

// Interações das telas
function quizAnswer(isCorrect) {
    const feedback = document.getElementById('quiz-feedback');
    feedback.textContent = isCorrect ? "Aee, você lembra! 😍" : "Quase… mas aposto que nunca vai esquecer agora! 😂";
    setTimeout(nextProposal, 1800);
}
function choiceAnswer() {
    document.getElementById('choice-feedback').textContent = "Errado! Os dois são! 😝";
    setTimeout(nextProposal, 1800);
}
function tripReact() {
    document.getElementById('trip-feedback').innerHTML = `Amaria qualquer um, desde que seja com você 💖`;
    setTimeout(nextProposal, 1700);
}
function truthReact(escolha) {
    document.getElementById('truth-feedback').innerHTML =
      (escolha === 'verdade') ? 'Acertoouu! ' : 'Mentira? Olha… acho que não! 🙈';
    setTimeout(nextProposal, 1600);
}
function saveNote() {
    const note = document.getElementById('love-note').value;
    const feedback = document.getElementById('note-feedback');
    if (!note.trim()) {
        feedback.textContent = "Não vale pular! Escreve alguma coisinha 🥺";
        return;
    }
    feedback.textContent = "Agora ficou registrado no meu coração! 💌";
    setTimeout(nextProposal, 1800);
}
function continueTogether() {
    document.getElementById('together-feedback').innerHTML = "Awn, então vamos juntos! 💕";
    setTimeout(nextProposal, 1600);
}

// Botão "não" fujão
function moveRandomEl(element) {
    element.style.position = "absolute";
    element.style.top = Math.floor(Math.random() * 70 + 5) + "%";
    element.style.left = Math.floor(Math.random() * 70 + 5) + "%";
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

// Dicas do topo
    const idx = Math.floor(Math.random() * tips.length);
    document.getElementById('love-tip').textContent = tips[idx];


// Proposta final
function showProposal(idToShow) {
    document.querySelectorAll('.proposal-screen').forEach(el => el.style.display = 'none');
    document.getElementById(idToShow).style.display = 'block';
    if (idToShow === 'proposal-1') {
        const moveRandomBtn = document.getElementById('move-random');
        if (moveRandomBtn && !moveRandomBtn._hasMoveEvent) {
            moveRandomBtn.addEventListener('mouseenter', (e) => moveRandomEl(e.target));
            moveRandomBtn._hasMoveEvent = true;
        }
    }
    if (idToShow === 'proposal-yes') {
        document.body.style.backgroundColor = '#ffecf0';
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.7 } });
    }
}

// Lottie
function loadLottieAnimations() {
    lottie.loadAnimation({
        container: document.getElementById('LottieStart'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'https://botfather.cloud/Assets/Sticker/love_duck.json'
    });
    for (let i = 11; i <= 25; i++) {
        const elem = document.getElementById('Sowrov' + i);
        if (elem) {
            lottie.loadAnimation({
                container: elem,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                path: 'https://botfather.cloud/Assets/Sticker/happy_duck.json'
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.proposal-screen').forEach(el => el.style.display = 'none');
    document.getElementById('StartScreen').style.display = 'block';
    loadLottieAnimations();
    showLoveTip();

});

window.startJourney = startJourney;
window.nextProposal = nextProposal;
window.quizAnswer = quizAnswer;
window.choiceAnswer = choiceAnswer;
window.tripReact = tripReact;
window.truthReact = truthReact;
window.saveNote = saveNote;
window.continueTogether = continueTogether;
window.showProposal = showProposal;