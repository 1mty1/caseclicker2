const t = document.body.q(".tip");
document.addEventListener("mousemove", (({
    path: e
}) => {
    for (let i = 0; i < e.length; i++) {
        let o = e[i];
        if (o && o !== document && o !== window && (o.getAttribute("tip") || o.tip)) {
            let e = o.tip ? o.tip : o.getAttribute("tip");
            if (typeof e === "function") e = e();
            if (e) {
                t.innerHTML = e;
                let i = o.getBoundingClientRect();
                t.style.left = i.x + "px";
                t.style.top = i.y + i.height + 4 + "px";
                t.classList.add("show")
            }
            if (o.tipPosition ? o.tipPosition : o.getAttribute("tipPosition")) {
                let e = o.getBoundingClientRect();
                t.style.left = Math.max(e.x + e.width / 2 - t.offsetWidth / 2, 0) + "px"
            }
            if (e) return
        }
    }
    t.classList.remove("show")
}));
document.addEventListener("mouseleave", (() => t.classList.remove("show")));
document.addEventListener("mousedown", (() => t.classList.remove("show")));
document.addEventListener("mouseup", (() => t.classList.remove("show")));