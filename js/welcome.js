import e from "/js/select.js?v=2.17";
const n = e("#pages").q(".page[page=welcome]", {
  css: {
    background: "radial-gradient(circle at bottom, #0c2524, #2f2431)",
    boxShadow: "0 0 32px 4px #222 inset",
  },
});
n.q(".welcome-page-title", "Case Clicker 2 - Unblocked");
const o = n.q(".welcome-page-information-row");
const i = o.q();
const t = o.q();
i.q(".welcome-page-information-box")
  .q(".welcome-page-information-box-title", "Welcome!")
  .s(".welcome-page-information-box-content", {
    html: `\n<p>Welcome to Case Clicker 2 Unblocked.</p>\n<p>This is the unblocked & modded version of <a href="csgo.mtsl.dk">Case Clicker 2</p>\n`,
  });
t.q(".welcome-page-information-box")
  .q(".welcome-page-information-box-title", {
    html: 'Version 2.17 released <span style="font-size: 0.6em; font-style: italic;">v2.17 changelog</span>',
  })
  .s(".welcome-page-information-box-content", {
    html: `\n<p>This update was mainly focused on performance on both the client and server, but I ended up adding some features anyways. Enjoy.</p>\n<ul>\n  <li>Games/Casino:\n    <ul>\n      <li>Added roulette.</li>\n      <li>Added slots.</li>\n      <li>Improved the Jackpot game: You can now see the top skins in a jackpot game.</li>\n      <li>Improved the Crash game.</li>\n      <li>Improved the coinflip server.</li>\n      <li>Improved the casino UX when converting to and from coins.</li>\n      <li>1 € is now 8 chips.</li>\n    </ul>\n  </li>\n  <li>Inventory:\n    <ul>\n      <li>Added inventory search.</li>\n      <li>Added alphabetic sorting to the inventory.</li>\n    </ul>\n  </li>\n  <li>Added profile pictures.</li>\n  <li>Added new statistics and missions.</li>\n  <li>Removed the leaderboard.</li>\n  <li>Out of beta, kinda, nothing really has changed but it can't stay in "beta" forever.</li>\n  <li>Other minor improvements.</li>\n</ul>\n`,
  });
i.q(".welcome-page-information-box")
  .q(".welcome-page-information-box-title", {
    html: "Roadmap",
  })
  .s(".welcome-page-information-box-content", {
    html: `\n<p>Here is what I'm currently planning on adding to the game ;D</p>\n<ul>\n  <li>Mobile Support</li>\n  <li>Online Jackpot</li>\n  <li>Updating the older and buggier features of the game</li>\n</ul>\n<p>This list is not ordered nor is it complete. Do you have an idea? Or just a small tweak to the game? Please send it in the discord or via the feedback button :)</p>\n`,
  });
i.q(".welcome-page-information-box")
  .q(".welcome-page-information-box-title", {
    html: "Unblocked Version",
  })
  .s(".welcome-page-information-box-content", {
    html: `This is only an modded & unblocked version, not a copy. The original game can be found <a href="csgo.mtsl.dk">here!</a>`,
  });
