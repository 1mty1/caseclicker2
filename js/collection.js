import e from "/js/select.js?v=2.17";
import {items as t} from "/data/items.js?v=2.17";
import {game as o} from "/js/game.js?v=2.17";
import {formatNum as i} from "/js/format.js?v=2.17";
import {showPage as n, user as l} from "/script.js?v=2.17";
import {getItem as c, getItemContainer as s} from "/js/items.js?v=2.17";
const a = e("#pages").q(".page[page=collection]");
a.q("h1", {
    text: "Collection Book"
});
a.q("p.subtitle", {
    text: "This is your collection book. Here you can see all of the skins in the game you have had in your inventory at least once."
});
const r = a.q(".collection-page-controls");
r.q("vertical-switch", {
    text: "Overview",
    onchange() {
        d = this.state === "on";
        v(0, true)
    },
    startState: false
});
const m = r.q("input.input", {
    placeholder: "Search...",
    oninput() {
        g = this.value.trim().toLowerCase().replace(/[ |()-]/g, "");
        v(0, true)
    }
});
r.q("button.button", "< prev", {
    onclick() {
        v(f - 1, true)
    }
});
const u = r.q("input.num-input", {
    value: 1,
    oninput() {
        v(parseInt(this.value) - 1)
    },
    onfocus() {
        u.value = f + 1;
        this.select()
    },
    onblur() {
        v(f, true)
    }
});
r.q("button.button", "Next >", {
    onclick() {
        v(f + 1, true)
    }
});
const h = r.q("p", "Loading...");
const p = a.q(".collection-page-container");
let f = 0;
let g = "";
let d = false;
function v(e=f, o) {
    l.discoveredItems ??= [];
    p.innerHTML = "";
    let r = Object.values(t).filter((e=>e.masterItem && e.name.toLowerCase().replace(/[ |()-]/g, "").includes(g))).sort(((e,t)=>t.price - e.price));
    h.innerText = `You have discovered ${l.discoveredItems.filter((e=>e.toLowerCase().replace(/[ |()-]/g, "").includes(g) && c(e).type === "skin")).length}/${r.length} skins!`;
    let m = d ? Math.floor(a.offsetHeight / 150) * Math.floor(a.offsetWidth / 120) : Math.floor(a.offsetHeight / 328) * Math.floor(a.offsetWidth / 240);
    e = Math.round(e);
    if (e < 0)
        e = 0;
    if (m * e >= r.length)
        e = Math.ceil(r.length / m) - 1;
    f = e;
    if (o)
        u.value = f + 1 + " / " + Math.ceil(r.length / m);
    for (let e = m * f; e < Math.min(m * (f + 1), r.length); e++) {
        let t = r[e];
        let o = l.discoveredItems.includes(r[e].name);
        let c = !o && !d && s(t.name, true, 3);
        p.q(".collection-item" + (o ? ".collection-item-discovered" : "") + (d ? ".collection-item-compact" : ""), {
            onclick() {
                if (o)
                    n("inspect$" + t.name)
            }
        }).q(".collection-item-image", {
            style: {
                backgroundImage: "url(" + t.src + ")"
            }
        }).s(".collection-item-info", {
            children: [q(".citem-weapon", t.weapon), q(".citem-skin", o ? t.skin : d ? t.weapon + " | ????" : "????"), q(".citem-price", d ? "" : o ? i(t.price, 2) + "€" : !c ? "Unobtainable from cases" : "Found in " + c.splice(0, 2).join(c.length > 0 ? ", " : " and ") + (c.length > 0 ? " and others..." : ""))]
        })
    }
}
o.on("showPage", (e=>{
    if (e.page === "collection") {
        v();
        m.focus()
    }
}
));
