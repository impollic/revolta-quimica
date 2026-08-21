// VARIÁVEIS DE CONTROLE
const INV_SQRT2 = 0.7071; // 1/sqrt(2) — normaliza velocidade diagonal
let somClique, novoAtaqueHan, AtaqueHan, raiosInorganicos, cutscene;
let optEscolhida = "";
let v = 0;
let exploOne = true;
let playCutscene = true;
let cutsceneTimeout = null;
let ascensaoSpawnTimer = 0;

// MÚSICA DA BATALHA ATUAL (chave do MusicManager)
let musica_batalha_atual = 'massdestruc';

// ENTRADA GLOBAL DE DIÁLOGO (borda de clique/ENTER, atualizada 1x por frame)
let entradaDialogoAgora = false;
let _mouseEntradaAnterior = false;
let _enterEntradaAnterior = false;
function atualizarEntradaDialogo() {
  const mouseAgora = mouseIsPressed;
  const enterAgora = keyIsDown(ENTER);
  entradaDialogoAgora = (mouseAgora && !_mouseEntradaAnterior) || (enterAgora && !_enterEntradaAnterior);
  [_mouseEntradaAnterior, _enterEntradaAnterior] = [mouseAgora, enterAgora];
}

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
        ativarAnimacaoAtaque('./assets/sprites/characters/hanniman/hanniman-olho.gif');
    }
    saida.ativo = false;
    vinda.ativo = true;
    somClique.play();

    // MÚSICA: cena -> trilha (usa === para comparar referências de objeto)
    function trackOf(scene) {
        if (scene === menu)        return 'youstrong';
        if (scene === preJogo)     return musica_batalha_atual;
        if (scene === gameplay)    return musica_batalha_atual;
        if (scene === escolhas)    return 'takeover';
        if (scene === inventario)  return 'youstrong';
        if (scene === creditos)    return 'roadlesstaken';
        if (scene === loreContada) return 'colornightins';
        if (scene === ajuda)       return 'colornightins';
        if (scene === recVida)     return 'colornightins';
        if (scene === gameOver)    return 'fullmoon';
        if (scene === fimJogo)     return 'fullmoon';
        return null;
    }

    const saidaTrack = trackOf(saida);
    const vindaTrack = trackOf(vinda);

    if (saidaTrack && saidaTrack !== vindaTrack) MusicManager.stop(saidaTrack);
    if (vindaTrack) MusicManager.play(vindaTrack);

    if (vinda == gameplay) ascensaoSpawnTimer = 0;
}