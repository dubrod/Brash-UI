//went with no arrow focusing to keep it cleaner
//also, other specs have gone without arrow focusing
//https://lists.w3.org/Archives/Public/public-aria/2016Jul/0143.html

function brashAccordion(el){
    el = $(el);
    el.toggleClass('active');
    var thisStatus = el.hasClass('active');
    if(thisStatus){
        el.attr('aria-selected', "true");
        el.attr('aria-expanded', "true");
    } else {
        el.attr('aria-selected', "false");
        el.attr('aria-expanded', "false");
    }

    var descStatus = el.next('dd').attr('aria-hidden');
    if(descStatus == "true"){
        el.next('dd').attr('aria-hidden', "false");
    } else {
        el.next('dd').attr('aria-hidden', "true");
    }

}
