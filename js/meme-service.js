'use strict'

const KEY = 'Memes';
var gCanvas;
var gCtx;

var index = 0;

var isMousePressed = false;

var line = {
    txt: 'insert text',
    size: 40,
    font: 'Impact',
    align: 'center',
    fill: 'white',
    stroke: 'black',
    x: 200,
    y: 370
}

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'insert text',
            size: 40,
            font: 'Impact',
            align: 'center',
            fill: 'white',
            stroke: 'black',
            x: 200,
            y: 70
        }
    ]
}


var gSelectedText = {
    width: gMeme.lines[0].txt.length * (gMeme.lines[0].size / 2),
    height: gMeme.lines[0].size + 10,
    x: gMeme.lines[0].x - (gMeme.lines[0].txt.length / 2) * (gMeme.lines[0].size / 2),
    y: gMeme.lines[0].y - gMeme.lines[0].size
}

var startX;
var startY;
var middleX;
var middleY;
var endX;
var endY;
var differenceX;
var differenceY;

// var gKeywords = { 'happy': 12, 'funny puk': 1 }

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['happy'] },
    { id: 2, url: 'img/2.jpg', keywords: ['happy'] },
    { id: 3, url: 'img/3.jpg', keywords: ['happy'] },
    { id: 4, url: 'img/4.jpg', keywords: ['happy'] },
    { id: 5, url: 'img/5.jpg', keywords: ['happy'] },
    { id: 6, url: 'img/6.jpg', keywords: ['happy'] },
    { id: 7, url: 'img/7.jpg', keywords: ['happy'] },
    { id: 8, url: 'img/8.jpg', keywords: ['happy'] },
    { id: 9, url: 'img/9.jpg', keywords: ['happy'] },
    { id: 10, url: 'img/10.jpg', keywords: ['happy'] },
    { id: 11, url: 'img/11.jpg', keywords: ['happy'] },
    { id: 12, url: 'img/12.jpg', keywords: ['happy'] },
    { id: 13, url: 'img/13.jpg', keywords: ['happy'] },
    { id: 14, url: 'img/14.jpg', keywords: ['happy'] },
    { id: 15, url: 'img/15.jpg', keywords: ['happy'] },
    { id: 16, url: 'img/16.jpg', keywords: ['happy'] },
    { id: 17, url: 'img/17.jpg', keywords: ['happy'] },
    { id: 18, url: 'img/18.jpg', keywords: ['happy'] }
];

function swapLine() {
    if (index === 0) index = 1
    else index = 0;
}

function addLine() {
    gMeme.lines.push(line)
}

function updateSelectArea() {
    gSelectedText.width = gMeme.lines[index].txt.length * (gMeme.lines[index].size / 2);
    gSelectedText.height = gMeme.lines[index].size + 10;
    gSelectedText.y = gMeme.lines[index].y - gMeme.lines[index].size;
    if (gMeme.lines[index].align === 'center') {
        gSelectedText.x = gMeme.lines[index].x - (gMeme.lines[index].txt.length / 2) * (gMeme.lines[index].size / 2);
    } else if (gMeme.lines[index].align === 'left') {
        gSelectedText.x = gMeme.lines[index].x - 5;
    } else {
        gSelectedText.x = gMeme.lines[index].x - (gMeme.lines[index].txt.length / 2) * (gMeme.lines[index].size);
    }
}

function increaseFont() {
    gCtx.font = `${gMeme.lines[index].size++}px Impact`;
}

function decreaseFont() {
    gCtx.font = `${gMeme.lines[index].size--}px Impact`;
}

function moveDown() {
    gMeme.lines[index].y += 5;
}

function moveUp() {
    gMeme.lines[index].y -= 5;
}

function alignLeft() {
    gMeme.lines[index].align = 'left';
    gMeme.lines[index].x = 10;
}

function alignRight() {
    gMeme.lines[index].align = 'right'
    gMeme.lines[index].x = 390;
}

function alignCenter() {
    gMeme.lines[index].align = 'center'
    gMeme.lines[index].x = 200;
}

function clearLine() {
    gMeme.lines[index].txt = '';
};

function clearText() {
    if (gMeme.lines.length === 2) {
        gMeme.lines[0].txt = '';
        gMeme.lines[1].txt = '';
        if (index === 1) swapLine();
    } else {
        gMeme.lines[0].txt = '';
    }
};


function loadRect() {
    gSelectedText.x = loadFromStorage(KEY, gSelectedText).x
    gSelectedText.y = loadFromStorage(KEY, gSelectedText).y
    gSelectedText.width = loadFromStorage(KEY, gSelectedText).width
    gSelectedText.height = loadFromStorage(KEY, gSelectedText).height
}

function clearRect() {
    gSelectedText.x = 0;
    gSelectedText.y = 0;
    gSelectedText.width = 0;
    gSelectedText.height = 0;
};

//drag and drop funcs:

function getStartCoords(x, y) {
    startX = x;
    startY = y;
}

function updateCoords(x, y) {
    endX = x;
    endY = y;
    differenceX = endX - startX;
    differenceY = endY - startY;
}

function moveSelection() {
    gMeme.lines[index].x += differenceX;
    gMeme.lines[index].y += differenceY;
    gSelectedText.x += differenceX;
    gSelectedText.y += differenceY;
};

// function resetStartCoords(x, y) {
//     gMeme.lines[index].x += differenceX;
//     gMeme.lines[index].y += differenceY;
//     gSelectedText.x = x;
//     gSelectedText.y = y;
// }