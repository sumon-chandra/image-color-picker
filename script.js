// ============================== Display the Image =================
const dropArea = document.getElementById("drop-area");
const selectImg = document.getElementById("select-file");
const displayImg = document.getElementById("display-img");

// ** Select the image
selectImg.addEventListener("change", (e) => {
  const fileList = e.target.files;
  checkBrowserSupported(fileList);
  showImage(fileList[0]);
});

// ** Check the browsers supportes
function checkBrowserSupported(fileList) {
  for (const file of fileList) {
    /**
     * Not supported in Firefox for Android or Opera for Android.
     * Not supported in Safari for iOS.
     * Unknown cross-browser support.
     * */
    const type = file.type ? file.type : "NOT SUPPORTED";
    const name = file.name ? file.name : "NOT SUPPORTED";
    const size = file.size ? file.size : "NOT SUPPORTED";
    console.log({ name, type, size });
  }
}

// ** Drug and Drop the image
// * Drop area
dropArea.addEventListener("dragover", (e) => {
  e.stopPropagation();
  e.preventDefault();
  // * style the drop area

  e.dataTransfer.dropEffect = "copy";
});
// * Drop the image
dropArea.addEventListener("drop", (e) => {
  e.stopPropagation();
  e.preventDefault();
  const fileList = e.dataTransfer.files;
  checkBrowserSupported(fileList);
  showImage(fileList[0]);
});

// ** Displays the Image
function showImage(img) {
  if (img.type && !img.type.startsWith("image/")) {
    console.log("The file is not an image", img.name, img.type);
    return;
  }
  const fileReader = new FileReader();
  fileReader.addEventListener("load", (e) => {
    const img = document.createElement("img");
    const imgurl = e.target.result;
    img.src = imgurl;
    displayImg.appendChild(img);
  });
  fileReader.readAsDataURL(img);
}

// ============================== Pic the Color =================

const eyeDropperBtn = document.getElementById("start-btn");
const span = document.getElementById("result");

eyeDropperBtn.addEventListener("click", handleEyeDropperClick);

function handleEyeDropperClick() {
  if (!window.EyeDropper) {
    alert("Your browser does not support Eye Dropper");
    return;
  }

  const eyeDropper = new EyeDropper();
  const abordController = new AbortController();

  eyeDropper
    .open({ signal: abordController.signal })
    .then((result) => {
      const hexColor = result.sRGBHex;
      span.textContent = hexColor;
      handleDisplayColor(hexColor);
    })
    .catch((e) => {
      console.log(e);
    });
  setTimeout(() => {
    abordController.abort();
  }, 5000);
}
