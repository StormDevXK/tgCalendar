let tg = window.Telegram.WebApp
// todayTitleText.innerHTML = tg.initDataUnsafe.user.id

fetch('/dbapi', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
        // tgId: tg.initDataUnsafe.user.id,
        tgId: 100312331,
    })
}).then(r => r.json()
    .then(data => {
        for(let i = 0; i < data.length; i++){
            let tableElems = document.querySelector('#daysTable').querySelectorAll('td')
            for(let j = 0; j < tableElems.length; j++){
                if(tableElems[j].id === data[i].dayId.toString()){
                    let elem = document.createElement('div')
                    elem.classList.add('eventDot')
                    tableElems[j].prepend(elem)
                }
            }
            let noteCardDiv = document.createElement('div')
            noteCardDiv.classList.add('noteCard')
            let noteLineDiv = document.createElement('div')
            noteLineDiv.classList.add('noteLine')
            let noteTextP = document.createElement('p')
            noteTextP.classList.add('noteText')
            noteTextP.innerText = data[i].text
            noteCardDiv.appendChild(noteLineDiv)
            noteCardDiv.appendChild(noteTextP)
            document.querySelector('.noteList').appendChild(noteCardDiv)
        }
    }))