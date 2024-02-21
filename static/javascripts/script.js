"use strict"

let monthNames= ["January","February","March","April","May","June","July",
    "August","September","October","November","December"]
let daysNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}
function startOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
}

function monthArrayGenerator(date){
    let monthArr = [[]]
    let dayCount = 1
    for(let w = 0; w < 5; w++){
        if(w === 0){
            let preDays = daysInMonth(date.getMonth(), date.getFullYear())
            for(let i = preDays - startOfMonth(date)+2; i <= preDays; i++){monthArr[0].push([i, 1])}
            for(let d = monthArr[0].length + 1; d <= 7; d++){
                monthArr[w][d-1] = [dayCount.toString(), 0]
                dayCount++
            }
        }
        else {
            monthArr.push([])
            let monthFlag = 0
            for(let d = 1; d <= 7; d++){
                if(dayCount > daysInMonth(date.getMonth()+1, date.getFullYear())){
                    dayCount = 1
                    monthFlag = 1
                }
                monthArr[w][d-1] = [dayCount.toString(), monthFlag]
                dayCount++
            }
        }
    }
    return monthArr
}

function monthGenerator(date){
    document.querySelector('#dateStr').innerHTML = `${monthNames[date.getMonth()]} ${date.getFullYear()}`
    let monthArr = monthArrayGenerator(date)
    let dt = document.querySelector('#daysTable')
    dt.innerHTML = dt.children[0].innerHTML
    for(let w = 0; w < 5; w++){
        let r = dt.appendChild(document.createElement('tr'))
        for(let d = 1; d <= 7; d++){
            let l = r.appendChild(document.createElement('td'))
            l.innerText = monthArr[w][d-1][0]
            l.id = new Date(date.getFullYear(), date.getMonth(), monthArr[w][d-1][0]).getTime().toString()
            if(l.id === new Date().setHours(0, 0, 0, 0).toString()){l.classList.add('nowDay')}
            // if()
            if(monthArr[w][d-1][1]){l.classList.add('anotherMonth')}
        }
    }
}


let date = new Date()
monthGenerator(date)
document.querySelector('#todayDay').innerText = date.getDate()
document.querySelector('#todayTitleText').innerText = daysNames[date.getDay()]

document.querySelector('#monthLeft').addEventListener('click', (e) => {
    date = new Date(date.getFullYear(), date.getMonth()-1)
    monthGenerator(date)
    updateNotes()
})

document.querySelector('#monthRight').addEventListener('click', (e) => {
    date = new Date(date.getFullYear(), date.getMonth()+1)
    monthGenerator(date)
    updateNotes()
})

document.querySelector('.todayTitle').addEventListener('click', (e) => {
    date = new Date()
    monthGenerator(date)
    updateNotes()
})

document.addEventListener('click', (e) => {
    if(!document.querySelector('.newNotePopup').contains(e.target) && document.querySelector('.newNotePopup').classList.contains('newNotePopupVisible')){
        document.querySelector('.newNotePopup').classList.remove('newNotePopupVisible')
    }
    if(!document.querySelector('.viewNotePopup').contains(e.target) && document.querySelector('.viewNotePopup').classList.contains('viewNotePopupVisible')){
        document.querySelector('.viewNotePopup').classList.remove('viewNotePopupVisible')
    }
})
document.querySelector('#newNoteBtn').addEventListener('click', (e) => {
    setTimeout(() => {
        document.querySelector('#newNoteDateTime').value = new Date(new Date().getTime()+10800000).toISOString().slice(0, 16)
        document.querySelector('.newNotePopup').classList.add('newNotePopupVisible')
    }, 1)
})

document.querySelector('#sendNotes').addEventListener('click', (e) => {
    fetch('/dbapi', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            func: 'sendNewNote',
            // userId: tg.initDataUnsafe.user.id,
            userId: tgUserId,
            text: document.querySelector('#newNoteArea').value,
            primaryNote: 0,
            createdAt: new Date(document.querySelector('#newNoteDateTime').value).getTime(),
        })
    }).then(r => {
        console.log(r)
        if(r.status === 200) {
            updateNotes()
            document.querySelector('.newNotePopup').classList.remove('newNotePopupVisible')
        }
    })
})

document.querySelector('#closeNote').addEventListener('click', (e) => {
    document.querySelector('.viewNotePopup').classList.remove('viewNotePopupVisible')
})