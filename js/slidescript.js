document.addEventListener("DOMContentLoaded", function () {
    const imageWrapper = document.querySelector('.image-wrapper');
    const canvases = Array.from(imageWrapper.querySelectorAll('canvas'));

    canvases.forEach(canvas => {
        const img = new Image();
        img.src = canvas.getAttribute('data-src');
        img.onload = () => {
            const ctx = canvas.getContext('2d');
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            canvas.style.width = "100%";
            canvas.style.height = "100vh";

            // Apply interactive effects on mouse move
            canvas.addEventListener('mousemove', function (e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const pixelationLevel = Math.max(1, Math.min(x / this.width * 100, 100));
                const blurValue = (100 - pixelationLevel) / 20;

                // Pixelate the image
                pixelate(ctx, img, pixelationLevel);
                // Apply blur effect
                this.style.filter = `blur(${blurValue}px)`;
            });

            // Restore image when mouse leaves
            canvas.addEventListener('mouseleave', function () {
                // Restore original image and remove blur
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                this.style.filter = 'none'; // Clear any blur effect
            });
        };
    });

    // Navigation and slideshow logic
    let currentImageIndex = 0;
    let transitioning = false;
    function centerImage(animated = true) {
        if (!animated) {
            imageWrapper.style.transition = 'none';
        }
        const currentCanvas = canvases[currentImageIndex];
        const shift = currentCanvas.offsetLeft + currentCanvas.offsetWidth / 2 - window.innerWidth / 2;
        imageWrapper.style.transform = `translateX(-${shift}px)`;
        if (!animated) {
            requestAnimationFrame(() => {
                imageWrapper.style.transition = 'transform 1s ease';
            });
        }
    }
    function handleNavigation(next) {
        if (transitioning) return;
        transitioning = true;
        if (next) {
            currentImageIndex = (currentImageIndex + 1) % canvases.length;
        } else {
            currentImageIndex = (currentImageIndex - 1 + canvases.length) % canvases.length;
        }
        centerImage();
        setTimeout(() => transitioning = false, 1000);
    }
    document.getElementById('nextButton').addEventListener('click', () => handleNavigation(true));
    document.getElementById('prevButton').addEventListener('click', () => handleNavigation(false));
    centerImage(false);
});

// Helper function to apply pixelation to an image
function pixelate(ctx, img, pixelationLevel) {
    const scaleFactor = pixelationLevel;
    // Clear canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // Draw image in small scale
    ctx.drawImage(img, 0, 0, img.width / scaleFactor, img.height / scaleFactor);
    // Scale up the small image to full size
    ctx.drawImage(ctx.canvas, 0, 0, img.width / scaleFactor, img.height / scaleFactor, 0, 0, ctx.canvas.width, ctx.canvas.height);
}

document.addEventListener('DOMContentLoaded', function () {
    const body = document.body;

    // Update the initial cursor style
    body.style.cursor = "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewport=\"0 0 32 32\" style=\"fill:black;font-size:24px;\"><text y=\"50%\" transform=\"translate(0, 12)\">✨</text></svg>'), auto";

});