import html2canvas from "html2canvas";
const downloadScaleFactor = 2;

function showSaveInstructions() {
  const message = document.createElement("div");
  message.id = "save-instructions";
  message.style.position = "fixed";
  message.style.top = "85%";
  message.style.left = "50%";
  message.style.transform = "translate(-50%, -50%)";
  message.style.zIndex = "100000";
  message.style.textAlign = "center";
  message.style.backgroundColor = "white";
  message.style.color = "black";
  message.style.border = "2px solid black";
  message.style.borderRadius = "8px";
  message.style.width = "67%";
  message.style.padding = "10px";
  message.innerHTML = `
    <p>Long press on the image to save or copy it.</p>
  `;
  document.body.appendChild(message);

  return message;
}

export function downloadWallpaper() {
  const box = document.getElementById("emoji-wallpaper");

  // Temporarily add the no-transform class to the element
  box.classList.add("no-transform");

  return new Promise((resolve) => {
    // Capture the element using html2canvas
    html2canvas(box, { useCORS: true }).then((canvas) => {
      // Remove the no-transform class from the element
      box.classList.remove("no-transform");

      // Create a new canvas with half the dimensions
      const newCanvas = document.createElement("canvas");
      newCanvas.width = canvas.width / downloadScaleFactor;
      newCanvas.height = canvas.height / downloadScaleFactor;

      // Draw the scaled image on the new canvas
      const ctx = newCanvas.getContext("2d");
      ctx.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height);
      const dataUrl = newCanvas.toDataURL("image/png");

      const isIOS =
        /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

      if (isIOS) {
        // Create an additional canvas for mobile with the same aspect ratio as newCanvas
        const mobileCanvas = document.createElement("canvas");
        const mobileWidth = newCanvas.width / downloadScaleFactor; // Scale down the width and height
        const mobileHeight = newCanvas.height / downloadScaleFactor;
        mobileCanvas.width = mobileWidth;
        mobileCanvas.height = mobileHeight;

        // Draw the image on the mobile canvas
        const mobileCtx = mobileCanvas.getContext("2d");
        mobileCtx.drawImage(newCanvas, 0, 0, mobileWidth, mobileHeight);
        const mobileDataUrl = mobileCanvas.toDataURL("image/png");

        const imgContainer = document.createElement("div");
        imgContainer.style.display = "flex";
        imgContainer.style.justifyContent = "center";
        imgContainer.style.alignItems = "center";
        imgContainer.style.width = "100%";
        imgContainer.style.height = "100%";
        imgContainer.style.position = "fixed";
        imgContainer.style.zIndex = "99999";
        imgContainer.style.top = "0";
        imgContainer.style.left = "0";
        imgContainer.style.right = "0";
        imgContainer.style.bottom = "0";
        imgContainer.style.margin = "auto";
        imgContainer.style.maxHeight = "90%";
        imgContainer.style.maxWidth = "90%";
        imgContainer.style.border = "2px solid black";
        imgContainer.style.borderRadius = "8px";
        imgContainer.style.padding = "2px";
        imgContainer.style.backgroundColor = "rgba(0,0,0,0.75)";

        const img = document.createElement("img");
        img.src = mobileDataUrl;
        img.style.display = "block";
        img.style.width = "100%";
        img.style.height = "auto";
        img.style.maxHeight = "100%";
        img.style.maxWidth = "100%";
        img.style.objectFit = "contain";

        imgContainer.appendChild(img);
        document.body.appendChild(imgContainer);

        const message = showSaveInstructions();

        imgContainer.addEventListener("click", () => {
          document.body.removeChild(imgContainer);
          document.body.removeChild(message);
          resolve();
        });
      } else {
        const link = document.createElement("a");
        link.download = "emoji-wallpaper.png";
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        resolve();
      }
    });
  });
}

/*
export function downloadWallpaper() {
  const box = document.getElementById("emoji-wallpaper");
  
  // Temporarily add the no-transform class to the element
  box.classList.add("no-transform");

  // Capture the element using html2canvas
  html2canvas(box, { useCORS: true }).then((canvas) => {
    // Remove the no-transform class from the element
    box.classList.remove("no-transform");

    // Create a new canvas with half the dimensions
    const newCanvas = document.createElement("canvas");
    newCanvas.width = canvas.width / downloadScaleFactor;
    newCanvas.height = canvas.height / downloadScaleFactor;

    // Draw the scaled image on the new canvas
    const ctx = newCanvas.getContext("2d");
    ctx.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height);
    const dataUrl = newCanvas.toDataURL("image/png");
    
    const link = document.createElement("a");
    link.download = "emoji-wallpaper.png";
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}
*/
