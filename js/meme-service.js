'use strict'

const KEY = 'Memes';
var gCanvas;
var gCtx;

var index = 0;


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

var rect = {
    width: gMeme.lines[0].txt.length * (gMeme.lines[0].size /2),
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

var gKeywords = { 'happy': 12, 'funny puk': 1 }

var gImgs = [
    { id: 1, url: 'img/popo.jpg', keywords: ['happy'] },
    { id: 2, url: 'img/popo.jpg', keywords: ['happy'] },
    { id: 3, url: 'img/popo.jpg', keywords: ['happy'] },
    { id: 4, url: 'img/popo.jpg', keywords: ['happy'] },
    { id: 5, url: 'img/popo.jpg', keywords: ['happy'] },
    { id: 6, url: 'img/popo.jpg', keywords: ['happy'] },
    { id: 7, url: 'img/popo.jpg', keywords: ['happy'] },
    { id: 8, url: 'img/popo.jpg', keywords: ['happy'] },
    { id: 9, url: 'img/popo.jpg', keywords: ['happy'] },
    { id: 10, url: 'img/popo.jpg', keywords: ['happy'] },
    { id: 11, url: 'img/popo.jpg', keywords: ['happy'] },
    { id: 12, url: 'img/popo.jpg', keywords: ['happy'] },
    { id: 13, url: 'img/popo.jpg', keywords: ['happy'] },
    { id: 14, url: 'img/popo.jpg', keywords: ['happy'] },
    { id: 15, url: 'img/popo.jpg', keywords: ['happy'] },
    { id: 16, url: 'img/popo.jpg', keywords: ['happy'] },
    { id: 17, url: 'img/popo.jpg', keywords: ['happy'] },
    { id: 18, url: 'img/popo.jpg', keywords: ['happy'] }
];

function swapLine() {
    if (index === 0) index = 1
    else index = 0;
}

function addLine() {
    gMeme.lines.push(line)
}

function updateSelectArea() {
    rect.width = gMeme.lines[index].txt.length * (gMeme.lines[index].size / 2);
    rect.height = gMeme.lines[index].size + 10;
    rect.y = gMeme.lines[index].y - gMeme.lines[index].size;
    if (gMeme.lines[index].align === 'center') {
        rect.x = gMeme.lines[index].x - (gMeme.lines[index].txt.length / 2) * (gMeme.lines[index].size / 2);
    } else if (gMeme.lines[index].align === 'left') {
        rect.x = gMeme.lines[index].x - 5;
    } else {
        rect.x = gMeme.lines[index].x - (gMeme.lines[index].txt.length / 2) * (gMeme.lines[index].size);
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

function moveSelection() {
    gMeme.lines[index].x += differenceX;
    gMeme.lines[index].y += differenceY;
    rect.x += differenceX;
    rect.y += differenceY;
};

function loadRect() {
    rect.x = loadFromStorage(KEY, rect).x
    rect.y = loadFromStorage(KEY, rect).y
    rect.width = loadFromStorage(KEY, rect).width
    rect.height = loadFromStorage(KEY, rect).height
}

function clearRect() {
    rect.x = 0;
    rect.y = 0;
    rect.width = 0; 
    rect.height = 0;
};

//delete when done:

function checkCor(ev) {
    console.log(ev);
}
