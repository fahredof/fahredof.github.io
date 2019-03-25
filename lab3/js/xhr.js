arrphotos = new Array();
var index = 0;

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


function getphotos(key){
  $.ajax({
        url: "https://api.unsplash.com/photos/random",
        data: {
        	client_id: '18f07c2c511e7d347e6bc3995eba8ebf75fcbe9b79687038017b14bf83ac5d7f'
        }
      })
        .done(function(data) {
        document.getElementById('img').innerHTML+= '<img src="' + data.urls.small + '" />';
        arrphotos[index].src = data.urls.small;
        index++;
  	})
}

$(function(){
  var canvas=document.getElementById("c1")
  var image1=canvas.getContext("2d");

  getphotos();

  arrphotos[0].onload = function() {
    image1.drawImage(arrphotos[0], 0, 0, 300, 200);
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
