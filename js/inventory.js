import {currentPage as e, showPage as t, user as n} from "/script.js?v=2.17";
import {getInventoryValue as o, getItem as i, renderItem as s, sellItems as r} from "/js/items.js?v=2.17";
import l from "/js/select.js?v=2.17";
import {game as a} from "/js/game.js?v=2.17";
import {formatNum as c} from "/js/format.js?v=2.17";
let d = false;
const u = l("#pages").q(".page[page=inventory]");
const p = u.q(".inventory-management-controls");
p.q("vertical-switch.compact-hide", {
    text: "Compact Mode",
    onchange() {
        setAlwaysCompact(this.state === "on");
        loadInv()
    },
    startState: alwaysCompact ? "on" : "off"
});
const v = p.q(".css-dropdown");
const h = v.q("button.button");
const m = v.q(".css-dropdown-contents");
const y = p.q(".css-dropdown");
const f = y.q("button.button#sell-dbtn", {
    text: "Sell..."
});
const g = y.q(".css-dropdown-contents");
g.q("button", {
    text: "Sell all under 10€",
    onclick() {
        let e = [];
        n.inventory.forEach((t=>{
            if (i(t).price < 1e3)
                e.push(t)
        }
        ));
        r(e)
    }
});
g.q("button", {
    text: "Sell all under 50€",
    onclick() {
        let e = [];
        n.inventory.forEach((t=>{
            if (i(t).price < 5e3)
                e.push(t)
        }
        ));
        r(e)
    }
});
g.q("button", {
    text: "Sell all under 250€",
    onclick() {
        let e = [];
        n.inventory.forEach((t=>{
            if (i(t).price < 25e3)
                e.push(t)
        }
        ));
        r(e)
    }
});
g.q("button", {
    text: "Sell all",
    onclick() {
        let e = [];
        n.inventory.forEach((t=>{
            if (i(t).price < 25e99999999999999999)
                e.push(t)
        }
        ));
        r(e)
    }
});
const b = document.body.q(".dialog.mso-dialog");
b.q(".dialog-header", "Sell Options");
const w = b.q(".mso-row");
const x = w.q("input.mso-radio[type=radio][name=mso-selection]");
w.q("p", "Sell everything under ");
let k = 1e3;
w.q("input.mso-inline-input[type=text]", {
    value: "10.00",
    onblur() {
        this.value = (k / 100).toFixed(2)
    },
    oninput() {
        k = Math.round(parseFloat(this.value) * 100);
        x.checked = true
    }
});
w.q("p", "€");
const I = b.q(".mso-row");
const A = I.q("input.mso-radio[type=radio][name=mso-selection]");
I.q("p", "Sell everything with ");
const M = I.q("select.mso-inline-select", {
    value: 0,
    oninput() {
        A.checked = true
    },
    children: [q("option", {
        value: 0,
        text: "Consumer (White)",
        style: {
            color: "#fff"
        }
    }), q("option", {
        value: 1,
        text: "Industrial (Light Blue)",
        style: {
            color: "#99f"
        }
    }), q("option", {
        value: 2,
        text: "Milspec (Blue)",
        style: {
            color: "#33f"
        }
    }), q("option", {
        value: 3,
        text: "Restricted (Purple)",
        style: {
            color: "#84f"
        }
    }), q("option", {
        value: 4,
        text: "Classified (Magenta)",
        style: {
            color: "#f5f"
        }
    }), q("option", {
        value: 5,
        text: "Covert (Red)",
        style: {
            color: "#f22"
        }
    }), q("option", {
        value: 6,
        text: "Exceedingly Rare (Yellow)",
        style: {
            color: "#fd0"
        }
    })]
});
I.q("p", " rarity");
const C = b.q(".mso-row");
const P = C.q("input.mso-radio[type=radio][name=mso-selection]");
C.q("p", "Sell everything cheaper or equal to the");
let R = 0;
C.q("input.mso-inline-input[type=text]", {
    value: "0",
    style: {
        width: "40px"
    },
    onblur() {
        this.value = R
    },
    oninput() {
        R = parseInt(this.value);
        S.innerText = (R === 1 ? "-st" : R === 2 ? "-nd" : "-th") + " item in your inventory (<= " + (i(n.inventory.sort(((e,t)=>i(t).price - i(e).price))[R - 1]).price / 100).toFixed(2) + "€)";
        P.checked = true
    }
});
let S = C.q("p", "-th item in your inventory");
const F = b.q(".mso-row");
const L = F.q("input.mso-radio[type=radio][name=mso-selection][id=mso-4][checked]");
F.q("label[for=mso-4]", "Sell everything");
const D = b.q(".mso-row");
const j = D.q("input.mso-radio[type=radio][name=mso-selection][id=mso-5][checked]");
D.q("label[for=mso-5]", "Sell keys and cases");
b.q("button.button", "Sell", {
    onclick() {
        if (x.checked) {
            r(n.inventory.filter((e=>i(e).price < k)))
        } else if (A.checked) {
            r(n.inventory.filter((e=>i(e).rarity === parseInt(M.value))))
        } else if (P.checked) {
            let e = i(n.inventory.sort(((e,t)=>i(t).price - i(e).price))[R - 1]).price;
            r(n.inventory.filter((t=>i(t).price <= e)))
        } else if (L.checked) {
            r(n.inventory)
        } else if (j.checked) {
            r(n.inventory.filter((e=>i(e).type === "key" || i(e).type === "case")))
        }
    }
});
b.q("button.dialog-close.button", "Close", {
    onclick() {
        b.classList.remove("dialog-open")
    }
});
window.addEventListener("mousedown", (e=>{
    let t = true;
    let n = e.target;
    while (t && n && n !== document)
        if (n === b)
            t = false;
        else
            n = n.parentNode;
    if (t)
        b.classList.remove("dialog-open")
}
));
a.on("showPage", (({page: e})=>e !== "inventory" && b.classList.remove("dialog-open")));
g.q("button", {
    text: "More Options...",
    onclick() {
        j.checked = true;
        b.classList.add("dialog-open")
    }
});
const E = p.q("button.button", {
    text: "< Prev"
});
const Z = p.q("input.num-input", {
    onclick() {
        Z.value = Y + 1;
        Z.select()
    }
});
const T = p.q("button.button", {
    text: "Next >"
});
const H = p.q("button.button", {
    text: "F",
    onclick() {
        d = !d;
        loadInv()
    }
});
let W = "";
const N = p.q("button.button", {
    html: '<img src="images/search.png">',
    onclick() {
        if (V.hidden) {
            V.hidden = false;
            z.style.display = "none";
            V.select();
            W = V.value.replace(/[^A-z0-9]/g, "");
            loadInv()
        } else {
            V.hidden = true;
            z.style.display = "flex";
            W = "";
            loadInv()
        }
    }
});
const V = p.q("input.input.imc-search-input", {
    html: '<img src="images/search.png">',
    oninput() {
        W = this.value.toLowerCase().replace(/[^a-z0-9]/g, "");
        loadInv()
    },
    hidden: true
});
const z = p.q(".imc-text", {
    text: "Inv Value: 0 €"
});
const B = u.q(".inventory-container");
let Y = 0;
let $ = "CasesFirst";
m.q("button", "Decreasing Price ↘", {
    onclick: ()=>($ = "PriceDescending") && loadInv()
}).s("button", "Increasing Price ↗", {
    onclick: ()=>($ = "PriceAscending") && loadInv()
}).s("button", "Decreasing Rarity ↘", {
    onclick: ()=>($ = "RarityDescending") && loadInv()
}).s("button", "Increasing Rarity ↗", {
    onclick: ()=>($ = "RarityAscending") && loadInv()
}).s("button", "Alphabetic A-Z", {
    onclick: ()=>($ = "A-Z") && loadInv()
}).s("button", "Alphabetic Z-A", {
    onclick: ()=>($ = "Z-A") && loadInv()
}).s("button", "Cases First", {
    onclick: ()=>($ = "CasesFirst") && loadInv()
});
let O = {
    PriceDescending: "Decreasing Price",
    PriceAscending: "Increasing Price",
    RarityDescending: "Decreasing Rarity",
    RarityAscending: "Increasing Rarity",
    "A-Z": "Alphabetic",
    "Z-A": "Alphabetic Reverse",
    CasesFirst: "Cases First"
};
export function loadInv() {
    n.favinv ??= [];
    f.disabled = d;
    H.innerHTML = d ? "Back" : '<img src="images/favorites.png">';
    let e = d ? n.favinv : n.inventory;
    e = e.filter((e=>e.toLowerCase().replace(/[^a-z0-9]/g, "").includes(W)));
    let t = alwaysCompact || window.innerHeight <= 850 || window.innerWidth <= 1150 ? Math.max(1, Math.floor((window.innerHeight - 55) / 192)) * Math.max(1, Math.floor(u.offsetWidth / 112)) : Math.max(1, Math.floor((window.innerHeight - 55) / 265)) * Math.max(1, Math.floor(u.offsetWidth / 177));
    if (Y < 0)
        Y = 0;
    if (Y > Math.ceil(e.length / t) - 1)
        Y = Math.ceil(e.length / t) - 1;
    if (document.activeElement !== Z)
        Z.value = Y + 1 + " / " + Math.ceil(e.length / t);
    T.disabled = Y === Math.ceil(e.length / t) - 1;
    E.disabled = Y === 0;
    h.innerText = "Sort: " + O[$];
    if ($ === "PriceDescending")
        e.sort(((e,t)=>i(t).price - i(e).price));
    else if ($ === "PriceAscending")
        e.sort(((e,t)=>i(e).price - i(t).price));
    else if ($.endsWith("Ascending"))
        e.sort(((e,t)=>i(e).price - i(t).price));
    else
        e.sort(((e,t)=>i(t).price - i(e).price));
    if ($ === "RarityDescending")
        e.sort(((e,t)=>i(t).rarity - i(e).rarity));
    else if ($ === "RarityAscending")
        e.sort(((e,t)=>i(e).rarity - i(t).rarity));
    else if ($ === "A-Z")
        e.sort(((e,t)=>{
            e = i(e).name;
            t = i(t).name;
            return e > t ? 1 : e < t ? -1 : 0
        }
        ));
    else if ($ === "Z-A")
        e.sort(((e,t)=>{
            e = i(e).name;
            t = i(t).name;
            return e > t ? -1 : e < t ? 1 : 0
        }
        ));
    else if ($ === "CasesFirst")
        e.sort(((e,t)=>i(e).type === "case" ? -1 : 0));
    B.innerHTML = "";
    if (e.length === 0)
        B.q(".inventory-note", d ? "You have no favorites" : "Your inventory is empty, go to the shop to buy cases.");
    for (let n = Math.max(Y * t, 0); n < Math.min((Y + 1) * t, e.length); n++)
        B.appendChild(s(i(e[n]), {
            sell: !d,
            owned: true,
            favorite: d
        }));
    let r = 0;
    if (d)
        z.innerText = `Inv Value: ${c(o(true), 2)} €\nFav-only Value: ${c(o(true, true), 2)} €`;
    else
        z.innerText = `Inv Value: ${c(o(true), 2)} €`
}
a.on("showPage", (e=>e.page === "inventory" && loadInv()));
E.onclick = ()=>{
    Y -= 1;
    loadInv()
}
;
T.onclick = ()=>{
    Y += 1;
    loadInv()
}
;
Z.oninput = ()=>{
    Y = parseInt(Z.value) - 1 || 0;
    loadInv()
}
;
Z.onblur = ()=>{
    loadInv()
}
;
a.emit("update");
window.addEventListener("keydown", (n=>{
    if (document.activeElement.tagName === "INPUT")
        return;
    if ((e !== "inventory" || d !== true) && n.key === "f") {
        d = true;
        t("inventory")
    }
    if ((e !== "inventory" || d !== false) && n.key === "i") {
        d = false;
        t("inventory")
    }
}
));
