window.flux = {
    ev: [],
    subscribe: function(func, componentName) {
        if(!this.ev[componentName]) {
            this.ev[componentName] = [];
        }
        this.ev[componentName].push(func);
    },
    call: function(componentName, funcName) {
        if(this.ev[componentName]) {
            arguments = [].slice.call(arguments,0);
            arguments.splice(0, 2);
            for(var index = 0; index < this.ev[componentName].length; index++) {
                this.ev[componentName][index][funcName].apply(this.ev[componentName][index], arguments);
            }
        }
    }
}