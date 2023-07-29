const inputFile = document.querySelector("input[type=file]");
const preview = document.querySelector("#preview");
const imageUploadInputWrapper = document.querySelector(".img-upload");
let removeImageButton = null;

inputFile.addEventListener("change", () => {
  if ((inputFile.files.length > 0) | (inputFile.files.length == undefined)) {
    preview.src = URL.createObjectURL(inputFile.files[0]);
    preview.classList.remove("dnone");
    if(!removeImageButton){
      removeImageButton = document.createElement("img");
      removeImageButton.classList.add("remove-icon");
      removeImageButton.src = './images/x-square-fill.svg'
      imageUploadInputWrapper.append(removeImageButton);
    }
    removeImageButton.addEventListener("click", () => {
      preview.classList.add("dnone");
      preview.src = "";
      inputFile.value = "";
      removeImageButton.remove();
      removeImageButton = null
    });
  } else {
    removeImageButton.remove();
    removeImageButton = null
  }
});
