const {Telegraf} = require("telegraf");
const price = require("crypto-price");

const bot = new Telegraf ("7354996591:AAF-Eq0lXBj1CuN_eG9JTe2bFemG_ND2Q5A");

bot.start((ctx) => {
    ctx.telegram.sendMessage(ctx.chat.id, 
        `سلام من ربات قمیت کریپتو هستم برای دیدن لیست رمز ارزها /CryptosList رو باید بزنی  و برای تنظیمات باید /Settings روبزنی. 
@CryptoPriceFarsibot`,
        { reply_markup: { keyboard: [['/CryptoList']], resize_keyboard: true, one_time_keyboard: true } }
    );
});

bot.command('CryptosList', (ctx) => {
    ctx.reply('لطفا یک رمز ارز رو انتخاب کنید.', {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Bitcoin', callback_data: 'BTC' }],
                [{ text: 'Ethereum', callback_data: 'ETH' }],
                [{ text: 'Ripple', callback_data: 'XRP' }],
                [{ text: 'Litecoin', callback_data: 'LTC' }],
                [{ text: 'Cardano', callback_data: 'ADA' }],
                [{ text: 'Monero', callback_data: 'XMR' }],
                [{ text: 'Binance Coin', callback_data: 'BNB' }],
                [{ text: 'Shiba', callback_data: 'SHIB' }],
            ],
        },
    });
});

bot.on('callback_query', async (ctx) => {
    const crypto = ctx.callbackQuery.data;
    try {
        price.getCryptoPrice('USD', crypto).then(obj => {
            const price = obj.price;
            ctx.reply(`قیمت حال حاضر ${crypto} هست $${price}`);
        }).catch(err => {
            console.error(err);
            ctx.reply(`متاسفانه نتونستم قیمت ${crypto} بگیرم. لطفا بعدا تکرار کنید.`);
        });
    } catch (error) {
        console.error(error);
        ctx.reply(`متاسفانه نتونستم قیمت ${crypto} بگیرم. لطفا بعدا تکرار کنید.`);
    }
    ctx.answerCbQuery();
});

bot.launch();