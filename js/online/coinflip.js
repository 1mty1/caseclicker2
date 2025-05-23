import e from "/js/select.js?v=2.17";
import {goToPreviousPage as t, showPage as n, user as o} from "/script.js?v=2.17";
import {getItem as i, giveItem as c, removeItemsFromInventory as s, renderItem as r, selectItems as a} from "/js/items.js?v=2.17";
import {convl as l, convr as f} from "/js/itemsn.js?v=2.17";
import {getProfile as p} from "/js/online/profile.js?v=2.17";
import {game as m} from "/js/game.js?v=2.17";
import {createNotification as u} from "/js/notifications.js?v=2.17";
import {displayWinnings as g} from "/js/winnings.js?v=2.17";
import {formatNum as h} from "/js/format.js?v=2.17";
const d = e("#pages").q(".page[page=coinflip-online]");
const y = e("#pages").q(".page[page=coinflip-online-game]");
const b = e("#pages").q(".page[page=coinflip-online-select]");
m.on('showpage', function(e) {
    if (e.page === 'coinflip-online') {
        alert("Online games aren't supported. It possibly will be in the future.")
    }

})