import html2canvas from 'html2canvas';
const downloadScaleFactor = 2;


export function downloadWallpaper() {
  console.log('in downloadWallpaper');
  const box = document.getElementById("emoji-wallpaper");

  // Temporarily add the no-transform class to the element
  box.classList.add('no-transform');

  // Capture the element using html2canvas
  html2canvas(box, { useCORS: true }).then(canvas => {
    // Remove the no-transform class from the element
    box.classList.remove('no-transform');

    // Create a new canvas with half the dimensions
    const newCanvas = document.createElement("canvas");
    newCanvas.width = canvas.width / downloadScaleFactor;
    newCanvas.height = canvas.height / downloadScaleFactor;

    // Draw the scaled image on the new canvas
    const ctx = newCanvas.getContext("2d");
    ctx.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height);

    // Use the new canvas to generate the data URL for download
    const dataUrl = newCanvas.toDataURL('image/png');
    const link = document.createElement("a");
    link.download = "emoji-wallpaper.png";
    link.href = dataUrl;

    // Check if the browser is running on a mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      // Mobile device
      window.open(dataUrl, '_blank', 'noopener noreferrer');
    } else {
      // Desktop device
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  });
};

/*
export function downloadWallpaper() {
  console.log('in downloadWallpaper');
  const box = document.getElementById("emoji-wallpaper");

  // Temporarily add the no-transform class to the element
  box.classList.add('no-transform');

  // Capture the element using html2canvas
  html2canvas(box, { useCORS: true }).then(canvas => {
    // Remove the no-transform class from the element
    box.classList.remove('no-transform');

    // Create a new canvas with half the dimensions
    const newCanvas = document.createElement("canvas");
    newCanvas.width = canvas.width / 2;
    newCanvas.height = canvas.height / 2;

    // Draw the scaled image on the new canvas
    const ctx = newCanvas.getContext("2d");
    ctx.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height);

    // Use the new canvas to generate the data URL for download
    const dataUrl = newCanvas.toDataURL('image/png');
    const link = document.createElement("a");
    link.download = "emoji-wallpaper.png";
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
};
*/