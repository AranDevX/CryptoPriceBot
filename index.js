const {Telegraf} = require("telegraf");
const {config} = require("config")

const bot = new Telegraf ("7354996591:AAF-Eq0lXBj1CuN_eG9JTe2bFemG_ND2Q5A")

bot.start(ctx => ctx.reply("سلام به ربات قیمت کریپتو خوش اومدید."));

bot.launch();