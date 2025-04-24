export enum SupermarketPhotos {
  Mercadona = "mercadona_actual.png",
  Continente = "continente.png",
  Lidl = "lidl.png",
  PingoDoce = "pingodoce.png",
}

export const supermarketImages = {
  [SupermarketPhotos.Mercadona]: require("../../assets/images/supermarkets/mercadona_actual.png"),
  [SupermarketPhotos.Continente]: require("../../assets/images/supermarkets/continente.png"),
  [SupermarketPhotos.Lidl]: require("../../assets/images/supermarkets/lidl.png"),
  [SupermarketPhotos.PingoDoce]: require("../../assets/images/supermarkets/pingodoce.png"),
};
