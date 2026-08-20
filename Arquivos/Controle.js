// VARIÁVEIS DE CONTROLE
let somClique, novoAtaqueHan, AtaqueHan, raiosInorganicos, cutscene;
let optEscolhida = "";
let accONe = true;
let v = 0;
let exploOne = true;
let playCutscene = true;

// MÚSICA DA BATALHA ATUAL (chave do MusicManager)
let musica_batalha_atual = 'massdestruc';

// FUNÇÃO DE DESCRIÇÃO DE LOCAL
const lado = document.getElementById('lado');
function esc (x) {
  lado.innerHTML = x;
}
esc('Revolta Química por ImPollic');

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
        MusicManager.play(musica_batalha_atual);
    }
    if (saida == gameplay) {
        MusicManager.pause(musica_batalha_atual);
    }

    // TAKEOVER
    if (vinda == menu) {
        MusicManager.play('takeover');
    } else {
        if (vinda !== escolhas) {
            MusicManager.pause('takeover');
        }
    }
    if (saida == escolhas) {
        MusicManager.stop('takeover');
    }
    if (vinda == escolhas && (saida == gameplay || saida == recVida)) {
        MusicManager.play('takeover');
    }
    // YOU ARE STRONGER
    if (vinda == inventario) {
        MusicManager.play('youstrong');
    } else {
        MusicManager.pause('youstrong');
    }

    // REACH OUT / ROAD LESS TAKEN
    if (vinda == creditos) {
        MusicManager.play('roadlesstaken');
    } else {
        MusicManager.pause('roadlesstaken');
    }
    if (vinda == gameplay) acionarIntervalo();

    // COLOR YOUR NIGHT OU ROAD LESS TAKEN (emilly)
    if (vinda == loreContada || vinda == ajuda || vinda == recVida) {
        MusicManager.play('colornightins');
    } else {
        MusicManager.pause('colornightins');
    }

    // FULL MOON FULL LIFE
    if (vinda == gameOver) {
        MusicManager.play('fullmoon');
    }
    if (saida == intro) {
        MusicManager.pause('fullmoon');
    }

    // ALGUMA VARIÁVEL SUPER IMPORTANTE QUE EU NÃO LEMBRO O QUE FAZ
    if (saida == gameplay) {
        accONe = true;
    }   

    if (vinda == fimJogo) {
        MusicManager.play('colornight');
    }
}