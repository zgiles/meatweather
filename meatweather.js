/* Base code borrowed from https://gist.github.com/akjetma/7406264 and extended by @zgiles */
/* My javascript is so good.. not */
/* Public Domain ? */

var observer,
callback,
options,
meats;
 
var meatword = "!nyc",
queued = false;
 
callback = function( recordqueue ) {
	var meatspeaks = recordqueue[0].addedNodes,
	triggers = 0;
	for ( var i = 0; i < meatspeaks.length; i++ ) {
		if ( meatspeaks[i].children[1].innerHTML.indexOf( meatword ) !== -1 ) {
			console.log( "triggerplusplus" );
			triggers++;
		} else {
			console.log( "no match" );
		}
	}
 
	if ( triggers > 0 && queued === false ) {
		queued = true;
		setTimeout( function() {
			$.getJSON("http://api.openweathermap.org/data/2.5/weather?q=NYC,NY", function(data) {
				temp = Math.round(data['main']['temp'] - 273);
				condition = data['weather'][0]['description'];
				cityname = data['name'];
				$("#composer-message").val("In " + cityname + " it is current " + condition + " with a temperature of " + temp + "°C");
				$('#composer-form').trigger("submit");
			});
		queued = false;
		}, 4000 );
	}
};
 
observer = new MutationObserver( callback );
 
options = {
'childList': true
};
 
meats = document.querySelector( '#chat-container ul' );
 
observer.observe( meats, options );
