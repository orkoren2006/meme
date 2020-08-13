'use strict'

function init() {
    gCanvas = document.getElementById('myCanvas');
    gCtx = gCanvas.getContext('2d');
    
    document.getElementById("defaultOpen").click();
    window.addEventListener('resize', function(){
        resizeCanvas()
    })
}



function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName('tabcontent');
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none';
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName('tablinks');
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(' active', '');
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = 'block';
    evt.currentTarget.className += ' active';
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
    gCtx.strokeStyle = gMeme.lines[0].stroke;
    gCtx.fillStyle = gMeme.lines[0].fill;
    gCtx.font = `${gMeme.lines[0].size}px ${gMeme.lines[0].font}`;
    gCtx.textAlign = gMeme.lines[0].align;
    gCtx.strokeText(gMeme.lines[0].txt, gMeme.lines[0].x, gMeme.lines[0].y);
    gCtx.fillText(gMeme.lines[0].txt, gMeme.lines[0].x, gMeme.lines[0].y);

    gCtx.strokeStyle = gMeme.lines[1].stroke;
    gCtx.fillStyle = gMeme.lines[1].fill;
    gCtx.font = `${gMeme.lines[1].size}px ${gMeme.lines[1].font}`;
    gCtx.textAlign = gMeme.lines[1].align;
    gCtx.strokeText(gMeme.lines[1].txt, gMeme.lines[1].x, gMeme.lines[1].y);
    gCtx.fillText(gMeme.lines[1].txt, gMeme.lines[1].x, gMeme.lines[1].y);
}

function insertText() {
    index = 0;
    gMeme.lines[0].txt = document.querySelector('#txt').value;
    drawImg(gMeme.selectedImgId, drawText)
}

function insertTextBottom() {
    index = 1;
    gMeme.lines[1].txt = document.querySelector('#bottom-txt').value;
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
    gMeme.lines[index].align = 'left';
    gMeme.lines[index].x = 10;
    drawImg(gMeme.selectedImgId, drawText)
}

function alignRight() {
    gMeme.lines[index].align = 'right'
    gMeme.lines[index].x = 490;
    drawImg(gMeme.selectedImgId, drawText)
}

function alignCenter() {
    gMeme.lines[index].align = 'center'
    gMeme.lines[index].x = 250;
    drawImg(gMeme.selectedImgId, drawText)
}

function focus() {
    console.log('you made it!');

}
function changeIndex() {
    if (index === 0) index = 1
    else index = 0

}

function pickFill() {
    gMeme.lines[index].fill = document.querySelector('#fill').value
    drawImg(gMeme.selectedImgId, drawText)
}

function pickStroke() {
    gMeme.lines[index].stroke = document.querySelector('#stroke').value
    drawImg(gMeme.selectedImgId, drawText)
}

function changeFonts() {
    gMeme.lines[index].font = document.querySelector('#fonts').value
    drawImg(gMeme.selectedImgId, drawText)
}


// function submitText() {
//     // gMeme.lines[index].txt = document.querySelector('#txt').value;
//     // document.querySelector('#txt').value = '';
//     // drawText();
//     // saveToStorage(KEY, gMeme)
//     // loadFromStorage(KEY, gMeme)
// }

function clearLine() {
    if (index === 0) document.querySelector('#txt').value = '';
    else document.querySelector('#bottom-txt').value = '';
    gMeme.lines[index].txt = '';
    drawImg(gMeme.selectedImgId, drawText)
}

function clearText() {
    document.querySelector('#txt').value = '';
    document.querySelector('#bottom-txt').value = '';
    gMeme.lines[0].txt = '';
    gMeme.lines[1].txt = '';
    drawImg(gMeme.selectedImgId, drawText)
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    // You may clear part of the canvas
    // gCtx.clearRect(0, 0, gCanvas.width / 2, gCanvas.height / 2);
}

function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-image.jpg';
}


// // need to fix bug when choosing image it clears it
function resizeCanvas() {
    const elContainer = document.querySelector('#myCanvas');
    // Note: changing the canvas dimension this way clears the canvas
    gCanvas.width = elContainer.offsetWidth;
    gCanvas.height = elContainer.offsetHeight;
    drawImg(gMeme.selectedImgId, drawText)
}

