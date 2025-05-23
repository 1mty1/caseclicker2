import {
	game as e
} from "/js/game.js?v=2.0.b16";
import t from "/js/select.js?v=2.0.b16";
import {
	getPlayerLevel as a,
	user as o
} from "/script.js?v=2.0.b16";
import {
	getInventoryValue as r
} from "/js/items.js?v=2.0.b16";
import {
	getProfile as n
} from "/js/online/profile.js?v=2.0.b16";
import {
	formatNum as s
} from "/js/format.js?v=2.0.b16";
if (!localStorage.hasOwnProperty("appearOnLeaderboard")) localStorage.appearOnLeaderboard = false;
const l = t("#pages").q(".page[page=leaderboard]");
l.q("h1", {
	text: "Leaderboard"
}).q(".h1-beta-flag", "Beta");
l.q("p.subtitle", {
	text: "Welcome to the Leaderboard! The top 100 players, ranked after total wealth: cash, inventory value and casino chips."
});
l.q("p.subtitle", {
	text: "The leaderboard will be cleared around the end of each month to remove inactive players."
});
var cheaters = 0
const d = l.q("table.leaderboard-table");

function c() {
	d.innerHTML = "Loading...";
	fetch("https://csgo.mtsl.dk/api/v15/leaderboard.asp?mode=get&u=" + localStorage.localuser).then((e => e.json())).then((e => {
		d.innerHTML = "";
		const t = d.q("tr");
		t.q("th", {
			text: "#"
		});
		t.q("th", {
			text: "Player Name"
		});
		t.q("th", {
			text: "Level"
		});
		t.q("th", {
			text: "Time Played"
		});
		t.q("th", {
			text: "Money"
		});
		t.q("th", {
			text: "Inv Value"
		});
		t.q("th", {
			text: "Casino Chips"
		});
		e.top.forEach(((t, a) => {
			const o = JSON.parse(decodeURIComponent(t));
			const r = d.q("tr" + (a === e.you ? ".leaderboard-player-entry" : ""));
      if (o.money > 100000000000000) {
        cheaters += 1
        return r
      }
			r.q("td.place", {
				text: a + 1 - cheaters + "."
			});
			r.q("td", {
				text: o.name ?? "Anonymous Player"
			});
			r.q("td.lb-t-sc", {
				text: o.level ?? "–"
			});
			r.q("td.lb-t-sc", {
				text: o.seasonTimePlayed ? b(o.seasonTimePTimePlayed) : "–"
			});
			r.q("td", {
				text: s(o.money, 2) + " €" ?? "–"
			});
			r.q("td", {
				text: s(o.invvalue, 2) + " €" ?? "–"
			});
			r.q("td", {
				text: parseInt(o.tokens) ?? "–"
			});
		}))
	}))
  cheaters = 0
}
const i = l.q(".leaderboard-upload");
i.q("input[type=checkbox]", {
	checked: localStorage.appearOnLeaderboard === "true",
	onclick() {
		localStorage.appearOnLeaderboard = this.checked;
		if (this.checked) m();
		else h()
	}
});
const p = i.q("p", "Appear on the leaderboard!");

function h() {
	p.innerText = "Removing you from the leaderboard...";
	fetch("https://csgo.mtsl.dk/api/v15/leaderboard.asp?mode=remove&u=" + localStorage.localuser).then((e => e.json())).then((e => {
		if (e.success) {
			p.innerText = "Removed you from the leaderboard.";
			c()
		} else p.innerText = "Couldn't remove you from the leaderboard."
	}))
}

function m() {
	if (localStorage.appearOnLeaderboard !== "true") {
		c();
		return
	}
	p.innerText = "Uploading!";
	let e = r(false);
	fetch("https://csgo.mtsl.dk/api/v15/leaderboard.asp?mode=set&s=" + Math.floor(o.money + e + o.tokens) + "&p=" + encodeURIComponent(JSON.stringify({
		name: n().name,
		money: Math.floor(o.money),
		level: a().level,
		seasonTimePlayed: o.seasonTimePlayed,
		invvalue: e,
		tokens: Math.floor(o.tokens),
		c: o.stats.clicks || 0,
		o: o.stats.opened_cases || 0,
		ec: o.stats.earned_cash || 0,
		ex: o.stats.earned_xp || 0,
		e: o.stats.earnings_from_skin_sales || 0
	})) + "&u=" + localStorage.localuser).then((e => e.json())).then((e => {
		p.innerText = "Appear on the leaderboard.";
		c()
	}))
}
e.on("showPage", (e => {
				if (e.page === "leaderboard" && !e.direct) m()
				}))

			function b(e) {
				return (
					Math.floor(e / 60 / 60) +
					":" +
					(Math.floor(e / 60) % 60).toString().padStart(2, "0") +
					":" +
					(e % 60).toString().padStart(2, "0")
				);
			}