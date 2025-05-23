import {currentPage as t, user as e, numToString as o, goToPreviousPage as a} from "/script.js?v=2.17";
import {addStat as i} from "/js/achievements.js?v=2.17";
import h from "/js/select.js?v=2.17";
import {game as s} from "/js/game.js?v=2.17";
import {openWithdrawPrompt as l, tradeIn as n} from "/js/casino.js?v=2.17";
const r = h("#pages").q(".page[page=crash]").q(".center");
r.q("h1", {
    text: "Crash"
});
const c = r.q(".coins", {
    text: "You have x chips."
});
s.on("update", (()=>{
    c.innerText = `You have ${o(e.tokens)} chips.`
}
));
r.q().q("button.button", {
    text: "Back",
    onclick() {
        a()
    }
}).s("button.button", {
    text: "Trade in skins",
    onclick() {
        n()
    }
}).s("button.button", {
    text: "Withdraw Chips to €",
    onclick() {
        l()
    }
});
r.q("p.crash-history-label", {
    text: "Previous Crashes"
});
const f = r.q(".crash-history");
const u = r.q(".crash-body");
const g = u.q(".crash-game-controls");
if (!localStorage.crashHistory)
    localStorage.crashHistory = new Array(15).fill(0).map((()=>Math.max(10 / (1 - Math.random()), 1).toFixed(2)));
for (let t = localStorage.crashHistory.split(",").length - 1; t >= 0; t--) {
    f.q(".crash-at" + (parseFloat(localStorage.crashHistory.split(",")[t]) > 2 ? ".crash-at-2" : ""), {
        text: "x" + localStorage.crashHistory.split(",")[t]
    })
}
const m = new Image;
m.src = "images/rocket.png";
g.q("p", {
    text: "Enter the amount of chips you want to bet."
});
const p = g.q();
const x = p.q("input.input.combo-right", {
    type: "number",
    value: "10",
    css: {
        marginBottom: "8px"
    },
    onkeypress(t) {
        if (t.key === "Enter" && T)
            k()
    },
    onblur() {
        if (x.value > Math.floor(e.tokens))
            x.value = Math.floor(e.tokens)
    }
});
p.q("button.button.combo-button", {
    text: "All-in",
    onclick() {
        x.value = Math.floor(e.tokens)
    }
});
const d = g.q("button.button.crash-game-action", {
    onmousedown() {
        if (F > 0 && !T)
            y();
        else if (T)
            k()
    }
});
g.q("p.crash-description", {
    text: "In Crash, you have to Cash Out before the crash. Your bet is multiplied by the multiplier, and your bet is lost if you don't Cash Out before the crash."
});
let b = u.q("canvas.crash-game");
let M = b.getContext("2d");
b.width = 600;
b.height = 400;
function y() {
    if (F > 0 && !T) {
        e.tokens += F * w;
        i("win_chips", F * w);
        for (let t = 1; t <= Math.floor(w); t++)
            i("cashout_" + t + "x");
        _ = w;
        F = 0;
        s.emit("update")
    }
    x.focus()
}
function k() {
    let t = Math.min(Math.floor(e.tokens), Math.abs(parseInt(x.value)));
    if (e.tokens >= t) {
        e.tokens -= t;
        i("spend_chips", t);
        F = t;
        s.emit("update")
    }
    d.focus()
}
let q = 0;
let w = 0;
let v = 0;
let S = [];
let C = 0;
let T = true;
let j = 0;
let F = 0;
let _ = 0;
let H = 0;
function R() {
    q = .002;
    v = 2 / (1 - Math.random());  // RANDOM CRASH TIME
    w = 2;
    S = [[0, 1], [0, 1]];
    T = false;
    _ = 0;
    j = 0;
    C = 0
}
function I(o) {
    if (j === 0)
        j = o;
    o -= j;
    let a = Math.min(o - C, 1e3 / 60);
    let h = Math.min(a / (1e3 / 60), 1);
    C = o;
    if (!T) {
        q *= 1.002 * h || 1.002;
        w += q * h;
        S.push([(S[S.length - 1][0] || 0) + a, Math.min(w, v)]);
        d.innerText = F === 0 ? "Cash Out" : "Cash Out " + Math.floor(F * w) + " C.";
        d.disabled = F === 0
    } else {
        d.innerText = F === 0 ? "Bet " + Math.min(x.value, Math.floor(e.tokens)) + " C." : "Betted " + F + " C.";
        d.disabled = F > 0
    }
    if (w >= v && !T) {
        T = true;
        w = v;
        let t = localStorage.crashHistory.split(",");
        t.unshift(w.toFixed(2));
        localStorage.crashHistory = t.splice(0, 15);
        f.q(".crash-at" + (v > 2 ? ".crash-at-2" : ""), {
            text: "x" + w.toFixed(2)
        });
        H = 7500;
        if (F && w >= 100)
            i("crash_bet_100x");
        F = 0;
        if (_ > 0 && _ < 2 && w >= 100)
            i("crash_low_bet_100x")
    }
    if ((H -= a) <= 0 && T)
        R();
    B(h);
    if (t === "crash")
        requestAnimationFrame(I)
}
s.on("showPage", (t=>t.page === "crash" && requestAnimationFrame(I)));
const A = [.1, 100];
function B(e) {
    if (t !== "crash")
        return;
    M.clearRect(0, 0, b.width, b.height);
    M.strokeStyle = "#fff";
    M.lineWidth = 4;
    let o = Math.min((b.width - 50) / S[S.length - 1][0], A[0]);
    let a = Math.min((b.height - 50) / (S[S.length - 1][1] - S[0][1]), A[1]);
    M.fillStyle = "#555";
    for (let t = 0; t < Math.log2(S[S.length - 1][1]) + 2; t++) {
        M.fillRect(0, b.height - (2 ** t - S[0][1]) * a, b.width, 1)
    }
    M.fillStyle = "#fff";
    for (let t = 0; t < b.width / (1e3 * o); t++)
        M.fillRect(1e3 * o * t, b.height - 10, 1, 10);
    for (let t = 0; t < b.height / a; t++)
        M.fillRect(0, b.height - a * t, 10, 1);
    for (let t = 1; t < S.length; t++) {
        M.beginPath();
        M.moveTo(S[t - 1][0] * o, b.height - (S[t - 1][1] - S[0][1]) * a);
        M.lineTo(S[t][0] * o, b.height - (S[t][1] - S[0][1]) * a);
        M.strokeStyle = "#f80" + Math.floor(t / S.length * 16).toString(16);
        M.stroke()
    }
    const i = S[S.length - 1];
    let h = S[S.length - 2][0] * o - i[0] * o;
    let s = b.height - (S[S.length - 2][1] - S[0][1]) * a - (b.height - (i[1] - S[0][1]) * a);
    M.translate(i[0] * o, b.height - (i[1] - S[0][1]) * a);
    M.rotate(-Math.PI / 4 * 3 + Math.atan2(s, h));
    let l = 32 + Math.log(i[1]) * 4;
    M.drawImage(m, -l / 2, -l / 2, l, l);
    M.resetTransform();
    let n = (F * w).toFixed(2) + " C.";
    M.font = "10px Roboto";
    if (F)
        M.fillText(n, Math.min(S[S.length - 1][0] * o, b.width - 10) - M.measureText(n).width - 10, Math.max(20, b.height - (S[S.length - 1][1] - S[0][1]) * a - 4));
    M.fillStyle = T ? "#f00" : "#fff";
    M.font = "60px Roboto";
    n = "x" + w.toFixed(2);
    M.fillText(n, b.width / 2 - M.measureText(n).width / 2, b.height / 2);
    if (H > 0) {
        M.font = "20px Roboto";
        let t = Math.floor(H / 10) % 100;
        n = Math.floor(H / 1e3) + "." + "00".substring(t.toString().length) + t + "s to the next crash";
        M.fillText(n, b.width / 2 - M.measureText(n).width / 2, b.height / 2 + 40)
    }
}
R();
