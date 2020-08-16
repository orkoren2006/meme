'use strict'

function init() {
    gCanvas = document.getElementById('myCanvas');
    gCtx = gCanvas.getContext('2d');

    document.getElementById("defaultOpen").click();
    renderGallery()

    drawImg(gMeme.selectedImgId, drawText, drawRect)
}

function onOpenTab(evt, tabName) {
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
    document.getElementById(tabName).style.display = 'flex';
    evt.currentTarget.className += ' active';

}

function renderGallery() { 
    var strHTML = '';
    gImgs.forEach(function(img) {
        strHTML += `<img src="${img.url}" onclick="onClickImage(${img.id})">`
      });
    document.querySelector('.grid-container').innerHTML = strHTML;
};

function drawImg(num, func, func2) {
    // debugger;
    const img = new Image(); // similar to queryselector function (selecting the img element, not related to the canvas)
    img.onload = () => { // loading the image
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height); //the only reference to the canvas
        func(); //the a-synchronic funcitons we want to add to the image rendering. change their names to a clearer one
        func2();
    }
    img.src = `img/${num}.jpg`; //continue to line 50, selecting the specific image
}

function onClickImage(num) {
    onOpenTab(event, 'generator')
    drawImg(num, drawText, drawRect)

    gMeme.selectedImgId = num;
}

function drawText() {
    var line = gMeme.lines;
    for (var i = 0; i < line.length; i++) {
        gCtx.lineWidth = '2';
        gCtx.strokeStyle = line[i].stroke;
        gCtx.fillStyle = line[i].fill;
        gCtx.font = `${line[i].size}px ${line[i].font}`;
        gCtx.textAlign = line[i].align;
        gCtx.strokeText(line[i].txt, line[i].x, line[i].y);
        gCtx.fillText(line[i].txt, line[i].x, line[i].y);
    }
}

function drawRect() {
    gCtx.beginPath();
    gCtx.rect(gSelectedText.x, gSelectedText.y, gSelectedText.width, gSelectedText.height); /// x, y, width, height
    gCtx.strokeStyle = 'black';
    gCtx.stroke();
}

function onInsertText() {
    gMeme.lines[index].txt = document.querySelector('#txt').value;
    updateSelectArea()
    drawImg(gMeme.selectedImgId, drawText, drawRect)
}

function onAddLine() {
    if (gMeme.lines.length === 1) {
        document.querySelector('#txt').value = '';
        addLine();
        swapLine();
        updateSelectArea()
        drawImg(gMeme.selectedImgId, drawText, drawRect)
    }
}

function onSwapLine() {
    if (gMeme.lines.length === 2) {
        swapLine();
        if (index === 0) document.querySelector('#txt').value = gMeme.lines[0].txt;
        else document.querySelector('#txt').value = gMeme.lines[1].txt;
    }
    updateSelectArea()
    drawImg(gMeme.selectedImgId, drawText, drawRect);
}

function onIncreaseFont() {
    increaseFont()
    updateSelectArea()
    drawImg(gMeme.selectedImgId, drawText, drawRect)
}

function onDecreaseFont() {
    decreaseFont()
    updateSelectArea()
    drawImg(gMeme.selectedImgId, drawText, drawRect)
}

function onMoveDown() {
    moveDown()
    updateSelectArea()
    drawImg(gMeme.selectedImgId, drawText, drawRect)
}

function onMoveUp() {
    moveUp()
    updateSelectArea()
    drawImg(gMeme.selectedImgId, drawText, drawRect)
}

function onAlignLeft() {
    alignLeft()
    updateSelectArea()
    drawImg(gMeme.selectedImgId, drawText, drawRect)
}

function onAlignRight() {
    alignRight()
    updateSelectArea()
    drawImg(gMeme.selectedImgId, drawText, drawRect)
}

function onAlignCenter() {
    alignCenter()
    updateSelectArea()
    drawImg(gMeme.selectedImgId, drawText, drawRect)
}

function onPickFill() {
    gMeme.lines[index].fill = document.querySelector('#fill').value
    updateSelectArea()
    drawImg(gMeme.selectedImgId, drawText, drawRect)
}

function onPickStroke() {
    gMeme.lines[index].stroke = document.querySelector('#stroke').value
    updateSelectArea()
    drawImg(gMeme.selectedImgId, drawText, drawRect)
}

function onChangeFonts() {
    gMeme.lines[index].font = document.querySelector('#fonts').value
    updateSelectArea()
    drawImg(gMeme.selectedImgId, drawText, drawRect)
}

function onClearLine() {
    document.querySelector('#txt').value = '';
    clearLine()
    updateSelectArea()
    drawImg(gMeme.selectedImgId, drawText, drawRect)
}

function onClearText() {
    clearText()
    document.querySelector('#txt').value = '';
    drawImg(gMeme.selectedImgId, drawText, drawRect);
}

function onGenerateMeme() {
    document.querySelector('.generate').style.display = 'none';
    document.querySelector('.download').style.display = 'flex';
    document.querySelector('.edit').style.display = 'flex';
    saveToStorage(KEY, gSelectedText)
    clearRect();
    drawImg(gMeme.selectedImgId, drawText, drawRect);
}

function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-image.jpg';
}

function onEdit() {
    document.querySelector('.generate').style.display = 'flex';
    document.querySelector('.download').style.display = 'none';
    document.querySelector('.edit').style.display = 'none';
    loadRect()
    drawRect();
}


function onPressedMouse() {
    isMousePressed = true;

}

function onReleaseMouse(ev) {
    isMousePressed = false;
    // resetStartCoords(ev.offsetX, ev.offsetY)
}

function onReleaseSelection(ev) { 
    if (!isMousePressed) return;
  
    if (ev.offsetX >= gSelectedText.x && ev.offsetX <= gSelectedText.x + gSelectedText.width && ev.offsetY >= gSelectedText.y && ev.offsetY <= (gSelectedText.y + gSelectedText.height)) {
        getStartCoords (ev.offsetX, ev.offsetY);
    }
    
    updateCoords(ev.offsetX, ev.offsetY);
   
    if (ev.offsetX >= gSelectedText.x + differenceX && ev.offsetX <= gSelectedText.x + gSelectedText.width +
        differenceX && ev.offsetY >= gSelectedText.y + differenceY && ev.offsetY <= (gSelectedText.y + gSelectedText.height) + differenceY) {
        moveSelection();
        drawImg(gMeme.selectedImgId, drawText, drawRect)  
    }
};

