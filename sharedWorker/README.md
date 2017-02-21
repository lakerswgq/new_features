### SharedWorker


借助新的[SharedWorker Api](https://developer.mozilla.org/en/docs/Web/API/SharedWorker),一个线程可以被多个script脚本（来自相同domain）共享，借助于此可以实现窗口间通信

本例借助SharedWroker的该特性可以不依赖服务器仅通过静态页面实现简单的聊天功能

[sharedWorker与web worker的区别](http://stackoverflow.com/questions/6778360/whats-the-difference-between-shared-worker-and-worker-in-html5)

### example

[demo](https://lakerswgq.github.io/new_features/sharedWorker/)

在两个标签页里打开上面的链接，输入昵称，就可以互相发送信息
