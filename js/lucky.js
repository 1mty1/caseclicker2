import {
    numToString as e,
    user as t
} from "/script.js?v=2.17";
import i from "/js/select.js?v=2.17";
import {
    game as s
} from "/js/game.js?v=2.17";
import {
    getItem as n,
    giveItem as l
} from "/js/items.js?v=2.17";
import {
    addStat as o
} from "/js/achievements.js?v=2.17";
import a from "/data/lucky.js?v=2.17";
const r = {
    money: "€",
    xp: "XP"
};

function f() {
    const e = Math.floor((new Date).getTime() / 1e3 / 60 / 60 / 24).toString(36);
    if (localStorage.day !== e) {
        t.tickets += 1;
        s.emit("update");
        localStorage.day = Math.floor((new Date).getTime() / 1e3 / 60 / 60 / 24).toString(36)
    }
}
f();
setInterval(f, 6e4);
s.on("update", (() => {
    i("#lucky-wheel-nav").classList.toggle("show", t.tickets > 0)
}));
const c = i("#pages").q(".page[page=spin]").q(".center");
c.q("h1", {
    text: "Lucky Wheel"
});
const h = c.q("p");
const p = c.q("", {
    css: {
        display: "flex",
        justifyContent: "center"
    }
});
const m = p.q(".center");
const y = m.q("canvas");
y.width = 600;
y.height = 600;
const d = y.getContext("2d");
let u = 0;
let x = 0;
let g = -1;
let w = 0;
let v = false;
let T = {};

function k() {
    d.save();
    d.clearRect(0, 0, y.width, y.height);
    d.translate(y.width / 2, y.height / 2);
    x /= 1.01;
    if (x < .007) {
        x = 0;
        if (v) {
            v = false;
            S()
        }
    } else {
        v = true;
        u = x
    }
    let t = a.prizes.length;
    for (let i = 0; i < t; i++) {
        let s = a.prizes[i];
        if (i === 0) d.rotate(-(Math.PI * 2 * u - Math.PI * 2 / t * (w - 1)));
        else d.rotate(-(Math.PI * 2 / t));
        d.beginPath();
        d.moveTo(0, 0);
        d.arc(0, 0, y.width / 2.5, 0, Math.PI * 2 / t);
        d.closePath();
        d.fillStyle = !v && g === i ? "#888" : s.color;
        d.fill();
        d.fillStyle = "#000";
        if (!v && g === i) {
            d.save();
            d.clip();
            d.lineWidth = 4;
            d.strokeStyle = "#fff";
            d.stroke();
            d.restore()
        }
        d.save();
        let l = y.width / 2.5;
        let o = l * Math.sin(Math.PI / t);
        d.translate(l, o);
        d.rotate(Math.PI / 2 + Math.PI / t);
        d.fillStyle = s.text || "#fff";
        if (s.type === "money" || s.type === "xp") {
            let t = e(s.amount);
            if (s.type === "money") t = e(s.amount / 100);
            d.font = "30px Teko, sans-serif";
            d.fillText(t, -d.measureText(t).width / 2, 100);
            d.font = "50px Teko, sans-serif";
            d.fillText(r[s.type], -d.measureText(r[s.type]).width / 2, 60)
        } else if (s.type === "item") {
            const e = n(s.item);
            T[e.src] = new Image;
            T[e.src].src = e.src;
            let t = T[e.src].height / T[e.src].width;
            d.drawImage(T[e.src], -40, 20, 80, 80 * t);
            d.font = Math.ceil(150 / s.display[0].length) + "px Teko, sans-serif";
            d.fillText(s.display[0], -d.measureText(s.display[0]).width / 2, 105);
            d.font = Math.ceil(150 / s.display[1].length) + "px Teko, sans-serif";
            d.fillText(s.display[1], -d.measureText(s.display[1]).width / 2, 125)
        }
        d.fillStyle = "#fff";
        d.restore()
    }
    d.restore();
    d.save();
    d.translate(y.width / 2, y.height / 2);
    d.fillStyle = "#fff";
    d.shadowBlur = 4;
    d.shadowColor = "#000";
    d.fillRect(y.width / 2.5 - 10, -1, 20, 2);
    d.restore();
    if (j) requestAnimationFrame(k)
}

function M() {
    if (t.tickets > 0) t.tickets -= 1;
    else return;
    P.innerHTML = "";
    t.luckyWheelWins.forEach((e => {
        P.appendChild(W(e))
    }));
    g = Math.floor(Math.random() * a.prizes.length);
    x = 10;
    w = g + .2 + .7 * Math.random();
    v = true;
    o("total_lucky_wheel_spins", 1);
    i("#nav").classList.add("menu-disabled");
    s.emit("update")
}

function S() {
    let e = a.prizes[g];
    e.date = (new Date).getTime();
    t.luckyWheelWins.unshift(e);
    P.insertBefore(W(e, true), P.children[0]);
    if (e.type === "money" || e.type === "xp") I(e.amount, e.type);
    else if (e.type === "item") l(e.item, e.amount || 1, true);
    if (t.tickets > 0) b.innerText = "Spin Again!";
    i("#nav").classList.remove("menu-disabled");
    s.emit("update")
}
const b = m.q("button.button", {
    text: "Spin!",
    onclick() {
        if (!v) M()
    }
});
const P = p.q(".lw-history").q(".lw-history-title", {
    text: "Previous Winnings"
}).s("", {
    css: {
        height: "595px",
        overflowY: "scroll"
    }
});
let j = false;
s.on("showPage", (e => {
    let i = j;
    j = e.page === "spin";
    if (j && !i) {
        k();
        P.innerHTML = "";
        t.luckyWheelWins.forEach((e => {
            P.appendChild(W(e))
        }))
    }
}));
s.on("update", (() => {
    h.innerText = t.tickets === 1 ? "You have a ticket" + (g !== -1 ? " left!" : "!") : "You have " + t.tickets + " tickets" + (t.tickets > 1 ? g !== -1 ? " left!" : "!" : ".");
    b.disabled = t.tickets < 1 || v
}));

function W(t, i) {
    const s = q(".lw-history-item");
    s.style.background = "linear-gradient(45deg, " + t.color + (t.color.length === 4 ? "2" : "20") + ", transparent 80%)";
    if (i) s.classList.add("lw-history-just-won");
    if (t.type === "money") s.innerText = "+ " + e(t.amount / 100, 0) + "€";
    else if (t.type === "xp") s.innerText = "+ " + e(t.amount, 0) + " XP";
    else if (t.type === "item") s.innerText = "+ " + (t.amount ? t.amount + "x " + t.item : t.item);
    return s
}

function I(n, l) {
    let a = document.body.q("", {
        css: {
            position: "fixed",
            fontSize: "40px",
            transition: "0.8s"
        },
        text: "+ " + (l === "money" ? e(n / 100) + "€" : e(n) + " xp")
    });
    const r = y.getBoundingClientRect();
    let f = r.x + r.width / 2 - a.offsetWidth / 2;
    let c = r.y + r.height / 2 - a.offsetHeight;
    a.style.left = f + "px";
    a.style.top = c + "px";
    setTimeout((() => {
        let e;
        if (l === "money") e = i("#money").getBoundingClientRect();
        else e = i("#level-bar-p").getBoundingClientRect();
        a.style.left = e.x + e.width / 2 - a.offsetWidth / 2 + "px";
        a.style.top = e.y + e.height / 2 - a.offsetHeight / 2 + "px"
    }), 50);
    setTimeout((() => a.style.opacity = "0"), 800);
    setTimeout((() => document.body.removeChild(a)), 900);
    setTimeout((() => {
        if (l === "money") {
            i("#money").style.transition = 0 + "s";
            i("#money").style.fontSize = 48 + "px"
        } else if (l === "xp") {
            i("#level-bar-p").style.transition = 0 + "s";
            i("#level-bar-p").style.boxShadow = "0 3px #ffff inset"
        }
        setTimeout((() => {
            if (l === "money") {
                t.money += n;
                o("earned_cash", n);
                o("lucky_wheel_cash_winnings", n);
                i("#money").style.transition = .4 + "s";
                i("#money").style.fontSize = 24 + "px"
            } else if (l === "xp") {
                t.xp += n;
                o("earned_xp", n);
                i("#level-bar-p").style.transition = .4 + "s";
                i("#level-bar-p").style.boxShadow = "0 3px #fff0 inset"
            }
            s.emit("update")
        }), 20)
    }), 800)
}