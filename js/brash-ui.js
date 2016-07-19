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
