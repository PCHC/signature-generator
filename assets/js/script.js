function drawScreen(sigLines){
  if(drawingCanvas.getContext){
    var context = drawingCanvas.getContext('2d');

    context.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);

    var pchcLogo = new Image();
    pchcLogo.src = "assets/img/pchc-signature-140X85.png";
    pchcLogo.onload = function() {
      context.drawImage(pchcLogo, 0, 3);
    }

    context.font = "bold 16px sans-serif";
    context.fillStyle = "#000000";
    context.textAlign = "left";
    var textPos = 14;
    context.fillText(sigLines[1], leftAlign, textPos);

    if(sigLines[2] != ''){
      textPos+=16;
      context.font = "16px  sans-serif";
      context.fillText(sigLines[2], leftAlign, textPos);
    }

    context.font = "14px sans-serif";
    if(sigLines[3] != ''){
      textPos+=16;
      context.fillText(sigLines[3], leftAlign, textPos);
    }

    if(sigLines[4] != ''){
      textPos+=16;
      context.fillText(sigLines[4], leftAlign, textPos);
    }

    if(sigLines[5] != ''){
      textPos+=16;
      context.fillText(sigLines[5], leftAlign, textPos);
    }
  }
}

function textInputChanged(e){
  sigLines[1] = document.querySelector('.signame').value;
  sigLines[2] = document.querySelector('.sigtitle').value;
  sigLines[3] = document.querySelector('.sigaddress').value;

  // Check if fax is checked
  sigFax = (document.querySelector('.sigfax').checked) ? ' | Fax: 207-907-7078' : '';
  // Add fax to phone line
  sigLines[4] = '207-' + document.querySelector('.sigphone').value + ' ext. ' + document.querySelector('.sigext').value  + sigFax;

  // Check if cell phone is entered
  sigCell = (document.querySelector('.sigcell').value !== '') ? 'Cell: ' + document.querySelector('.sigcell').value + ' | ' : '';
  // Add cell phone to website line
  sigLines[5] = sigCell + 'pchc.com';

  drawScreen(sigLines);
}

function downloadCanvas(link, canvasId, filename) {
  link.href = document.getElementById(canvasId).toDataURL();
  link.download = filename;
}

/**
 * The event handler for the link's onclick event. We give THIS as a
 * parameter (=the link element), ID of the canvas and a filename.
*/
document.getElementById('download').addEventListener('click', function() {
  downloadCanvas(this, 'signaturecanvas', 'pchc-signature_'+makeid()+'.png');
}, false);

function makeid(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

var drawingCanvas = document.getElementById('signaturecanvas');
var downloadLink = document.querySelector('.download');

var leftAlign = 140;
var sigLines = [];
// Default Values
sigLines[1] = 'Firstname Lastname';
sigLines[2] = 'Title';
sigLines[3] = '103 Maine Ave., Bangor, ME  04401';
sigLines[4] = '207-992-9200 ext. 1234 | Fax: 207-907-7078';
sigLines[5] = 'Cell: 207-867-5309 | pchc.com';

var generateButton = document.querySelector(".button");
generateButton.addEventListener('click', textInputChanged, false);

drawScreen(sigLines);
