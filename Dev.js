var bplAutowoot = false;
var bplAutojoin = false;
var version     = 1.13;
 
API.chatLog("Running BassPlugLite V. "+version);
 
function initAPIListeners(){
    //Events that happen when the DJ advances
    API.on(API.DJ_ADVANCE, function(data){
        if(bplAutowoot){setTimeout(function(){
            //clicks the button because there is no other way to do it anymore
            $("#button-vote-positive").click();
        }, 2000);
        }
        if(bplAutojoin && $("#button-waitlist-leave").is(':visible') === false){
            API.djJoin()
        }
    });
 
    API.on(API.CHAT, function(data){
        if(data.message.indexOf("!disable") > -1 && API.getUser(data.fromID).permission > 1 && data.type === "mention") {
            if(bplAutojoin){
                jQuery("#BPL-Autojoin").click();
                API.sendChat("@"+data.from+" - BPʟ Autojoin disabled!");
                API.chatLog("Woops!, looks like autojoining may not be allowed in this room!", true);
                API.djLeave()
            }else{
                API.sendChat("@"+data.from+" - BPʟ Autojoin was not enabled!")
            }
        }
        if(data.message == "!whosrunning" && (data.fromID == "50aeb07e96fba52c3ca04ca8" || "518a0d73877b92399575657b")){
            API.sendChat("@"+data.from+" I am running BassPlugLite V. "+version);
        }
    });
}
 
function menuUI(){
//Add the buttons to the front of the booth
    $('#BPL-Menu').remove();
    $('#dj-console').prepend('<div id="BPL-Menu"></div>');
    $('#BPL-Menu').append(
        '<p id="BPL-Autowoot">Autowoot</p>' +
            '<p id="BPL-Autojoin">Autojoin</p>' +
            '</div>'
    );
}
 
function initUIListeners(){
    jQuery("#BPL-Autowoot").on("click", function() {
        bplAutowoot = !bplAutowoot;
        jQuery(this).css("border-color", bplAutowoot ? "rgba(0, 255, 41, 0.35)" : "rgb(87, 0, 0)");
        $("#button-vote-positive").click();
    });
    jQuery("#BPL-Autojoin").on("click", function() {
        bplAutojoin = !bplAutojoin;
        jQuery(this).css("border-color", bplAutojoin ? "rgba(0, 255, 41, 0.35)" : "rgb(87, 0, 0)");
        if(bplAutojoin)API.djJoin();
    });
    jQuery("#BPL-Autowoot") .hover(function(event){
            jQuery(this).css("border-style", "ridge");
        },
        function(event){
            jQuery(this).css("border-style", "solid");
        });
    jQuery("#BPL-Autojoin") .hover(function(event){
            jQuery(this).css("border-style", "ridge");
        },
        function(event){
            jQuery("#BPL-Autojoin").css("border-style", "solid");
        });
 
    //BassPlugLite CSS
    $('body').prepend('<style type="text/css" id="BPL-css">'
        + '#BPL-Menu {position: absolute; top: 73%;}'
        + '#BPL-Autojoin {cursor: pointer; position: absolute; color:#3B3B3B; font-variant: small-caps; left: 258px; font-size: 12px; cursor: pointer; padding: 2px 2px 2px 2px;  border-style: solid; border-width: 1px; border-radius: 2px; border-color: rgb(87, 0, 0); margin-bottom: 1px; margin-top: 3px;}'
        + '#BPL-Autowoot {cursor: pointer; position: absolute; color:#3B3B3B; font-variant: small-caps; left: 4px; font-size: 12px; cursor: pointer; padding: 2px 2px 2px 2px;  border-style: solid; border-width: 1px; border-radius: 2px; border-color: rgb(87, 0, 0); margin-bottom: 1px; margin-top: 3px;}');
 
}
 
$('#BPL-css').remove();
$('#basspluglite-js').remove();
 
initAPIListeners();
menuUI();
initUIListeners();
