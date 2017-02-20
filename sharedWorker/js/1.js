var nickname = sessionStorage.getItem("nickname");

while (!nickname) {
    nickname = prompt("input your nickname,please");
    sessionStorage.setItem("nickname", nickname);
}

if (window.SharedWorker) {
    var myWorker = new SharedWorker("js/worker.js");

    myWorker.onerror = function(err) {
        console.log("error: ", err);
    }


    myWorker.port.postMessage(nickname);
    console.log('Message posted to worker');

    myWorker.port.onmessage = function(e) {
        result1.textContent = e.data;
        console.log('Message received from worker');
    }
}
