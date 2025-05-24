// deBug4All1



import {openCaseNavigateAway as e} from "https://raw.githubusercontent.com/1mty1/caseclicker2/refs/heads/main/js/opencase.js";
import {items as t, onload as o} from "/data/items.js?v=2.17";
import "/js/inputs.js?v=2.17";
import "/js/tips.js?v=2.17";
import "/js/welcome.js?v=2.17";
import "/js/sessions.js?v=2.17";
import "/js/casino.js?v=2.17";
import {getItem as a, itemQualities as l, renderItem as r} from "/js/items.js?v=2.17";
import n from "/js/select.js?v=2.17";
import {game as i} from "/js/game.js?v=2.17";
import {addStat as s} from "/js/achievements.js?v=2.17";
import {generateConvlr as c} from "/js/itemsn.js?v=2.17";

if (!localStorage.flags)
    localStorage.flags = "";
o().then((()=>{
    setTimeout((()=>{
        document.body.classList.add("data-loaded");
        c();
        showPage("welcome");
        i.emit("update");
        n("#floating-item-example").appendChild(r(t["StatTrak USP-S | Neo-Noir (Factory New)"]));
        for (let e = user.inventory.length - 1; e >= 0; e--) {
            let o = user.inventory[e];
            if (o === null) {
                console.log("AY");
                user.inventory.splice(e, 1);
                continue
            }
            let r = a(o);
            if (r.masterItem) {
                user.inventory.splice(e, 1);
                user.inventory.push(`${r.short} (${l[r.qualities[0]]})`)
            } else if (!t[o]) {
                let r = o.replace("(Factory New)", "").replace("(Minimal Wear)", "").replace("(Field-Tested)", "").replace("(Well-Worn)", "").replace("(Battle-Scarred)", "").trim();
                let n = r.startsWith("StatTrak");
                let i = r.startsWith("Souvenir");
                r = r.replace("Souvenir", "").replace("StatTrak", "").trim();
                if (t[r]) {
                    let t = a(r);
                    if (t.qualities[0] === undefined)
                        console.log(t);
                    let o = `${t.short} (${l[t.qualities[0]] || "Vanilla"})`;
                    if (n && t.stattrakAvailable)
                        o = "StatTrak " + o;
                    if (i && t.souvenirAvailable)
                        o = "Souvenir " + o;
                    user.inventory.splice(e, 1);
                    user.inventory.push(o)
                } else
                    console.log("ITEM DOESN'T EXIST ANYMORE", o, r)
            }
        }
    }
    ), 500)
}
));
import("/js/coinflip.js?v=2.17");
import("/js/jackpot.js?v=2.17");
import("/js/crash.js?v=2.17");
import("/js/mines.js?v=2.17");
import("/js/roulette.js?v=2.17");
import("/js/slots.js?v=2.17");
import("/js/click.js?v=2.17");
import "/js/online/leaderboard.js?v=2.0.b16";
import "/js/online/gifts.js?v=2.0.b16";
import("/js/inventory.js?v=2.17");
import("/js/shop.js?v=2.17");
import("/js/upgrades.js?v=2.17");
import("/js/inspectItem.js?v=2.17");
import("/js/lucky.js?v=2.17");
import("/js/stats.js?v=2.17");
import("/js/missions.js?v=2.17");
import("/js/collection.js?v=2.17");
import("/js/tradeup.js?v=2.17");
let u = false;
if (window.location.hostname === "localhost") {
    u = true;
    document.body.classList.add("dev");
    document.title = "(Development) Case Clicker 2 - MTSL"
}
export let currentPage = "";
let d = [];
export function showPage(t, o, a, l, r) {
    document.body.focus();
    let n = t.split("$")[0];
    let s = t.split("$")[1];
    currentPage = t;
    if (d[d.length - 1] === null)
        d.pop();
    if (!o)
        d.push(currentPage);
    else if (!a)
        d.push(null);
    if (!l)
        i.emit("update", true);
    let c = document.querySelectorAll("[page]");
    for (let e = 0; e < c.length; e++)
        c[e].classList.remove("show");
    let u = document.querySelectorAll("[nbtn]");
    for (let e = 0; e < u.length; e++) {
        u[e].classList.remove("active");
        if (u[e].getAttribute("nbtn") === n)
            u[e].classList.add("active")
    }
    if (d[d.length - 2] === "opencase")
        e();
    i.emit("showPage", {
        page: n,
        data: s,
        direct: r
    });
    if (!n)
        return;
    let g = document.querySelector("[page=" + n + "]");
    if (!g)
        return;
    g.classList.add("show");
    if (g.onshow)
        g.onshow()
}
export let user = {
    money: 240,
    tickets: 0,
    tokens: 0,
    xp: 0,
    stats: {
        creation: (new Date).getTime()
    },
    inventory: ["Spectrum Case"],
    upgrades: {},
    achievements: {},
    achievements_collected: {},
    luckyWheelWins: []
};
if (u)
    window.user = ()=>user;
function g(e) {
    return encodeURIComponent(e).replace(/%([0-9A-F]{2})/g, (function e(t, o) {
        return String.fromCharCode("0x" + o)
    }
    ))
}
function p(e) {
    return decodeURIComponent(e.split("").map((function(e) {
        return "%" + ("00" + e.charCodeAt(0).toString(16)).slice(-2)
    }
    )).join(""))
}
function m(e) {
    e = g(e);
    let t = {};
    let o = (e + "").split("");
    let a = [];
    let l;
    let r = o[0];
    let n = 256;
    for (let e = 1; e < o.length; e++) {
        l = o[e];
        if (t[r + l] != null)
            r += l;
        else {
            a.push(r.length > 1 ? t[r] : r.charCodeAt(0));
            t[r + l] = n;
            n++;
            r = l
        }
    }
    a.push(r.length > 1 ? t[r] : r.charCodeAt(0));
    return a.map((e=>{
        let t = e.toString(36);
        return t.substring(0, t.length - 1) + (t[t.length - 1].match(/[0-9]/) ? f[t[t.length - 1]] : t[t.length - 1].toUpperCase())
    }
    )).join("")
}
window.lzw_encode = m;



let f = {
  0: "?",
  1: "/",
  2: "=",
  3: "$",
  4: "%",
  5: "&",
  6: "!",
  7: "\\",
  8: "-",
  9: "+"};
let h = {
  "?":"0",
  "/": "1",
  "=":"2",
  $: "3",
  "%": "4",
  "&": "5",
  "!": "6",
  "\\": "7",
  "-": "8",
  "+": "9",
};






let v = Object.keys(h).join("");
function S(e) {
    let t = [];
    let o = "";
    for (let a = 0; a < e.length; a++) {
        let l = e[a];
        if (l.match(/[A-Z]/) || v.includes(l)) {
            o += v.includes(l) ? h[l] : l.toLowerCase();
            t.push(parseInt(o, 36));
            o = ""
        } else {
            o += l
        }
    }
    let a = {};
    let l = String.fromCharCode(t[0]);
    let r = l;
    let n = [l];
    let i = 256;
    let s;
    for (let e = 1; e < t.length; e++) {
        let o = t[e];
        if (o < 256)
            s = String.fromCharCode(t[e]);
        else
            s = a[o] ? a[o] : r + l;
        n.push(s);
        l = s[0];
        a[i] = r + l;
        i++;
        r = s
    }
    return p(n.join(""))
}
function w(e) {
    let t = {};
    let o = (e + "").split("");
    let a = o[0];
    let l = a;
    let r = [a];
    let n = 256;
    let i;
    for (let e = 1; e < o.length; e++) {
        let s = o[e].charCodeAt(0);
        if (s < 256)
            i = o[e];
        else
            i = t[s] ? t[s] : l + a;
        r.push(i);
        a = i.charAt(0);
        t[n] = l + a;
        n++;
        l = i
    }
    return r.join("")
}
function y() {
    return m(JSON.stringify(user))
}
function I(e) {
    try {
        if (e === "1") {
            localStorage.v1SaveSnapshot = localStorage.localsave;
            document.cookie = localStorage.v1SaveSnapshot
            let e = w(localStorage.localsave).split("").map((e=>e.charCodeAt(0) - 1));
            document.cookie = e
            let t = new TextDecoder;
            return JSON.parse(t.decode(new Uint8Array(e)))
        } else if (e === "2") {
            return JSON.parse(S(localStorage.localsave))
        }
    } catch (e) {
        console.error(e);
        delete localStorage._cbid;
        return user
    }
}

if (localStorage.localsave)
    user = I(localStorage.lsver || "1");
if (!localStorage.localuser)
    localStorage.localuser = (new Date).getTime().toString(36) + "." + Math.floor(Math.random() * 36 ** 11).toString(36);
function j() {
    if (window.disableSaving)
        return;
    try {
        if (b)
            return;
        let e = y();
        localStorage.lsver = "2";
        if (e)
          document.cookie = e
           try { localStorage.localsave = e } catch(err) {
             console.log(err)
           }
    } catch (e) {
       // alert("An error occurred doing auto save. Please report it via the discord server! --- " + e + " - LSL:" + (localStorage.localsave?.length || 0) + " - GOL:" + JSON.stringify(user).length)
    }
}
window.onbeforeunload = ()=>j();
setInterval((()=>j()), 1e4);
let b = false;
window.wipeSave = function() {
    b = true;
    delete localStorage._cbid;
    delete localStorage.localsave;
    delete localStorage.shop;
    delete localStorage.flags;
    delete localStorage.backup;
    delete localStorage.backupid;
    window.location.reload()
}
;
;
if (localStorage.backupid && localStorage.backupid !== localStorage._cbid) {
    document.getElementById("recover-btn").style.display = "initial";
    document.getElementById("dismiss-recover-btn").style.display = "initial";
    document.getElementById("recover-btn").onclick = ()=>{
        if (confirm("Do you want to recover your old save? The current save will be lost.")) {
            b = true;
            localStorage._cbid = localStorage.backupid;
            localStorage.localsave = localStorage.backup;
            window.location.reload()
        }
    }
    ;
    document.getElementById("dismiss-recover-btn").onclick = ()=>{
        if (confirm("Are you sure?")) {
            delete localStorage.backup;
            delete localStorage.backupid;
            localStorage._cbid = localStorage.localuser;
            document.getElementById("recover-btn").style.display = "none";
            document.getElementById("dismiss-recover-btn").style.display = "none"
        }
    }
}
let k = ["Recruit", "Private I", "Private II", "Private III", "Private IV", "Corporal I", "Corporal II", "Corporal III", "Corporal IV", "Sergeant I", "Sergeant II", "Sergeant III", "Sergeant IV", "Master Sergeant I", "Master Sergeant II", "Master Sergeant III", "Master Sergeant IV", "Sergeant Major I", "Sergeant Major II", "Sergeant Major III", "Sergeant Major IV", "Lieutenant I", "Lieutenant II", "Lieutenant III", "Lieutenant IV", "Captain I", "Captain II", "Captain III", "Captain IV", "Major I", "Major II", "Major III", "Major IV", "Colonel I", "Colonel II", "Colonel III", "Brigadier General", "Major General", "Lieutenant General", "General", "Global General"];
const P = .1;
export function getPlayerLevel() {
    let e = 0;
    function t() {
        let o = Math.round(e ** (P * e + 1) * 1e3);
        let a = Math.round((e + 1) ** (P * (e + 1) + 1) * 1e3);
        if (a <= user.xp && e < 40) {
            ++e;
            return t()
        } else
            return {
                level: e,
                xps: o,
                xpa: user.xp - o,
                xpp: (user.xp - o) / (a - o),
                xpn: a - o
            }
    }
    return t()
}
i.on("update", (e=>{
    n("#money").innerText = numToString(user.money / 100, 2) + "€";
    n("#tickets").innerText = numToString(user.tickets);
    n("#tokens").innerText = numToString(user.tokens);
    n("#level-bar-text-left").innerText = numToString(getPlayerLevel().xpa) + "/" + numToString(getPlayerLevel().xpn) + " xp";
    n("#level-bar-text-right").innerText = "level " + getPlayerLevel().level;
    n("#level-bar-p").style.width = getPlayerLevel().xpp * 100 + "%";
    n("#level-image").style.backgroundImage = 'url("images/level ' + getPlayerLevel().level + '.png")';
    n("#level-title").innerText = k[getPlayerLevel().level];
    Array.from(document.querySelectorAll("[display]")).forEach((e=>{
        switch (e.getAttribute("display")) {
        case "tokens":
            e.innerText = numToString(user.tokens) + " chips";
            break
        }
    }
    ));
    if (!e)
        showPage(currentPage, true, false, false, true)
}
));
export function numToString(e, t=0) {
    e = Math.floor(e * 10 ** t) / 10 ** t;
    if (e < 1e4)
        return e.toFixed(t);
    else if (e < 1e6)
        return e < 1e5 ? Math.floor(e / 10) / 100 + "k" : Math.floor(e / 100) / 10 + "k";
    else if (e < 1e9)
        return e < 1e7 ? Math.floor(e / 1e4) / 100 + "m" : Math.floor(e / 1e5) / 10 + "m";
    else if (e < 1e12)
        return Math.floor(e / 1e8) / 10 + "t";
    else if (e < 1e15)
        return Math.floor(e / 1e11) / 10 + "q"
}
document.onmousedown = e=>{
    if (!e.path)
        e.path = e.composedPath();
    for (let t = 0; t < e.path.length - 2; t++)
        if (e.path[t].classList.contains("dropdown"))
            return;
    for (let e = 0; e < n(".dropdown").length; e++)
        n(".dropdown")[e].classList.remove("show");
    Array.from(document.getElementsByClassName("js-dropdown")).forEach((e=>{
        document.body.removeChild(e)
    }
    ))
}
;
export function goToPreviousPage() {
    if (d.length > 1) {
        d.pop();
        showPage(d[d.length - 1], true, true)
    }
}
let T = document.querySelectorAll("[showpage]");
for (let e = 0; e < T.length; e++)
    T[e].onclick = ()=>showPage(T[e].getAttribute("showpage"));
function L(e) {
    e = parseInt(e);
    for (let e = 1; e <= 3; e++)
        document.body.classList.remove("graphics-level-" + e);
    for (let t = 1; t <= e; t++)
        document.body.classList.add("graphics-level-" + t);
    localStorage.graphicsLevel = e;
    window.graphicsLevel = e;
    n("#current-graphic-level").innerText = ["Super Low", "Low", "Medium", "Ultra"][e]
}
L(localStorage.graphicsLevel || 1);
window.setGraphicsLevel = L;
export function setAlwaysCompact(e) {
    e = e + "" === "true";
    localStorage.compactMode = e;
    window.alwaysCompact = e;
    C()
}
setAlwaysCompact(localStorage.compactMode || false);
window.setAlwaysCompact = setAlwaysCompact;
window.addEventListener("touchstart", (function(e) {
    if (e.target.tagName !== "BUTTON" && e.target.classList.contains("item")) {
        e.preventDefault()
    }
}
), {
    passive: false
});
window.addEventListener("keydown", (e=>{
    if (e.key === "Escape")
        goToPreviousPage()
}
));
window.addEventListener("resize", (()=>i.emit("update")));
window.addEventListener("resize", (()=>C()));
function C() {
    if (window.innerHeight <= 850 || window.innerWidth <= 1150) {
        n("#toggle-compact").innerText = "Compact is enabled by default due to screen resolution";
        n("#toggle-compact").disabled = true
    } else {
        n("#toggle-compact").innerText = "Toggle Compact";
        n("#toggle-compact").disabled = false
    }
    document.body.classList.toggle("compact", window.innerHeight <= 850 || window.innerWidth <= 1150 || alwaysCompact);
    document.body.classList.toggle("natural-compact", window.innerHeight <= 850 || window.innerWidth <= 1150)
}
C();
setInterval((()=>{
    user.money += user.upgrades.passiveIncome || 0;
    s("earned_cash", user.upgrades.passiveIncome || 0);
    i.emit("update", true)
}
), 1e3);
setInterval((()=>{
    localStorage.lastSeen = Math.floor((new Date).getTime() / 1e3).toString(36)
}
), 1e3);
function x(e, t) {
    let o = Math.min(t, user.upgrades.offlineBank || 7500);
    const a = document.body.q(".dialog-overlay");
    a.q(".floating-dialog", {
        c: [q(".floating-dialog-header", {
            c: [q(".floating-dialog-title", "Offline Earnings"), q(".floating-dialog-close", {
                onclick() {
                    document.body.removeChild(a)
                }
            })]
        }), q(".floating-dialog-body", {
            c: [q(".floating-dialog-text", `Welcome back! You have earned ${(o / 100).toFixed(2)} € while being offline!`), o < t && q(".floating-dialog-text", `But if your offline bank capacity was higher, you could have earned ${(t / 100).toFixed(2)} €...`)]
        })]
    })
}
function M() {
    let e = Math.ceil((new Date).getTime() / 1e3) - parseInt(localStorage.lastSeen, 36);
    let t = Math.floor((user.upgrades.passiveIncome || 0) * ((user.upgrades.offlineIncome || 0) / 100) * e);
    if (t > 100) {
        x(e, t);
        user.money += Math.min(t, user.upgrades.offlineBank || 7500);
        s("earned_cash", Math.min(t, user.upgrades.offlineBank || 7500));
        i.emit("update")
    }
}
M();
setTimeout((()=>i.emit("update")), 100);
document.body.classList.add("game-ready");
setInterval((()=>{
    if (!user.seasonTimePlayed)
        user.seasonTimePlayed = 0;
    user.seasonTimePlayed += 1;
    s("time_played", 1)
}
), 1e3);
window.addEventListener("keydown", (e=>{
    if (document.activeElement.tagName === "INPUT")
        return;
    if (currentPage !== "click" && e.key === "e")
        showPage("click");
    if (currentPage !== "shop" && e.key === "s")
        showPage("shop");
    if (currentPage !== "betting" && e.key === "g")
        showPage("betting");
    if (currentPage !== "upgrades" && e.key === "u")
        showPage("upgrades");
    if (currentPage !== "missions" && e.key === "m")
        showPage("missions");
    if (currentPage !== "achievements" && e.key === "a")
        showPage("achievements");
    if (currentPage !== "collection" && e.key === "c")
        showPage("collection");
    if (currentPage !== "tradeup" && e.key === "t")
        showPage("tradeup");
    if (document.activeElement.tagName === "INPUT")
        e.preventDefault()
}));
if (!localStorage.backupid || localStorage.backupid === localStorage._cbid) {
    localStorage.backup = localStorage.localsave;
    document.cookie = localStorage.backup;
    localStorage._cbid = Math.random();
    localStorage.backupid = localStorage._cbid
}



