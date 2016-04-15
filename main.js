var xlsx = require('node-xlsx');
var fs = require('fs');
var stringify = require('csv-stringify');

var src = process.argv[2];
var dest = process.argv[3];


var obj = xlsx.parse(src); // parses a file

//looping through all sheets
for(var i = 0; i < obj.length; i++)
{

    var sheet = obj[i];
    var rows = [];
    var writeStr = "";
    //loop through all rows in the sheet

    for(var j = 0; j < sheet['data'].length; j++)
    {
        //add the row to the rows array
        rows.push(sheet['data'][j]);
    }


	stringify(rows, saveTofile(sheet.name));


	function saveTofile(sheetN){

		var sheetName = sheetN;

		return function(err, output){
			fs.writeFile(dest + sheetName + '.csv', output, function(err) {
				console.log(sheetName + ".csv was saved in the current directory!");
			});
		}
	}
}
