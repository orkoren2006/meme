'use strict'

var gCanvas;
var gCtx;

var index = 0;

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
            size: 20,
            align: 'left',
            color: 'red',
            x: 200,
            y: 70
        },
        {
            txt: '',
            size: 20,
            align: 'left',
            color: 'blue',
            x: 200,
            y: 300
        }
    ]
}

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

function checkCor(ev) {
    console.log(ev);
}

