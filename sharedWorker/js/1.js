var nickname = sessionStorage.getItem("nickname"),
	$message = $("#message"),
	$sendMsg = $("#sendMsg");

while (!nickname) {
    nickname = prompt("input your nickname,please");
    sessionStorage.setItem("nickname", nickname);
}

if (window.SharedWorker) {
    var myWorker = new SharedWorker("js/worker.js");

    myWorker.onerror = function(err) {
        console.log("error: ", err);
    }

    $sendMsg.bind("click", function(event){
    	var msg = $message.val().trim();
    	if (!msg){
    		return;
    	}
    	postMessage(msg);
    });

    myWorker.port.onmessage = function(e) {
    	var data = e.data;
        console.log('got message from worker', data);
    }

    function postMessage(message){
    	var data = {
    		nickname: nickname,
    		message: message
    	};
    	myWorker.port.postMessage(data);
    	console.log("post message to worker");
    }
}
