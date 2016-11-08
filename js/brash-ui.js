'use strict';

// Helper function to initialize sets of UI components obtained
// from getElementsByClassName/querySelectorAll
function initializeUI(elementList, init) {
    var storage = [];

    for (var i = 0; i < elementList.length; i++) {
        storage.push(new init(elementList[i]));
    }

    return storage;
}

//glboally turn off modals with Escape Key
$(document).keyup(function(e) {
	if (e.keyCode == 27) {
		if($(".brash-modal_window").is(':visible')){
		  $(".brash-modal_window .brash-modal_close").trigger('click');
		}
	}
});

//serious SERIOUS set Timeout Function
//used for for delaying functions
//gallery.js -- _st(removeClass, 800, mWindow, this.anime+"Out");
_st = function(fRef, mDelay) {
  if(typeof fRef == "function") {
    var argu = Array.prototype.slice.call(arguments,2);
    var f = (function(){ fRef.apply(null, argu); });
      return setTimeout(f, mDelay);
    }
  return setTimeout(fRef, mDelay);
};

function removeClass(elWindow,elClass) {
    elWindow.classList.remove(elClass);
}
