import { Update } from "../telegramTypes";
import { sendMessage, sendMarkupMessage } from "../utilities";

function canHandle(update: Update) {
  if (!update.message || !update.message.text) return false;
  return update.message.text.indexOf("/lebensweisheit") == 0;
}

function handle(update: Update) {
  const index = Math.floor(Math.random() * (weisheiten.length - 0 + 1) + 0)
  const weisheit = weisheiten[index]
  const formatted = `${weisheit[0]}
- <i>${weisheit[1]}</i>`
  return sendMarkupMessage(formatted, update.message.chat.id);
}

export default {
  name: "echo",
  canHandle,
  handle
};

const weisheiten = [
  ["Da hättest du nicht sagen können, a besserer Keyboarder, nein, da sagst du Programmierer. Du bist a Flasche vorm Herrn", "Rosi <3"],
  ["Wenn ich schlaf, dann geht’s. Wenn ich wach bin, tut’s weh", "Emo Grönemeyer"],
  ["Na des is a Bestroufung", "Loerns-Stapeldichtrohr"],
  ["Ohne Doppel-N du Wichser","Loernseritis"],
  ["Seh ich aus wie n Aborigine mit nem Boomerang, dass ich des holen kann?","Rosenbercher"],
  ["Es ist so dunkel, ich kann kaum noch mein Herz schlagen hören", "Floh"],
  ["Bei uns Juden gibt es keine Hölle, sondern nur das sogenannte Shalamazl.", "Rosenkärcher"],
  ["Trau nichts, das aus einer Orangensaftflasche kommt","NörnsNörnsNörns"],
  ["Der Oksman ist der größte Hurensohn in diesem TS", "Jannik"],
  ["Warum kann die Rakete unter Wasser fliegen? - Weil sie eine Unterwasserrakete ist!", "Nuttenbot 3000"],
  ["Oksman schreibt man mit Doppel-Hitler du Sozi", "Aidsdrian"],
  ["O((ch|k)s|x)-doppel-hitloerrens-man(n)", "Alle (außer O((ch|k)s|x)-doppel-hitloerrens-man(n))"],
  ["¿que?", "Loernsosaurus-Fags"],
  ["Immer noch mit K du Wichser", "Hitloerrens"],
  ["Wennst satt bist, dann iss wenigstens noch das Fleisch","Smoothjackjanniksäck"]
  ,["Wir haben ja keinen Nikolaus, sondern den Shababshnikel. Der kommt am zweiten Freitag im Dezember und klaut den Kindern ihr Taschengeld", "Rosi"],
  ["Erkenntnis des Tages: Nicht mehr in der Dusche furzen","Rosi"],
  ["Is des dein Blowjob-Face?", "Rosi"],
  ["Du kannst mir mal fürn Zwanni die Stulle vom Arsch knuspern", "Eboladrian"],
  ["Was ist mit dem Boi los", "KlötenJannik"],
  ["Die Fotze kann mir mal meine Fertigungskosten lutschen","Dachsfickflaschenkopf"],
  ["Vor der Tür, ich mag die Tür. Ich vollziehe den Liebesakt mit der Tür", "Doppellörns"],
  ["Was machen Sie denn da? Sie streichens ja volle Kanne durch", "Lörres"],
  ["Arielle, der Meerjungshurensohn", "Pörns"],
  ["Alles hier ist so kalt. Ich erinnere mich noch an den Winter - da wars noch kälter", "schülülü-Lörns"],
  ["Kannst mir ja den Arsch abschneiden… ich hab nen Organspendeausweis", "Hack"],
  ["Was mach ich denn jetzt mit meinem ganzen Ruhm… Ach vielleicht kauf ich mir ein wenig Hummer davon", "DummdachsDACKELLörns"],
  ["Linkes Bein - rechtes Bein - PENIS!!", "Anonym"],
  ["Ich hab beim rasieren so oft in den Schwanz geschnitten, dass der etz aussieht wie eine Currywurst", "Flo"],
  ["Die wojteneks symbolisieren die Schere zwischen Reich und asozial", "der berg jannik"],
  ["Ich glaube im wilden Westen hätte es weniger Probleme gegeben, wenn die Cowboyarchitekten die Städte groß genug für alle gebaut hätten.", "Bud Rose Rosebutter Rosi"],
  ["Ich streu Kräuter der Provence auf meinen Schwanz, denn die Bitches mögens mediterran.", "PaddyMacOrsch"],
  ["Gönn dir, … du Hurensohn","PaddyMacMosh"],
  ["Lasst mich durch… ich muss wichsen!!", "HackfleischhassenderZerhacker"],
  ["Ich bin so glücklich, mir platzt gleich der Sack", "A Bsuffner beim Hoggers"],
  ["Ich kann schon bei dir übernachten, allerdings fress ich die Mülltonnen leer und vergewaltige eure Katze, weil ich der Nachtgiecher bin.", "Hack"],
  ["Der Vorteil an fetten Frauen ist, dass es sich immer nach Arsch anfühlt, egal wo man drauf haut!", "Nicht fettreduzierter Hack"],
  ["Des is female fronted, du bitch!", "Anonym"],
  ["Unsere Tendenzen stagnieren. Hör halt auf etz!", "Anonym"],
  ["Mir blüht die lustige Schnute vollauf....\"ja\" schreit mein Körper, doch der Geist weiß es noch nicht. Halte inne.   Oh Lord.... Halte innw", "Kaledehoff"],
  ["Meine Eizelle schwappt vor Gleichgültigkeit gen Westen, ich bin hinüber....es ist Volk, warum weißt du es nicht besser?", "Christian Klappendorf"],
  ["Zieh dir nen Lappen über, du fotzt schon wieder!", "Rosettenrosi"],
  ["Bist du ein Bruder der warmen Winde? Hauck - Nein, ich bin ein Bruder der warmen Rinde", "LangweilerLörns"],
  ["Da nimm’s, schiebs dir in den Arsch", "Hafenhurenhack"],
  ["Wenn du aus der Dusche kommst und nicht nach Gulli stinkst, bist du noch nicht fett genug", "arschhahnheuer"],
  ["Hauck willst du mein Freund sein? - Was hast du zu bieten? - Nen, dicken Schwanz… - Klingt verlockend", "Zwei"],
  ["Auf der Reise nach Berlin - Sie versprach mir ein Stück Speck","Summerbreeze Nachbarinhos"],
  ["Pimmelfurznutte","MösenMateo"],
  ["Der Halbblutfurz", "Khris Calenhurenhofffotze"],
  ["Im Stile eines wahren Hurensohns","Spaldi Müllhaldi"],
  ["Bluffen bringt bei denen nichts, die sind zu blöd zum Bluffen", "Pokerass Beer"],
  ["WIE ALT BIST DU EIGENTLICH? 10?! - nein 9 ;_;", "Prollotenlo"],
  ["Who knows the bell tolls?", "Halt dein fuck Maul Lörns, du heißt jetzt so!"],
  ["Ich hab am schwersten zu tragen. Das Schwipp-Schwapp… Und die Last meines Herzens.", "Janigger"],
  ["Sie war begeistert. Damals hab ich mich noch gut ernährt. Hat immer geschluckt, das kleine Schleckermäulchen", "Kikerilörns"],
  ["Fette blasen mit Hingabe - damit sie nicht ausversehen abbeißen", "Teamwork Flörns"],
  ["Es ist draußen dunkel. Also ist es Nacht", "Schnackhack"],
  ["Ich fühl mich gerade smooth wie ein Speckstein","Schmörrns"],
  ["Aha, ein Gefahrensucher. Der rennt a in die Bronx und schreit Nigger", "Drunken Brückner aufm Törn vom Flo"],
  ["Drei Zoll ist Formation. Dimitri die Steine, wir nehmen sie als Kartoffeln", "HeresyHeuer"],
  ["Wo hast du eigentlich grad dein Hirn? Im Arsch?","Anonym"],
  ["Pimmel, Pimmel - ich habe einen Pimmel", "Sodomie-Hans"],
  ["Geht ein Fahrkartenautomat zum Arzt, wenn ein Witz so änfängt ist das Kind schon in den Brunnen gefallen","HighlandHurenHauck"],
  ["Ich werde mal Kinder haben - die schlag ich dann aber auch", "Hackslschlaksl"],
  ["Die beste Art aufzuwachen? - Ein Arsch voll Pimmel, einen Pimmel voller Arsch und 2 m Kleider in einen Sack", "Hirnhaut-Hauck"],
  ["Kotzen ist das schlimmste was es gibt, hauptsache rausscheißen, in welcher form auch immer", "Haukkonowitsch vodkakatischspeifix"],
  ["da kommt air, ich bin blöd im kopf - iiieaaa schaut mich an ich bin scheiße behindert", "DAU Jones Mike"],
  ["Das was sie zu Hurensöhnen macht, sind diese beschissenen Hochschuhlwahlen", "Jannig"],
  ["Du bist so ein Genius, Euklid würde sich vor dir verdrehen.", "Sodomie Hans"],
  ["Du Du Dibududu, ich bin ein Schuh und schwul bin ich dazu", "Fettschleuder Pantzenjannik"],
  ["Der Troll bei Herr Der Ringe war so, wie wenn im Mc fit ein fetter in der Umkleide ausrastet und die Türen sind zu", "Blaue Flecken Dani"],
  ["Teilchenphysik: Wir beschleunigen eine Nussecke", "Schwabenneger"],
  ["Legen wir uns hin und schauen uns die Sterne an", "Ape Iron Till"],
  ["Wenn du ein Schinken wärst, wärst du abgelaufen!", "Rosbüddl zum Hauckfleisch"]
]