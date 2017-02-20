var ports = [];
onconnect = function(e) {
  var port = e.ports[0];
  ports.push(port);

  port.onmessage = function(e) {
    var data = e.data;
    console.log(data);
  }

}