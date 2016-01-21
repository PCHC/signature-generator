function drawScreen(sigName, sigTitle, sigAddress, sigPhone){
  if(drawingCanvas.getContext){
    var context = drawingCanvas.getContext('2d');

    context.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);

    var pchcLogo = new Image();
    pchcLogo.src = "assets/img/pchc-signature_140x85.png";
    pchcLogo.onload = function() {
      context.drawImage(pchcLogo, 0, 0);
    }

    context.font = "bold 16px sans-serif";
    context.fillStyle = "#000000";
    context.textAlign = "left";
    context.fillText(sigName, leftAlign, 16);
    checkWidth(context.measureText(sigName).width);

    context.font = "16px  sans-serif";
    context.fillText(sigTitle, leftAlign, 36);
    checkWidth(context.measureText(sigTitle).width);

    context.font = "14px sans-serif";
    context.fillText(sigAddress, leftAlign, 54);
    checkWidth(context.measureText(sigAddress).width);

    context.fillText(sigPhone, leftAlign, 70);
    checkWidth(context.measureText(sigPhone).width);
  }
}

function textInputChanged(e){
  sigName = document.querySelector('.signame').value;
  sigTitle = document.querySelector('.sigtitle').value;
  sigAddress = document.querySelector('.sigaddress').value + ', ' + document.querySelector('.sigcity').value;
  sigPhone = document.querySelector('.sigphone').value + ' ext. ' + document.querySelector('.sigext').value + ' | pchc.com';

  drawScreen(sigName, sigTitle, sigAddress, sigPhone);
}

function checkWidth(theWidth){
  if(theWidth > textWidth){
    textWidth = theWidth;
  }
}

function setWidth(){
  console.log(canvasWidth);
  //drawingCanvas.width = leftAlign + textWidth;
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
  downloadCanvas(this, 'signaturecanvas', 'test.png');
}, false);

var drawingCanvas = document.getElementById('signaturecanvas');
var downloadLink = document.querySelector('.download');

var leftAlign = 140;
var canvasWidth = drawingCanvas.width;
var textWidth = 0;

var sigName = 'Firstname Lastname';
var sigTitle = 'Title';
var sigAddress = '103 Maine Ave., Bangor, ME  04401';
var sigPhone = '207-992-9200 ext. 1234 | pchc.com';

drawScreen(sigName, sigTitle, sigAddress, sigPhone);

var generateButton = document.querySelector(".button");
generateButton.addEventListener('click', textInputChanged, false);
