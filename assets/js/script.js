function drawScreen(sigName, sigTitle, sigAddress, sigPhone, sigWeb){
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
    context.fillText(sigName, leftAlign, textPos);

    if(sigTitle != ''){
      textPos+=16;
      context.font = "16px  sans-serif";
      context.fillText(sigTitle, leftAlign, textPos);
    }

    context.font = "14px sans-serif";
    if(sigAddress != ''){
      textPos+=16;
      context.fillText(sigAddress, leftAlign, textPos);
    }

    if(sigPhone != ''){
      textPos+=16;
      context.fillText(sigPhone, leftAlign, textPos);
    }

    if(sigWeb != ''){
      textPos+=16;
      context.fillText(sigWeb, leftAlign, textPos);
    }
  }
}

function textInputChanged(e){
  sigName = document.querySelector('.signame').value;
  sigTitle = document.querySelector('.sigtitle').value;
  sigAddress = document.querySelector('.sigaddress').value;

  sigFax = (document.querySelector('.sigfax').checked) ? ' | Fax: 207-907-7078' : '';
  sigPhone = document.querySelector('.sigphone').value + ' ext. ' + document.querySelector('.sigext').value  + sigFax;

  drawScreen(sigName, sigTitle, sigAddress, sigPhone, sigWeb);
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

var sigName = 'Firstname Lastname';
var sigTitle = 'Title';
var sigAddress = '103 Maine Ave., Bangor, ME  04401';
var sigPhone = '207-992-9200 ext. 1234 | Fax: 207-907-7078';
var sigWeb = 'pchc.com';

var generateButton = document.querySelector(".button");
generateButton.addEventListener('click', textInputChanged, false);

drawScreen(sigName, sigTitle, sigAddress, sigPhone, sigWeb);
