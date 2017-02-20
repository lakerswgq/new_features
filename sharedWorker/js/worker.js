var ports = [];
onconnect = function(e) {
  var port = e.ports[0];
  ports.push(port);

  port.onmessage = function(e) {
    var data = e.data;
    broadcast(data);
    console.log("data",data);
  }

}

function broadcast(msg){
	ports.forEach( function(port, index) {
		port.postMessage(msg);
	});
}