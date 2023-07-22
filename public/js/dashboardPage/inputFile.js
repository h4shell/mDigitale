const inputFile = document.querySelector("input[type=file]");
const preview = document.querySelector("#preview");
const imgbox = document.querySelector(".img-box");
let removeImg = null;

console.log();

inputFile.addEventListener("change", () => {
  console.log(inputFile.length);
  if ((inputFile.files.length > 0) | (inputFile.files.length == undefined)) {
    preview.src = URL.createObjectURL(inputFile.files[0]);
    preview.classList.remove("dnone");
    removeImg = document.createElement("img");
    removeImg.classList.add("removeImg");
    removeImg.src = './images/x-square-fill.svg'
    imgbox.append(removeImg);
    removeImg.addEventListener("click", () => {
      preview.classList.add("dnone");
      preview.src = "";
      inputFile.value = "";
      removeImg.remove();
    });
  } else {
    removeImg.remove();
  }
});
