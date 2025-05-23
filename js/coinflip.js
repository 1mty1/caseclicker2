import {showPage as t} from "/script.js?v=2.17";
import {pageBGNotification as i} from "/js/notifications.js?v=2.17";
import {giveItemsWorth as o, removeItemsFromInventory as s, selectItems as e} from "/js/items.js?v=2.17";
import {addStat as l} from "/js/achievements.js?v=2.17";
import n from "/js/select.js?v=2.17";
document.getElementById("action-play-coinflip").onclick = ()=>{
    _()
}
;

const c = n("#pages").q(".page[page=coinflip]");
const a = c.q("#coinflip-status");
const f = c.q("#coinflip-ct");
const p = c.q("#coinflip-t");
const r = c.q(".coinflip-perspective").q("#coinflip-coin");
r.q(".coinflip-face-ct");
r.q(".coinflip-face-t");
async function _() {
    let n = await e(250);
    let c = 0;
    n.forEach((t=>c += t.price));
    a.innerText = "Choose.";
    r.style.transition = "0s";
    r.style.transform = `rotateY(0deg)`;
    r.classList.add("hide");
    f.classList.remove("hide");
    p.classList.remove("hide");
    t("coinflip", true);
    function _(t) {
        let e = 1 === t; 
        l("total_bets", 1);
        l("total_coinflips", 1);
        if (e) {
            if (c > 1e4)
                l("total_coinflips_won_bet100", 1);
            if (c > 1e5)
                l("total_coinflips_won_bet1000", 1);
            if (c > 1e6)
                l("total_coinflips_won_bet10000", 1);
            l("total_bets_won", 1);
            l("total_coinflips_won", 1)
        } else {
            if (c > 1e4)
                l("total_coinflips_lost_bet100", 1);
            if (c > 1e5)
                l("total_coinflips_lost_bet1000", 1);
            if (c > 1e6)
                l("total_coinflips_lost_bet10000", 1);
            l("total_bets_lost", 1);
            l("total_coinflips_lost", 1);
            s(n.map((t=>{
                l("total_coinflips_losses", t.price);
                return t.name
            }
            )))
        }
        f.classList.add("hide");
        p.classList.add("hide");
        r.classList.remove("hide");
        a.classList.add("hide");
        setTimeout((()=>{
            r.style.transition = "4s";
            r.style.transform = `rotateY(${180 * Math.ceil(8 + (e ? t : t + 1))}deg)`;
            setTimeout((()=>{
                a.innerText = e ? "You Won!" : "You lost!";
                if (e)
                    i({
                        message: "You won the coinflip, your winnings will show up shortly!",
                        icon: "coinflip_ct"
                    }, "coinflip");
                else
                    i({
                        message: "You lost the coinflip!",
                        icon: "coinflip_ct"
                    }, "coinflip");
                a.classList.remove("hide");
                setTimeout((()=>{
                    if (e)
                        o(c)
                }
                ), 1500)
            }
            ), 4200)
        }
        ), 100)
    }
    f.onclick = ()=>_(0);
    p.onclick = ()=>_(1)
}
