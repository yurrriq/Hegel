module.exports = {};
var Promise = require('promise');
var cheerio = require('cheerio');
var request = require('request');

var getit = function(url){
    return new Promise(function(fulfill, reject){
        try{
            request(url, function(error, response,body){
                if (!error && response.statusCode == 200) {
                    fulfill(body);
                }
            })
        } catch (ex){
            reject (ex);
        }
    });
};
module.exports.getit = getit;

var get_data = function(cheer){
    var $ = cheerio.load(cheer);
    var p  = $('p');
    var english_array = [];
    p.each(function(){
        var id , text , type , paragraph;
        var json =
            { type: "english", id : "" , text: "" , section: "", paragraph : []};

        var p  = $(this);
        var paragraph= [];

        if (p.find('span.point1').text()){
            var text = p.find('span.point1');
            var id = text.find('a').next().text();
            json.id = id;

            var first_text = p.find('span.point1').parent().text();
            text = text.find('a').next().text();
            paragraph.push(first_text);

            var next = p.next('p');
            if (next.find('span.point1').text() == ""){
                var next_text = next.text();
                paragraph.push(next_text);
            }

            json.paragraph = paragraph;
            english_array.push(json);
        }
    })
        return english_array;
}
module.exports.get_data = get_data;
