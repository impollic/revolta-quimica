// MUDAR SPRITE DE HANNIMAN APÓS CADA BATALHA
function hanSpriteGame () {
  switch (AtaqueHan) {
    case "ASCENSÃO INTERATÔMICA":
      return ImageCache.load("./Sprites/Hann/hanIdle.gif");
      break;
    case "MANIPULAÇÃO INORGÂNICA":
      return ImageCache.load("./Sprites/Hann/hanBraco.gif");
      break;
    case "DESCARGA VOLTAICA":
      return ImageCache.load("./Sprites/Hann/hanBracos.gif");
      break;
    case "COLAPSO ESTEQUIOMÉTRICO":
      return ImageCache.load("./Sprites/Hann/hanCansado.gif");
      break;
  }
}