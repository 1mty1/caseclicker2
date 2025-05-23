import { user as e } from "/script.js?v=2.17";
import t from "/data/upgrades.js?v=2.17";
import r from "/js/select.js?v=2.17";
import { game as a } from "/js/game.js?v=2.17";
import { addStat as s } from "/js/achievements.js?v=2.17";

const n = r("#pages").q(".page[page=upgrades]");
n.q("h1", { text: "Upgrades" });
n.q("p.subtitle", {
    text: "Buy upgrades to improve different aspects of the game!"
});
const u = n.q("#avail-upgrades");

function i() {
    u.innerHTML = "";

    // Add "Upgrade All to Max" button
    const maxAllBtn = q("button.button", {
        text: "Upgrade All to Max",
        onclick: () => {
            if (confirm("Spend money to max all upgrades you can afford?")) {
                upgradeAllToMax();
                i(); // Refresh upgrade UI
            }
        }
    });
    u.q(".upgrade-header", {
        c: [maxAllBtn]
    });

    Object.keys(t).forEach((r => {
        const a = t[r];
        const s = o(r);
        u.q(".upgrade", {
            c: [q("", {
                c: [
                    q(".upgrade-title", {
                        text: `${a.name} ${`${f(s)} ${s > 10 ? `(${s})` : ""}`}`
                    }),
                    q(".upgrade-desc", {
                        text: a.desc + "  —  " + (e.upgrades[r] && a.displayValue ?
                            a.displayValue
                                .replace(/%VALUEASMONEY/g, (e.upgrades[r] / 100).toFixed(2))
                                .replace(/%VALUE/g, e.upgrades[r]) :
                            "")
                    })
                ]
            }), q("button.button", {
                text: p(r, true) === "MAX/MIN"
                    ? "Max Level Reached"
                    : `Upgrade to level ${`${f(s + 1)} ${s + 1 > 10 ? `(${s + 1})` : ""}`} for ${(d(r) / 100).toFixed(2)} €`,
                onclick() {
                    c(r);
                    i(); // Refresh UI after upgrade
                },
                disabled: e.money < d(r) || !p(r)
            })]
        });
    }));
}

a.on("showPage", (e => e.page === "upgrades" && i()));

function p(r, a) {
    const s = t[r];
    if (s.max !== undefined && (e.upgrades[r] ?? s.default) >= s.max)
        return a ? "MAX/MIN" : false;
    if (s.min !== undefined && (e.upgrades[r] ?? s.default) <= s.min)
        return a ? "MAX/MIN" : false;
    if (!s.rule)
        return !a;
    if (s.rule === "<=")
        return (e.upgrades[r] ?? s.default) < (e.upgrades[s.than] ?? t[s.than].default)
}

function d(e, r) {
    const a = r || o(e) + 1;
    const s = t[e];
    return s.price * s.pricemultiplier ** (a - 1) + s.price * s.pricemultiplier * (a - 1);
}

function o(r) {
    const a = t[r];
    return ((e.upgrades[r] || a.default) - a.default) / (a.increase || -a.decrease);
}

function c(r) {
    const n = t[r];
    const u = d(r);
    if (e.money < u || !p(r))
        return false;
    e.upgrades[r] ??= n.default;
    e.upgrades[r] += n.increase || -n.decrease;
    e.xp += u / 40;
    s("earned_xp", u / 40);
    e.money -= u;
    s("purchased_upgrades");
    a.emit("update");
    return true;
}

function f(e) {
    if (isNaN(e)) return NaN;
    let t = String(+e).split(""),
        r = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM", "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC", "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
        a = "",
        s = 3;
    while (s--) a = (r[+t.pop() + s * 10] || "") + a;
    return Array(+t.join("") + 1).join("M") + a;
}

// New function to upgrade all upgrades to max
function upgradeAllToMax() {
    let upgraded = true;
    while (upgraded) {
        upgraded = false;
        for (const id of Object.keys(t)) {
            const cost = d(id);
            if (e.money >= cost && p(id)) {
                const success = c(id);
                if (success) {
                    upgraded = true;
                }
            }
        }
    }
}
