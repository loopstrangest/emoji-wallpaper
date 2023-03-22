import html2canvas from 'html2canvas';

export function downloadWallpaper() {
    console.log('in downloadWallpaper');
    const box = document.getElementById("emoji-wallpaper");
    html2canvas(box, { useCORS: true }).then(canvas => {
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement("a");
      link.download = "emoji-wallpaper.png";
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };