// 防抖和节流：debounce防抖；throttle节流
// 防抖目的：比如在mousemove事件时，move过程中不会触发函数
// 节流是为了防止频繁的触发某个函数，至少delay时间间隔才会触发下一次
// 函数继承时call和apply会执行函数,而bind需要手动执行
const debounce = function debounce(cb = function () { }, delay = 300) {
    let timer;
    return function (e) {
        const event = e;
        const that = this;
        const args = arguments;
        clearTimeout(timer)
        timer = setTimeout(function () {
            cb.bind(that, e)();
        }, delay)
    }
}
//节流。目的是事件触发时 检测flag是否有计时器(即每隔dealy时间后，触发callBack)
const throttle = function throttle(cb = function () { }, delay = 300) {
    let flag = false; //设置flag，flag==true时跳出即表示有了计时器
    let timer = null;
    console.log(cb)
    return function (e) {
        if (flag) { //有了计时器return
            return;
        }
        flag = true; //改变flag再次触发事件直接return
        const that = this;
        const event = e;
        timer = setTimeout(function () {
            cb.call(that, e, "timer");
            flag = false;
        }, delay)
    }
}
export { throttle, debounce }