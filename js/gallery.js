/*
-- Gallery
*/
//init objects
var Gallery = function Gallery(el) {
    this.element = el;
    return this.init();
};

//main function
Gallery.prototype.init = function () {

    this.activeIndex = 0;

    //animation class
    this.anime = this.element.getAttribute("data-animation");
    if(!this.anime){this.anime = "fade";}

    //the window
    this.window = this.element.getAttribute("data-window");

    //the content holder
    this.content = this.element.getElementsByClassName('brash-modal_content');

    //the items
    this.Items = this.element.querySelectorAll('[data-gallery]');
    for (var i = 0, ii = this.Items.length; i < ii; i++) {
        this.Items[i].addEventListener('click', this, false);
    }

    //direction arrows
    this.previousButton = this.element.querySelector('.prev');
    this.nextButton = this.element.querySelector('.next');
    if(this.Items.length > 1){
        this.previousButton.addEventListener('click', this, false);
        this.nextButton.addEventListener('click', this, false);
    } else {
        this.previousButton.style.display = "none";
        this.nextButton.style.display = "none";
    }

    // Bind events to the handler
    var that = this;
    var handleEvent = function handleEvent() {
        that.handleEvent.call(that);
    };

};

//the handler
Gallery.prototype.handleEvent = function (e) {
    e.preventDefault();
    e = e || window.event;
    var target = e.target || e.srcElement;
    //console.log(this.Items);
    //console.log(target.getAttribute('data-gallery'));

    //reset the content window
    this.content[0].innerHTML = "";

    //if (target === this.previousButton) { this.previousSlide(); }
    switch(true){
        case (target === this.previousButton):
            this.previousSlide();
            break;
        case (target === this.nextButton):
            this.nextSlide();
            break;
        default:
            this.createMedia(target);
            break;
    }

};

Gallery.prototype.createMedia = function (target) {

    for (var i = 0, ii = this.Items.length; i < ii; i++) {
        if(target.href == this.Items[i].href){
            //console.log("activeIndex"+i);
            this.activeIndex = i;
            break;
        }
    }

    var mediaSrc = target.href;
    var mediaType = target.getAttribute('data-gallery');
    var mediaDesc = $(target).children()[0].alt;

    switch(mediaType){
        case "photo":
            var img = document.createElement("img");
            img.src = mediaSrc;
            img.alt = mediaDesc;
            this.content[0].appendChild(img);
            break;
        case "video":
            var iframe = document.createElement("iframe");
            iframe.src = mediaSrc;
            var descEl = document.createElement("p");
            var descText = document.createTextNode(mediaDesc);
            descEl.appendChild(descText);
            this.content[0].appendChild(iframe);
            this.content[0].appendChild(descEl);
            break;
    }

    var pureEl = document.getElementById(this.window);
    pureEl.classList.add(this.anime+"In");
    pureEl.focus();

};

Gallery.prototype.previousSlide = function () {
    //console.log('previousSlide');
    this.activeIndex = this.activeIndex - 1;

    if (this.activeIndex < 0) {
        this.activeIndex = this.Items.length -1;
    }

    //console.log(this.Items[this.activeIndex]);
    this.createMedia(this.Items[this.activeIndex]);

};

Gallery.prototype.nextSlide = function () {
    //console.log('nextSlide');
    this.activeIndex = this.activeIndex + 1;

    if (this.activeIndex >= this.Items.length) {
        this.activeIndex = 0;
    }

    //console.log(this.Items[this.activeIndex]);
    this.createMedia(this.Items[this.activeIndex]);

};

//look for elements
var brash_gallery = document.getElementsByClassName('brash_gallery');

//initialize elements
if (brash_gallery.length) {
    brash_gallery = initializeUI(brash_gallery, Gallery);
}


/*
-- Modal Object
*/
//init objects
var Modal = function Modal(el) {
    this.element = el;
    return this.init();
};

//main function
Modal.prototype.init = function () {

    //animation class
    this.anime = this.element.getAttribute("data-animation");
    if(!this.anime){this.anime = "fade";}

    this.element.addEventListener('click', this, false);

    // Bind events to the handler
    var that = this;
    var handleEvent = function handleEvent() {
        that.handleEvent.call(that);
    };

};

//the handler
Modal.prototype.handleEvent = function (e) {
    e.preventDefault();
    e = e || window.event;
    var target = e.target || e.srcElement;

    var modalId;
    modalId = $(target).attr("href");
    if(!modalId){
      //if no href on this target check the parent, sometimes elements inside the intended target get targeted
      modalId = $(target).parent().attr("href");
    }
    var pureEl = document.getElementById(modalId);

    pureEl.classList.add(this.anime+"In");
    pureEl.focus();


};

//look for elements
var brash_modal = document.getElementsByClassName('brash-modal_btn');

//initialize elements
if (brash_modal.length) {
    brash_modal = initializeUI(brash_modal, Modal);
}




/*
-- Modal Close
*/

//init objects
var ModalWindow = function ModalWindow(el) {
    this.element = el;
    return this.init();
};

//main function
ModalWindow.prototype.init = function () {

    //animation class
    this.anime = this.element.getAttribute("data-animation");
    if(!this.anime){this.anime = "fade";}

    this.closeButton = this.element.querySelector('.brash-modal_close');
    this.closeButton.addEventListener('click', this, false);

    // Bind events to the handler
    var that = this;
    var handleEvent = function handleEvent() {
        that.handleEvent.call(that);
    };

};

//the handler
ModalWindow.prototype.handleEvent = function (e) {
    e.preventDefault();
    this.element.classList.add(this.anime+"Out");
    this.element.classList.remove(this.anime+"In");

    var mWindow = document.getElementById(this.element.id);
    _st(removeClass, 770, mWindow, this.anime+"Out");

    //find open iframes and remove them
    $('.brash-modal_content iframe').remove();

    var obj = document.getElementById(""+this.element.id+"_obj");
    obj.focus();
};

//look for elements
var brash_modalWindow = document.getElementsByClassName('brash-modal_window');

//initialize elements
if (brash_modalWindow.length) {
    brash_modalWindow = initializeUI(brash_modalWindow, ModalWindow);
}
