// import express JS module into app 
// and creates its variable. 
var express = require('express'); 
var app = express(); 
const bodyParser = require('body-parser');
var path = require("path");
var multerObj = require('multer');

var storage = multerObj.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname+'/uploads'))
    },
    filename: (req, file, cb) => {
      cb(null, Date.now()  + "_" + file.originalname)
    }
}); 

var upload = multerObj({storage: storage}).any();

// Creates a server which runs on port 3000 and  
// can be accessed through localhost:3000 
app.listen(3000, function() { 
    console.log('server running on port 3000'); 
} ) 
//app.use(bodyParser.json());

//app.use(upload.any()); 
app.use(express.static(__dirname));



// app.use(
//     bodyParser.urlencoded({
//         extended: true
//     })
// );

// app.get('/',function(req,response){
//   response.sendFile(path.join(__dirname+'/index.html'));
// });

app.post('/testData', callTestData); 
  
function callTestData(req, res) { 
    upload(req, res, function(err) {
        if (err || req.files.length < 1) {
            return res.end("Something went wrong! Please try again.");
        }
    
        console.log(req.files);
        // Use child_process.spawn method from  
        // child_process module and assign it 
        // to variable spawn 
        var spawn = require("child_process").spawn; 
        
        // Parameters passed in spawn - 
        // 1. type_of_script 
        // 2. list containing Path of the script 
        //    and arguments for the script  
        
        var process = spawn('python',["./test.py", 
                                req.files] ); 
    
        // Takes stdout data from script which executed 
        // with arguments and send this data to res object 
        process.stdout.on('data', function(data) {
            //data.toString() 
            res.send(data.toString()); 
        }); 
    });
} 
  