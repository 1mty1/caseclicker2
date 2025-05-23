export let items = {};
let e = 0;
let o = 0;
let t = 0;
document.getElementById("loading-status").innerText = "Preparing load...";

function n(n) {
    ++o;
    const s = new XMLHttpRequest;
    s.onload = () => {
        let n = s.response;
        t += Object.keys(n).length;
        Object.keys(n).forEach((e => {
            if (e.startsWith("@")) delete n[e]
        }));
        Object.assign(items, n);
        if (++e >= o) {
            if (typeof c === "function") {
                c();
                console.log("Loaded " + o + " packages, containing " + t + " items!")
            } else {
                document.getElementById("loading-text").innerHTML = "An error occurred";
                document.getElementById("loading-status").innerHTML = "Try reloading the page, or try again another time...";
                return
            }
        }
        document.getElementById("loading-status").innerHTML = "Loaded data (" + (e - 1) + "/" + (o - 1) + ")...";
        document.getElementById("loading-progress").style.width = (e - 1) / (o - 1) * 100 + "%"
    };
    s.responseType = "json";
    s.open("GET", "/data/items/" + n + ".json?v=15");
    s.send()
}++o;
n("bravo");
n("breakout");
n("brokenfang");
n("cs20");
n("csgoweapon");
n("csgoweapon2");
n("csgoweapon3");
n("falchion");
n("fracture");
n("gamma");
n("horizon");
n("huntsman");
n("phoenix");
n("prisma");
n("prisma2");
n("spectrum");
n("spectrum2");
n("winteroffensive");
n("snakebite");
n("gamma2");
n("clutch");
n("chroma");
n("chroma2");
n("chroma3");
n("shadow");
n("collections/assault");
n("collections/aztec");
n("collections/dust");
n("collections/inferno");
n("collections/militia");
n("collections/nuke");
n("collections/office");
n("collections/vertigo");
n("vanguard");
n("revolver");
n("wildfire");
n("glove");
n("hydra");
n("dangerzone");
n("shatteredweb");
n("collections/risingsun");
n("collections/stmarc");
n("collections/overpass");
n("collections/norse");
n("collections/mirage");
n("collections/cobblestone");
n("collections/havoc");
n("collections/godsandmonsters");
n("collections/alpha");
n("collections/ancient");
n("collections/baggage");
n("collections/bank");
n("collections/cache");
n("collections/canals");
n("collections/chopshop");
n("collections/control");
n("collections/dust2");
n("collections/dust22021");
n("collections/inferno2018");
n("collections/italy");
n("collections/lake");
n("collections/mirage2021");
n("collections/nuke2018");
n("collections/safehouse");
n("collections/train");
n("collections/train2021");
n("collections/vertigo2021");
n("riptide");
n("doppler-phases/phases");
n("esports2013");
n("esports2013winter");
n("esports2014summer");
n("dreamsandnightmares");
++e;
let c;
export function onload() {
    return new Promise((e => c = e))
}