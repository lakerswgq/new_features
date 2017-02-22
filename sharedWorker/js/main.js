var nickname = sessionStorage.getItem("nickname"),
	$message = $("#message"),
	$chat = $("#chat"),
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
    	insertMessage(data);
        console.log('got message from worker');
    }

    function postMessage(message){
    	var data = {
    		nickname: nickname,
    		message: message
    	};
    	myWorker.port.postMessage(data);
    	console.log("post message to worker");
    }

    function insertMessage(data){
    	var sender = data.nickname,
    		msg = data.message,
    		className = sender === nickname ? "self" : "other";

    	var $chatItem = $("<li></li>").addClass(className),
    		$avatar = $("<div></div>").addClass("avatar").append('<img src="http://i.imgur.com/DY6gND0.png" draggable="false">');

    	$chatItem.append($avatar);

    	var $msg = $("<div></div>").addClass('msg'),
    		$nickname = $("<p></p>").addClass('nickname').text(sender+": ");
    	
    	$msg.append($nickname);
    	
    	msg.split("\n").forEach( function(item, index) {
    		$("<p></p>").text(item).appendTo($msg);
    	});

    	var $time = $("<time></time>").text(new Date().toLocaleString());
    	$msg.append($time);

    	$chatItem.append($msg);

    	$chat.prepend($chatItem);

    }	


}
else {
    alert("your browser doesn't spport SharedWorker Api");
}
