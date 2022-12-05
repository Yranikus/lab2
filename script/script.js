var localtime = document.getElementById('localtime');
setInterval(() => localtime.innerHTML = "Текущее время: " + new Date().toLocaleTimeString(), 1000)


function validationX() {
    let  checked = document.querySelector('input[name="X"]:checked')
    if (checked == null) {
        let er = document.getElementById("Xerror")
        er.innerHTML = "Вы не выбрали Х"
        setTimeout(()  => er.innerHTML = "",5000)
        return false
    }
    return true
}

function validationY() {
    let y_value = document.getElementById("Y").value.replace(/,/, '.').replaceAll(" ","")
    let er = document.getElementById("Yerror")
    if (!y_value) {
        er.innerHTML = "Вы не ввели У"
        setTimeout(()  => er.innerHTML = "",5000)
        return false
    }
    if (y_value == 0) return true
    if (!parseFloat(y_value)) {
        er.innerHTML = "Вы ввели не целое число"
        setTimeout(()  => er.innerHTML = "",5000)
        return false
    }
    if ( y_value < 3 && y_value > -3) {
        return true
    }
    else {
        er.innerHTML = "Введеное число вне диапозона"
        setTimeout(()  => er.innerHTML = "",5000)
        return false
    }
}

function validationR() {
    let r_value = document.getElementById("R").value.replace(/,/, '.').replaceAll(" ","")
    let er = document.getElementById("Rerror")
    if (!r_value) {
        er.innerHTML = "Вы не ввели R"
        setTimeout(()  => er.innerHTML = "",5000)
        return false
    }
    if (!parseFloat(r_value)) {
        er.innerHTML = "Вы ввели не целое число"
        setTimeout(()  => er.innerHTML = "",5000)
        return false
    }
    if ( r_value < 5 && r_value > 2) {
        return true
    }
    else {
        er.innerHTML = "Введеное число вне диапозона"
        setTimeout(()  => er.innerHTML = "",5000)
        return false
    }
}

function valuesValid(){
    if ( validationY() & validationR() & validationX()) {
        return true
    }
    return false
}

async function sendValues() {
    if (valuesValid()) {
        let y = document.getElementById("Y").value.replace(/,/, '.').replaceAll(" ", "")
        let x = document.querySelector('input[name="X"]:checked').value
        let r = document.getElementById("R").value.replace(/,/, '.').replaceAll(" ", "")
        let url = `main.php?y=${y}&x=${x}&r=${r}`
        let response = (await fetch(url, {
            method: "GET"
        }).then( response => { return response.json()}))
        console.log(response)
        let result_table = document.getElementById('results')
        let tr = document.createElement('tr')
        if (response.hit) {
            tr.innerHTML = `<td>${response.request_time}</td><td>${response.executing_time}</td><td>${response.x}</td><td>${response.y}</td><td>${response.r}</td><td class="hit">Есть попадание</td>`
        }
        else {
            tr.innerHTML = `<td>${response.request_time}</td><td>${response.executing_time}</td><td>${response.x}</td><td>${response.y}</td><td>${response.r}</td><td class="miss">Нет попадания</td>`
        }
        result_table.appendChild(tr)
    }
}


document.getElementById("submit").addEventListener("click", sendValues)