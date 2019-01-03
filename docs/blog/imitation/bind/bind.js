let foo  = {
    value: 1
};

function baz(name, age) {
    console.log(this.value, name, age);
}

let bindFoo  = baz.bind(foo, 'vim');
bindFoo('18'); // 1 'vim' '18'