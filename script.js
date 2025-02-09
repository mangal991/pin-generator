async function fetchPageData() {
    const url = document.getElementById("urlInput").value;
    if (!url) {
        alert("Enter a valid URL");
        return;
    }

    try {
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
        const data = await response.json();
        
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = data.contents;
        
        const title = tempDiv.querySelector("title")?.innerText || "No Title Found";
        const image = tempDiv.querySelector("img")?.src || "https://via.placeholder.com/400";

        drawPin(title, image);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function drawPin(title, imageUrl) {
    const canvas = document.getElementById("pinCanvas");
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;
    
    img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, 400, 400);
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.fillText(title, 10, 450);
    };
}

function downloadPin() {
    const canvas = document.getElementById("pinCanvas");
    const link = document.createElement("a");
    link.download = "pin.png";
    link.href = canvas.toDataURL();
    link.click();
}
