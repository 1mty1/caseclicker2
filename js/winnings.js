import n from "/js/select.js?v=2.17";
import {
    goToPreviousPage as t,
    showPage as e
} from "/script.js?v=2.17";
import {
    game as i
} from "/js/game.js?v=2.17";
import {
    renderItem as o
} from "/js/items.js?v=2.17";
const r = n("#pages").q(".page[page=winnings]");
const a = r.q("button.button.back-btn", {
    text: "Go to inventory",
    onclick() {
        e("inventory")
    }
});
const l = r.q(".center.title").q("h1", {
    text: "Winnings"
});
const s = r.q(".winnings-controls");
const c = r.q(".winnings-list");
export function displayWinnings({
    title: n,
    returnBtn: t,
    items: i,
    sortBy: r
}) {
    l.innerText = n || "Winnings";
    a.onclick = () => e(t.page || "inventory");
    a.innerText = t.text || "Go to inventory";
    s.innerHTML = "";
    let u = 50;
    let g = 0;
    s.q("button.button", {
        text: "Prev",
        onclick() {
            h(--g);
            p.value = g + 1 + "/" + Math.floor((i.length - 1) / u + 1)
        }
    });
    let p = s.q("input.num-input", {
        value: 1,
        onfocus() {
            p.value = g + 1
        },
        oninput() {
            let n = Math.max(0, Math.min(Math.floor((i.length - 1) / u) || 0, parseInt(this.value) - 1));
            g = n;
            f(u * n, u * (n + 1) - 1)
        },
        onblur() {
            h(parseInt(this.value) - 1);
            p.value = g + 1 + "/" + Math.floor((i.length - 1) / u + 1)
        }
    });
    s.q("button.button", {
        text: "Next",
        onclick() {
            h(++g);
            p.value = g + 1 + "/" + Math.floor((i.length - 1) / u + 1)
        }
    });
    p.value = g + 1 + "/" + Math.floor((i.length - 1) / u + 1);

    function h(n) {
        n = Math.max(0, Math.min(Math.floor((i.length - 1) / u), n));
        g = n;
        f(u * n, u * (n + 1) - 1)
    }
    i.sort(((n, t) => t.price - n.price));

    function f(n, t) {
        c.innerHTML = "";
        for (let e = n; e <= Math.min(i.length - 1, t); e++) {
            let n = o(i[e], {
                clickable: true
            });
            c.appendChild(n)
        }
    }
    f(0, 99);
    e("winnings")
}

function u() {
    l.innerHTML = "Winnings";
    a.onclick = () => t();
    a.innerText = "Go back";
    s.innerHTML = "";
    c.innerHTML = "Sorry, to keep up performance, you can't see winnings again!"
}
i.on("showPage", (n => {
    if (n.page !== "winnings" && n.page !== "inspect" && n.page !== "about") u()
}));