//init objects
var Accordion = function Accordion(el) {
    this.element = el;
    return this.init();
};

//main function
Accordion.prototype.init = function () {

    // Bind events to the handler
    var that = this;
    var handleEvent = function handleEvent() {
        that.handleEvent.call(that);
    };

    this.Panels = this.element.querySelectorAll('dd');

    this.Buttons = this.element.querySelectorAll('dt');
    for (var b = 0, bb = this.Buttons.length; b < bb; b++) {
        this.Buttons[b].addEventListener('click', this, false);
        this.Buttons[b].addEventListener('keydown', this, false);
    }

};

//the handler
Accordion.prototype.handleEvent = function (e) {
    e = e || window.event;
    var target = e.target || e.srcElement;
    //console.log(target);
    var type = e.type;
    //console.log(type);
    var keycode = e.keyCode;
    //console.log(keycode);

    var active = $(target).hasClass('active');

    if(active){
        if(keycode == 13 || type == "click"){
            //reset this dt
            $(target).removeClass('active');
            $(target).attr('aria-selected', "false");
            $(target).attr('aria-expanded', "false");
            $(target).next('dd').attr('aria-hidden','true');
        }
    } else {
        if(keycode == 13 || type == "click"){
            //reset the accordion component
            $(this.Buttons).removeClass('active');
            $(this.Buttons).attr('aria-selected','false');
            $(this.Buttons).attr('aria-expanded', "false");
            $(this.Panels).attr('aria-hidden','true');
            //activate target
            $(target).addClass('active');
            $(target).attr('aria-selected', "true");
            $(target).attr('aria-expanded', "true");
            $(target).next('dd').attr('aria-hidden','false');
        }
    }

};

//look for elements
var brash_accordion = document.getElementsByClassName('accordion');

//initialize elements
if (brash_accordion.length) {
    brash_accordion = initializeUI(brash_accordion, Accordion);
}
