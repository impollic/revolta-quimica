// VARIÁVEIS DE CONTROLE
let musicFundo, somClique, digitando, novoAtaqueHan, AtaqueHan, raiosInorganicos, cutscene;
let optEscolhida = "";
let accONe = true;
let v = 0;
let exploOne = true;
let playCutscene = true;

// MÚSICAS DE PERSONA
let colornight, goingdown, lastsur, massdestruc, youstrong, musica_batalha_atual, roadlesstaken, takeover, axegrind, fullmoon;

// FUNÇÃO DE DESCRIÇÃO DE LOCAL
const lado = document.getElementById('lado');
function esc (x) {
  lado.innerHTML = x;
}
esc('Revolta Química by ImPollic');

function irPara (saida, vinda) {
    // DESCRIÇÃO DE LOCAL
    esc(vinda.desc);
    if (vinda == gameplay) {
        if (AtaqueHan == "ASCENSÃO INTERATÔMICA") {
            esc("Batalha - Ato 1");
        }
        if (AtaqueHan == "MANIPULAÇÃO INORGÂNICA") {
            esc("Batalha - Ato 2");
        }
        if (AtaqueHan == "DESCARGA VOLTAICA") {
            esc("Batalha - Ato 3");
        }
        if (AtaqueHan == "COLAPSO ESTEQUIOMÉTRICO") {
            esc("Batalha - Ato Final");
        }
        ativarAnimacaoAtaque('./Sprites/Hann/hanOlho.gif');
    }
    saida.ativo = false;
    vinda.ativo = true;
    somClique.play();

    // APLICAÇÃO DAS MÚSICAS
    if (vinda == preJogo) {
        musica_batalha_atual.play();
    }
    if (saida == gameplay) {
        musica_batalha_atual.pause();
    }

    // TAKEOVER
    if (vinda == menu) {
        takeover.play();
    } else {
        if (vinda !== escolhas) {
            takeover.pause();
        }
    }
    if (saida == escolhas) {
        takeover.stop();
    }
    if (vinda == escolhas && (saida == gameplay || saida == recVida)) {
        takeover.play();
    }
    // YOU ARE STRONGER
    if (vinda == inventario) {
        youstrong.play();
    } else {
        youstrong.pause();
    }

    // REACH OUT / ROAD LESS TAKEN
    if (vinda == creditos) {
        roadlesstaken.play();
    } else {
        roadlesstaken.pause();
    }
    if (vinda == gameplay) acionarIntervalo();

    // COLOR YOUR NIGHT OU ROAD LESS TAKEN (emilly)
    if (vinda == loreContada || vinda == ajuda || vinda == recVida) {
        colornightins.play();
    } else {
        colornightins.pause();
    }

    // FULL MOON FULL LIFE
    if (vinda == gameOver) {
        fullmoon.play();
    }
    if (saida == intro) {
        fullmoon.pause();
    }

    // ALGUMA VARIÁVEL SUPER IMPORTANTE QUE EU NÃO LEMBRO O QUE FAZ
    if (saida == gameplay) {
        accONe = true;
    }   

    if (vinda == fimJogo) {
        colornight.play();
    }
}