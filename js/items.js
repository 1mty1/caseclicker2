    import {goToPreviousPage as e, numToString as t, showPage as n, user as i} from "/script.js?v=2.17";
import {items as r} from "/data/items.js?v=2.17";
import {addStat as o, setStat as s} from "/js/achievements.js?v=2.17";
import l from "/js/select.js?v=2.17";
import {game as c} from "/js/game.js?v=2.17";
import {displayWinnings as a} from "/js/winnings.js?v=2.17";
export const itemRarity = {
    0: {
        color: "#fff",
        name: "consumer",
        display: "Consumer"
    },
    1: {
        color: "#99f",
        name: "industrial",
        display: "Industrial"
    },
    2: {
        color: "#33f",
        name: "milspec",
        display: "Milspec"
    },
    3: {
        color: "#84f",
        name: "restricted",
        display: "Restricted"
    },
    4: {
        color: "#f5f",
        name: "classified",
        display: "Classified"
    },
    5: {
        color: "#f22",
        name: "covert",
        display: "Covert"
    },
    6: {
        color: "#fd0",
        name: "exceedinglyrare",
        display: "Exceedingly Rare"
    },
    7: {
        color: "#fc7",
        name: "contraband",
        display: "Contraband"
    }
};
const m = {
    consumer: 0,
    industrial: 1,
    milspec: 2,
    restricted: 3,
    classified: 4,
    covert: 5,
    exceedinglyrare: 6,
    contraband: 7
};
export const itemQualities = {
    1: "Battle-Scarred",
    2: "Well-Worn",
    3: "Field-Tested",
    4: "Minimal Wear",
    5: "Factory New"
};
export const itemQualitiesShort = {
    1: "BS",
    2: "WW",
    3: "FT",
    4: "MW",
    5: "FN"
};
export function getItem(e) {
    if (typeof e === "object")
        return e;
    else if (r[e])
        return r[e];
    else
        return {
            quality: "Unknown",
            short: "Unknown Item",
            skin: "Unknown Item",
            weapon: "Unknown Item",
            name: "Unknown Item",
            src: "/images/missing.png",
            type: "skin",
            rarity: 0,
            price: 1,
            isUnknown: true
        }
}
export function renderItem(e, t) {
    let r = q(".item-container");
    let o = r.q(".item", {
        style: {
            borderColor: itemRarity[e.rarity].color
        }
    });
    if (!t || t.clickable !== false) {
        o.onclick = t && t.onclick ? ()=>t.onclick(e) : ()=>{
            if (t && t.owned)
                n("inspect$" + e.name + "&owned");
            else
                n("inspect$" + e.name)
        }
    }
    let s = o.q(".item-image", {
        style: {
            backgroundImage: `url("${e.src}")`
        }
    });
    if (e.quality)
        s.q(".item-quality", itemQualitiesShort[e.quality]);
    if (e.stattrak)
        o.q(".item-stattrak");
    if (e.souvenir) {
        s.style.boxShadow = "1px 0 16px #fc04 inset";
        o.q(".item-souvenir", "Souvenir")
    }
    if (t && t.pricing)
        o.q(".item-price", (e.price / 100).toFixed(2) + "€");
    const l = o.q(".item-text");
    l.q(".item-type", e.type === "skin" ? e.weapon : e.type[0].toUpperCase() + e.type.substring(1));
    l.q(".item-name", e.type === "skin" ? e.skin : e.short || e.name);
    if (t && t.sell)
        r.q("button.button.item-sell", "Sell for " + (e.price / 100).toFixed(2) + "€", {
            onclick: ()=>sellItems(e.name)
        });
    if (t && t.buy) {
        let n = 1 - (t.buyDiscountPercentage ?? 0);
        r.q("button.button.item-buy", {
            text: t.buyAmount > 1 ? "Buy " + t.buyAmount + "x for " + (Math.floor(e.price * n) / 100 * t.buyAmount).toFixed(2) + "€" : "Buy for " + (e.price / 100 * n).toFixed(2) + "€",
            onclick: ()=>!t.buyDisabled && buyItems(e, true, t.buyAmount, Math.floor(e.price * n)),
            disabled: i.money < Math.floor(e.price * n) * (t.buyAmount || 1)
        })
    }
    if (t && t.owned)
        r.q(".item-set-fav", {
            onclick: ()=>O(e.name),
            tip: "Add to favorites",
            tipPosition: "center"
        });
    if (t && t.owned && t.favorite)
        r.q(".item-set-fav.fav", {
            onclick: ()=>Y(e.name),
            tip: "Remove from favorites",
            tipPosition: "center"
        });
    const c = o.q(".item-3d-shine-effect");
    r.onmouseleave = ()=>{
        o.classList.add("transform-ended");
        o.style.transform = "rotateY(0deg) rotateX(0deg) scale(1)";
        c.style.opacity = 0
    }
    ;
    r.addEventListener("mousemove", (e=>{
        if (graphicsLevel > 1) {
            const t = o.getBoundingClientRect();
            if ((e.y - t.y) / t.height <= 1) {
                o.classList.remove("transform-ended");
                let n = (e.x - t.x) / t.width - .5;
                let i = (e.y - t.y) / t.height - .5;
                o.style.transform = "rotateY(" + n * 20 + "deg) rotateX(" + -i * 20 + "deg) scale(1.05)";
                c.style.opacity = 1;
                c.style.top = Math.min(0, -i * 100 - 50) + "%";
                c.style.left = -n * 100 - 50 + "%"
            } else {
                o.classList.add("transform-ended");
                o.style.transform = "rotateY(0deg) rotateX(0deg) scale(1)";
                c.style.opacity = 0
            }
        }
    }
    ));
    return r
}
export function buyItems(e, t, n=1, r) {
    if (t && i.money < r * n)
        return false;
    for (let t = 0; t < n; t++)
        if (i.money >= r) {
            i.money -= r;
            giveItem(e.name)
        } else
            break;
    c.emit("update");
    return true
}
export function sellItems(e) {
    if (!Array.isArray(e))
        e = [e];
    else
        e = [...e];
    function t(n) {
        for (let t = n * 1e3; t < Math.min((n + 1) * 1e3, e.length); t++) {
            let n = e[t];
            let r = getItem(n);
            i.money += r.price || 0;
            i.inventory.splice(i.inventory.indexOf(n), 1);
            if (r.type === "skin") {
                o("skin_sold");
                o("earnings_from_skin_sales", r.price);
                o("earned_cash", r.price);
                if (r.price > 1e3)
                    o("skin_sold_gt10");
                if (r.price > 5e3)
                    o("skin_sold_gt50");
                if (r.price > 25e3)
                    o("skin_sold_gt250");
                o("skin_sold_r" + r.rarity)
            }
        }
        if (n * 1e3 < e.length) {
            setTimeout((()=>{
                if (l("#sell-dbtn"))
                    l("#sell-dbtn").innerText = "Please wait while selling: " + (n * 1e3 / e.length * 100).toFixed(0) + "%";
                t(n + 1)
            }
            ), 100)
        } else {
            c.emit("update");
            if (l("#sell-dbtn"))
                l("#sell-dbtn").innerText = "Sell..."
        }
    }
    t(0)
}
const f = l("#pages").q(".page[page=selectItems]");
f.q("button.button.back-btn", {
    text: "Back",
    onclick() {
        e()
    }
});
const u = f.q(".center");
u.q("h1.select-items-header", {
    text: "Select Items"
});
const p = u.q("p.select-items-info", {
    text: ""
});
const d = u.q(".select-items-controls");
const g = d.q(".select-items-controls-left");
const y = g.q(".css-dropdown");
const h = y.q("button.button", {
    text: "Filter"
});
const v = y.q(".css-dropdown-contents");
const I = g.q("button.button", {
    text: "Prev"
});
const b = g.q("input.num-input", {
    onclick() {
        this.select()
    }
});
const x = g.q("button.button", {
    text: "Next"
});
const k = d.q(".select-items-controls-right");
const M = k.q("button.button", {
    text: "Clear"
});
const w = k.q("button.button", {
    text: "Prev"
});
const T = k.q("input.num-input", {
    onclick() {
        this.select()
    }
});
const F = k.q("button.button", {
    text: "Next"
});
const A = k.q("button.button", {
    text: "All In"
});
const S = k.q("button.button", {
    text: "Auto Bet"
});
const C = f.q(".flex");
const _ = C.q("#select-owned-items.compact");
const j = C.q("#select-selected-items.compact");
const L = f.q(".center").q();
L.q("button.button", {
    text: "Cancel",
    onclick() {
        e()
    }
});
const R = L.q("button.button", {
    text: "Confirm"
});
export function selectItems(e=0, r=false, o=1e3, s=1, c=false, a=true, f=false) {
    return new Promise((u=>{
        if (e)
            p.innerText = r ? "Make a bet between " + (e / 100).toFixed(2) + " € – " + (r / 100).toFixed(2) + " €" : "Make a bet over " + (e / 100).toFixed(2) + " €";
        else
            p.innerText = c ? "Select items to trade up. They should be the same tier. For now you can mix stattrak/non-stattrak skins." : "Select items" + (a ? " for your bet." : f ? " to convert to chips." : ".");
        let d = 0;
        let g = 0;
        let y = "auto";
        v.innerHTML = "";
        v.q("button", {
            text: "All",
            onclick() {
                y = "none";
                W()
            }
        });
        v.q("button", {
            text: "Auto",
            onclick() {
                y = "auto";
                W()
            }
        });
        for (let e = 0; e < 7; e++) {
            v.q("button", {
                text: "Only " + itemRarity[e].display,
                style: {
                    color: itemRarity[e].color
                },
                onclick() {
                    y = "tier:" + itemRarity[e].name;
                    W()
                }
            })
        }
        x.onclick = ()=>{
            d++;
            W()
        }
        ;
        I.onclick = ()=>{
            d--;
            W()
        }
        ;
        b.oninput = ()=>{
            d = b.value - 1 || 0;
            W()
        }
        ;
        b.onfocus = ()=>{
            b.value = d + 1
        }
        ;
        b.onblur = ()=>{
            W()
        }
        ;
        M.onclick = ()=>{
            k = [];
            q = 0;
            C = 0;
            L = Array.from(i.inventory).filter((e=>{
                if (getItem(e).type === "skin") {
                    q += getItem(e).price;
                    return true
                } else
                    return false
            }
            ));
            W()
        }
        ;
        A.onclick = ()=>{
            q = 0;
            C = 0;
            L = [];
            k = Array.from(i.inventory).filter((e=>{
                if (getItem(e).type === "skin") {
                    C += getItem(e).price;
                    return true
                } else
                    return false
            }
            ));
            W()
        }
        ;
        A.style.display = f || a ? "initial" : "none";
        F.onclick = ()=>{
            g++;
            W()
        }
        ;
        w.onclick = ()=>{
            g--;
            W()
        }
        ;
        T.oninput = ()=>{
            g = T.value - 1 || 0;
            W()
        }
        ;
        T.onfocus = ()=>{
            T.value = g + 1
        }
        ;
        T.onblur = ()=>{
            W()
        }
        ;
        S.onclick = ()=>{
            q = 0;
            C = 0;
            L = [];
            k = [];
            Array.from(i.inventory).sort(((e,t)=>getItem(t).price - getItem(e).price)).forEach((e=>{
                if (getItem(e).type === "skin" && (!r || C + getItem(e).price < r) && k.length < o) {
                    k.push(e);
                    C += getItem(e).price
                } else {
                    L.push(e);
                    q += getItem(e).price
                }
            }
            ));
            W()
        }
        ;
        S.style.display = a ? "initial" : "none";
        let k = [];
        let q = 0;
        let C = 0;
        let L = Array.from(i.inventory).filter((e=>{
            let t = getItem(e);
            if (t.type === "skin") {
                q += t.price;
                return true
            } else
                return false
        }
        )).sort(((e,t)=>{
            let n = getItem(e).name;
            let i = getItem(t).name;
            if (n < i)
                return 1;
            if (n > i)
                return -1;
            return 0
        }
        )).sort(((e,t)=>getItem(t).price - getItem(e).price));
        function W() {
            let n = [...L.filter((e=>getItem(e).type === "skin"))];
            h.innerText = y === "none" ? "Filter: All" : y;
            if (y.startsWith("tier:")) {
                let e = y.substring(5);
                h.innerText = "Filter: " + itemRarity[m[e]].display;
                n = n.filter((t=>getItem(t).rarity === m[e]))
            } else if (y === "auto") {
                h.innerText = "Filter: Auto";
                if (k[0]) {
                    if (c) {
                        let e = getItem(k[0]).rarity;
                        n = n.filter((t=>getItem(t).rarity === e))
                    }
                }
                if (r)
                    n = n.filter((e=>getItem(e).price + C < r));
                if (c) {
                    n = n.filter((e=>getItem(e).rarity !== 5 && getItem(e).rarity !== 6 && getItem(e).rarity !== 7 && getItem(e).rarity !== 8))
                }
            }
            if (L.length - n.length > 0)
                h.q("span.btn-small-text", "Hid " + (L.length - n.length) + " item" + (L.length - n.length === 1 ? "" : "s"));
            h.classList.toggle("button-active", y !== "none" && y !== "auto" || L.length - n.length > 0);
            let l = Math.floor(_.offsetWidth / 118) * Math.floor(_.offsetHeight / 146);
            if (d < 0)
                d = 0;
            if (d > Math.ceil(n.length / l) - 1)
                d = Math.ceil(n.length / l) - 1;
            if (g < 0)
                g = 0;
            if (g > Math.ceil(k.length / l) - 1)
                g = Math.ceil(k.length / l) - 1;
            let u = false;
            if (c) {
                let e = false;
                k.forEach((t=>{
                    if (u)
                        return;
                    if (e === false)
                        e = getItem(t).rarity;
                    if (e !== getItem(t).rarity)
                        u = "NST";
                    if (getItem(t).rarity > 4)
                        u = "NUT"
                }
                ))
            }
            R.disabled = k.length === 0 || C < e || r && C > r || k.length > o || k.length < s || u;
            if (k.length === 0)
                R.innerText = "Select at least one item";
            else if (u === "NST")
                R.innerText = "All selected items must be of the same tier";
            else if (u === "NUT")
                R.innerText = "Some selected items cannot be used";
            else if (k.length > o)
                R.innerText = "You cannot " + (a ? "bet" : "select") + " over " + o + " items";
            else if (k.length < s)
                R.innerText = "You have to " + (a ? "bet" : "select") + " atleast " + s + " items";
            else if (C < e)
                R.innerText = "You must " + (a ? "bet" : "select") + " a minimum of " + (e / 100).toFixed(2) + "€";
            else if (r && C > r)
                R.innerText = "You must " + (a ? "bet" : "select") + " a maximum of " + (r / 100).toFixed(2) + "€";
            else
                R.innerText = "Confirm Selection";
            if (document.activeElement !== b)
                b.value = d + 1 + " / " + Math.ceil(n.length / l);
            x.disabled = d === Math.ceil(i.inventory.length / l) - 1;
            I.disabled = d === 0;
            if (document.activeElement !== T)
                T.value = g + 1 + " / " + Math.ceil(k.length / l);
            F.disabled = g === Math.ceil(i.inventory.length / l) - 1;
            w.disabled = g === 0;
            _.innerHTML = `<div class="select-cat">Your Items (${t(q / 100, 2)}€)</div>`;
            j.innerHTML = `<div class="select-cat">Selected Items (${t(C / 100, 2)}€${f ? " - " + t(Math.round(C / 100 * 8)) + " Chips" : ""})</div>`;
            n.sort(((e,t)=>{
                if (getItem(e).price < getItem(t).price)
                    return 1;
                if (getItem(e).price > getItem(t).price)
                    return -1;
                return 0
            }
            ));
            k.sort(((e,t)=>{
                if (getItem(e).price < getItem(t).price)
                    return 1;
                if (getItem(e).price > getItem(t).price)
                    return -1;
                return 0
            }
            ));
            for (let e = Math.max(0, d * l); e < Math.min((d + 1) * l, n.length); e++) {
                _.appendChild(renderItem(getItem(n[e]), {
                    pricing: true,
                    onclick: ()=>{
                        let t = n[e];
                        k.push(t);
                        q -= getItem(t).price;
                        C += getItem(t).price;
                        L.splice(L.indexOf(t), 1);
                        W()
                    }
                }))
            }
            for (let e = Math.max(0, g * l); e < Math.min((g + 1) * l, k.length); e++) {
                j.appendChild(renderItem(getItem(k[e]), {
                    pricing: true,
                    onclick: ()=>{
                        L.push(k[e]);
                        q += getItem(k[e]).price;
                        C -= getItem(k[e]).price;
                        k.splice(e, 1);
                        W()
                    }
                }))
            }
        }
        function O() {
            let n = false;
            if (c) {
                let e = false;
                k.forEach((t=>{
                    if (e === false)
                        e = getItem(t).rarity;
                    if (e !== getItem(t).rarity)
                        n = true
                }
                ))
            }
            if (k.length >= s && k.length <= o && C >= e && (!r || C <= r) && !n) {
                l("[page=selectItems]")[0].classList.remove("show");
                _.innerHTML = `<div class="select-cat">Your Items (${t(q / 100, 2)}€)</div>`;
                j.innerHTML = `<div class="select-cat">Selected Items (${t(C / 100, 2)}€)</div>`;
                u(k.map((e=>getItem(e))))
            }
        }
        R.disabled = true;
        R.onclick = O;
        W();
        n("selectItems", true)
    }
    ))
}
export function getItemsValue(e) {
    let t = 0;
    e.forEach((e=>t += getItem(e).price || 0));
    return t
}
export function getItemsWorth(e) {
    let t = [];
    let n = Object.values(r).filter((t=>t.type === "skin" && !t.masterItem && t.price < e * 1.05 && (e < 1e3 || t.price > 500)));
    while (e > 10) {
        let i = n[Math.floor(Math.random() * n.length)];
        if (i.weight && i.weight < Math.random())
            continue;
        t.push(i);
        e -= t[t.length - 1].price;
        o("total_winnings", t[t.length - 1].price)
    }
    return t
}
export function giveItemsWorth(e) {
    n("winnings");
    const t = getItemsWorth(e);
    t.forEach((e=>giveItem(e.name)));
    a({
        title: "Winnings",
        returnBtn: {
            text: "Go to inventory",
            page: "inventory"
        },
        items: t,
        sortBy: "value"
    })
}
export function removeItemsFromInventory(e) {
    for (let t = 0; t < e.length; t++) {
        let n = i.inventory.indexOf(e[t]);
        if (n === -1)
            i.money -= getItem(e[t]).price;
        else
            i.inventory.splice(i.inventory.indexOf(e[t]), 1)
    }
}
export function giveItem(e, t=1, r=false) {

    for (let n = 0; n < t; n++)
        i.inventory.push(e);
    let o = getItem(e).short || e;
    i.discoveredItems ??= [];
    if (!i.discoveredItems.includes(o))
        i.discoveredItems.push(o);
    s("items_discovered", i.discoveredItems.length);
    s("skins_discovered", i.discoveredItems.filter((e=>getItem(e).type === "skin")).length);
    if (r) {
        const i = document.body.q(".popup-container", {
            onclick(e) {
                if (e.target === i)
                    l()
            }
        });
        const r = i.q(".popup-content");
        r.q("button.popup-exit-button", {
            onclick() {
                l()
            }
        });
        r.q("h1", {
            text: t > 1 ? "You got " + t + ":" : "You got!"
        });
        const o = renderItem(getItem(e), {
            owned: true
        });
        o.addEventListener("click", l);
        r.appendChild(o);
        r.q("button.button", {
            text: "Open Inventory",
            onclick() {
                n("inventory");
                l()
            }
        });
        function l() {
            i.classList.add("popup-closed");
            setTimeout((()=>{
                document.body.removeChild(i)
            }
            ), 250)
        }
    }
}
let W = {};
export function getItemContainer(e, t, n) {
    if (t) {
        if (W[e + "-" + n])
            return W[e + "-" + n] ? [...W[e + "-" + n]] : false;
        const t = getItem(e).short;
        const i = [];
        const o = Object.values(r).filter((e=>e.type === "case"));
        for (let e = 0; e < o.length; e++) {
            if (o[e].content.items.map((e=>r[e].short)).includes(t))
                if (i.push(o[e].name) >= n)
                    break
        }
        W[e + "-" + n] = i.length === 0 ? false : i;
        return W[e + "-" + n] ? [...W[e + "-" + n]] : false
    }
    const i = Object.keys(r).filter((t=>r[t].type === "case" && r[t].content.items.includes(e)));
    return i.length === 0 ? false : i
}
export function getInventoryValue(e=false, t=false) {
    i.favinv ??= [];
    let n = 0;
    let r = t ? i.favinv : [...i.inventory, ...i.favinv];
    for (let t = 0; t < r.length; t++) {
        let i = getItem(r[t]);
        if (e || i.type !== "case")
            n += i.price
    }
    return n
}
function O(e) {
    i.favinv ??= [];
    i.favinv.push(e);
    removeItemsFromInventory([e]);
    c.emit("update")
}
function Y(e) {
    i.favinv ??= [];
    giveItem(e);
    i.favinv.splice(i.favinv.indexOf(e), 1);
    c.emit("update")
}
export function getRandomRarity(e) {
    const t = Object.values(r).filter((t=>t.rarity === e && !t.masterItem));
    return t[Math.floor(Math.random() * t.length)].name
}
