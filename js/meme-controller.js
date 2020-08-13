'use strict'

function init() {
    gCanvas = document.getElementById('myCanvas');
    gCtx = gCanvas.getContext('2d');

    // window.addEventListener('resize', function(){
    //     resizeCanvas()
    // })
}

function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}


function drawImg(num, func) {
    const img = new Image();
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        func();
    }
    img.src = `img/${num}.jpg`;

}

function onClickImage(num) {
    openTab(event, 'generator')
    drawImg(num, drawText)
    gMeme.selectedImgId = num;
}



function drawText() {
    
    gCtx.lineWidth = '2';
    gCtx.strokeStyle = gMeme.lines[index].color;
    gCtx.fillStyle = 'white';
    gCtx.font = `${gMeme.lines[index].size}px Impact`;
    gCtx.textAlign = 'left';
    gCtx.strokeText(gMeme.lines[index].txt, gMeme.lines[index].x, gMeme.lines[index].y);
    gCtx.fillText(gMeme.lines[index].txt, gMeme.lines[index].x, gMeme.lines[index].y);
    // ctx.fillText(stringTitle, 15, canvas.height / 2 + 35);
}



function insertText() {
    gMeme.lines[index].txt = document.querySelector('#txt').value;
    drawImg(gMeme.selectedImgId, drawText)
}

function increaseFont() {
    gCtx.font = `${gMeme.lines[index].size++}px Impact`;
    drawImg(gMeme.selectedImgId, drawText)
}

function decreaseFont() {
    gCtx.font = `${gMeme.lines[index].size--}px Impact`;
    drawImg(gMeme.selectedImgId, drawText)
}

function moveDown() {
    gMeme.lines[index].y += 5;
    drawImg(gMeme.selectedImgId, drawText)
}

function moveUp() {
    gMeme.lines[index].y -= 5;
    drawImg(gMeme.selectedImgId, drawText)
}

function alignLeft() {
    gCtx.textAlign = 'right';
    drawImg(gMeme.selectedImgId, drawText)
}

function addLine() {
    index = 1;
    document.querySelector('#txt').value = '';
    drawImg(gMeme.selectedImgId, drawText)
}


function clearText() {
    gMeme.lines[index].txt = '';
    document.querySelector('#txt').value = '';
    drawImg(gMeme.selectedImgId, drawText)
}

// function submitext() {
//     gMeme.lines[index].txt = document.querySelector('#txt').value;
//     document.querySelector('#txt').value = '';
// }

function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-image.jpg';
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    // You may clear part of the canvas
    // gCtx.clearRect(0, 0, gCanvas.width / 2, gCanvas.height / 2);
}

// // need to fix bug when choosing image it clears it
// function resizeCanvas() {
//     const elContainer = document.querySelector('#myCanvas');
//     // Note: changing the canvas dimension this way clears the canvas
//     gCanvas.width = elContainer.offsetWidth;
//     gCanvas.height = elContainer.offsetHeight;
// }

