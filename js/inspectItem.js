import {
    user as t,
    goToPreviousPage as e,
    getPlayerLevel as n
} from "/script.js?v=2.17";
import {
    getItem as i,
    itemQualities as s,
    itemQualitiesShort as o,
    itemRarity as r,
    renderItem as a,
    getItemContainer as l,
    giveItem as c
} from "/js/items.js?v=2.17";
import d from "/js/select.js?v=2.17";
import {
    game as m
} from "/js/game.js?v=2.17";
import {
    openCase as y
} from "/js/opencase.js?v=2.17";
const p = 15;
const q = d("#pages").q(".page[page=inspect]");
const x = q.q(".inspect-top");
x.q("button.button.back-btn", {
    text: "Back",
    onclick() {
        e()
    }
});
const u = x.q(".inspect-title");
const k = q.q(".center").q(".inspect-image");
const b = q.q(".inspect-case");
const h = b.q(".inspect-case-wheel");
const f = b.q(".inspect-case-options");
const g = f.q("button.button", {
    text: "Open",
    onclick() {
        y(I, 1)
    }
});
const N = f.q("button.button", {
    text: "+",
    onclick() {
        v.classList.add("show")
    }
});
const v = f.q(".dropdown");
v.q(".dropdown-text", {
    text: "Open"
});
const w = v.q(".flex");
const L = w.q("button.button", {
    text: "2",
    onclick() {
        y(I, 2)
    }
});
const j = w.q("button.button", {
    text: "3",
    onclick() {
        y(I, 3)
    }
});
const T = w.q("button.button", {
    text: "4",
    onclick() {
        y(I, 4)
    }
});
const F = w.q("button.button", {
    text: "5",
    onclick() {
        y(I, 5)
    }
});
v.q(".dropdown-text", {
    text: "Cases"
});
const M = f.q("button.button", {
    onclick() {
        let e = i(I).keyName;
        if (t.money >= i(e).price) {
            t.money -= i(e).price;
            c(e)
        }
        m.emit("update")
    }
});
const O = f.q("button.button", {
    onclick() {
        let e = i(I).keyName;
        if (t.money >= i(e).price * 5) {
            t.money -= i(e).price * 5;
            c(e, 5)
        }
        m.emit("update")
    }
});
f.q("div", {
    style: {
        width: "20px"
    }
});
const H = f.q("button.button", {
    text: "Open all cases instant",
    disabled: true,
    onclick() {}
});
const S = b.q(".inspect-case-content");
const C = q.q(".center").q(".inspect-item-stats");
let I = 0;

function R(e) {
    let o = e.endsWith("&owned");
    I = o ? e.substring(0, e.length - 6) : e;
    let d = i(I);
    u.innerText = d.name;
    u.style.color = r[d.rarity].color;
    k.style.backgroundImage = "url(" + d.src + ")";
    S.innerHTML = "";
    C.innerHTML = "";
    if (d.type === "case") {
        b.classList.add("show");
        k.classList.add("mini");
        let e = 0;
        let s = 0;
        for (let n = 0; n < t.inventory.length; n++)
            if (t.inventory[n] === d.keyName) e++;
        for (let e = 0; e < t.inventory.length; e++)
            if (t.inventory[e] === d.name) s++;
        let r = d.keyName ? Math.min(e, s) : s;
        if (o) {
            h.style.display = null;
            f.style.display = null
        } else {
            h.style.display = "none";
            f.style.display = "none"
        }
        g.disabled = r < 1;
        N.disabled = r < 2;
        L.disabled = r < 2;
        j.disabled = r < 3;
        T.disabled = r < 4;
        F.disabled = r < 5;
        if (d.keyName) {
            M.innerHTML = "Buy key for " + (i(d.keyName).price / 100).toFixed(2) + "€";
            M.disabled = t.money < i(d.keyName).price;
            O.innerHTML = "5x for " + (i(d.keyName).price / 100 * 5).toFixed(2) + "€";
            O.disabled = t.money < i(d.keyName).price * 5
        }
        M.classList.toggle("hide", !d.keyName);
        O.classList.toggle("hide", !d.keyName);
        let l = -1;
        let m = Math.min(s, 1e5);
        if (n().level < 10) H.innerText = "Open cases instant (Reach level 10 to unlock!)";
        else if (d.keyName && e < m) {
            l = i(d.keyName).price * (m - e) + m * p;
            H.innerText = "Open " + m + " case" + (m !== 1 ? "s" : "") + " instant for " + (i(d.keyName).price / 100 * (m - e) + m * p / 100).toFixed(2) + "€ (will buy " + (m - e) + " keys + " + (m * p / 100).toFixed(2) + "€ service fee)"
        } else {
            l = m * p;
            H.innerText = "Open " + m + " case" + (m !== 1 ? "s" : "") + " instant for " + (m * p / 100).toFixed(2) + "€"
        }
        H.disabled = n().level < 10 || t.money < l;
        H.onclick = () => {
            if (n().level >= 10 && t.money >= l) {
                t.money -= l;
                if (d.keyName) {
                    let t = i(I).keyName;
                    c(t, m - e)
                }
                y(I, m, true)
            }
        };
        let q = [];
        let x = d.content.items.sort(((t, e) => {
            if (i(t).rarity > i(e).rarity) return -1;
            if (i(t).rarity < i(e).rarity) return 1;
            if (i(t).short > i(e).short) return -1;
            if (i(t).short < i(e).short) return 1;
            return 0
        }));
        let u = false;
        for (let t = 0; t < x.length; t++) {
            const e = i(x[t]);
            if (q[e.short]) continue;
            q[e.short] = true;
            if (e.rarity === 6) {
                if (!u) S.q(".item-container").q(".item", {
                    style: {
                        borderColor: "#fd0"
                    }
                }).q(".item-image", {
                    style: {
                        backgroundImage: "url(/images/special-item.png)"
                    }
                }).s(".item-text", "Special Item");
                u = true
            } else S.appendChild(a(i(e.short)))
        }
    } else {
        b.classList.remove("show");
        k.classList.remove("mini");
        if (d.masterItem) {
            C.q("tr").q("th", {
                text: "Skin Name"
            }).s("td", {
                text: d.skin
            });
            C.q("tr").q("th", {
                text: "Skin Weapon"
            }).s("td", {
                text: d.weapon
            });
            C.q("tr").q("th", {
                text: "Highest Value"
            }).s("td", {
                text: (d.price / 100).toFixed(2) + " €"
            });
            C.q("tr").q("th", {
                text: "Lowest Value"
            }).s("td", {
                text: (d.minPrice / 100).toFixed(2) + " €"
            });
            C.q("tr").q("th", {
                text: "Rarity"
            }).s("td", {
                text: r[d.rarity].display,
                style: {
                    color: r[d.rarity].color
                }
            })
        } else {
            let t = l(d.name);
            C.q("tr").q("th", {
                text: "Skin Name"
            }).s("td", {
                text: d.skin
            });
            C.q("tr").q("th", {
                text: "Skin Weapon"
            }).s("td", {
                text: d.weapon
            });
            C.q("tr").q("th", {
                text: "Container" + (t.length !== 1 ? "s" : "")
            }).s("td", {
                text: t ? t.join(", ") : "Not available in cases"
            });
            C.q("tr").q("th", {
                text: "Value"
            }).s("td", {
                text: (d.price / 100).toFixed(2) + " €"
            });
            C.q("tr").q("th", {
                text: "Rarity"
            }).s("td", {
                text: r[d.rarity].display,
                style: {
                    color: r[d.rarity].color
                }
            });
            C.q("tr").q("th", {
                text: "Quality"
            }).s("td", {
                text: s[d.quality]
            })
        }
    }
    u.innerText = d.name
}
m.on("showPage", (t => t.page === "inspect" && R(t.data)));