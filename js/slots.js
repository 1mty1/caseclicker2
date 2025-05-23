import {
    user as i,
    goToPreviousPage as s
} from "/script.js?v=2.17";
import e from "/js/select.js?v=2.17";
import {
    game as t
} from "/js/game.js?v=2.17";
import {
    openWithdrawPrompt as n,
    tradeIn as c
} from "./casino.js?v=2.17";
import {
    addStat as l
} from "./achievements.js?v=2.17";
import {
    getRandomRarity as o,
    giveItem as d
} from "./items.js?v=2.17";
const r = e("#pages").q(".page[page=slots]").q(".center");
r.q(".roulette-fade-overlay");
r.q("h1", {
    text: "Slot Machine"
}).q("span.h1-beta-flag", "New!");
const g = r.q(".coins", {
    text: "You have x chips."
});
const a = r.q();
a.q("button.button", {
    text: "Back",
    onclick() {
        s()
    }
});
const m = a.q("button.button", {
    text: "Trade in Skins to Chips",
    onclick() {
        c()
    }
});
a.q("button.button", {
    text: "Withdraw Chips to €",
    onclick() {
        n()
    }
});
t.on("update", (() => {
    g.innerText = `You have ${Math.floor(i.tokens).toLocaleString()} chips.`;
    m.classList.toggle("btn-arrow-highlight", i.tokens < 10)
}));
const p = {
    KNIFE: {},
    SEVEN: {
        2: 77,
        3: 77,
        4: 777,
        5: 77777
    },
    DICE: {
        2: 1,
        3: 1,
        4: 200,
        5: 1,
        jackpot: 1
    },
    HEART: {
        3: 14,
        4: 10,
        5: 100
    },
    DIAMOND: {
        3: 27,
        4: 67,
        5: 207
    },
    SPADES: {
        3: 12,
        4: 25,
        5: 250
    },
    CLUBS: {
        3: 14,
        4: 30,
        5: 300
    }
};

function u() {
    const i = Math.random();
    if (i < .015) return "KNIFE";
    if (i < .015 + .05) return "SEVEN";
    if (i < .065 + .115) return "DICE";
    if (i < .18 + .25) return "HEART";
    if (i < .43 + .21) return "DIAMOND";
    if (i < .64 + .18) return "SPADES";
    return "CLUBS"
}
const h = r.q(".slots-columns");
const w = r.q(".slots-win-text");
let v = false;
let f = true;

function x(s) {
    f = true;
    const e = document.body.q(".dice-throw-popup");
    let n = s * (p.DICE.jackpot - p.DICE[5]);
    e.q(".dice-throw-popup-title", {
        text: "Dice Throw!"
    });
    e.q(".dice-throw-popup-description", {
        text: "If the dice lands on 6, you win " + n + " extra chips!"
    });
    const c = e.q(".dice-throw-dice-container");
    const o = c.q(".dice-throw-dice", {
        html: `\n      <div class="dice-face dice-front">\n        <div class="dice-dot dice-dot-1"></div>\n      </div>\n      <div class="dice-face dice-back">\n        <div class="dice-dot dice-dot-2"></div>\n        <div class="dice-dot dice-dot-3"></div>\n      </div>\n      <div class="dice-face dice-right">\n        <div class="dice-dot dice-dot-1"></div>\n        <div class="dice-dot dice-dot-2"></div>\n        <div class="dice-dot dice-dot-3"></div>\n      </div>\n      <div class="dice-face dice-left">\n        <div class="dice-dot dice-dot-2"></div>\n        <div class="dice-dot dice-dot-3"></div>\n        <div class="dice-dot dice-dot-4"></div>\n        <div class="dice-dot dice-dot-5"></div>\n      </div>\n      <div class="dice-face dice-top">\n        <div class="dice-dot dice-dot-1"></div>\n        <div class="dice-dot dice-dot-2"></div>\n        <div class="dice-dot dice-dot-3"></div>\n        <div class="dice-dot dice-dot-4"></div>\n        <div class="dice-dot dice-dot-5"></div>\n      </div>\n      <div class="dice-face dice-bottom">\n        <div class="dice-dot dice-dot-2"></div>\n        <div class="dice-dot dice-dot-3"></div>\n        <div class="dice-dot dice-dot-4"></div>\n        <div class="dice-dot dice-dot-5"></div>\n        <div class="dice-dot dice-dot-6"></div>\n        <div class="dice-dot dice-dot-7"></div>\n      </div>\n    `
    });

    function d() {
        return Math.floor(Math.random() * 2 + 2) * 360
    }
    o.style.transform = `translateZ(500px)`;
    setTimeout((() => {
        let s = Math.floor(Math.random() * 6);
        let c = 0;
        let r = 0;
        let g = 0;
        if (s === 0) {
            c = d();
            r = 0;
            g = Math.random() * 90
        } else if (s === 1) {
            c = d();
            r = 180;
            g = Math.random() * 90
        } else if (s === 2) {
            c = 90 + d();
            r = Math.random() * 90;
            g = 90
        } else if (s === 3) {
            c = 270 + d();
            r = Math.random() * 90;
            g = 90
        } else if (s === 4) {
            c = 270 + d();
            r = Math.random() * 90;
            g = 0
        } else if (s === 5) {
            c = 90 + d();
            r = Math.random() * 90;
            g = 0
        }
        o.style.transform = `translateZ(0px) rotateX(${c}deg) rotateY(${r}deg) rotateZ(${g}deg)`;
        setTimeout((() => {
            if (s === 5) {
                e.q(".dice-throw-result", "Wow! You won " + n + " chips!");
                i.tokens += n;
                e.q(".button", "Go back!", {
                    onclick() {
                        document.body.removeChild(e)
                    }
                });
                l("win_chips", n);
                l("win_chips_on_slotmachine", n);
                l("win_dice_throw_on_slotmachine", 1);
                t.emit("update")
            } else {
                e.q(".dice-throw-result", "Dang!");
                e.q(".button", "Go back", {
                    onclick() {
                        document.body.removeChild(e)
                    }
                })
            }
        }), 3100)
    }), 100)
}

function b(s) {
    if (i.tokens >= s) {
        i.tokens -= s;
        l("spend_chips", s);
        l("spend_chips_on_slotmachine", s)
    } else return;
    t.emit("update");
    h.innerHTML = "";
    let e = [];
    for (let i = 0; i < 5; i++) {
        e.push([u(), u(), u()])
    }
    let n = [];
    let c = 0;
    for (let i = 0; i < 3; i++) {
        let t = e[0][i];
        for (let s = 0; s < 5; s++) {
            if (e[s][i] === "KNIFE") c++
        }
        let l = 0;
        for (let s = 0; s < 5; s++) {
            if (t === e[s][i]) l += 1;
            else break
        }
        let o = p[t][l] ? p[t][l] / (i === 1 ? 1 : 2) : 0;
        let d = o * s;
        n[i] = {
            winIcon: t,
            winLength: l,
            win: o,
            winAmount: d
        }
    }
    c = s > 0 && c >= 3;
    if (c) f = true;
    let r = [0, 0, 0];
    for (let i = 0; i < 5; i++) {
        const s = h.q(".slots-column");
        for (let t = 0; t < 3; t++) {
            const l = s.q(".slots-slot.slots-slot-" + e[i][t]);
            if (e[i][t] === "DICE") l.classList.add("slots-slot-DICE-" + ++r[t]);
            {
                l.classList.add("slots-animate-in-now")
            };
            if (n[t].win && i < n[t].winLength || c && e[i][t] === "KNIFE") {
                l.classList.add("slots-win-jumping")
            }
            else {
                l.classList.add("slots-fade-out")
            }
        }
    }
    setTimeout((() => {
        let e = 0;
        let r = 0;
        let g = 0;
        n.forEach(((i, t) => {
            e += i.winAmount;
            r += i.win;
            if (i.win && i.winLength === 5) l("get_5_in_a_row_on_slotmachine", 1);
            if (i.winIcon === "DICE" && i.winLength === 5) g += s * (t === 1 ? 1 : .5)
        }));
        if (g) x(g);
        i.tokens += e;
        l("win_chips", e);
        l("win_chips_on_slotmachine", e);
        if (r > 100) l("win_100x_on_slotmachine", 1);
        w.innerText = "You won " + e + " chips!";
        t.emit("update");
        if (c) {
            l("win_special_on_slotmachine", 1);
            d(o(6), 1, true)
        }
    }), 10)
}
b(0);
let _ = 0;
const k = r.q(".casino-bet-amount-selector-simple", {
    style: {
        margin: "20px"
    }
});
k.q("button.button", {
    text: "Min",
    onclick() {
        M(10)
    }
});
k.q("button.button", {
    text: "-",
    onclick() {
        M(_ / 2)
    }
});
const I = k.q("input.input", {
    onfocus() {
        this.value = _;
        this.previousValue = parseInt(this.value)
    },
    oninput() {
        M(Number.isFinite(parseInt(this.value)) ? parseInt(this.value) : this.previousValue, false)
    },
    onblur() {
        M(Number.isFinite(parseInt(this.value)) ? parseInt(this.value) : this.previousValue)
    }
});
k.q("button.button", {
    text: "+",
    onclick() {
        M(_ * 2)
    }
});
k.q("button.button", {
    text: "Max",
    onclick() {
        M(i.tokens)
    }
});
const E = r.q("button.button", {
    onclick() {
        b(_)
    }
});

function M(s = 10, e = true) {
    if (s < 10) s = 10;
    if (s > i.tokens) s = i.tokens;
    _ = Math.floor(s / 10) * 10;
    E.innerText = `Spin for ${_} chips!`;
    if (e) I.value = _ >= 100 ? _ : _ + " chips"
}

function T() {
    f = false;
    v = true;
    D.innerText = "Stop Auto Spin";
    b(_);
    let i = setInterval((() => {
        if (f) {
            clearInterval(i);
            v = false;
            D.innerText = "Auto Spin"
        } else b(_)
    }), 1e3)
}
t.on("showPage", (i => {
    if (i.page !== "slots") f = true
}));
const D = r.q("button.button", {
    text: "Auto Spin",
    style: {
        marginTop: "20px"
    },
    onclick() {
        if (v) f = true;
        else T()
    }
});
M();
r.q("", {
    style: {
        textAlign: "center",
        marginTop: "20px"
    },
    children: ["Get as many icons as possible in a row, from the first column.", q("br"), "Minimum bet: 10 chips — Bet interval: 10 chips", q(".slots-win-table", {
        children: [q(".slots-win-table-title", "Possible Winnings:"), q(".slots-win-row", {
            children: [q(".slots-win-cell", {
                children: [q("img", {
                    src: "images/sevens.png"
                }), q("img", {
                    src: "images/sevens.png"
                }), q(".slots-win-cell-multiplier", {
                    text: "= 7x"
                })]
            }), q(".slots-win-cell", {
                children: [q("img", {
                    src: "images/sevens.png"
                }), q("img", {
                    src: "images/sevens.png"
                }), q("img", {
                    src: "images/sevens.png"
                }), q(".slots-win-cell-multiplier", {
                    text: "= 77x"
                })]
            }), q(".slots-win-cell", {
                children: [q("img", {
                    src: "images/sevens.png"
                }), q("img", {
                    src: "images/sevens.png"
                }), q("img", {
                    src: "images/sevens.png"
                }), q("img", {
                    src: "images/sevens.png"
                }), q(".slots-win-cell-multiplier", {
                    text: "= 777x"
                })]
            }), q(".slots-win-cell", {
                children: [q("img", {
                    src: "images/sevens.png"
                }), q("img", {
                    src: "images/sevens.png"
                }), q("img", {
                    src: "images/sevens.png"
                }), q("img", {
                    src: "images/sevens.png"
                }), q("img", {
                    src: "images/sevens.png"
                }), q(".slots-win-cell-multiplier", {
                    text: "= 77.777x"
                })]
            })]
        }), q(".slots-win-row", {
            children: [q(".slots-win-cell", {
                children: [q("img", {
                    src: "images/dice_1.png"
                }), q("img", {
                    src: "images/dice_2.png"
                }), q(".slots-win-cell-multiplier", {
                    text: "= 2x"
                })]
            }), q(".slots-win-cell", {
                children: [q("img", {
                    src: "images/dice_1.png"
                }), q("img", {
                    src: "images/dice_2.png"
                }), q("img", {
                    src: "images/dice_3.png"
                }), q(".slots-win-cell-multiplier", {
                    text: "= 20x"
                })]
            }), q(".slots-win-cell", {
                children: [q("img", {
                    src: "images/dice_1.png"
                }), q("img", {
                    src: "images/dice_2.png"
                }), q("img", {
                    src: "images/dice_3.png"
                }), q("img", {
                    src: "images/dice_4.png"
                }), q(".slots-win-cell-multiplier", {
                    text: "= 200x"
                })]
            }), q(".slots-win-cell", {
                children: [q("img", {
                    src: "images/dice_1.png"
                }), q("img", {
                    src: "images/dice_2.png"
                }), q("img", {
                    src: "images/dice_3.png"
                }), q("img", {
                    src: "images/dice_4.png"
                }), q("img", {
                    src: "images/dice_5.png"
                }), q(".slots-win-cell-multiplier", {
                    text: "= 2.000x"
                })]
            })]
        }), q(".slots-win-row", {
            children: [q(".slots-win-cell", {
                children: [q("img", {
                    src: "images/hearts.png"
                }), q("img", {
                    src: "images/hearts.png"
                }), q("img", {
                    src: "images/hearts.png"
                }), q(".slots-win-cell-multiplier", {
                    text: "= 2x"
                })]
            }), q(".slots-win-cell", {
                children: [q("img", {
                    src: "images/hearts.png"
                }), q("img", {
                    src: "images/hearts.png"
                }), q("img", {
                    src: "images/hearts.png"
                }), q("img", {
                    src: "images/hearts.png"
                }), q(".slots-win-cell-multiplier", {
                    text: "= 4x"
                })]
            }), q(".slots-win-cell", {
                children: [q("img", {
                    src: "images/hearts.png"
                }), q("img", {
                    src: "images/hearts.png"
                }), q("img", {
                    src: "images/hearts.png"
                }), q("img", {
                    src: "images/hearts.png"
                }), q("img", {
                    src: "images/hearts.png"
                }), q(".slots-win-cell-multiplier", {
                    text: "= 10x"
                })]
            })]
        }), q(".slots-win-row", {
            children: [q(".slots-win-cell", {
                children: [q("img", {
                    src: "images/diamonds.png"
                }), q("img", {
                    src: "images/diamonds.png"
                }), q("img", {
                    src: "images/diamonds.png"
                }), q(".slots-win-cell-multiplier", {
                    text: "= 2x"
                })]
            }), q(".slots-win-cell", {
                children: [q("img", {
                    src: "images/diamonds.png"
                }), q("img", {
                    src: "images/diamonds.png"
                }), q("img", {
                    src: "images/diamonds.png"
                }), q("img", {
                    src: "images/diamonds.png"
                }), q(".slots-win-cell-multiplier", {
                    text: "= 6x"
                })]
            }), q(".slots-win-cell", {
                children: [q("img", {
                    src: "images/diamonds.png"
                }), q("img", {
                    src: "images/diamonds.png"
                }), q("img", {
                    src: "images/diamonds.png"
                }), q("img", {
                    src: "images/diamonds.png"
                }), q("img", {
                    src: "images/diamonds.png"
                }), q(".slots-win-cell-multiplier", {
                    text: "= 20x"
                })]
            })]
        }), q(".slots-win-row", {
            children: [q(".slots-win-cell", {
                children: [q("img", {
                    src: "images/spades.png"
                }), q("img", {
                    src: "images/spades.png"
                }), q("img", {
                    src: "images/spades.png"
                }), q(".slots-win-cell-multiplier", {
                    text: "= 5x"
                })]
            }), q(".slots-win-cell", {
                children: [q("img", {
                    src: "images/spades.png"
                }), q("img", {
                    src: "images/spades.png"
                }), q("img", {
                    src: "images/spades.png"
                }), q("img", {
                    src: "images/spades.png"
                }), q(".slots-win-cell-multiplier", {
                    text: "= 25x"
                })]
            }), q(".slots-win-cell", {
                children: [q("img", {
                    src: "images/spades.png"
                }), q("img", {
                    src: "images/spades.png"
                }), q("img", {
                    src: "images/spades.png"
                }), q("img", {
                    src: "images/spades.png"
                }), q("img", {
                    src: "images/spades.png"
                }), q(".slots-win-cell-multiplier", {
                    text: "= 250x"
                })]
            })]
        }), q(".slots-win-row", {
            children: [q(".slots-win-cell", {
                children: [q("img", {
                    src: "images/clubs.png"
                }), q("img", {
                    src: "images/clubs.png"
                }), q("img", {
                    src: "images/clubs.png"
                }), q(".slots-win-cell-multiplier", {
                    text: "= 7x"
                })]
            }), q(".slots-win-cell", {
                children: [q("img", {
                    src: "images/clubs.png"
                }), q("img", {
                    src: "images/clubs.png"
                }), q("img", {
                    src: "images/clubs.png"
                }), q("img", {
                    src: "images/clubs.png"
                }), q(".slots-win-cell-multiplier", {
                    text: "= 30x"
                })]
            }), q(".slots-win-cell", {
                children: [q("img", {
                    src: "images/clubs.png"
                }), q("img", {
                    src: "images/clubs.png"
                }), q("img", {
                    src: "images/clubs.png"
                }), q("img", {
                    src: "images/clubs.png"
                }), q("img", {
                    src: "images/clubs.png"
                }), q(".slots-win-cell-multiplier", {
                    text: "= 300x"
                })]
            })]
        }), q(".slots-win-row", {
            children: [q(".slots-win-cell", {
                children: [q("img", {
                    src: "images/dice_1.png"
                }), q("img", {
                    src: "images/dice_2.png"
                }), q("img", {
                    src: "images/dice_3.png"
                }), q("img", {
                    src: "images/dice_4.png"
                }), q("img", {
                    src: "images/dice_5.png"
                }), q(".slots-win-cell-text", "& dice throw on "), q("img", {
                    src: "images/dice_6.png"
                }), q(".slots-win-cell-multiplier", {
                    text: "= 20.000x"
                })]
            }), q(".slots-win-cell", {
                children: [q("img", {
                    src: "images/special-item.png"
                }), q("img", {
                    src: "images/special-item.png"
                }), q("img", {
                    src: "images/special-item.png"
                }), q(".slots-win-cell-text", "at any position"), q(".slots-win-cell-multiplier", {
                    text: "= RANDOM KNIFE"
                })]
            })]
        }), q(".slots-win-table-title", "Top and bottom row gives ½x Winnings")]
    })]
});