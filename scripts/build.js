const fetch = require("node-fetch");
const log = console.log.bind(null, "[PostBuild]");
const API_TOKEN = process.env.BOT_TOKEN;

async function registerCommands() {
  const availableCommands = [
    { command: "lebensweisheit", description: "Gibt eine Lebensweisheit aus" },
    {
      command: "gif",
      description: "Sendet eine zufällige Animation. Optional mit schlagwort"
    },
    {
      command: "wuerfel",
      description: "Ein Würfel mit einer zufälligen Zahl zwischen 1 und 6"
    },
    {
      command: "travelpicture",
      description: "Sendet ein Bild von einer unserer Reisen."
    }
  ];
  log(`Registering Commands`, JSON.stringify(availableCommands, null, 2));
  return await setMyCommands(availableCommands);
}

(async () => {
  await registerCommands();
})();

async function setMyCommands(commands) {
  const url = `https://api.telegram.org/bot${API_TOKEN}/setMyCommands`;
  console.log(`setMyCommands to ${url}`);
  var response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      commands
    })
  });
  let json = await response.json();
  console.log(JSON.stringify(json, null, 2));
  return response;
}
