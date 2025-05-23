import {getPlayerLevel as e, showPage as t, user as n} from "/script.js?v=2.17";
import c from "/data/achievements.js?v=2.17";
import i from "/js/select.js?v=2.17";
import {game as s} from "/js/game.js?v=2.17";
const a = i("#pages").q(".page[page=achievements]");
a.q("h1", {
    text: "Achievements"
});
a.q("button.button", {
    text: "Show Statistics",
    style: {
        marginLeft: "30px"
    },
    onclick() {
        t("stats")
    }
});
a.q("p", {
    text: "Unlocked:"
});
const o = a.q();
a.q("p", {
    text: "Locked:"
});
const m = a.q();
a.q("p", {
    text: "Collected:"
});
const l = a.q();
export function addStat(e, t) {
    n.stats[e] = n.stats[e] + (t || 1) || t || 1;
    h(e)
}
export function setStat(e, t) {
    n.stats[e] = t || 1;
    h(e)
}
function r(t) {
    if (t) {
        if (t.objectiveType === "calculatedUserStat") {
            if (t.objective === "level")
                return e().level
        } else if (n.stats[t.objective])
            return n.stats[t.objective]
    }
}
let d = 0;
function h() {
    if (d + 2e3 > (new Date).getTime())
        return;
    d = (new Date).getTime();
    for (const e in c) {
        if (n.achievements[e])
            continue;
        const t = c[e];
        t.requirements.forEach((t=>{
            if (r(t) >= t.amount)
                n.achievements[e] = true
        }
        ))
    }
    let e = Object.keys(n.achievements).length - Object.keys(n.achievements_collected).length;
    i("#achievements_not_collected").innerText = e > 0 ? e : ""
}
function v() {
    o.innerHTML = "";
    m.innerHTML = "";
    l.innerHTML = "";
    let e = Object.keys(n.achievements).length - Object.keys(n.achievements_collected).length;
    i("#achievements_not_collected").innerText = e > 0 ? e : "";
    for (const e in c) {
        const t = c[e];
        const i = q(".achievement");
        if (n.achievements[e])
            i.classList.add("completed");
        if (n.achievements_collected[e])
            l.appendChild(i);
        else if (n.achievements[e])
            o.appendChild(i);
        else
            m.appendChild(i);
        i.q(".achievement-title", {
            text: t.name
        });
        i.q("div.achievement-desc", {
            text: t.requirements.length === 1 && t.requirements[0].amount > 1 ? t.description + " (" + Math.min(r(t.requirements[0]) || 0, t.requirements[0].amount) + "/" + t.requirements[0].amount + ")" : t.description
        });
        i.q("button.button", {
            text: n.achievements_collected[e] ? "Collected!" : "Collect " + (t.rewards[0].amount / 100).toFixed(2) + "€",
            disabled: !n.achievements[e] || n.achievements_collected[e],
            onclick: ()=>{
                if (!n.achievements_collected[e]) {
                    t.rewards.forEach((e=>{
                        if (e.type === "money") {
                            n.money += e.amount;
                            n.xp += e.amount;
                            addStat("earned_cash", e.amount);
                            addStat("earned_xp", e.amount)
                        }
                    }
                    ));
                    n.achievements_collected[e] = true;
                    s.emit("update");
                    v()
                }
            }
        })
    }
}
s.on("showPage", (e=>e.page === "achievements" && v()));
