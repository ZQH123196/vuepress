# Java 自动装配对象与预分配

在 JVM 初始化时，会缓存一部分数据以提升性能（CPython 也是这么干的），JVM 缓存了 -128~127 之间的整数对象，存放到一个数组中，以供那些频繁使用数字对象的包使用。



其进行分配的源码：

```java
    /**
     * Cache to support the object identity semantics of autoboxing for values between
     * -128 and 127 (inclusive) as required by JLS.
     *
     * The cache is initialized on first usage.  The size of the cache
     * may be controlled by the {@code -XX:AutoBoxCacheMax=<size>} option.
     * During VM initialization, java.lang.Integer.IntegerCache.high property
     * may be set and saved in the private system properties in the
     * sun.misc.VM class.
     */

    private static class IntegerCache {
        static final int low = -128;
        static final int high;
        static final Integer cache[];

        static {
            // high value may be configured by property
            int h = 127;
            String integerCacheHighPropValue =
                sun.misc.VM.getSavedProperty("java.lang.Integer.IntegerCache.high");
            if (integerCacheHighPropValue != null) {
                try {
                    int i = parseInt(integerCacheHighPropValue);
                    i = Math.max(i, 127);
                    // Maximum array size is Integer.MAX_VALUE
                    h = Math.min(i, Integer.MAX_VALUE - (-low) -1);
                } catch( NumberFormatException nfe) {
                    // If the property cannot be parsed into an int, ignore it.
                }
            }
            high = h;

            cache = new Integer[(high - low) + 1];
            int j = low;
            for(int k = 0; k < cache.length; k++)
                cache[k] = new Integer(j++);

            // range [-128, 127] must be interned (JLS7 5.1.7)
            assert IntegerCache.high >= 127;
        }

        private IntegerCache() {}
    }

```



比如常用的自动装箱里面就用到了缓存的数组：

```java
    public static Integer valueOf(int i) {
        // low 为 -128，high wei 127，所以处于这个区间就直接返回初始化时缓存的数组
        if (i >= IntegerCache.low && i <= IntegerCache.high)
            return IntegerCache.cache[i + (-IntegerCache.low)];
        return new Integer(i);
    }
```

可以看到，处于 [-128, 127] 区间的数字都是被缓存的 Integer，只有在这个区间之外的数字才会申请一个新的 Integer 对象。

我们还可以做个简单的验证，以加深印象：

```java
public class tmp {
    public static void main(String[] args) {
        Integer n1 = 127;
        Integer n2 = 127;
        
        Integer n3 = 128;
        Integer n4 = 128;
        
        System.out.println(n1 == n2); // true
        System.out.println(n3 == n4); // false
    }
}
```

> n1 等于 n2 因为他们是同一个对象，具有相同的引用值，n3 不等于 n4 是因为他们不是同一对象，引用值不同。
>
> > n1， n2 都属于 [-128, 127]，因此第一次和第二次赋值都取的是缓存数组中的同一个，故引用值相等。











对于数据对象，使用 equals 不要使用 ==。



```java
public class tmp {
    public static void main(String[] args) {
    	String hello = "hello";
    	String str1 = "he" + "llo"; // 相当于 str1 = "hello"
    	String str2 = "he";
    	String str3 = "llo";
    	String str4 = str2 + str3;
    	
    	System.out.println(str1 == hello); // true
    	System.out.println(str4 == hello); // false
    	System.out.println(str4.equals(hello)); // true	
    }
}
```



首先，在 hello 赋值时，Java 编译器会将字面量 “hello” 当成常量放入常量池中。

1. `str1 == hello` 输出为 true 是因为 str1 赋值之前，编译器已经自动将 `"he" + "llo"` 编译成了 `"hello"`，然后判断其为常量，去查询常量池。常量池本身在 hello 赋值时已经存入一个常量 “hello”，所以直接取出来复用。因此二者的引用值相等，故用 == 号判断引用值相等。

2. `str4 == hello` 输出为 false 是因为 str4 在赋值时 = 号右边的是变量，因此编译器不会去查询常量池，而是创建了一个新的 String 对象给 str4。所以用 == 号判断时，二者不是同一个对象，不相等。

3. `str4.equals(hello)` 输出为 true 是因为 String 内部重写了 equals 方法，让双方可以按字符是否相等来进行比较，这才是比较字符串是否相等，而不像 == 比较的是引用值是否相等。



*根据上面三种情况，我们可以得知，双等号 == 比较的是引用值，而 equals 比较的是其内的值是否相等。鉴于后者使用最多并且最符合直观思维，请只使用 equals 来进行比较，其他数据对象也是如此。*





