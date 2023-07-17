/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
let qrIMG


function qr(link) {
  var qrcode = new QRCode(document.querySelector("#qrcode"), {
    text: link,
    width: 300,
    height: 300,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  })


}



