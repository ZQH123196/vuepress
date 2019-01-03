Function.prototype.apply_imitation = function (context, ...args) {
    context = context || global;
    context.fn = this;
    args = Array.from(args);
    console.log(args)
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

console.log(bar.apply_imitation(null)); // window
console.log(bar.apply(null)); // 内置
console.log(bar.apply_imitation(obj, 'mou', 18)); // obj
console.log(bar.apply(obj, ['mou', 18])); // 内置
