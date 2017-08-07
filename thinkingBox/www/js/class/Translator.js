Translator.prototype.constructor = Translator;
function Translator(language, dictionary) {}

Translator.translate = function(ctx, language, literals) {
    if(!dictionary[language]) 
        language = "default";

    for(var i = 0; i < literals.length; i++) 
        ctx[literals[i]] = dictionary[language][literals[i]];
}

Translator.get = function(key, language, dictionary) {
    if(!dictionary[language])
        language = "en";
    
    for(var word in dictionary[language])
        if(word == key)
            return dictionary[language][key];   
}