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


  function drawImg(num) {
    const img = new Image();
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    }
    img.src = `img/${num}.jpg`;
    openTab(event, 'generator')
}

function drawText(x, y) {
    // gCtx.save();
    gCtx.beginPath();
    gCtx.lineWidth = '2';
    gCtx.strokeStyle = 'red';
    gCtx.fillStyle = 'white';
    gCtx.font = '40px Impact';
    gCtx.textAlign = 'center';
    gCtx.fillText(gMeme.lines[0].txt, x, y);
    gCtx.strokeText(gMeme.lines[0].txt, x, y);
    // gCtx.restore();
}

function insertText() {
    // var text = document.querySelector('#txt').value;
    //     document.querySelector('#live').innerHTML = text;
    gMeme.lines[0].txt = document.querySelector('#txt').value; 
    
    drawText(x,y)
    }
    
    function increaseFont() {
    
        gCtx.font = `${gMeme.lines[0].size++}px Impact`;
    
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

function onIncreaseFont() {
    increaseFont();
  

}