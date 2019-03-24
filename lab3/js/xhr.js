
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
