import {user as e} from "/script.js?v=2.17";
import t from "/js/select.js?v=2.17";
import {game as s} from "/js/game.js?v=2.17";
import {addStat as n} from "/js/achievements.js?v=2.17";
const i = [{
    mission: "earn_money",
    amount: {
        generate: {
            min: 1e5,
            max: 2e6,
            step: 1e5
        }
    },
    title: "Earn %p €",
    pt: "%p €",
    stat: "earned_cash",
    rewards: {
        xp: {
            generate: {
                min: 5e3,
                max: 5e4,
                step: 2500
            }
        },
        money: {
            generate: {
                min: 1e4,
                max: 5e4,
                step: 5e3
            }
        }
    }
}, {
    mission: "earn_xp",
    amount: {
        generate: {
            min: 1e3,
            max: 1e4,
            step: 1e3
        }
    },
    title: "Earn %a XP",
    pt: "%a XP",
    stat: "earned_xp",
    rewards: {
        xp: {
            generate: {
                min: 2e3,
                max: 2e4,
                step: 500
            }
        },
        money: {
            generate: {
                min: 1e4,
                max: 5e4,
                step: 5e3
            }
        }
    }
}, {
    mission: "clicks",
    amount: {
        generate: {
            min: 1e3,
            max: 1e4,
            step: 250
        }
    },
    title: "Click %a times",
    pt: "%a clicks",
    stat: "clicks",
    rewards: {
        xp: {
            generate: {
                min: 3e3,
                max: 25e3,
                step: 500
            }
        },
        money: {
            generate: {
                min: 1e4,
                max: 15e4,
                step: 1e4
            }
        }
    }
}, {
    mission: "win_conflips",
    amount: {
        generate: {
            min: 2,
            max: 20,
            step: 1
        }
    },
    title: "Win %a coinflips",
    pt: "%a wins",
    stat: "total_coinflips_won",
    rewards: {
        xp: {
            generate: {
                min: 2e3,
                max: 2e4,
                step: 500
            }
        },
        money: {
            generate: {
                min: 5e3,
                max: 4e4,
                step: 5e3
            }
        }
    }
}, {
    mission: "win_conflips_high",
    amount: {
        generate: {
            min: 1,
            max: 3,
            step: 1
        }
    },
    title: "Win %a coinflips with bets over 1000 €",
    pt: "%a wins",
    stat: "total_coinflips_won_bet1000",
    rewards: {
        xp: {
            generate: {
                min: 2e3,
                max: 2e4,
                step: 1e3
            }
        },
        money: {
            generate: {
                min: 5e3,
                max: 4e4,
                step: 5e3
            }
        }
    }
}, {
    mission: "do_coinflips",
    amount: {
        generate: {
            min: 5,
            max: 30,
            step: 1
        }
    },
    title: "Do %a coinflips",
    pt: "%a coinflips",
    stat: "total_coinflips",
    rewards: {
        xp: {
            generate: {
                min: 2e3,
                max: 2e4,
                step: 500
            }
        },
        money: {
            generate: {
                min: 5e3,
                max: 3e4,
                step: 5e3
            }
        }
    }
}, {
    mission: "open_cases",
    amount: {
        generate: {
            min: 20,
            max: 200,
            step: 10
        }
    },
    title: "Open %a cases",
    pt: "%a cases",
    stat: "opened_cases",
    rewards: {
        xp: {
            generate: {
                min: 2e3,
                max: 25e3,
                step: 500
            }
        },
        money: {
            generate: {
                min: 1e4,
                max: 4e4,
                step: 5e3
            }
        }
    }
}, {
    mission: "open_coverts",
    amount: {
        generate: {
            min: 1,
            max: 8,
            step: 1
        }
    },
    title: "Open %a coverts",
    pt: "%a coverts",
    stat: "opened_rarities_5",
    rewards: {
        xp: {
            generate: {
                min: 1500,
                max: 2e4,
                step: 500
            }
        },
        money: {
            generate: {
                min: 5e3,
                max: 45e3,
                step: 5e3
            }
        }
    }
}, {
    mission: "open_exceedingly_rare",
    amount: {
        generate: {
            min: 1,
            max: 6,
            step: 1
        }
    },
    title: "Open %a exceedingly rare skins",
    pt: "%a exceedingly rares",
    stat: "opened_rarities_6",
    rewards: {
        xp: {
            generate: {
                min: 3e3,
                max: 3e4,
                step: 1e3
            }
        },
        money: {
            generate: {
                min: 1e4,
                max: 65e3,
                step: 5e3
            }
        }
    }
}, {
    mission: "win_jackpots",
    amount: {
        generate: {
            min: 2,
            max: 6,
            step: 1
        }
    },
    title: "Win %a jackpots",
    pt: "%a wins",
    stat: "win_jackpot",
    rewards: {
        xp: {
            generate: {
                min: 3e3,
                max: 3e4,
                step: 1e3
            }
        },
        money: {
            generate: {
                min: 5e3,
                max: 35e3,
                step: 5e3
            }
        }
    }
}, {
    mission: "play_jackpots",
    amount: {
        generate: {
            min: 5,
            max: 30,
            step: 1
        }
    },
    title: "Play %a jackpots",
    pt: "%a",
    stat: "win_jackpot",
    rewards: {
        xp: {
            generate: {
                min: 3e3,
                max: 25e3,
                step: 1e3
            }
        },
        money: {
            generate: {
                min: 5e3,
                max: 3e4,
                step: 2500
            }
        }
    }
}, {
    mission: "sell_rare_skins",
    amount: {
        generate: {
            min: 4,
            max: 20,
            step: 2
        }
    },
    title: "Sell %a skins with a price over 250 €",
    pt: "%a skins sold",
    stat: "skin_sold_gt250",
    rewards: {
        xp: {
            generate: {
                min: 2e3,
                max: 15e3,
                step: 1e3
            }
        },
        money: {
            generate: {
                min: 2e3,
                max: 15e3,
                step: 2500
            }
        }
    }
}, {
    mission: "sell_skins",
    amount: {
        generate: {
            min: 50,
            max: 500,
            step: 50
        }
    },
    title: "Sell %a skins",
    pt: "%a skins sold",
    stat: "skin_sold",
    rewards: {
        xp: {
            generate: {
                min: 5e3,
                max: 3e4,
                step: 2500
            }
        },
        money: {
            generate: {
                min: 2e3,
                max: 3e4,
                step: 2e3
            }
        }
    }
}, {
    mission: "discover_skins",
    amount: {
        generate: {
            min: 10,
            max: 25,
            step: 1
        }
    },
    title: "Discover %a new skins",
    pt: "%a skins discovered",
    stat: "skins_discovered",
    rewards: {
        xp: {
            generate: {
                min: 5e3,
                max: 2e4,
                step: 1e3
            }
        },
        money: {
            generate: {
                min: 2e3,
                max: 2e4,
                step: 1e3
            }
        }
    }
}, {
    mission: "discover_skins",
    amount: {
        generate: {
            min: 3,
            max: 10,
            step: 1
        }
    },
    title: "Do %a trade up contracts",
    pt: "%a contracts",
    stat: "tradeups",
    rewards: {
        xp: {
            generate: {
                min: 1e3,
                max: 1e4,
                step: 1e3
            }
        },
        money: {
            generate: {
                min: 1e3,
                max: 5e3,
                step: 1e3
            }
        }
    }
}, {
    mission: "win_chips",
    amount: {
        generate: {
            min: 1e3,
            max: 1e6,
            step: 1e3
        }
    },
    title: "Win %a chips in any casino game",
    pt: "%a chips",
    stat: "win_chips",
    rewards: {
        xp: {
            generate: {
                min: 1e3,
                max: 1e5,
                step: 1e3
            }
        },
        money: {
            generate: {
                min: 1e3,
                max: 4e4,
                step: 1e3
            }
        }
    }
}, {
    mission: "spend_chips",
    amount: {
        generate: {
            min: 1e4,
            max: 1e6,
            step: 1e4
        }
    },
    title: "Spend %a chips in any casino game",
    pt: "%a chips",
    stat: "spend_chips",
    rewards: {
        xp: {
            generate: {
                min: 1e3,
                max: 1e5,
                step: 1e3
            }
        },
        money: {
            generate: {
                min: 1e3,
                max: 3e4,
                step: 1e3
            }
        }
    }
}, {
    mission: "win_chips_in_roulette",
    amount: {
        generate: {
            min: 1e3,
            max: 1e6,
            step: 1e3
        }
    },
    title: "Win %a chips in roulette",
    pt: "%a chips",
    stat: "roulette_winnings",
    rewards: {
        xp: {
            generate: {
                min: 1e3,
                max: 1e4,
                step: 1e3
            }
        },
        money: {
            generate: {
                min: 500,
                max: 2e4,
                step: 500
            }
        }
    }
}, {
    mission: "spend_chips",
    amount: {
        generate: {
            min: 1e4,
            max: 1e5,
            step: 1e4
        }
    },
    title: "Spend %a chips in roulette",
    pt: "%a chips",
    stat: "spend_chips_on_roulette",
    rewards: {
        xp: {
            generate: {
                min: 1e3,
                max: 1e4,
                step: 1e3
            }
        },
        money: {
            generate: {
                min: 1e3,
                max: 1e4,
                step: 500
            }
        }
    }
}, {
    mission: "roulette_wins",
    amount: {
        generate: {
            min: 10,
            max: 50,
            step: 2
        }
    },
    title: "Win %a roulette spins",
    pt: "%a won",
    stat: "roulette_wins",
    rewards: {
        xp: {
            generate: {
                min: 1e3,
                max: 1e4,
                step: 1e3
            }
        },
        money: {
            generate: {
                min: 1e3,
                max: 1e4,
                step: 200
            }
        }
    }
}, {
    mission: "roulette_wins_35to1",
    amount: {
        generate: {
            min: 1,
            max: 4,
            step: 1
        }
    },
    title: "Win on green or a single number in roulette, %a times",
    pt: "%a won",
    stat: "roulette_wins_35to1",
    rewards: {
        xp: {
            generate: {
                min: 1e3,
                max: 1e4,
                step: 1e3
            }
        },
        money: {
            generate: {
                min: 5e3,
                max: 1e4,
                step: 200
            }
        }
    }
}, {
    mission: "win_chips_on_slotmachine",
    amount: {
        generate: {
            min: 1e3,
            max: 1e5,
            step: 1e3
        }
    },
    title: "Win %a chips on the slot machine",
    pt: "%a chips won",
    stat: "win_chips_on_slotmachine",
    rewards: {
        xp: {
            generate: {
                min: 1e3,
                max: 1e4,
                step: 1e3
            }
        },
        money: {
            generate: {
                min: 5e3,
                max: 1e4,
                step: 100
            }
        }
    }
}, {
    mission: "spend_chips_on_slotmachine",
    amount: {
        generate: {
            min: 2e3,
            max: 2e5,
            step: 2e3
        }
    },
    title: "Spend %a chips on the slot machine",
    pt: "%a chips",
    stat: "spend_chips_on_slotmachine",
    rewards: {
        xp: {
            generate: {
                min: 1e3,
                max: 1e4,
                step: 1e3
            }
        },
        money: {
            generate: {
                min: 5e3,
                max: 1e4,
                step: 100
            }
        }
    }
}, {
    mission: "win_100x_on_slotmachine",
    amount: 1,
    title: "Win 100x on the slot machine",
    pt: "100x+ wins",
    stat: "win_100x_on_slotmachine",
    rewards: {
        xp: 1e4,
        money: 5e3
    }
}, {
    mission: "win_special_on_slotmachine",
    amount: 1,
    title: "Win a knife or glove on the slot machine",
    pt: "bonus wins",
    stat: "win_special_on_slotmachine",
    rewards: {
        xp: 1e4,
        money: 2500
    }
}];
e.missions ??= [];
function a() {
    while (e.missions.length < 6) {
        e.missions.push(o())
    }
}
a();
function m(e, t) {
    return Math.floor((Math.max(0, Math.min(1, t ? t + (Math.random() - .5) / 3 : Math.random())) * (e.max - e.min + e.step) + e.min) / e.step) * e.step
}
function o() {
    let e = i[Math.floor(Math.random() * i.length)];
    let t = Math.random();
    let s = {
        mission: e.mission,
        pt: e.pt,
        stat: e.stat,
        amount: e.amount?.generate ? m(e.amount.generate, t) : e.amount,
        rewards: {
            money: e.rewards.money?.generate ? m(e.rewards.money.generate, t) : e.rewards.money,
            xp: e.rewards.xp?.generate ? m(e.rewards.xp.generate, t) : e.rewards.xp
        },
        statAtStart: 0,
        status: "available",
        type: "mission"
    };
    s.title = e.title.replace(/%a/g, s.amount).replace(/%p/g, s.amount / 100);
    return s
}
function r(t) {
    if (t.status === "available" && c() === 0) {
        t.status = "started";
        t.statAtStart = e.stats[t.stat] || 0;
        y();
        k(t)
    }
}
function p(t) {
    if (t.status === "done") {
        n("missions_finished", 1);
        t.status = "finished";
        e.missions.splice(e.missions.indexOf(t), 1, {
            time: (new Date).getTime() + 6e4 * (e.upgrades.missionGeneration || 240),
            type: "mission-waiting"
        });
        y();
        k(t);
        if (t.rewards) {
            if (t.rewards.money)
                e.money += t.rewards.money;
            if (t.rewards.xp)
                e.xp += t.rewards.xp
        }
        s.emit("update")
    }
}
function l(t) {
    e.missions.splice(e.missions.indexOf(t), 1, {
        time: (new Date).getTime() + 6e4 * (e.upgrades.missionGeneration || 240),
        type: "mission-waiting"
    });
    if (v === t)
        k();
    y()
}
function c() {
    return e.missions.filter((e=>e.status === "started" || e.status === "done")).length
}
function d(t) {
    if (t.status === "done")
        return 1;
    return t.status === "started" ? ((e.stats[t.stat] || 0) - t.statAtStart) / t.amount : 0
}
function x(t) {
    if (t.status === "done" || t.status === "started")
        return Math.floor((e.stats[t.stat] || 0) - t.statAtStart);
    return 0
}
function g(e) {
    return e.pt.replace(/%a/g, x(e)).replace(/%p/g, x(e) / 100 + "")
}
function u(t) {
    e.missions.splice(e.missions.indexOf(t), 1, o());
    y()
}
const w = t("#pages").q(".page[page=missions]", {
    style: {
        display: "flex",
        flexDirection: "column"
    }
});
w.q("h1", {
    text: "Missions"
});
const h = w.q(".missions-columns");
const _ = h.q(".missions-column");
const f = h.q(".missions-details-column");
function y() {
    _.innerHTML = "";
    e.missions.forEach((e=>{
        if (e.type === "mission") {
            let t = _.q(".missions-mission.missions-mission-available", {
                text: e.title,
                onclick() {
                    k(e)
                }
            });
            let s = t.q(".missions-mission-progress");
            s.style.right = 100 - d(e) * 100 + "%";
            if (d(e) >= 1) {
                t.classList.add("mission-mission-completed");
                t.classList.add("missions-mission-active");
                e.status = "done"
            }
            if (e.status === "started") {
                t.classList.add("missions-mission-active")
            }
        } else if (e.type === "mission-waiting") {
            let s = _.q(".missions-mission.missions-mission-waiting");
            s.q("span", "Waiting for a new mission");
            let n = s.q("span.missions-mission-waiting-time");
            function t() {
                if (e.time - (new Date).getTime() <= 0)
                    u(e);
                if (document.contains(n))
                    n.innerText = q(e.time - (new Date).getTime());
                else
                    clearInterval(i)
            }
            t();
            let i = setInterval(t, 1e3)
        }
    }
    ))
}
let v;
function k(e) {
    v = e;
    f.innerHTML = "";
    if (!e) {
        f.q("h1", "Please select a mission")
    } else {
        let t = f.q(".md-columns");
        let s = t.q(".md-column");
        s.q("h1", "Mission Details");
        s.q(".md-description", {
            text: e.title + " while this mission is active to complete it and receive the rewards!"
        });
        s.q(".md-progress").q(".md-progress-text", {
            text: g(e) + " / " + e.pt.replace(/%a/, e.amount).replace(/%p/, e.amount / 100)
        }).s(".md-progress-bar").q(".md-progress-bar-progress", {
            style: {
                width: d(e) * 100 + "%"
            }
        });
        s.q("button.button.md-discard", {
            text: "Discard Mission",
            onclick() {
                l(e)
            }
        });
        let n = t.q(".md-column").q(".md-rewards-box");
        n.q(".md-rewards-title", {
            text: "Rewards"
        });
        if (e.rewards) {
            if (e.rewards.money)
                n.q(".md-reward", {
                    text: "+ " + e.rewards.money / 100 + " €"
                });
            if (e.rewards.xp)
                n.q(".md-reward", {
                    text: "+ " + e.rewards.xp + " XP"
                })
        }
        if (e.status === "available" && c() !== 0)
            n.q(".md-accept.md-disabled", {
                text: "You can only have 1 active mission!"
            });
        else if (e.status === "available")
            n.q(".md-accept", {
                text: "Start Mission",
                onclick() {
                    r(e)
                }
            });
        else if (e.status === "started")
            n.q(".md-accept.md-disabled", {
                text: "Mission started"
            });
        else if (e.status === "done")
            n.q(".md-accept", {
                text: "Finish Mission!",
                onclick() {
                    p(e)
                }
            });
        else if (e.status === "finished")
            n.q(".md-accept.md-disabled", {
                text: "Rewards Received!"
            })
    }
}
s.on("showPage", (e=>{
    if (e.page === "missions") {
        y();
        k(v)
    }
}
));
s.on("update", (()=>{
    let s = 0;
    for (let n = 0; n < e.missions.length; n++) {
        if (e.missions[n].status === "started") {
            let s = d(e.missions[n]);
            t("#missions-progress").style.width = Math.min(s * 100, 100) + "%";
            t("#missions-progressbar").style.opacity = "1";
            if (d(e.missions[n]) >= 1) {
                e.missions[n].status = "done"
            }
        }
        if (e.missions[n].status === "done") {
            ++s;
            t("#missions-progress").style.width = "0%";
            t("#missions-progressbar").style.opacity = "0"
        }
    }
    t("#missions_not_collected").innerText = s || ""
}
));
function q(e) {
    let t = Math.floor(e / 1e3 % 60) + "";
    let s = Math.floor(e / 1e3 / 60 % 60) + "";
    let n = Math.floor(e / 1e3 / 60 / 60 % 60) + "";
    return (n > 0 ? n + ":" : "") + s.padStart(2, "0") + ":" + t.padStart(2, "0")
}
