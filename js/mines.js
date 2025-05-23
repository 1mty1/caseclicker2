import t from "/js/select.js?v=2.17";
import {
    goToPreviousPage as e,
    numToString as s,
    user as o
} from "/script.js?v=2.17";
import {
    game as n
} from "/js/game.js?v=2.17";
import {
    addStat as i
} from "/js/achievements.js?v=2.17";
import {
    openWithdrawPrompt as l,
    tradeIn as a
} from "/js/casino.js?v=2.17";
const c = t("#pages").q(".page[page=mines]").q(".center");
c.q("h1", {
    text: "Mines"
});
const r = c.q(".coins", {
    text: "You have x chips."
});
n.on("update", (() => {
    r.innerText = `You have ${s(o.tokens)} chips.`
}));
const u = .99;
c.q().q("button.button", {
    text: "Back",
    onclick() {
        e()
    }
}).s("button.button", {
    text: "Trade in Skins to Chips",
    onclick() {
        a()
    }
}).s("button.button", {
    text: "Withdraw Chips to €",
    onclick() {
        l()
    }
});
const m = c.q(".mines-body");
const d = m.q(".mines-left-column");
d.q("p.mines-description", {
    text: "In Mines, your objective is to uncover as many tiles as possible, without choosing a bomb. If you choose a bomb your bet is lost. The more tiles you uncover, the higher your bet multiplier gets. You can cash out at any time before hitting a bomb. Your multiplier grows faster if you have more bombs on the board."
});
d.q("p.label", {
    text: "Enter the amount you want to bet"
});
const f = d.q("");
const h = f.q("input.input.column-margin", {
    value: 10,
    oninput() {
        if (y === "ended") {
            w = parseInt(this.value) || 0;
            if (w > Math.floor(o.tokens)) w = Math.floor(o.tokens)
        }
    },
    onblur() {
        this.value = w
    }
});
f.q("button.button.combo-button", {
    text: "All-in",
    onclick() {
        if (y === "ended") {
            w = Math.floor(o.tokens);
            h.value = w
        }
    }
});
n.on("showPage", (t => {
    if (t.page === "mines" && y === "ended") {
        w = Math.min(10, Math.floor(o.tokens));
        h.value = w
    }
}));
d.q("p.label", {
    text: "Enter the amount of bombs you want"
});
const b = d.q(".select-combo.column-margin");
const p = b.q("button.button", {
    text: "1",
    onclick() {
        if (y === "ended") {
            _ = 1;
            I()
        }
    }
});
const g = b.q("button.button", {
    text: "3",
    onclick() {
        if (y === "ended") {
            _ = 3;
            I()
        }
    }
});
const v = b.q("button.button", {
    text: "5",
    onclick() {
        if (y === "ended") {
            _ = 5;
            I()
        }
    }
});
const x = b.q("input.input", {
    placeholder: "Custom Amount",
    value: 10,
    css: {
        width: "30px"
    },
    oninput() {
        if (y === "ended") {
            _ = parseInt(this.value) || 1;
            I()
        }
    },
    onblur() {
        if (y === "ended") {
            _ = parseInt(this.value) || 1;
            if (_ > 23) _ = 23;
            this.value = _;
            I()
        }
    },
    onfocus() {
        if (y === "ended") {
            if (this.value) _ = parseInt(this.value) || 1;
            I()
        }
    }
});
const k = d.q("button.button.column-margin", {
    text: "Play",
    onclick() {
        if (y === "ended") P();
        else if (j !== 1) z()
    }
});
const q = m.q(".mines-tiles-container");
let y = "ended";
let M = false;
let _ = 1;
let L = 24;
let j = 1;
let w = 10;
let T = null;

function I() {
    p.classList.remove("selected");
    g.classList.remove("selected");
    v.classList.remove("selected");
    x.classList.remove("selected");
    if (_ === 1) p.classList.add("selected");
    else if (_ === 3) g.classList.add("selected");
    else if (_ === 5) v.classList.add("selected");
    else x.classList.add("selected");
    if (y === "started") {
        if (L !== 24) k.innerText = "Cash out " + Math.floor(w * (1 / j * u)) + " C.";
        else k.innerText = "Press a tile..."
    } else k.innerText = M ? "Play again" : "Play";
    q.classList.toggle("mines-game-ended", y === "ended")
}

function C(t) {
    let e = false;
    const s = q.q(".mines-tile", {
        css: {
            top: Math.floor(t / 5) * 100 + "px",
            left: t % 5 * 100 + "px"
        },
        onclick() {
            if (e) return;
            if (y === "started") {
                e = true;
                let s = 1//Math.random();
                if (_ / L >= s) {
                    this.classList.add("mines-bomb");
                    Y()
                } else {
                    this.classList.add("mines-cleared");
                    j *= (L - _) / L;
                    L--;
                    T.innerText = (1 / j * u).toFixed(2) + "x";
                    T.style.top = Math.floor(t / 5) * 100 + "px";
                    T.style.left = t % 5 * 100 + "px";
                    T.style.transition = "0s";
                    T.style.fontSize = 0;
                    setTimeout((() => {
                        T.style.transition = "0.1s font-size";
                        T.style.fontSize = 40 - (L - _) * 1.5 + "px"
                    }), 100);
                    if (L === _) z();
                    I()
                }
            }
        }
    });
    if (t < 12) s.style.backgroundImage = `url(/images/bombsites/${t+1}.png)`;
    else if (t > 12) s.style.backgroundImage = `url(/images/bombsites/${t}.png)`
}

function P() {
    if (w <= 0) return;
    if (w > o.tokens) return;
    o.tokens -= w;
    i("spend_chips", w);
    if (_ > 23) _ = 23;
    else if (_ < 1) _ = 1;
    L = 24;
    j = 1;
    y = "started";
    q.innerHTML = "";
    for (let t = 0; t < 25; t++) {
        if (t === 12) continue;
        C(t)
    }
    T = q.q(".mines-multiplier");
    I();
    n.emit("update")
}

function Y() {
    y = "ended";
    if (w > Math.floor(o.tokens)) w = Math.floor(o.tokens);
    h.value = w;
    M = true;
    i("total_mines_games", 1);
    i("total_mines_lost", 1);
    I()
}

function z() {
    y = "ended";
    M = true;
    o.tokens += Math.floor(w * (1 / j * u));
    i("win_chips", Math.floor(w * (1 / j * u)));
    if (1 / j * u > 20) i("total_mines_won_mo20", 1);
    i("total_mines_games", 1);
    i("total_mines_won", 1);
    I();
    n.emit("update")
}
I();