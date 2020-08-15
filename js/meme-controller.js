'use strict'

function init() {
    gCanvas = document.getElementById('myCanvas');
    gCtx = gCanvas.getContext('2d');

    document.getElementById("defaultOpen").click();
    // renderGallery()

    // window.addEventListener('resize', function(){
    //     resizeCanvas()
    // })
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

    if (tablinks.className === ' active') {
        tablinks.innerHTML = '';
    }
}

function renderGallery() {
    var strHTML = `<div class="item">`;
    for (var i = 1; i <= 17; i++) {
        strHTML += `<img src="img/${i}.jpg" onclick="onClickImage(${i})">`
    }
    strHTML += `</div>`
    document.querySelector('.grid-container').innerHTML = strHTML;
}

function drawImg(num, func, func2) {
    const img = new Image();
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        func();
        func2();
    }
    img.src = `img/${num}.jpg`;
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
    gCtx.rect(rect.x, rect.y, rect.width, rect.height); /// x, y, width, height
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
    saveToStorage(KEY, rect)
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

function onClickSelection(ev) {
    ev.preventDefault();
    if (ev.offsetX >= rect.x && ev.offsetX <= rect.x + rect.width && ev.offsetY >= rect.y && ev.offsetY <= (rect.y + rect.height)) {
        startX = ev.offsetX;
        startY = ev.offsetY;
    }
};

function onReleaseSelection(ev) {
    ev.preventDefault();
    endX = ev.offsetX;
    endY = ev.offsetY;
    differenceX = endX - startX;
    differenceY = endY - startY;
    if (ev.offsetX >= rect.x + differenceX && ev.offsetX <= rect.x + rect.width +
        differenceX && ev.offsetY >= rect.y + differenceY && ev.offsetY <= (rect.y + rect.height) + differenceY) {
        moveSelection();
        drawImg(gMeme.selectedImgId, drawText, drawRect)
    }
};


// // need to fix bug when choosing image it clears it
function resizeCanvas() {
    const elContainer = document.querySelector('#myCanvas');
    // Note: changing the canvas dimension this way clears the canvas
    gCanvas.width = elContainer.offsetWidth;
    gCanvas.height = elContainer.offsetHeight;
    drawImg(gMeme.selectedImgId, drawText)
}

