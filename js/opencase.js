import {
    getItem as e,
    giveItem as t,
    itemQualities as n,
    itemRarity as i,
    renderItem as o
} from "/js/items.js?v=2.17";
import {
    createNotification as a
} from "/js/notifications.js?v=2.17";
import {
    addStat as s
} from "/js/achievements.js?v=2.17";
import {
    game as r
} from "/js/game.js?v=2.17";
import {
    showPage as l,
    user as f
} from "/script.js?v=2.17";
import p from "/js/select.js?v=2.17";
import {
    displayWinnings as c
} from "/js/winnings.js?v=2.17";
const m = p("#pages").q(".page[page=opencase]").q(".opencase-wheels");
let d = [];
const h = {
    float5: .09,
    float4: .24,
    float3: .28,
    float2: .24,
    float1: .15
};



setInterval(() => {

}, 3000);


export function openCaseNavigateAway() {
    for (let t = 0; t < d.length; t++) {
        const n = e(d[t]);
        a({
            message: q("span").q("span", "You opened a ").s("span", {
                text: n.name,
                style: {
                    color: i[n.rarity].color
                }
            }).s("span", "!").parentNode,
            icon: "case_winnings"
        })
    }
    d = []
}

let u = 0;
export function openCase(n, i, a) {
    if (e(n).type !== "case") return;
    let p = [];
    m.innerHTML = "";
    m.classList.remove("opening-finished");
    for (let l = 0; l < i; l++) {
        if (!(f.inventory.includes(n) && (!e(n).keyName || f.inventory.includes(e(n).keyName)))) continue;
        s("opened_cases");
        let i = m.q(".opencase-wheel");
        let l = i.q(".opencase-wheel-scroller");
        let c;
        let h = e(n);
        let y = {};
        for (let t = 0; t < h.content.items.length; t++) {
            if (e(h.content.items[t]).stattrak) continue;
            let n = e(h.content.items[t]).rarity;
            if (!y[n]) y[n] = [];
            y[n].push(h.content.items[t])
        }
        let g = Object.keys(y).map((e => parseInt(e))).sort();
        let w = -1;
        f.inventory.splice(f.inventory.indexOf(n), 1);
        if (e(n).keyName) f.inventory.splice(f.inventory.indexOf(e(n).keyName), 1);
        if (a) {
            const e = v(y, g);
            t(e.name);
            let n = e.price / Math.max(Math.log(e.price / 10), 10) / 3;
            f.xp += n;
            s("earned_xp", n);
            s("opened_rarities_" + e.rarity);
            p.push(e);
            continue
        }
        for (let e = 0; e < 100; e++) {
            const n = v(y, g);
            let i = o(n, {
                clickable: e === 85
            });
            l.appendChild(i);
            if (e === 85) {
                w = i.offsetLeft;
                i.classList.add("case-item-won");
                c = n.name;
                d.push(c);
                t(n.name);
                let e = n.price / Math.max(Math.log(n.price / 10), 10) / 3;
                u += e;
                s("opened_rarities_" + n.rarity)
                console.groupCollapsed(` You opened: ${n.name}`);
                console.log(` Rarity: ${n.rarity} (${window.itemRarity?.[n.rarity]?.name || 'Unknown'})`);
                console.log(` Price: €${n.price.toFixed(2)}`);
                console.log(` Float: ${n.float || 'N/A'}`);
                console.log(` StatTrak: ${n.name.includes("StatTrak") ? 'Yes' : 'No'}`);
                console.log(` Souvenir: ${n.name.includes("Souvenir") ? 'Yes' : 'No'}`);
                console.groupEnd();
            }
        }
        let x = (alwaysCompact || window.innerHeight <= 650 ? 103 : 153) * Math.random();
        let M = () => {
            if (!l) {
                window.removeEventListener("resize", M);
                return
            }
            l.style.transform = "translateX(-" + (w - i.offsetWidth / 2 + x) + "px)"
        };
        setTimeout(M, 100);
        window.addEventListener("resize", M);
        setTimeout((() => {
            l.classList.add("opening-finished");
            l.style.transition = "0s";
            f.xp += u;
            s("earned_xp", u);
            u = 0;
            d.splice(d.indexOf(c), 1);
            r.emit("update", true)
        }), 1e4)
    }
    if (a) {
        c({
            title: "Items from " + i + " containers!",
            returnBtn: {
                text: "Go to inventory",
                page: "inventory"
            },
            items: p,
            sortBy: "value"
        });
        r.emit("update", true)
    } else if (m.innerHTML !== "") l("opencase", false, false, true);
    r.once("showPage", (() => {
        f.xp += u;
        s("earned_xp", u);
        u = 0
    }))
}

// Global override for rarity chance
window.Rarity = undefined;


function v(t, i) {
    let o;
   // Use custom rarity roll if defined
let a = typeof window.Rarity === "number" ? window.Rarity : Math.random();

if (a < .8) o = Math.floor(Math.random() * 3);
else if (a < .96) o = 3;
else if (a < .98) o = 4;
else if (a < .994) o = 5;
else o = 6;

    while (!i.includes(o)) {
        if (o < i[0]) {
            o = i[0];
            break
        }
        o -= 1
    }
    let s = t[o][Math.floor(Math.random() * t[o].length)];
    let r = e(e(s).short);
    let l = false;
    if (Math.random() < .1 && r.stattrakAvailable) l = true;
    let f = false;
    if (Math.random() < .02 && r.souvenirAvailable) f = true;
    if (r.skin === "Vanilla") return e((l ? "StatTrak " : "") + r.short + " (Vanilla)");
    let p;
    a = Math.random();
    if (a < h.float5) p = 5;
    else if (a < h.float5 + h.float4) p = 4;
    else if (a < h.float5 + h.float4 + h.float3) p = 3;
    else if (a < h.float5 + h.float4 + h.float3 + h.float2) p = 2;
    else p = 1;
    let c = -1;
    while (!r.qualities.includes(p) && p <= 5) {
        if (p === 0) c = 1;
        p += c
    }
    if (p > 5 || p < 1) alert("Something went wrong, please report this on the discord! " + "QOFR:" + p + "&" + c + "I:" + r.name);
    let m = (l ? "StatTrak " : "") + (f ? "Souvenir " : "") + r.short + " (" + n[p] + ")";
    let d = e(m);
    if (d.isUnknown && l) {
        console.log("Couldn't find " + m + ", trying non-stattrak version.");
        d = e((f ? "Souvenir " : "") + r.short + " (" + n[p] + ")")
    }
    return d
}

// Developer Rarity Tool UI
const RarityGui = document.createElement("div");
Object.assign(RarityGui.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    background: "#222",
    color: "white",
    padding: "15px",
    fontFamily: "monospace",
    zIndex: 9999,
    borderRadius: "10px",
    display: "none",
    maxWidth: "300px",
    boxShadow: "0 0 10px rgba(0,0,0,0.5)"
});
RarityGui.innerHTML = `
  <h3 style="margin-top:0;">Rarity Override</h3>
  <label>Value (0-1): <input id="rarityInput" type="number" min="0" max="1" step="0.01" style="width: 60px;"></label>
  <div style="margin-top: 10px;">
    <button id="rarityApplyBtn" style="margin-right: 5px;">Apply</button>
    <button id="rarityResetBtn">Reset</button>
  </div>
`;
document.body.appendChild(RarityGui);

// Developer Rarity Tool Logic
const rarityInput = document.getElementById("rarityInput");
const applyBtn = document.getElementById("rarityApplyBtn");
const resetBtn = document.getElementById("rarityResetBtn");

// Sync input with current Rarity value
function syncRarityInput() {
    rarityInput.value = typeof window.Rarity === "number" ? window.Rarity : "";
}

applyBtn.onclick = () => {
    const val = parseFloat(rarityInput.value);
    if (!isNaN(val) && val >= 0 && val <= 1) {
        window.Rarity = val;
        console.log(`%c[DevTool]Current rarity override: ${window.Rarity}`, "color: lime");
    } else {
        alert("Please enter a valid number between 0 and 1.");
    }
};
 

resetBtn.onclick = () => {
    window.Rarity = undefined;
    rarityInput.value = "";
    console.log("%c[DevTool]Current rarity override: undefined (normal randomness)", "color: lime");
};

// Toggle with 4
document.addEventListener("keydown", (e) => {
    if (e.key === "4") {
        const isVisible = RarityGui.style.display === "block";
        RarityGui.style.display = isVisible ? "none" : "block";
        syncRarityInput();
        console.log(`%cRarity UI ${isVisible ? "disabled" : "enabled"}.`, "color: #0ff");
    }
});