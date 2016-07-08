
function brashTab(el,e) {

    //if no ID we have to quit
    if(!el.id){return false;}

    //set object
    el = $('#'+el.id);

    if (e.keyCode==37 || e.keyCode==38) {
        el.prev().focus();
        return false;
    }

    if (e.keyCode==39 || e.keyCode==40) {
        el.next().focus();
        return false;
    }

    //check if selected
    if(el.attr('aria-selected') == "true"){

        var panel = el.attr('aria-controls');
        $('#'+panel).addClass('active').focus();

    } else{

        //set every blank
        $('[role=tab]').attr('aria-selected','false');
        $('[role=tabpanel]').removeClass('active');

        //set active elements
        el.attr('aria-selected','true');
        var panel = el.attr('aria-controls');
        $('#'+panel).addClass('active').focus();

    }
}

function brashTabPanel(el,e) {
    //if no ID we have to quit
    if(!el.id){return false;}

    if (e.keyCode==37 || e.keyCode==38) {
        $('button[aria-controls="'+el.id+'"]').focus();
    }
}
