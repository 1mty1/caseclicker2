import e from "/js/select.js?v=2.17";
const l = [{
    $daily: true,
    category: "Daily Discounts"
}, {
    item: "The Bank Collection",
    category: "Collections",
    level: 2
}, {
    item: "The Aztec Collection",
    category: "Collections",
    level: 3
}, {
    item: "The Train Collection",
    category: "Collections",
    level: 4
}, {
    item: "The Mirage Collection",
    category: "Collections",
    level: 5
}, {
    item: "The Inferno Collection",
    category: "Collections",
    level: 6
}, {
    item: "The 2021 Dust 2 Collection",
    category: "Collections",
    level: 7
}, {
    item: "The Havoc Collection",
    category: "Collections",
    level: 8
}, {
    item: "The Vertigo Collection",
    category: "Collections",
    level: 9
}, {
    item: "The 2021 Vertigo Collection",
    category: "Collections",
    level: 10
}, {
    item: "The Rising Sun Collection",
    category: "Collections",
    level: 11
}, {
    item: "The Nuke Collection",
    category: "Collections",
    level: 12
}, {
    item: "The 2021 Train Collection",
    category: "Collections",
    level: 13
}, {
    item: "The Overpass Collection",
    category: "Collections",
    level: 14
}, {
    item: "The Office Collection",
    category: "Collections",
    level: 15
}, {
    item: "The 2018 Inferno Collection",
    category: "Collections",
    level: 16
}, {
    item: "The St. Marc Collection",
    category: "Collections",
    level: 17
}, {
    item: "The Militia Collection",
    category: "Collections",
    level: 18
}, {
    item: "The 2018 Nuke Collection",
    category: "Collections",
    level: 19
}, {
    item: "The Norse Collection",
    category: "Collections",
    level: 20
}, {
    item: "The Dust Collection",
    category: "Collections",
    level: 21
}, {
    item: "The Dust 2 Collection",
    category: "Collections",
    level: 22
}, {
    item: "The Gods and Monsters Collection",
    category: "Collections",
    level: 23
}, {
    item: "The Assault Collection",
    category: "Collections",
    level: 24
}, {
    item: "The Cache Collection",
    category: "Collections",
    level: 25
}, {
    item: "The Cobblestone Collection",
    category: "Collections",
    level: 26
}, {
    item: "The Alpha Collection",
    category: "Collections",
    level: 26
}, {
    item: "The Chop Shop Collection",
    category: "Collections",
    level: 27
}, {
    item: "The 2021 Mirage Collection",
    category: "Collections",
    level: 28
}, {
    item: "The Ancient Collection",
    category: "Collections",
    level: 29
}, {
    item: "The Baggage Collection",
    category: "Collections",
    level: 30
}, {
    item: "The Control Collection",
    category: "Collections",
    level: 31
}, {
    item: "The Canals Collection",
    category: "Collections",
    level: 32
}, {
    item: "The Lake Collection",
    category: "Collections",
    level: 33
}, {
    item: "The Safehouse Collection",
    category: "Collections",
    level: 34
}, {
    item: "The Italy Collection",
    category: "Collections",
    level: 35
}, {
    item: "CS:GO Weapon Case",
    category: "All Cases",
    level: 1
}, {
    item: "Operation Bravo Case",
    category: "All Cases",
    level: 2
}, {
    item: "CS:GO Weapon Case 2",
    category: "All Cases",
    level: 3
}, {
    item: "Winter Offensive Weapon Case",
    category: "All Cases",
    level: 4
}, {
    item: "CS:GO Weapon Case 3",
    category: "All Cases",
    level: 5
}, {
    item: "eSports 2013 Case",
    category: "All Cases",
    level: 5
}, {
    item: "Operation Phoenix Weapon Case",
    category: "All Cases",
    level: 6
}, {
    item: "Huntsman Weapon Case",
    category: "All Cases",
    level: 7
}, {
    item: "Operation Breakout Weapon Case",
    category: "All Cases",
    level: 8
}, {
    item: "Operation Vanguard Weapon Case",
    category: "All Cases",
    level: 9
}, {
    item: "Chroma Case",
    category: "All Cases",
    level: 10
}, {
    item: "eSports 2013 Winter Case",
    category: "All Cases",
    level: 10
}, {
    item: "Chroma 2 Case",
    category: "All Cases",
    level: 11
}, {
    item: "Falchion Case",
    category: "All Cases",
    level: 12
}, {
    item: "Shadow Case",
    category: "All Cases",
    level: 13
}, {
    item: "Revolver Case",
    category: "All Cases",
    level: 14
}, {
    item: "Operation Wildfire Case",
    category: "All Cases",
    level: 15
}, {
    item: "eSports 2014 Summer Case",
    category: "All Cases",
    level: 15
}, {
    item: "Chroma 3 Case",
    category: "All Cases",
    level: 16
}, {
    item: "Gamma Case",
    category: "All Cases",
    level: 17
}, {
    item: "Gamma 2 Case",
    category: "All Cases",
    level: 18
}, {
    item: "Glove Case",
    category: "All Cases",
    level: 19
}, {
    item: "Spectrum Case",
    category: "All Cases",
    level: 20
}, {
    item: "Dreams & Nightmares Case",
    category: "All Cases",
    level: 20
}, {
    item: "Operation Hydra Case",
    category: "All Cases",
    level: 21
}, {
    item: "Spectrum 2 Case",
    category: "All Cases",
    level: 22
}, {
    item: "Clutch Case",
    category: "All Cases",
    level: 23
}, {
    item: "Horizon Case",
    category: "All Cases",
    level: 24
}, {
    item: "Danger Zone Case",
    category: "All Cases",
    level: 25
}, {
    item: "Prisma Case",
    category: "All Cases",
    level: 26
}, {
    item: "CS20 Case",
    category: "All Cases",
    level: 27
}, {
    item: "Shattered Web Case",
    category: "All Cases",
    level: 28
}, {
    item: "Prisma 2 Case",
    category: "All Cases",
    level: 29
}, {
    item: "Fracture Case",
    category: "All Cases",
    level: 30
}, {
    item: "Operation Broken Fang Case",
    category: "All Cases",
    level: 31
}, {
    item: "Snakebite Case",
    category: "All Cases",
    level: 32
}, {
    item: "Operation Riptide Case",
    category: "All Cases",
    level: 33
}];
const t = ["CS:GO Weapon Case", "Operation Bravo Case", "CS:GO Weapon Case 2", "Winter Offensive Weapon Case", "CS:GO Weapon Case 3", "eSports 2013 Case", "Operation Phoenix Weapon Case", "Huntsman Weapon Case", "Operation Breakout Weapon Case", "Operation Vanguard Weapon Case", "Chroma Case", "eSports 2013 Winter Case", "Chroma 2 Case", "Falchion Case", "Shadow Case", "Revolver Case", "Operation Wildfire Case", "eSports 2014 Summer Case", "Chroma 3 Case", "Gamma Case", "Gamma 2 Case", "Glove Case", "Spectrum Case", "Dreams & Nightmares Case", "Operation Hydra Case", "Spectrum 2 Case", "Clutch Case", "Horizon Case", "Danger Zone Case", "Prisma Case", "CS20 Case", "Shattered Web Case", "Prisma 2 Case", "Fracture Case", "Operation Broken Fang Case", "Snakebite Case", "Operation Riptide Case"];
import {
    getItem as o,
    renderItem as a
} from "/js/items.js?v=2.17";
import {
    game as s
} from "/js/game.js?v=2.17";
import {
    getPlayerLevel as i
} from "/script.js?v=2.17";
const c = e("#pages").q(".page[page=shop]");
c.q("#shop-title", "Shop");
c.q("#shop-controls", {
    c: [q(".button-left-label", {
        text: "Buy Multiple:"
    }), q(".combo-button", {
        text: "x1",
        onclick() {
            p(1)
        }
    }), q(".combo-button", {
        text: "x5",
        onclick() {
            p(5)
        }
    }), q(".combo-button", {
        text: "x25",
        onclick() {
            p(25)
        }
    }), q(".combo-button", {
        text: "x250",
        onclick() {
            p(250)
        }
    }), q(".combo-button", {
        text: "x2500",
        onclick() {
            p(2500)
        }
    })]
});
const r = c.q("#shop-container");
if (!localStorage.shop) localStorage.shop = JSON.stringify({
    dailyItems: [],
    day: 0
});
let n = JSON.parse(localStorage.shop);

function C() {
    return t.splice(Math.floor(Math.random() * t.length), 1)[0]
}

function m() {
    const e = Math.floor((new Date).getTime() / 1e3 / 60 / 60 / 24);
    if (n.day < e) {
        n = {
            dailyItems: new Array(8).fill().map((() => C())),
            day: e
        };
        localStorage.shop = JSON.stringify(n);
        p()
    }
}

function g() {
    let e = 1 - (new Date).getTime() / 1e3 / 60 / 60 / 24 % 1;
    return Math.floor(e * 24) + ":" + Math.floor(e * 24 * 60 % 60).toString().padStart(2, "0") + "." + Math.floor(e * 24 * 60 * 60 % 60).toString().padStart(2, "0")
}
let y = q("span.category-title-time");
setInterval((() => {
    y.innerText = "Resets in " + g();
    m()
}), 1e3);
let v = 1;

function p(e) {
    v = e || v;
    let t = {};
    r.innerHTML = "";
    for (let e = 0; e < l.length; e++) {
        if (!t[l[e].category]) {
            t[l[e].category] = r.q(".category").q(".category-title", l[e].$daily ? {
                c: [q("span", {
                    text: l[e].category
                }), q("span.shop-discount", "-40%"), y]
            } : {
                c: [q("span", {
                    text: l[e].category
                })]
            }).s(".category-items")
        }
        if (l[e].$daily) n.dailyItems.forEach((s => t[l[e].category].appendChild(a(o(s), {
            buy: true,
            buyAmount: v
        }))));
        else {
            let s = a(o(l[e].item), {
                buy: true,
                buyDisabled: l[e].level && i().level < l[e].level,
                buyAmount: v,
                buyDiscountPercentage: l[e].category === "All Cases" ? -.4 : 0
            });
            if (l[e].level && i().level < l[e].level) {
                s.classList.add("locked");
                s.q(".item-locked", {
                    html: `<span class="item-locked-title">Locked!</span><span class="item-locked-description">Reach level ${l[e].level} to unlock this item!</span>`
                })
            }
            t[l[e].category].appendChild(s)
        }
    }
}
s.on("showPage", (e => e.page === "shop" && p()));