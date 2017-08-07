Helper.prototype.constructor = Helper;

function Helper() {}

Helper.ranMinMax = function (minimo,maximo) { 
    return Math.floor(Math.random() * (maximo - minimo + 1) + minimo); }