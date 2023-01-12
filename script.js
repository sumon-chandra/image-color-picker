// ============================== Display the Image =================
const selectImg = document.getElementById("select-file");
const displayImg = document.getElementById("display-img");
const colorsContainer = document.getElementById("colors-container");

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
document.addEventListener("dragover", (e) => {
  e.stopPropagation();
  e.preventDefault();
  // * style the drop area

  e.dataTransfer.dropEffect = "copy";
});
// * Drop the image
document.addEventListener("drop", (e) => {
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
    displayImg.innerHTML = "";
    const img = document.createElement("img");
    const imgurl = e.target.result;
    img.src = imgurl;
    displayImg.appendChild(img);
  });
  fileReader.readAsDataURL(img);
}

// ============================== Pic the Color =================

const eyeDropperBtn = document.getElementById("color-select-btn");
let colors = getColor();
displayColors();

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
      colors.push(hexColor);
      saveColor();
      // handleColors();
      // displayColors();
      location.reload();
    })
    .catch((e) => {
      console.log(e);
    });
  setTimeout(() => {
    abordController.abort();
  }, 5000);
}

// ** Save color to the local storage
function saveColor() {
  localStorage.setItem("COLOR", JSON.stringify(colors));
}

// ** Get the Color
function getColor() {
  return JSON.parse(localStorage.getItem("COLOR"));
}

function displayColors() {
  colors.forEach((hexColor) => {
    // * For conver Hex color code to RGB color code
    let r = parseInt(hexColor.slice(1, 3), 16);
    let g = parseInt(hexColor.slice(3, 5), 16);
    let b = parseInt(hexColor.slice(5, 7), 16);
    const div = document.createElement("div");
    const hex = document.createElement("p");
    const rgb = document.createElement("p");
    div.className = "color";
    hex.innerHTML = `HEX : ${hexColor}`;
    rgb.innerHTML = `RGB : rgb(${r},${g}${b})`;
    div.append(hex, rgb);
    colorsContainer.appendChild(div);
  });
}
