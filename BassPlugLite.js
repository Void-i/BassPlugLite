/*
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * TERMS OF REPRODUCTION USE
 *
 * 1. Provide a link back to the original repository (this repository), as
 *         in, https://github.com/derpthebass/BassPlugLite, that is well-visible
 *      wherever the source is being reproduced.  For example, should you
 * 		display it on a website, you should provide a link above/below that
 *		which the users use, titled something such as "ORIGINAL AUTHOR".
 *
 * 2. Retain these three comments:  the GNU GPL license statement, this comment,
 * 		and that below it, that details the author and purpose.
 *
 * Failure to follow these terms will result in me getting very angry at you
 * and having your software tweaked or removed if possible.  Either way, you're
 * still an idiot for not following such a basic rule, so at least I'll have
 * that going for me.
 *
 * Original Author -
 * @derpthebass (Caleb)
 */

var bplAutowoot = false;
var bplAutojoin = false;
var version     = 2.00;

function BassPlugLite(){
window.BPLite = true;
    
    var bplMenu = $('<div>');
    var autoWootButton = $('<div>');
    var autoJoinButton = $('<div>');
    var line = $('<div>');
    bplMenu.attr('id', 'bplMenu');
    autoWootButton.attr('id', 'autoWoot').attr('class', 'bplButton').html('<div class=\'indicator\'></div>AutoWoot');
    autoJoinButton.attr('id', 'autoJoin').attr('class', 'bplButton').html('<div class=\'indicator\'></div>AutoJoin');
    line.attr('class', 'dotted-line').attr('id', 'settings-line');
    
    bplMenu.append(autoWootButton, autoJoinButton);
    $('#user-container').append(bplMenu)
    
//Core Functions
    API.on(API.DJ_ADVANCE, function(data){

        if(bplAutowoot){setTimeout(function(){
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
                jQuery("#autoJoin").click();
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

//CSS/jQuery
    $("#autoWoot").on("click", function() {
        bplAutowoot = !bplAutowoot;
        $($(this).children()[0]).css("box-shadow", bplAutowoot ? "0 0 8px green" : "0 0 8px red").css("background", bplAutowoot ? "green" : "red");
        $("#button-vote-positive").click();
    });
    $("#autoJoin").on("click", function() {
        bplAutojoin = !bplAutojoin;
        $($(this).children()[0]).css("box-shadow", bplAutojoin ? "0 0 8px green" : "0 0 8px red").css("background", bplAutojoin ? "green" : "red");
        if(bplAutojoin)API.djJoin();
    });

    $("#autoWoot") .hover(function(event){
            $(this).css("box-shadow", "0 0 10px #FFF");
        },
        function(event){
            $(this).css("box-shadow", "");
        });
    $("#autoJoin") .hover(function(event){
            $(this).css("box-shadow", "0 0 10px #FFF");
        },
        function(event){
            $(this).css("box-shadow", "");
        });
        
    var css = $('<link>');
    css.attr("rel", "stylesheet").attr("type", "text/css").attr("href", "https://dl.dropboxusercontent.com/s/8ltpejewcxo62z0/bassPlugLite.css").attr("id", "BPLCSS");
    $('head').append(css)
        
API.chatLog("Running BassPlugLite V. "+version);
}

if(typeof BPLite == "undefined" && API.enabled) BassPlugLite();
