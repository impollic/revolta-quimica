// MUDAR SPRITE DE HANNIMAN APÓS CADA BATALHA
function hanSpriteGame () {
  switch (AtaqueHan) {
    case "ASCENSÃO INTERATÔMICA":
      return ImageCache.load("./assets/sprites/characters/hanniman/hanniman-idle.gif");
      break;
    case "MANIPULAÇÃO INORGÂNICA":
      return ImageCache.load("./assets/sprites/characters/hanniman/hanniman-braco.gif");
      break;
    case "DESCARGA VOLTAICA":
      return ImageCache.load("./assets/sprites/characters/hanniman/hanniman-bracos.gif");
      break;
    case "COLAPSO ESTEQUIOMÉTRICO":
      return ImageCache.load("./assets/sprites/characters/hanniman/hanniman-cansado.gif");
      break;
  }
}