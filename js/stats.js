import e from "/js/select.js?v=2.17";
import {
    game as t
} from "/js/game.js?v=2.17";
import {
    showPage as s,
    user as i
} from "/script.js?v=2.17";
const o = e("#pages").q(".page[page=stats]");
o.q("h1", {
    text: "Statistics"
});
o.q("button.button", {
    text: "Show Achievements",
    style: {
        marginLeft: "30px",
        marginBottom: "30px"
    },
    onclick() {
        s("achievements")
    }
});
const a = o.q();
const n = [{
    stat: "clicks",
    title: "Clicks",
    desc: "The number of times you have clicked to earn money."
}, {
    stat: "earnings_from_clicks",
    title: "Earnings from clicks",
    desc: "The amount of money you have earned from clicking.",
    unit: "money"
}, {
    stat: "xp_from_clicks",
    title: "Experience from clicks",
    desc: "The amount of XP you have earned from clicking.",
    unit: "xp"
}, {
    stat: "time_played",
    title: "Time Played",
    desc: "The amount of time you have spend.",
    unit: "time-seconds"
}, {
    stat: "opened_cases",
    title: "Opened Cases",
    desc: "The number of cases you have opened."
}, {
    stat: "opened_rarities_2",
    title: "Opened Milspec",
    desc: 'The number of "milspec" rarity skins you have opened.'
}, {
    stat: "opened_rarities_3",
    title: "Opened Restricted",
    desc: 'The number of "restricted" rarity skins you have opened.'
}, {
    stat: "opened_rarities_4",
    title: "Opened Classified",
    desc: 'The number of "classified" rarity skins you have opened.'
}, {
    stat: "opened_rarities_5",
    title: "Opened Covert",
    desc: 'The number of "covert" rarity skins you have opened.'
}, {
    stat: "opened_rarities_6",
    title: "Opened Exceedingly Rare",
    desc: "The number of exceedingly rare skins you have opened."
}, {
    stat: "skin_sold",
    title: "Skins Sold",
    desc: "The number of items you have sold."
}, {
    stat: "earnings_from_skin_sales",
    title: "Earnings From Skin Sales",
    desc: "The amount of money you have earned selling skins.",
    unit: "money"
}, {
    stat: "skin_sold_gt10",
    title: "Skins Sold > 10 €",
    desc: "The number of items you have sold, where each was worth more than 10 €."
}, {
    stat: "skin_sold_gt50",
    title: "Skins Sold > 50 €",
    desc: "The number of items you have sold, where each was worth more than 50 €."
}, {
    stat: "skin_sold_gt250",
    title: "Skins Sold > 250 €",
    desc: "The number of items you have sold, where each was worth more than 250 €."
}, {
    stat: "skin_sold_r2",
    title: "Skins Sold with Milspec rarity",
    desc: 'The number of items you have sold with "milspec" rarity.'
}, {
    stat: "skin_sold_r3",
    title: "Skins Sold with Restricted rarity",
    desc: 'The number of items you have sold with "restricted" rarity.'
}, {
    stat: "skin_sold_r4",
    title: "Skins Sold with Classified rarity",
    desc: 'The number of items you have sold with "classified" rarity.'
}, {
    stat: "skin_sold_r5",
    title: "Skins Sold with Covert rarity",
    desc: 'The number of items you have sold with "restricted" rarity.'
}, {
    stat: "skin_sold_r6",
    title: "Skins Sold with Exceedingly Rare rarity",
    desc: "The number of exceedingly rare skins you have sold."
}, {
    stat: "skin_sold_r6",
    title: "Skins Sold with Exceedingly Rare rarity",
    desc: "The number of exceedingly rare skins you have sold."
}, {
    stat: "total_coinflips",
    title: "Coinflips Played",
    desc: "The number of coinflips you have played."
}, {
    stat: "total_coinflips_won",
    title: "Coinflips Won",
    desc: "The number of coinflips you have won."
}, {
    stat: "total_coinflips_lost",
    title: "Coinflips Lost",
    desc: "The number of coinflips you have lost."
}, {
    stat: "win_jackpot",
    title: "Jackpots Won",
    desc: "The number of jackpots you have won."
}, {
    stat: "lose_jackpot",
    title: "Jackpots Lost",
    desc: "The number of jackpots you have lost."
}, {
    stat: "total_winnings",
    title: "Winnings from Coinflip and Jackpot",
    desc: "The total amount of money (in skin value) you have won from coinflip and jackpot.",
    unit: "money"
}, {
    stat: "total_lucky_wheel_spins",
    title: "Lucky Wheel Spins",
    desc: "The number of times you have spun the lucky wheel."
}, {
    stat: "purchased_upgrades",
    title: "Purchased Upgrades",
    desc: "The number of upgrades you have purchased"
}, {
    stat: "missions_finished",
    title: "Mission Finished",
    desc: "The number of missions you have finished"
}, {
    stat: "items_discovered",
    title: "Items Discovered",
    desc: "The number of items you have discovered."
}, {
    stat: "skins_discovered",
    title: "Skins Discovered",
    desc: "The number of skins you have discovered."
}, {
    stat: "tradeups",
    title: "Trade Up Contracts",
    desc: "The number of times you have done a trade up contract."
}];

function r() {
    a.innerHTML = "";
    n.forEach((e => {
        a.q(".stats-stat", {
            c: [q(".stats-stat-title", {
                text: e.title
            }), q(".stats-stat-description", {
                text: e.desc
            }), q(".stats-stat-value", {
                text: e.unit === "time-seconds" ? Math.floor(i.stats[e.stat] / 60 / 60) + ":" + (Math.floor(i.stats[e.stat] / 60) % 60).toString().padStart(2, "0") + ":" + (i.stats[e.stat] % 60).toString().padStart(2, "0") : e.unit === "money" ? (i.stats[e.stat] / 100 || 0).toLocaleString(undefined, {
                    minimumFractionDigits: 2
                }) + " €" : (i.stats[e.stat] || 0).toLocaleString()
            })]
        })
    }))
}
t.on("showPage", (e => e.page === "stats" && r()));