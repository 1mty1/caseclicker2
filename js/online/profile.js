import e from "/js/select.js?v=2.17";
if (!localStorage.localprofile) localStorage.localprofile = JSON.stringify({
    name: "Player #" + Math.ceil(Math.random() * 9999).toString().padStart(4, "0")
});
export function getProfile() {
    return JSON.parse(localStorage.localprofile || {})
}

function o(e) {
    localStorage.localprofile = JSON.stringify(e)
}
const t = document.body.q("canvas", {
    width: 64,
    height: 64,
    style: {
        opacity: 0,
        pointerEvents: "none"
    }
});
const a = document.body.q("input", {
    type: "file",
    accept: "image/png, image/jpeg",
    style: {
        opacity: 0,
        pointerEvents: "none"
    },
    oninput() {
        const e = t.getContext("2d");
        let o = new FileReader;
        o.readAsDataURL(this.files[0]);
        o.onload = () => {
            const a = new Image;
            a.onload = () => {
                e.fillRect(0, 0, 64, 64);
                e.drawImage(a, 0, 0, 64, 64);
                const o = t.toDataURL();
                localStorage.localprofile_avatar_x64b = o.substring(22);
                r();
                l()
            };
            a.src = o.result
        }
    }
});
export function updateProfilePicture() {
    a.click()
}
export function clearProfilePicture() {
    delete localStorage.localprofile_avatar_x64b;
    r();
    l()
}
export function getProfilePictureDataURL() {
    return localStorage.localprofile_avatar_x64b ? "data:image/png;base64," + localStorage.localprofile_avatar_x64b : ""
}
window.getProfilePictureDataURL = getProfilePictureDataURL;
window.updateProfilePicture = updateProfilePicture;
window.clearProfilePicture = clearProfilePicture;

function l() {
    e("#nav-profile").innerHTML = "";
    const o = getProfile();
    e("#nav-profile").q(".nav-profile-picture", {
        style: {
            backgroundImage: `url(${getProfilePictureDataURL()})`,
            backgroundSize: "100% 100%"
        }
    }).s(".nav-profile-name", {
        text: o.name
    }).q(".nav-profile-expand")
}
l();
const i = document.body.q("#local-profile-popup");

function r(e) {
    i.innerHTML = "";
    const t = getProfile();
    let a = t.name;
    i.q(".local-pop-notice", "This is how you appear when using online features.");
    const r = i.q(".local-pop-profile").q(".local-pop-picture", {
        style: {
            backgroundImage: `url(${getProfilePictureDataURL()})`,
            backgroundSize: "100% 100%"
        },
        onclick() {
            updateProfilePicture()
        }
    }).s("input.local-pop-name", {
        value: t.name,
        maxLength: 20,
        oninput() {
            if (!this.value.trim()) t.name = a;
            else t.name = this.value.trim();
            o(t);
            l()
        },
        onblur() {
            this.value = getProfile().name
        }
    });
    if (e) r.focus();
    i.q(".local-pop-notice", "Your account is stored locally and can't be moved to another device. If you reset your browser data, you also delete your account.");
    i.classList.add("show")
}

function n() {
    i.classList.remove("show")
}
document.addEventListener("mousedown", (e => {
    let o = true;
    let t = e.target;
    while (t) {
        if (t === i) o = false;
        t = t.parentElement
    }
    if (o) n()
}));
e("#nav-profile").onclick = () => {
    r()
};
window.openProfilePopup = () => r(true);