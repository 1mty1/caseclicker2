import {
    items as e
} from "/data/items.js?v=2.17";
export let convl = {};
export let convr = {};
export let conv = false;
export function generateConvlr() {
    Object.keys(e).forEach((r => {
        if (!e[r].masterItem && e[r].type === "skin") {
            let l = e[r].name.replace(/弐/g, "B").replace(/[^A-z0-9- |]/g, "").replace("StatTrak", "7").replace("Souvenir", "8").replace("Factory New", "1").replace("Minimal Wear", "2").replace("Field-Tested", "3").replace("Well-Worn", "4").replace("Battle-Scarred", "5").split(" | ").map((e => e.replace(/[-]/g, "").split(" ").map((e => e.length < 4 ? e : e.substring(0, 3) + e.substring(e.length - 1, e.length))).join(""))).join("").toLowerCase();
            if (convl[l]) console.log("Error", r, convl[l]);
            convl[l] = r;
            convr[r] = l
        }
    }));
    conv = true
}