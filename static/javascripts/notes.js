// let tgUserId = tg.initDataUnsafe.user.id
'use strict'
let tgUserId
try {
    let tg = window.Telegram.WebApp
    tgUserId = tg.initDataUnsafe.user.id
}
catch {
    tgUserId = 0
}

function updateNotes(){
    document.querySelector('#noteListDiv').innerHTML = ''
    fetch('/dbapi', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            func: 'getData',
            // userId: tg.initDataUnsafe.user.id,
            userId: tgUserId,
        })
    }).then(r => r.json()
        .then(data => {
            for(let i = 0; i < data.length; i++){
                let tableElems = document.querySelector('#daysTable').querySelectorAll('td')
                for(let j = 0; j < tableElems.length; j++){
                    let dayId = new Date(data[i].createdAt).setHours(0, 0, 0, 0)
                    if(tableElems[j].id === dayId.toString()){
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
                noteCardDiv.id = `noteId${data[i].id}`
                noteCardDiv.addEventListener('click', (e) => {
                    console.log(noteCardDiv.id.slice(6))
                    setTimeout(() => {
                        document.querySelector('.viewNotePopup').classList.add('viewNotePopupVisible')
                        document.querySelector('.viewNoteText').innerHTML = data[i].text
                    }, 1)
                })
                document.querySelector('#noteListDiv').appendChild(noteCardDiv)
            }
        }))
}
updateNotes()

let noteListChildren = document.querySelector('#noteListDiv').children
for(let i = 0; i < noteListChildren.length; i++) {
    noteListChildren.item(i).addEventListener('click', (e) => {
        console.log(noteListChildren.item(i).id)
    })
}