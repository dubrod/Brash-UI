//init objects
var TabSlider = function TabSlider(el) {
    this.element = el;
    return this.init();
};

//main function
TabSlider.prototype.init = function () {

    //slider Height
    this.sliderHeight = this.element.getAttribute("data-height");
    //console.log(this);
    this.element.style.height = this.sliderHeight;

    // Bind events to the handler
    var that = this;
    var handleEvent = function handleEvent() {
        that.handleEvent.call(that);
    };

    this.Buttons = this.element.querySelectorAll('[role=tab]');
    for (var b = 0, bb = this.Buttons.length; b < bb; b++) {
        this.Buttons[b].addEventListener('click', this, false);
    }

    this.Panels = this.element.querySelectorAll('[role=tabpanel]');
    for (var i = 0, ii = this.Panels.length; i < ii; i++) {
        var panelImg;
        panelImg = this.Panels[i].querySelectorAll('img');
        this.Panels[i].style.backgroundImage="url('"+panelImg[0].src+"')";
        this.Panels[i].style.height = this.sliderHeight;
        panelImg[0].parentNode.removeChild(panelImg[0]);
    }

};

//the handler
TabSlider.prototype.handleEvent = function (e) {
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
var brash_tabslider = document.getElementsByClassName('brash_tabslider');

//initialize elements
if (brash_tabslider.length) {
    brash_tabslider = initializeUI(brash_tabslider, TabSlider);
}
