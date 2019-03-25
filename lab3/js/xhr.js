
arrphotos = new Array();
var index = 0, indexph = 0, n = 4;
var portret_image = new Image();

for (var i = 0; i < 4; i++) {
  arrphotos[i] = new Image();
}

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
    	document.getElementById('text').innerHTML = data.quoteText ;
	})


function getphotos(orientation, countphotos){
  $.ajax({
        url: "https://api.unsplash.com/photos/random",

        data: {
        	client_id: '5e8819eb418bb5b7d26aeca3da5f2bc072acc8da78883d46e14c1a0e05dd138f',
          count: countphotos,
          orientation: orientation,
          collections: 1160922
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

$(function(){
  var canvas=document.getElementById("c1")
  var ctx=canvas.getContext("2d");

  getphotos('landscape', 2);

  arrphotos[0].onload = function() {
    ctx.drawImage(arrphotos[0], 0, 0, 400, 300);
  }

  arrphotos[1].onload = function() {
    ctx.drawImage(arrphotos[1], 0, 300, 400, 300);
  }

  getphotos('portrait', 1);

  portret_image.onload = function() {
    ctx.drawImage(portret_image, 400, 0, 400, 600);
  }
});



/*
function drawtx(){
  var canvas=document.getElementById("c1")
  var text=canvas.getContext("2d");
  text.font='28px Verdana';
  text.fillStyle='#82216f';
  text.fillText("Вставка текста в Canvas", 20, 100);
}

drawtx();
*/
