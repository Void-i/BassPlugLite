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

function BassPlugLite(){
bpl = {
    autowoot: true,
    clicks: 0,
    version: 3.03,
    close: function(){ API.off(API.DJ_ADVANCE, bpl.djAdvance); API.off(API.CHAT, bpl.chat); $('#woot').unbind('click', bpl.doubleClick); },
    djAdvance: function() { if (bpl.autowoot) { setTimeout(function(){ $("#woot").click() }, 2000); }},
    chat: function(data) { if (data.message == '!whosrunning' && data.fromID == "50aeb07e96fba52c3ca04ca8") API.sendChat('@' + data.from + ' I am running BassPlugLite V. ' + bpl.version)},
    doubleClick: function() { bpl.clicks++; if (bpl.clicks == 2) { bpl.autowoot = !bpl.autowoot; bpl.clicks = 0; require("d2ba/aa39/fcab").trigger('notify', 'icon-woot', bpl.autowoot ? 'AutoWoot is now on' : 'AutoWoot is now off'); } setTimeout(function() { bpl.clicks = 0 }, 600)}
    }
    
    API.on(API.DJ_ADVANCE, bpl.djAdvance, this);
    API.on(API.CHAT, bpl.chat, this); 
    $("#woot").bind('click', bpl.doubleClick); 
        
    API.chatLog("Running BassPlugLite V. "+bpl.version);
    $('#woot').click();
}

if(typeof bpl !== "undefined") bpl.close();

BassPlugLite();
