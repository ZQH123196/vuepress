# JAVA AIO

JDK 1.7 加入 NIO2.0、AIO。



有一个经典的举例。烧开水。
假设有这么一个场景，有一排水壶（客户）在烧水。

AIO的做法是，每个水壶上装一个开关，当水开了以后会提醒对应的线程去处理。
NIO的做法是，叫一个线程不停的循环观察每一个水壶，根据每个水壶当前的状态去处理。
BIO的做法是，叫一个线程停留在一个水壶那，直到这个水壶烧开，才去处理下一个水壶。

可以看出AIO是最聪明省力，NIO相对省力，叫一个人就能看所有的壶，BIO最愚蠢，劳动力低下。  



利用返回的 future 对象：

```java
public static void main(String[] args) throws IOException, InterruptedException, ExecutionException {
  Path file = Paths.get("沉默王二.txt");
  AsynchronousFileChannel channel = AsynchronousFileChannel.open(file);
  Future<Integer> result = channel.read(ByteBuffer.allocate(100_000), 0);
  while (!result.isDone()) {
    System.out.println("主线程继续做事情");
  }

  Integer bytesRead = result.get();
  System.out.println(bytesRead);
}
```

> 老套的轮询，相比现代的 await 在视野上分割了程序员的逻辑块。
>
> 虽然利用了 AIO 的 API，但这其实不是 AIO 了。



利用 callback：

```java

public static void main(String[] args) throws IOException, InterruptedException, ExecutionException {
  Path file = Paths.get("沉默王二.txt");
  AsynchronousFileChannel channel = AsynchronousFileChannel.open(file);
  channel.read(ByteBuffer.allocate(100_000), 0, null, new CompletionHandler<Integer, ByteBuffer>() { // 快乐回调
    public void completed(Integer result, ByteBuffer attachment) {
      System.out.println(result);
    }
    
    public void failed(Throwable exc, ByteBuffer attachment) {
      System.out.println(exc.getMessage());
    }
  });
  System.out.println("主线程继续做事情");
}
```

