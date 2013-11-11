var observer, 
    callback, 
    options, 
    meats,
    freshmeat;

var meatword = "_magnusmagnus",
    queued = false;

callback = function( recordqueue ) {
  var meatspeaks = recordqueue[0].addedNodes,
      triggers = 0;
  
  for ( var i = 0; i < meatspeaks.length; i++ ) {

    if ( meatspeaks[i].children[1].innerHTML.indexOf( meatword ) !== -1 ) {
      triggers++;
    } else {
      console.log( "no match" );
    }
  }

  if ( triggers > 0 && queued === false ) {
    queued = true;
    
    setTimeout( function() { 
      $('#add-chat-form').trigger("submit");
      queued = false;
    }, 4000 );
  }
};

observer = new MutationObserver( callback );

options = { 
  'childList': true
};

meats = document.querySelector( '.chats ul' );

observer.observe( meats, options );