//went with tab and key to change content and focus based on work
//by http://ianmcburnie.github.io/mindpatterns/tabs/
//and posts by webaim.org

function brashTab(el,e) {

    //if no ID we have to quit
    if(!el.id){return false;}

    //set object
    el = $('#'+el.id);

    if (e.keyCode==37 || e.keyCode==38) {
        var target = el.prev();
        target.focus();
        triggerTabPanel(target,false);
        return false;
    }

    if (e.keyCode==39 || e.keyCode==40) {
        var target = el.next();
        target.focus();
        triggerTabPanel(target,false);
        return false;
    }

    triggerTabPanel(el,true);

}

function triggerTabPanel(el,focus){

    //if no ID we have to quit
    if(!el[0].id){return false;}

    //set every blank
    $('[role=tab]').attr('aria-selected','false');
    $('[role=tabpanel]').attr('aria-hidden','true');

    //set active elements
    el.attr('aria-selected','true');
    var panel = el.attr('aria-controls');
    $('#'+panel).attr('aria-hidden','false');

    if(focus){
        setTimeout( function(){ $('#'+panel).focus(); },10);
    }
}

function brashTabPanel(el,e) {
    //if no ID we have to quit
    if(!el.id){return false;}

    if (e.keyCode==37 || e.keyCode==38) {
        $('button[aria-controls="'+el.id+'"]').focus();
    }
}


//Tab Panel Slider Edition
(function ($){

    $.fn.brashTabSlider = function(options){

        var settings = $.extend({
            height: "400"
        }, options );

        this.height(settings.height);

        //alter each panel
        var imgs = this.find('img');
        imgs.each(function(){
            var img = $(this);
            var tabpanel = img.parent().parent();
            tabpanel.height(settings.height);
            tabpanel.css("background-image", "url('"+img.attr("src")+"')");
        }).promise().done( function(){ setTimeout( function(){ imgs.remove(); },10); });
    };

}(jQuery));
