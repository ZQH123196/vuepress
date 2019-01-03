Function.prototype.call_imitation = function (context, ...args) {
    context = context || window;
    context.fn = this;
    let result = context.fn(...args); 
    delete context.fn;
    return result;
}

var value = 'window';

var obj = {
    value: 'obj'
}

function bar(name, age) {
    console.log(this.value);
    return {
        value: this.value,
        name: name,
        age: age
    }
}

console.log(bar.call_imitation(null)); // window
console.log(bar.call(null)); // 内置
console.log(bar.call_imitation(obj, 'mou', 18)); // obj
console.log(bar.call(obj, 'mou', 18)); // 内置
