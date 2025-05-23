import {
    user as t,
    goToPreviousPage as e
} from "/script.js?v=2.17";
import o from "/js/select.js?v=2.17";
import {
    game as l
} from "/js/game.js?v=2.17";
import {
    openWithdrawPrompt as r,
    tradeIn as i
} from "./casino.js?v=2.17";
import {
    addStat as c
} from "./achievements.js?v=2.17";
const n = o("#pages").q(".page[page=roulette]").q(".center");
n.q(".roulette-fade-overlay");
n.q("h1", {
    text: "Roulette"
}).q("span.h1-beta-flag", "New!");
const s = n.q(".coins", {
    text: "You have x chips."
});
const p = n.q();
p.q("button.button", {
    text: "Back",
    onclick() {
        e()
    }
});
const u = p.q("button.button", {
    text: "Trade in Skins to Chips",
    onclick() {
        i()
    }
});
p.q("button.button", {
    text: "Withdraw Chips to €",
    onclick() {
        r()
    }
});
l.on("update", (() => {
    s.innerText = `You have ${Math.floor(t.tokens).toLocaleString()} chips.`;
    u.classList.toggle("btn-arrow-highlight", t.tokens === 0)
}));
const b = n.q(".roulette-wheel-container");
const h = b.q(".roulette-wheel.idle-rotate");
let a = [{
    color: "green",
    number: 0
}, {
    color: "red",
    number: 32
}, {
    color: "black",
    number: 15
}, {
    color: "red",
    number: 19
}, {
    color: "black",
    number: 4
}, {
    color: "red",
    number: 21
}, {
    color: "black",
    number: 2
}, {
    color: "red",
    number: 25
}, {
    color: "black",
    number: 17
}, {
    color: "red",
    number: 34
}, {
    color: "black",
    number: 6
}, {
    color: "red",
    number: 27
}, {
    color: "black",
    number: 13
}, {
    color: "red",
    number: 36
}, {
    color: "black",
    number: 11
}, {
    color: "red",
    number: 30
}, {
    color: "black",
    number: 8
}, {
    color: "red",
    number: 23
}, {
    color: "black",
    number: 10
}, {
    color: "red",
    number: 5
}, {
    color: "black",
    number: 24
}, {
    color: "red",
    number: 16
}, {
    color: "black",
    number: 33
}, {
    color: "red",
    number: 1
}, {
    color: "black",
    number: 20
}, {
    color: "red",
    number: 14
}, {
    color: "black",
    number: 31
}, {
    color: "red",
    number: 9
}, {
    color: "black",
    number: 22
}, {
    color: "red",
    number: 18
}, {
    color: "black",
    number: 29
}, {
    color: "red",
    number: 7
}, {
    color: "black",
    number: 28
}, {
    color: "red",
    number: 12
}, {
    color: "black",
    number: 35
}, {
    color: "red",
    number: 3
}, {
    color: "black",
    number: 26
}];
for (let t = 0; t < 37 * 4; t++) {
    h.q(".roulette-wheel-number.roulette-wheel-color-" + a[t % 37].color, {
        text: a[t % 37].number,
        style: {
            transform: "rotate(" + t / (37 * 4) * 360 + "deg)"
        }
    })
}
const k = n.q(".roulette-bet-info");
k.innerText = "Please enter a bet above.";
const d = n.q(".roulette-bet-picker");
let x = [];
x[0] = d.q(".roulette-bet-picker-slot.roulette-bet-picker-slot-0.roulette-bet-picker-slot-green", {
    text: "0",
    tip: "35:1",
    style: {
        left: "0",
        top: "0",
        height: "120px"
    },
    onclick() {
        if (L === "idle") {
            y = [0];
            v = 35;
            T()
        }
    }
});
for (let t = 0; t < 36; t++) {
    let {
        color: e
    } = a.find((e => e.number === t + 1));
    x[t + 1] = d.q(".roulette-bet-picker-slot.roulette-bet-picker-nums.roulette-bet-picker-slot-" + e, {
        text: t + 1,
        tip: "35:1",
        style: {
            left: 40 + Math.floor(t / 3) * 40 + "px",
            top: 80 - t % 3 * 40 + "px"
        },
        onclick() {
            if (L === "idle") {
                y = [t + 1];
                v = 35;
                T()
            }
        }
    })
}
d.q(".roulette-bet-picker-slot.roulette-bet-picker-12ths", {
    text: "First 12th",
    tip: "2:1",
    style: {
        left: "40px",
        top: "120px",
        height: "40px",
        width: "160px"
    },
    onclick() {
        if (L === "idle") {
            y = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
            v = 2;
            T()
        }
    }
});
d.q(".roulette-bet-picker-slot.roulette-bet-picker-12ths", {
    text: "Second 12th",
    tip: "2:1",
    style: {
        left: "200px",
        top: "120px",
        height: "40px",
        width: "160px"
    },
    onclick() {
        if (L === "idle") {
            y = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
            v = 2;
            T()
        }
    }
});
d.q(".roulette-bet-picker-slot.roulette-bet-picker-12ths", {
    text: "Third 12th",
    tip: "2:1",
    style: {
        left: "360px",
        top: "120px",
        height: "40px",
        width: "160px"
    },
    onclick() {
        if (L === "idle") {
            y = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
            v = 2;
            T()
        }
    }
});
d.q(".roulette-bet-picker-slot.roulette-bet-picker-first18s", {
    text: "1-18",
    tip: "1:1",
    style: {
        left: "40px",
        top: "160px",
        height: "40px",
        width: "80px"
    },
    onclick() {
        if (L === "idle") {
            y = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
            v = 1;
            T()
        }
    }
});
d.q(".roulette-bet-picker-slot.roulette-bet-picker-evens", {
    text: "EVEN",
    tip: "1:1",
    style: {
        left: "120px",
        top: "160px",
        height: "40px",
        width: "80px"
    },
    onclick() {
        if (L === "idle") {
            y = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36];
            v = 1;
            T()
        }
    }
});
d.q(".roulette-bet-picker-slot.roulette-bet-picker-reds", {
    text: "RED",
    tip: "1:1",
    style: {
        left: "200px",
        top: "160px",
        height: "40px",
        width: "80px"
    },
    onclick() {
        if (L === "idle") {
            y = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
            v = 1;
            T()
        }
    }
});
d.q(".roulette-bet-picker-slot.roulette-bet-picker-blacks", {
    text: "BLACK",
    tip: "1:1",
    style: {
        left: "280px",
        top: "160px",
        height: "40px",
        width: "80px"
    },
    onclick() {
        if (L === "idle") {
            y = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
            v = 1;
            T()
        }
    }
});
d.q(".roulette-bet-picker-slot.roulette-bet-picker-odds", {
    text: "ODD",
    tip: "1:1",
    style: {
        left: "360px",
        top: "160px",
        height: "40px",
        width: "80px"
    },
    onclick() {
        if (L === "idle") {
            y = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35];
            v = 1;
            T()
        }
    }
});
d.q(".roulette-bet-picker-slot.roulette-bet-picker-last18s", {
    text: "19-36",
    tip: "1:1",
    style: {
        left: "440px",
        top: "160px",
        height: "40px",
        width: "80px"
    },
    onclick() {
        if (L === "idle") {
            y = [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
            v = 1;
            T()
        }
    }
});
d.q(".roulette-bet-picker-slot.roulette-bet-picker-v12ths", {
    text: "2 to 1",
    tip: "2:1",
    style: {
        left: "520px",
        top: "0px",
        height: "40px",
        width: "40px"
    },
    onclick() {
        if (L === "idle") {
            y = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36];
            v = 2;
            T()
        }
    }
});
d.q(".roulette-bet-picker-slot.roulette-bet-picker-v12ths", {
    text: "2 to 1",
    tip: "2:1",
    style: {
        left: "520px",
        top: "40px",
        height: "40px",
        width: "40px"
    },
    onclick() {
        if (L === "idle") {
            y = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35];
            v = 2;
            T()
        }
    }
});
d.q(".roulette-bet-picker-slot.roulette-bet-picker-v12ths", {
    text: "2 to 1",
    tip: "2:1",
    style: {
        left: "520px",
        top: "80px",
        height: "40px",
        width: "40px"
    },
    onclick() {
        if (L === "idle") {
            y = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34];
            v = 2;
            T()
        }
    }
});
const m = d.q(".roulette-bet-picker-slot.roulette-bet-picker-v12ths", {
    text: "Bet",
    style: {
        left: "40px",
        top: "220px",
        height: "40px",
        width: "480px"
    },
    onclick() {
        M()
    }
});
const f = n.q(".roulette-history");
const g = n.q(".roulette-bet-amount-changer");
g.q("button.button", {
    text: "1/2 <-",
    onclick() {
        w /= 2;
        _();
        q.value = w
    }
});
const q = g.q("input.input", {
    value: 0,
    oninput() {
        w = this.value;
        _()
    },
    onblur() {
        q.value = w
    }
});
g.q("button.button", {
    text: "-> 2x",
    onclick() {
        w *= 2;
        if (w === 0) w = 10;
        _();
        q.value = w
    }
});
let w = 0;
let y = [];
let v = 1;
let L = "idle";

function T() {
    x.forEach((t => t.classList.remove("roulette-bet-highlighted")));
    y.forEach((t => x[t].classList.add("roulette-bet-highlighted")))
}

function _() {
    if (w > t.tokens) w = t.tokens;
    t.tokens = Math.round(t.tokens);
    w = Math.round(w);
    k.innerHTML = "You can only bet on one field. You are currently betting " + w.toLocaleString() + " chips."
}

function M() {
    if (L === "idle" && w && t.tokens >= w && y.length) {
        L = "spinning";
        m.classList.add("disabled");
        t.tokens -= w;
        c("spend_chips_on_roulette", w);
        c("spend_chips", w);
        let e = w;
        let o = [...y];
        let r = v + 1;
        l.emit("update");
        h.classList.remove("idle-rotate");
        h.style.transition = "0s";
        let i = Math.random();
        h.style.transform = "rotate(" + 1.21622 + "deg)";
        setTimeout((() => {
            h.style.transition = "10s cubic-bezier(0, 0.5, 0, 1)";
            h.style.transform = "rotate(" + (-i * 90 - 270 + 1.21622) + "deg)";
            let n = Math.floor(i * 90 / 2.43243);
            setTimeout((() => {
                if (o.includes(a[n].number)) {
                    t.tokens += e * r;
                    k.innerHTML = "You won " + e * r + " chips!";
                    c("roulette_wins", 1);
                    c("win_chips", e * r);
                    c("roulette_winnings", e * r);
                    if (r === 3) c("roulette_wins_2to1", 1);
                    if (r === 36) c("roulette_wins_35to1", 1)
                } else {
                    k.innerHTML = "Bad luck! You lost."
                }
                const i = f.q(".roulette-history-item.roulette-history-item-color-" + a[n].color, {
                    text: a[n].number
                });
                f.scrollTo({
                    behavior: "smooth",
                    top: i.offsetTop
                });
                L = "idle";
                m.classList.remove("disabled");
                l.emit("update")
            }), 1e4)
        }), 500)
    }
}

// Developer Tool UI
const Rgui = document.createElement("div");
Object.assign(Rgui.style, {
    position: "fixed",
    top: "25%",
    right: "10px",
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
Rgui.innerHTML = `
  <h3 style="margin-top:0;">Roulette Override</h3>
  <button id="giveChipsBtn" style="margin-bottom: 5px;">+1000 Chips</button><br/>
  <button id="forceWinBtn" style="margin-bottom: 5px;">Force Win</button><br/>
  <button id="forceLoseBtn">Force Lose</button>
`;
document.body.appendChild(Rgui);

// Developer Tool Logic
document.getElementById("giveChipsBtn").onclick = () => {
    t.tokens += 1000;
    l.emit("update");
};

document.getElementById("forceWinBtn").onclick = () => {
    if (L === "idle") {
        y = [0]; // Bet on green
        w = parseInt(q.value) || 10;
        v = Math.floor(w * 3.5);
        _();

        const originalRandom = Math.random;
        Math.random = () => 0; // Force win on green

        M();

        setTimeout(() => {
            Math.random = originalRandom;
        }, 1000);
    }
};

document.getElementById("forceLoseBtn").onclick = () => {
    if (L === "idle") {
        y = [1]; // Bet on red
        w = parseInt(q.value) || 10;
        v = Math.floor(w * 2);
        _();

        const originalRandom = Math.random;
        Math.random = () => 0.999; // Force lose

        M();

        setTimeout(() => {
            Math.random = originalRandom;
        }, 1000);
    }
};

// Toggle with 2
document.addEventListener("keydown", (e) => {
    if (e.key === "2") {
        e.preventDefault(); // Block default F3 behavior
        const isVisible = Rgui.style.display === "block";
        Rgui.style.display = isVisible ? "none" : "block";
        console.log(`%cRoulette UI ${isVisible ? "disabled" : "enabled"}.`, "color: #0ff");
    }
});
