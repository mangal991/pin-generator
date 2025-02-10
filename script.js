function generatePin() {
    let canvas = document.getElementById("pinCanvas");
    let ctx = canvas.getContext("2d");
    let fileInput = document.getElementById("imageUpload").files[0];
    let textInput = document.getElementById("textInput").value;
    let font = document.getElementById("fontSelect").value;

    if (!fileInput) {
        alert("Please upload an image");
        return;
    }

    let reader = new FileReader();
    reader.onload = function(event) {
        let img = new Image();
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            ctx.font = `40px ${font}`;
            ctx.fillStyle = "white";
            ctx.fillText(textInput, 50, 50);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(fileInput);
}

function downloadPin() {
    let canvas = document.getElementById("pinCanvas");
    let link = document.createElement("a");
    link.download = "pinterest-pin.png";
    link.href = canvas.toDataURL();
    link.click();
}
