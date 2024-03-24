// Canvas Editor Logic
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let caption = '1 & 2 BHK Luxury Apartments at just Rs.34.97 Lakhs';// Initial Caption text
let callToAction = 'Shop Now'; // Initial CTA text
const outerBackgroundColor = '#999999';
let innerBackgroundColor = '#e3e4e6'; // Default inner background color

function setBackgroundImage(url) {
  const img = new Image();
  img.onload = function() {
    // Calculate image size and position
    const maxWidth = 900; // Max width for the image
    const maxHeight = 1080; // Max height for the image
    const scaleFactor = Math.min(maxWidth / img.width, maxHeight / img.height);
    const width = img.width * scaleFactor;
    const height = img.height * scaleFactor;
    const x = (canvas.width - width) / 2;
    const y = (canvas.height - height) - 20;

    // Draw the inner background
    ctx.fillStyle = innerBackgroundColor;
    ctx.fillRect(x - 20, y - 20, width + 40, height + 40); // Add padding around the image

    // Draw the image
    ctx.drawImage(img, x, y, width, height);
  };
  img.src = url;
}

function setCaption(text) {
  caption = text;
  renderCanvas();
}

function setCallToAction(text) {
  callToAction = text;
  renderCanvas();
}

function setInnerBackgroundColor(color) {
  innerBackgroundColor = color;
  renderCanvas();
}

function renderCanvas() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw outer background (constant color)
  ctx.fillStyle = outerBackgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Load and draw image
  const fileInput = document.getElementById('fileInput');
  if (fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(event) {
      setBackgroundImage(event.target.result);
    };
    reader.readAsDataURL(fileInput.files[0]);
  }

  // Draw caption
  ctx.fillStyle = '#ffffff'; // white color for caption text
  ctx.font = '24px Arial';
  ctx.fillText(caption, 20, canvas.height - 960);

  // Draw call to action
  ctx.fillStyle = '#0000ff'; // Blue color for CTA text
  ctx.font = 'bold 20px Arial';
  ctx.fillText(callToAction, 20, canvas.height - 840);
}

document.getElementById('fileInput').addEventListener('change', renderCanvas);
document.getElementById('caption').addEventListener('input', function() {
  setCaption(this.value);
});
document.getElementById('callToAction').addEventListener('input', function() {
  setCallToAction(this.value);
});
document.getElementById('innerBackgroundColor').addEventListener('input', function() {
  setInnerBackgroundColor(this.value);
});

// Initial render
renderCanvas();
