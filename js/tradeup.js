import t from "/js/select.js?v=2.17";
import {
    getItem as e,
    getItemContainer as n,
    giveItem as o,
    removeItemsFromInventory as r,
    renderItem as a,
    selectItems as i
} from "/js/items.js?v=2.17";
import {
    showPage as s
} from "/script.js?v=2.17";
import {
    createNotification as c
} from "/js/notifications.js?v=2.17";
import {
    addStat as u
} from "/js/achievements.js?v=2.17";
const l = t("#pages").q(".page[page=tradeup]");
l.q(".center").q("h1", {
    text: "Trade Up"
}).s("p.subtitle", {
    text: "Sign a trade up contract with 10 items of the same tier, and get a random item of the tier above."
});
const m = l.q(".tu-contract");

function f() {
    m.innerHTML = "";
    const t = m.q(".tu-contract-slots");
    for (let e = 0; e < 2; e++) t.q(".tu-contract-slot");
    t.q(".tu-contract-add-items-hero").q("button.button", "Select items to trade up", {
        onclick() {
            i(false, false, 2, 2, true, false).then((i => {
                t.innerHTML = "";
                for (let e = 0; e < 2; e++) t.q(".tu-contract-slot").appendChild(a(i[e]));
                s("tradeup", true);
                m.q().q("button.tu-contract-confirm-button", "Confirm!", {
                    onclick() {
                        const t = i[0].rarity + 1;
                        let a = 5;
                        let s = 0;
                        const l = i.map((t => {
                            a = Math.min(a, t.quality);
                            s = Math.max(s, t.quality);
                            return n(t.name)
                        })).flat();
                        const m = l[Math.floor(Math.random() * l.length)];
                        const p = e(m).content.items.filter((n => {
                            let o = e(n);
                            return o.rarity === t && o.quality >= a && o.quality <= s
                        }));
                        if (p.length === 0) {
                            c({
                                message: "There doesn't exist any skin you can receive with your input. Your items have been returned."
                            });
                            f();
                            return
                        }
                        let h = p[Math.floor(Math.random() * p.length)];
                        if (h) {
                            o(h, 1, true);
                            u("tradeups");
                            r(i.map((t => t.name)))
                        }
                        f()
                    }
                }).s("button.tu-contract-cancel-button", "Cancel!", {
                    onclick() {
                        f()
                    }
                })
            }))
        }
    })
}
f();

