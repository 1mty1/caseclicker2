import {
    goToPreviousPage as e,
    showPage as t
} from "/script.js?v=2.17";
import {
    getItem as o,
    getItemsValue as a,
    getItemsWorth as n,
    giveItemsWorth as i,
    removeItemsFromInventory as l,
    renderItem as r,
    selectItems as s
} from "/js/items.js?v=2.17";
import {
    addStat as c
} from "/js/achievements.js?v=2.17";
import p from "/js/select.js?v=2.17";
import {
    getProfilePictureDataURL as d
} from "./online/profile.js?v=2.17";
const f = p("#pages").q(".page[page=jackpot]").q(".center");
f.q("h1", "Jackpot");
const m = f.q("#jackpot-wheel");
const y = m.q("#jackpot-wheel-inner");
const u = f.q("#jackpot-roll-countdown");
const h = f.q();
h.q("button.button", "Back", {
    onclick() {
        e()
    }
});
const j = h.q("button.button", {
    onclick() {
        if (w.joined) A();
        else R()
    }
});
const [k] = f.q(".jackpot-header.m", {
    rac: [q("span.jackpot-highlighted"), " players next roll"]
});
const [g] = f.q(".jackpot-header", {
    rac: ["Total Pool: ", q("span.jackpot-highlighted")]
});
const T = f.q("#jackpot-players");
const [M, b] = f.q("#jackpot-items", {
    rac: [q("span.jackpot-section-title-centered", "Top items:"), q(".jackpot-items-container.compact")]
});

function v() {
    let e = "";
    let t = Math.floor(Math.random() * 3) + 1;
    for (let o = 0; o < t; o++) {
        let t = P[Math.floor(Math.random() * P.length)];
        e += Math.random() > .5 / (o + 1) ? t.toLowerCase() : t
    }
    return e
}

function x() {
    const e = 5e4 / (1 - Math.random());
    const t = n(e);
    return {
        bet: a(t),
        items: t,
        name: v(),
        joinAt: Math.random() * 10 + 30,
        avatar: `/images/avatars/${Math.floor(Math.random()*121)}.jpeg`
    }
}
let L = {};
let P = ["-", "00", "007", "2", "4", "42", "420", "51", "69", "96", "97", "98", "99", "A", "Addict", "Addicted", "All", "Alpha", "Away", "B", "Ban", "Bandit", "Bear", "Beast", "Beautiful", "Beauty", "Best", "Big", "Bounty", "Brain", "Brakes", "Brave", "Bravo", "Bull", "C", "Cap", "Captain", "Chief", "Claw", "Cold", "Cry", "Cool", "Cop", "Crew", "Crow", "D", "Dad", "Day", "Dead", "Deep", "Diamond", "Duo", "E", "Eagle", "Ed", "Er", "Est", "Example", "F", "Fast", "Fast", "Father", "Fever", "Fly", "Fox", "Furious", "G", "Game", "Gamer", "Gem", "Goat", "Go", "Gon", "Gone", "Grim", "H", "Hamburger", "Hammer", "Hate", "Hero", "Holy", "Honest", "Hot", "Human", "I", "Ice", "Ie", "Ing", "Is", "J", "Juicy", "Karsten", "K", "Kid", "King", "Knife", "L", "Lcky", "Live", "Living", "Lonely", "Loser", "Lovely", "Lovin", "Loyal", "Lucky", "Ly", "M", "MC", "Mac", "Malthe", "Man", "Master", "Mc", "Me", "Mi", "Min", "Mini", "Mom", "Mother", "Mr", "My", "N", "New", "Night", "No", "Nuke", "Ny", "O", "Odd", "Omega", "P", "Pain", "Pickle", "Pink", "Plaza", "Polo", "Proud", "Purple", "Q", "Queen", "R", "Ra", "Random", "Rat", "Rick", "Rifle", "Ris", "Rock", "Rook", "Rookie", "Royal", "S", "Sausage", "Scary", "Shark", "Shooter", "Shot", "Sir", "Snake", "Solo", "Speed", "Split", "Sq", "Star", "Sun", "Sur", "T", "Taco", "Tank", "Tet", "The", "Thor", "Toast", "Thunder", "Tiger", "Ty", "U", "Un", "V", "Vater", "View", "Villian", "W", "Win", "Winner", "West", "X", "XXX", "Xx", "Y", "Yak", "Yank", "Ye", "Yeet", "YT", "Z", "_", "_", "xX"];
let w = {
    joined: false
};

function B() {
    L = {
        rollin: 40,
        players: new Array(Math.floor(Math.random() * 4) + 2).fill().map((() => x()))
    };
    if (w.joined === false && w.bet) {
        L.players.unshift({
            isPlayer: true,
            items: w.items,
            bet: w.bet,
            name: "You",
            avatar: d()
        });
        w.joined = true
    }
    E();
    let e = setInterval((() => {
        --L.rollin;
        if (w.bet && L.rollin > 0) j.innerText = "Leave Jackpot";
        else j.innerText = L.rollin > 5 ? "Join Roll" : "Joining is closed";
        if (L.rollin > 5) {
            u.innerText = "Next roll locks in " + (L.rollin - 5) + " seconds...";
            j.disabled = false
        } else if (L.rollin > 0) {
            u.innerText = "Next roll in " + L.rollin + " seconds...";
            j.disabled = true
        } else {
            u.innerText = "Rolling...";
            H();
            clearInterval(e)
        }
        C()
    }), 1e3);
    C()
}
let S = [];

function C() {
    E();
    let e = L.players.filter((e => !e.joinAt || L.rollin <= e.joinAt));
    T.innerHTML = "";
    k.innerText = e.length;
    g.innerText = Math.floor(L.pool / 100) + " €";
    let t = [];
    e.forEach((e => {
        let o = T.q(".jackpot-player");
        if (e.isPlayer) o.classList.add("jackpot-player-you");
        o.q(".jackpot-player-avatar", {
            style: {
                backgroundImage: "url(" + e.avatar + ")"
            }
        }).s(".jackpot-player-info").q(".jackpot-player-name", "" + e.name).s(".jackpot-player-bet", "Bet: " + (e.bet / 100).toFixed(2) + " €  -  Odds: " + Math.round(e.odds * 100) + "%");
        t.push(...e.items)
    }));
    t = t.sort(((e, t) => o(t).price - o(e).price));
    const a = t.splice(0, 10 * e.length);
    if (a.join(",") !== S.join(",")) {
        b.innerHTML = "";
        M.innerText = t.length > a.length ? "Top " + a.length + " items:" : "Pool contains " + a.length + " items:";
        a.forEach((e => {
            b.appendChild(r(e))
        }))
    }
    S = a
}
setTimeout(B, 0);
async function R() {
    let e = await s(100);
    w.items = e;
    w.bet = 0;
    e.forEach((e => w.bet += e.price));
    if (L.rollin > 0) {
        L.players.unshift({
            isPlayer: true,
            items: w.items,
            bet: w.bet,
            name: "You",
            avatar: d()
        });
        w.joined = true;
        j.innerText = "Leave Jackpot"
    } else {
        j.innerText = "Too late, joining next roll!"
    }
    C();
    t("jackpot", true)
}

function A() {
    if (w.joined && L.rollin > 5) {
        w.joined = false;
        w.bet = 0;
        w.items = [];
        L.players.splice(L.players.findIndex((e => e.isPlayer)), 1);
        j.innerText = "...";
        j.disabled = true;
        C()
    }
}

function H() {
    y.innerHTML = "";
    y.style.opacity = "1";
    y.style.transition = "0s";
    y.style.transform = "translateX(0)";
    let e, t = false;
    for (let o = 0; o < 200; o++) {
        let a = _();
        let n = y.q(".jackpot-tile", {
            style: {
                backgroundImage: "url(" + a.avatar + ")"
            }
        });
        if (a.isPlayer) n.classList.add("jackpot-tile-you");
        n.q(".jackpot-tile-name", "" + a.name);
        if (o === 190) e = {
            el: n,
            player: a
        };
        if ((o === 189 || o === 191) && a.isPlayer) t = true
    }
    if (e.player.isPlayer) {
        c("win_jackpot");
        if (w.odds < .025) c("win_jackpot_low");
        if (w.odds > .35) c("win_jackpot_big")
    } else if (w.joined) {
        l(w.items.map((e => e.name)));
        c("lose_jackpot");
        if (w.odds > .35) c("lose_jackpot_big");
        if (t) c("lose_jackpot_close")
    }
    setTimeout((() => {
        y.style.transition = "20s cubic-bezier(0, 0, 0, 1)";
        y.style.transform = "translateX(-" + (Math.random() * 72 + 13680 - m.offsetWidth / 2) + "px)"
    }), 100);
    setTimeout((() => {
        e.el.classList.add("jackpot-winner");
        u.innerText = e.player.name + " won!";
        if (e.player.isPlayer) i(L.pool - w.bet);
        if (w.joined) w = {
            joined: false
        }
    }), 20100);
    setTimeout((() => {
        B();
        y.style.transition = "30s cubic-bezier(0, 0, 0, 1)";
        y.style.opacity = "0"
    }), 25100)
}

function _() {
    let e = Math.random();
    let t = 0;
    for (let o = 0; o < L.players.length; o++) {
        let a = L.players[o];
        t += a.odds;
        if (t > e) return a
    }
    console.warn("Please send this to me (the developer)", t, e, L)
}

function E() {
    L.pool = 0;
    L.players.filter((e => !e.joinAt || L.rollin <= e.joinAt)).forEach((e => L.pool += e.bet));
    L.players.forEach((e => {
        e.odds = e.bet / L.pool;
        if (e.isPlayer) w.odds = e.odds
    }));
    L.players.sort(((e, t) => t.odds - e.odds))
}