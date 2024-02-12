let tg = window.Telegram.WebApp
todayTitleText.innerHTML = tg.initDataUnsafe.user.id

fetch('/dbapi', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
        tgId: tg.initDataUnsafe.user.id,
    })
})