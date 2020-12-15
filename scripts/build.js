const fetch = require("node-fetch");
const log = console.log.bind(null, "[PostBuild]");
const fs = require("fs").promises;
const API_TOKEN = process.env.BOT_TOKEN;
const FAUNA_KEY = process.env.FAUNA_KEY;

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
    },
    {
      command: "fact",
      description: "Gibt lebenswichtige Fakten zurück."
    }
  ];
  log(`{registerCommands}`, JSON.stringify(availableCommands, null, 2));
  return await setMyCommands(availableCommands);
}

async function setMyCommands(commands) {
  const url = `https://api.telegram.org/bot${API_TOKEN}/setMyCommands`;
  log(`{registerCommands} ${url}`);
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
  log("{registerCommands}", JSON.stringify(json, null, 2));
  return response;
}

async function setGraphQLinFauna() {
  const schema = await fs.readFile("./fauna/schema.gql", "utf-8");
  const faunaResponse = await fetch(
    `https://graphql.fauna.com/import?mode=merge`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${FAUNA_KEY}`
      },
      body: schema
    }
  );
  const result = await faunaResponse.text();
  log("{setGraphQLinFauna}", result);
}

(async () => {
  await registerCommands();
  // await setGraphQLinFauna();
})();
