// Imports from other modules
import {user as e} from "/script.js?v=2.17";               // User data (money, xp, upgrades)
import {createNotification as t} from "/js/notifications.js?v=2.17"; // Function to show notifications
import {addStat as o} from "/js/achievements.js?v=2.17";   // Function to add achievement stats
import s from "/js/select.js?v=2.17";                       // Selector helper
import {game as a} from "/js/game.js?v=2.17";              // Game event emitter

// Select the main click page container
const n = s("#pages").q(".page.center-v[page=click]");

// Set some UI text content
n.q(".clickbtn", "€");                                     // Change click button label here
n.q(".click-how2-text", "Press anywhere to earn money!"); // Change instructions text here
const i = n.q(".click-how2-text").q("span", "0 €/s");      // Select span for showing money per second
n.q(".click-how2-text", "TIP! Increase your average €/c by buying min and max clicker upgrades!"); // Tooltip text

// Array holding time intervals between clicks, max length 20
const l = new Array(20).fill(1e3);
let r = 0;       // Timestamp of last click
let c;           // Flag for click speed warning

// Main click handler function
function p(s) {
    if (s) {
        let a = (new Date).getTime();  // Current time in ms
        
        // Ensure the time interval between clicks isn't negative
        if (a - r > 1e3) 
            r = a - 1e3;
        
        l.pop();               // Remove oldest interval
        l.unshift(a - r);      // Add newest interval at front
        r = a;                 // Update last click time
        
        // Read upgrades or use defaults
        let n = e.upgrades.maxClick || 4;  // Max click money multiplier (change here)
        let p = e.upgrades.minClick || 2;  // Min click money multiplier (change here)
        let f = 1;                         // Speed factor multiplier
        
        // Average time between clicks
        let d = l.reduce(((e,t)=>t + e)) / l.length;
        
        // Update money per second display
        i.innerHTML = `${(1e3 / d * (((n - p) / 2 + p) / 100)).toFixed(2)} €/s`;
        
        // Adjust speed factor if clicking too fast
       // if (d < 100) f = Math.max(0, (d - 50) / 50);
        
        // If clicking really fast, show a notification once
        if (d < 50 && !c) {
            c = true;
            t({ message: "You are clicking too fast!" }); // Change warning text here
        }
        
        // Calculate money earned this click, based on upgrades and speed factor
        let g = Math.round((Math.random() * (n - p) + p) * f);  // Money earned (change here)
        
        // Calculate XP earned this click
        let y = Math.round(Math.random() * 5 * f);              // XP earned (change max XP here)
        
        // Update achievements/stats
        o("earned_cash", g);
        o("earnings_from_clicks", g);
        o("earned_xp", y);
        o("xp_from_clicks", y);
        
        // Show floating animations for money and xp gained
        m(s.pageX || s.changedTouches?.[0]?.pageX, s.pageY || s.changedTouches?.[0]?.pageY, "%b€", "money", g);
        m(s.pageX || s.changedTouches?.[0]?.pageX, s.pageY || s.changedTouches?.[0]?.pageY, "%a xp", "xp", y);
        
        o("clicks");  // Count this as a click stat
    }
}

// Function to create floating text effects on screen
function m(t, n, i, l, r) {
    // Create floating text element with replaced values (%a and %b)
    let c = document.body.q(".floating-text", `+ ${i.replace(/%a/g, r.toFixed(0)).replace(/%b/g, (r / 100).toFixed(2))}`);
    
    // Position text centered on click point
    t = t - c.offsetWidth / 2;
    n = n - c.offsetHeight;
    c.style.left = t + "px";
    c.style.top = n + "px";
    
    // Animate movement: floating upwards and side to side
    setTimeout(() => {
        c.style.left = t + Math.random() * 60 - 30 + "px";    // Change horizontal range (60,30)
        c.style.top = n - Math.random() * 100 - 40 + "px";     // Change vertical range (100,40)
    }, 50);
    
    // Fade out
    setTimeout(() => c.style.opacity = "0", 400);
    
    // Remove element after animation
    setTimeout(() => document.body.removeChild(c), 500);
    
    // Animate UI number changes (money or xp)
    setTimeout(() => {
        if (l === "money") {
            s("#money").style.transition = "0s";
            s("#money").style.fontSize = "48px";  // Enlarge money text
        } else if (l === "xp") {
            s("#level-bar-p").style.transition = "0s";
            s("#level-bar-p").style.boxShadow = "0 3px #ffff inset"; // Highlight XP bar
        }
        setTimeout(() => {
            if (l === "money") {
                e.money += r;  // Add money
                s("#money").style.transition = ".4s";
                s("#money").style.fontSize = "24px";  // Shrink back
            } else if (l === "xp") {
                e.xp += r;     // Add xp
                o("earned_xp", r);
                s("#level-bar-p").style.transition = ".4s";
                s("#level-bar-p").style.boxShadow = "0 3px #fff0 inset"; // Remove highlight
            }
            a.emit("update"); // Tell game to update UI
        }, 20);
    }, 500);
}

// Flag to prevent double firing on touch+mouse
let f = false;

// Listen for touch events, call click handler
n.addEventListener("touchstart", (e => {
    f = true;
    p(e);
}));

// Listen for mouse down events, call click handler if not just fired by touch
n.addEventListener("mousedown", (e => {
    if (!f) p(e);
    f = false;
}));

// === Developer Tool UI for Money and XP (Draggable) ===
const MGui = document.createElement("div");
Object.assign(MGui.style, {
    position: "fixed",
    /* middle: "0px", */
   /* right: "0px", */
    right: "10px",
    top: "50%",
    background: "#222",
    color: "#fff",
    padding: "15px",
    fontFamily: "monospace",
    zIndex: 9999,
    borderRadius: "10px",
    display: "none",
    maxWidth: "300px",
    boxShadow: "0 0 10px rgba(0,0,0,0.5)",
});

MGui.innerHTML = `
  <h3 style="margin-top:0;">Money + XP Tool</h3>
  <label>Money (€):</label><br/>
  <input id="moneyInput" type="number" placeholder="Enter money" style="width:100%; margin-bottom:5px;"><br/>
  <label>XP:</label><br/>
  <input id="xpInput" type="number" placeholder="Enter XP" style="width:100%; margin-bottom:10px;"><br/>
  <button id="giveMoneyXpBtn" style="width:100%;">Give Money + XP</button>
`;

document.body.appendChild(MGui);

// === Logic for Giving Money and XP ===
document.getElementById("giveMoneyXpBtn").onclick = () => {
    const moneyAmount = parseInt(document.getElementById("moneyInput").value) || 0;
    const xpAmount = parseInt(document.getElementById("xpInput").value) || 0;

    e.money += moneyAmount * 100;
    e.xp += xpAmount;

    s("#money").textContent = e.money.toLocaleString() + " €";
    const xpEl = document.querySelector("#xp-count");
    if (xpEl) xpEl.textContent = e.xp.toLocaleString() + " XP";

    a.emit("update");
  
    console.log(`%c[DevTool] +€${moneyAmount.toFixed(2)} and +${xpAmount} XP granted.`, "color: lime");

};

// === Toggle GUI with 3 ===
document.addEventListener("keydown", (e) => {
    if (e.key === "3") {
        e.preventDefault();
        MGui.style.display = MGui.style.display === "none" ? "block" : "none";
        const state = MGui.style.display === "block" ? "enabled" : "disabled";
        console.log(`%cMoney + XP GUI ${state}.`, "color: cyan");
    }
});
