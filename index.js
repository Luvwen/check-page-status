const button = document.getElementById('button')
const button2 = document.getElementById('button2')

button.addEventListener('click', () => {
    getRespFromSwiss('https://es.wikipedia.org/wiki/Wikipedia:Portada')
})

button2.addEventListener('click', () => {
    getRespFromSwiss('http://localhost:3000/')
})

const pingToSwiss = (url, interval) => {
    fetch(url)
    .then(resp => {
        if(resp.status == 200){
            console.log(`Página andando: ${url}`)
            const notification = new Notification('Página online')
            clearInterval(interval)
        }
    })
    .catch(error => console.log(`Falló ${url}`))
}


const getRespFromSwiss = (url) => {
    const interval = setInterval(() => {
        if(Notification.permission === 'granted'){
            pingToSwiss(url, interval)
        } else if(Notification.permission !== 'denied'){
            Notification.requestPermission().then((permission) => {
                if(permission === 'granted') {
                    pingToSwiss(url, interval)
                }
            })
        }
    }, 5000);
}

getRespFromSwiss('http://localhost:3000/')