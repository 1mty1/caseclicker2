import {addStat as t} from "/js/achievements.js?v=2.17";
import {game as o} from "/js/game.js?v=2.17";
import {goToPreviousPage as e, user as n} from "/script.js?v=2.17";
import {removeItemsFromInventory as i, selectItems as s} from "/js/items.js?v=2.17";
import r from "/js/select.js?v=2.17";
export function openWithdrawPrompt() {
    let e = prompt("How many chips do you want to withdraw?", n.tokens.toFixed(0));
    if (e > n.tokens)
        e = n.tokens;
    if (e < 0)
        e = 0;
    n.money += e / 8 * 100;
    t("earned_cash", e / 8 * 100);
    n.tokens -= e;
    n.tokens = Math.round(n.tokens);
    o.emit("update")
}
export async function tradeIn() {
    const r = await s(0, false, Infinity, 1, false, false, true);
    let a = 0;
    r.forEach((t=>a += t.price));
    t("skins_tradein", a);
    n.tokens = Math.round(n.tokens + a / 100 * 8);
    i(r.map((t=>t.name)));
    o.emit("update");
    e()
}
r("#casino-option-trade-in").onclick = ()=>{
    tradeIn()
}
;
r("#casino-option-withdraw").onclick = ()=>{
    openWithdrawPrompt()
}
;
