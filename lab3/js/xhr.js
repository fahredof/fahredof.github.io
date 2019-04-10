
arrphotos = new Array();
var index = 0, indexph = 0, n = 2, count = 0, quote = null;
var portret_image = new Image();

for (var i = 0; i < 4; i++) {
  arrphotos[i] = new Image();
  arrphotos[i].crossOrigin = "anonymous";
}

portret_image.crossOrigin = "anonymous";

$.ajax({
      url: "https://api.forismatic.com/api/1.0/",
      jsonp: "jsonp",
      dataType: "jsonp",
      data: {
        method: "getQuote",
        lang: "ru",
        format: "jsonp"
      }
    })
    .done(function(data) {
    	document.getElementById('text').innerHTML = data.quoteText;
      quote = data.quoteText;
	})


function getphotos(orientation, countphotos){
  $.ajax({
        url: 'https://api.codetabs.com/v1/proxy',

        data: {
            quest: 'https://api.unsplash.com/photos/random?' +
            	   'client_id=a5d8eee6774381f06df7076830489d2c5ed653a9d25494b151ab87729d7b8d2b' + '&' +
                 'count=' + countphotos + '&' + 'orientation=' + orientation + '&' + 'collections=1160922'
        }
      })
        .done(function(data) {
          if (orientation == 'landscape'){
              while (n != 0){
                arrphotos[index].src = data[indexph].urls.regular;
                index++;
                indexph++;
                n--;
              }
            }
          else{
              portret_image.src = data[0].urls.regular;
          }
        })
      }

 $(function() {


  function unloadph(){
      var canvas=document.getElementById("c1");
      var ctx=canvas.getContext("2d");

  getphotos('landscape', 2);

      arrphotos[0].onload = function() {
        ctx.drawImage(arrphotos[0], 0, 0, 400, 300);
        count++;
      }

      arrphotos[1].onload = function() {
        ctx.drawImage(arrphotos[1], 0, 300, 400, 300);
        count++;
      }

  getphotos('portrait', 1);

      portret_image.onload = function() {
        ctx.drawImage(portret_image, 400, 0, 400, 600);
        count++;
      }
  }

  function unloadtx(){
      if (count == 3){
        var canvas=document.getElementById("c1");
        var ctx=canvas.getContext("2d");
        ctx.font='28px Verdana';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText(quote, 0, 400);
      }
      else {
        setTimeout(unloadtx, 1);
      }
  }
  unloadph();
  unloadtx();
});

function to_image(){
    var canvas = document.getElementById("c1");
    document.getElementById("theimage").src = canvas.toDataURL();
    Canvas2Image.saveAsPNG(canvas);
}
