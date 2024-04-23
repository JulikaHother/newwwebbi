document.addEventListener('DOMContentLoaded', function () {
  const mainContainer = document.getElementById('container');
  const initialCanvas = document.getElementById('imageCanvas');
  const initialTextOverlay = document.getElementById('textOverlay');

  initialTextOverlay.textContent = "Julika Hother is a graphic designer based in Halle(Saale), consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.";

  const initialImg = new Image();
  initialImg.src = "img/test1.png";
  initialImg.onload = function () {
    const ctx = initialCanvas.getContext('2d');
    ctx.drawImage(initialImg, 0, 0, initialCanvas.width, initialCanvas.height);
  };

  const assets = [
    { imgSrc: "img/test1.png", text: "I could be a dancer lorem ipsum dolor sit amet." },
    { imgSrc: "img/test2.png", text: "Another example text for different graphic design perspectives." },
    { imgSrc: "img/test3.png", text: "Further insights into the creative world of graphic design." }
    // Add more objects as needed
  ];

  document.addEventListener('click', function (e) {
    // Randomly select an image and text
    const selectedAsset = assets[Math.floor(Math.random() * assets.length)];

    // Fixed rotation degrees array
    const rotationDegrees = [0, -4, 4, -8, 8];
    // Select a random rotation from the array
    const rotationDegree = rotationDegrees[Math.floor(Math.random() * rotationDegrees.length)];

    // Ensure the canvas does not go out of the body's edges
    const maxWidth = document.body.clientWidth - 500; // Canvas width
    const maxHeight = document.body.clientHeight - 300; // Canvas height
    let xPos = e.clientX - 250; // Center the click
    let yPos = e.clientY - 150; // Center the click

    // Clamp values to keep canvas within the body
    xPos = Math.max(0, Math.min(xPos, maxWidth));
    yPos = Math.max(0, Math.min(yPos, maxHeight));

    const newContainer = document.createElement('div');
    newContainer.style.cssText = `position: absolute; width: 500px; height: 300px; top: ${yPos}px; left: ${xPos}px; transform: rotate(${rotationDegree}deg);`;

    const newCanvas = document.createElement('canvas');
    newCanvas.width = 500;
    newCanvas.height = 300;
    newCanvas.style.cssText = 'border: #505050 dotted; border-radius: 6px;';

    const newTextOverlay = document.createElement('div');
    newTextOverlay.textContent = selectedAsset.text;
    newTextOverlay.style.cssText = 'position: absolute; top: 10px; left: 10px; color: gray; width: 450px; font-size: 20px; line-height: 90%; text-align: left; font-family: "Arial Narrow"; pointer-events: none; -webkit-text-stroke-width: 1.5px; -webkit-text-stroke-color: gray;';

    newContainer.appendChild(newCanvas);
    newContainer.appendChild(newTextOverlay);
    document.body.appendChild(newContainer);

    const newImg = new Image();
    newImg.src = selectedAsset.imgSrc;
    newImg.onload = function () {
      const ctx = newCanvas.getContext('2d');
      ctx.drawImage(newImg, 0, 0, newCanvas.width, newCanvas.height);
    };

    newCanvas.addEventListener('mousemove', function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element.
      const y = e.clientY - rect.top;  // y position within the element.
      const pixelationLevel = Math.max(1, Math.min(x / this.width * 100, 100));
      const blurValue = (100 - pixelationLevel) / 20;
      newTextOverlay.style.filter = `blur(${blurValue}px)`;

      // Redraw image with pixelation based on mouse position relative to the canvas
      const ctx = this.getContext('2d');
      ctx.clearRect(0, 0, this.width, this.height);
      const scaleFactor = Math.max(1, pixelationLevel);
      ctx.drawImage(newImg, 0, 0, this.width / scaleFactor, this.height / scaleFactor);
      ctx.drawImage(this, 0, 0, this.width / scaleFactor, this.height / scaleFactor, 0, 0, this.width, this.height);
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const body = document.body;

  // Update the initial cursor style
  body.style.cursor = "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewport=\"0 0 32 32\" style=\"fill:black;font-size:24px;\"><text y=\"50%\" transform=\"translate(0, 12)\">🔮</text></svg>'), auto";

  document.addEventListener('mousedown', function () {
    body.style.cursor = "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewport=\"0 0 32 32\" style=\"fill:black;font-size:24px;\"><text y=\"50%\" transform=\"translate(0, 12)\">✨</text></svg>'), auto";
  });

  document.addEventListener('mouseup', function () {
    body.style.cursor = "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewport=\"0 0 32 32\" style=\"fill:black;font-size:24px;\"><text y=\"50%\" transform=\"translate(0, 12)\">🔮</text></svg>'), auto";
  });
});
