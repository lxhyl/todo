export const debounce = function(fun,delay){
     return function(args){
         let _this =this;
         let _args = args;
         clearTimeout(fun.id)
         fun.id = setTimeout(function(){
             fun.call(_this,_args)
         },delay)
     }
}