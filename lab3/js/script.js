genHTML();
main();

var quote;
var canvas;
var arrayOfLandScape;
var imagePortret;
var index;
var indexph;
var sumphoto;
var count;

function main() {

  quote = null,
  canvas = document.getElementById('canvas'),
  arrayOfLandScape = new Array(),
  imagePortret = new Image,
  index = 0,
  indexph = 0,
  sumphoto = 2,
  count = 0;

  canvas.width = 800;
  canvas.height = 600;
  canvas.style.border = '3px solid black';

  for (var i = 0; i < 4; i++) {
      arrayOfLandScape[i] = new Image();
      arrayOfLandScape[i].crossOrigin = 'anonymous';
  }

  imagePortret.crossOrigin = 'anonymous';

  getQuote();
  getPhotos();
  unloadph();
  drawtext();
}

function getQuote(){

  $.ajax({
          url     : 'https://api.forismatic.com/api/1.0/',
          jsonp   : 'jsonp',
          dataType: 'jsonp',
          data: {
                method: 'getQuote',
                lang  : 'ru',
                format: 'jsonp'
                }
        })
        .done(function(data) {
          quote = data.quoteText;
    	})
}

function getPhotos(orientation, countphotos){

  $.ajax({
          url: 'https://api.codetabs.com/v1/proxy',
          data: {
                quest: 'https://api.unsplash.com/photos/random?' +
            	  'client_id=df3960483fe3f45e67dee4474128c96c21199e1b74d29191d9af9fc74da9b805' + '&' +
                'count=' + countphotos + '&' + 'orientation=' + orientation + '&' + 'collections=1160922'
                }
        })
        .done(function(data) {
              if (orientation == 'landscape'){
                  while (sumphoto != 0){
                        arrayOfLandScape[index].src = data[indexph].urls.regular;
                        index++;
                        indexph++;
                        sumphoto--;
                  }
              }
              else{
                  imagePortret.src = data[0].urls.regular;
              }
        })
}

function unloadph(){

  var ctx = canvas.getContext('2d');

  getPhotos('landscape', 2);

  arrayOfLandScape[0].onload = function() {
    ctx.drawImage(arrayOfLandScape[0], 0, 0, 400, 300);
    ctx.fillStyle = 'rgba(0,0,0,0.35)';
    ctx.fillRect(0,0,400,300);
    count++;
  }

  arrayOfLandScape[1].onload = function() {
    ctx.drawImage(arrayOfLandScape[1], 0, 300, 400, 300);
    ctx.fillStyle = 'rgba(0,0,0,0.35)';
    ctx.fillRect(0, 300, 400, 300);
    count++;
  }

  getPhotos('portrait', 1);

  imagePortret.onload = function() {
    ctx.drawImage(imagePortret, 400, 0, 400, 600);
    ctx.fillStyle = 'rgba(0,0,0,0.35)';
    ctx.fillRect(400, 0, 400, 600);
    count++;
  }
}

function cutText(context, text, marginLeft, marginTop, maxWidth, lineHeight){

  var words = text.split(' ');
  var countWords = words.length;
  var line = '';

  for (var n = 0; n < countWords; n++) {
      var testLine = line + words[n] + ' ';
      var testWidth = context.measureText(testLine).width;
      if (testWidth > maxWidth) {
          context.fillText(line, marginLeft, marginTop);
          line = words[n] + ' ';
          marginTop += lineHeight;
      }
      else {
          line = testLine;
      }
  }
  context.fillText(line, marginLeft, marginTop);
}

function drawtext(){
  if (quote != null && count === 3) {
      var ctx = canvas.getContext('2d'),

      maxWidth = 600,
      lineHeight = 40,
      marginLeft = 110,
      marginTop = 250;

      ctx.font = '20pt Calibri';
      ctx.fillStyle = 'white';
      ctx.font = 'bold';

      cutText(ctx, quote, marginLeft, marginTop, maxWidth, lineHeight);
      save.style.visibility = 'visible';

  }
  else {
     setTimeout(drawtext, 1);
  }
}

function genHTML(){

  var
    canvas = document.createElement('canvas'),
    body   = document.getElementById('body'),
    save   = document.createElement('button'),
    div    = document.createElement('div'),
    dbox   = document.createElement('div');

  canvas.id = 'canvas';

  div.style.width = '800px';

  save.id = 'save';
  save.innerHTML = 'Save';
  save.style.backgroundColor = 'black';
  save.style.border = 'none';
  save.style.color =  'white';
  save.style.padding = '10px 25px';
  save.style.fontSize = '16px';
  save.style.visibility = 'hidden';
  save.onclick =
    function(){
      var canv= document.getElementById('canvas');
      var dataURL = canv.toDataURL('image/jpg');
      var link = document.createElement('a');

      link.href = dataURL;
      link.download = 'quote.jpg';
      link.click();
    };

  div.appendChild(canvas);
  div.appendChild(save);
  dbox.appendChild(div);
  body.appendChild(dbox);

}
