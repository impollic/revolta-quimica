// RESETAR TUDO PARA O DEFAULT
function reset() {
  v = 0;
  energias = [];
  exploOne = true;
  JOGADOR_ANIMACAO_ATIVOU = false;
  atomos = [];
  ultimaDirecaoAscensao = 0;
  apollo.x = width/2;
  apollo.y = height/2;
  hanniman.g = 0;
  hanniman.n = 0;
  AtaqueHan = novoAtaqueHan(AtaqueHan);

  preJogo.elementos[3].texto = `\nHP: ${hanniman.vida}/${hanniman.vidaOriginal}\nATK:${hanniman.ataque}\nDEF:${hanniman.defesa}\nLV:20`;
  preJogo.elementos[6].frases = hanniman.dialogo;
  preJogo.elementos[4].texto = `Apollo LV10 HP          ${apollo.vida}/${apollo.vidaOriginal}`;
  preJogo.elementos[5].w = 120 * apollo.vida/apollo.vidaOriginal;
  escolhas.elementos[6].texto = `Apollo LV10 HP          ${apollo.vida}/${apollo.vidaOriginal}`;
  escolhas.elementos[7].w = 120 * apollo.vida/apollo.vidaOriginal;

  if (AtaqueHan !== 'COLAPSO ESTEQUIOMÉTRICO') {
    preJogo.elementos[1].img = ImageCache.load("./assets/sprites/characters/hanniman/hanniman-falando.gif");
  } else {
    preJogo.elementos[1].img = ImageCache.load("./assets/sprites/characters/hanniman/hanniman-cansado-falando.gif");
  }

  gameplay.elementos[2].img = hanSpriteGame();
  menu.elementos[menu.elementos.length-1].w = 120 * apollo.vida/apollo.vidaOriginal;
  menu.elementos[menu.elementos.length-2].texto = `Apollo LV10 HP          ${apollo.vida}/${apollo.vidaOriginal}`;
  inventario.elementos[0].texto = `\n * Apollo *\n  LV 10\n  HP ${apollo.vida}/${apollo.vidaOriginal}\n  EXP 33`;

  carregarEnergias();
}