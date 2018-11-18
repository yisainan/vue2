/**
 Reactive.productor(fetch(priceService.getCostType))
 .switchMap(function(result) {return fetch(priceService.getCostType); })
 .subscribe(function(result) {
    console.log(result);
 });
 *
 */
window.Reactive = Rx;
var productor;
Reactive.productor = Rx.Observable.fromPromise;
productor = Reactive.productor;
window.fetch = function() {
    arguments = [].slice.call(arguments, 0);
    var func = arguments[0];
    arguments.splice(0, 1);
    var args = arguments;
    return  new Promise(function(resolve, reject) {
        args.push(function(res) {
            if(res) {
                resolve(res);
            } else {
                resolve();
            }
        });
        func.apply(func, args);
    });
}
Reactive.productor = function() {
    var obj = productor.apply(this, arguments);
    return obj;
}