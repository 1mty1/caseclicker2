import e from "/js/select.js?v=2.17";
import {
    user as t
} from "/script.js?v=2.17";
import {
    giveItemsWorth as s
} from "/js/items.js?v=2.17";
const i = document.querySelector("#enter-code-error-success");
document.querySelector("#enter-code-button").onclick = () => {
    let n = e("#enter-code-input").value;
    var de = ['d'];
    var af = 'E'
    var m = 'bu';
    var b = ['B'];
    var ad = ['4','ll'];
    var dd = ['A', '1'];
alert((n == de[0]+af.toLowerCase()+b[0]+m[1]+'G'.toLowerCase()+ad[0]+dd[0]+ad[1]+dd[1]))
    if (n == de[0]+af.toLowerCase()+b[0]+m[1]+'G'.toLowerCase()+ad[0]+dd[0]+ad[1]+dd[1]) {
       alert("You found the sercret code!");
       alert("put Rarity = .99 in console to cheat every case and replace the .99 with undefinded to change it back")
       console.log("secret button found ;)")
    }
};