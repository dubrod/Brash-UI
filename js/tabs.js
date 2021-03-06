//init objects
var Tabs = function Tabs(el) {
    this.element = el;
    return this.init();
};

//main function
Tabs.prototype.init = function () {

    // Bind events to the handler
    var that = this;
    var handleEvent = function handleEvent() {
        that.handleEvent.call(that);
    };

    this.Buttons = this.element.querySelectorAll('[role=tab]');
    for (var i = 0, ii = this.Buttons.length; i < ii; i++) {
        this.Buttons[i].addEventListener('click', this, false);
    }

    this.Panels = this.element.querySelectorAll('[role=tabpanel]');
};

//the handler
Tabs.prototype.handleEvent = function (e) {
    e = e || window.event;
    var target = e.target || e.srcElement;
    //console.log(target);
    var type = e.type;

    //reset the tab component
    $(this.Buttons).attr('aria-selected','false');
    $(this.Panels).attr('aria-hidden','true');

    //activate targets
    $(target).attr('aria-selected','true');
    var PanelActiveId = $(target).attr('aria-controls');
    this.PanelActive = $('#'+PanelActiveId);
    this.PanelActive.attr('aria-hidden','false');

    //focus panel
    var pureEl = document.getElementById(this.PanelActive[0].id);
    pureEl.focus();

};

//look for elements
var brash_tabs = document.getElementsByClassName('brash_tab');

//initialize elements
if (brash_tabs.length) {
    brash_tabs = initializeUI(brash_tabs, Tabs);
}
