var express = require('express');
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());

var getData=[
    {
        examID:1,
        examName:"xxxx",
        score:98,
        totalScore:100,
        startDate:"YYYY-MM-DD HH:MM:SS",
        endDate:"YYYY-MM-DD HH:MM:SS"
    },
    {
        examID:2,
        examName:"aaax",
        score:89,
        totalScore:100,
        startDate:"YYYY-MM-DD HH:MM:SS",
        endDate:"YYYY-MM-DD HH:MM:SS"
    },
    {
        examID:3,
        examName:"aaax",
        score:89,
        totalScore:100,
        startDate:"YYYY-MM-DD HH:MM:SS",
        endDate:"YYYY-MM-DD HH:MM:SS"
    },
    {
        examID:4,
        examName:"aaax",
        score:89,
        totalScore:100,
        startDate:"YYYY-MM-DD HH:MM:SS",
        endDate:"YYYY-MM-DD HH:MM:SS"
    },
    {
        examID:5,
        examName:"aaax",
        score:89,
        totalScore:100,
        startDate:"YYYY-MM-DD HH:MM:SS",
        endDate:"YYYY-MM-DD HH:MM:SS"
    },
    {
        examID:6,
        examName:"aaax",
        score:89,
        totalScore:100,
        startDate:"YYYY-MM-DD HH:MM:SS",
        endDate:"YYYY-MM-DD HH:MM:SS"
    }
]

// var getData = [
//     {
//         "id":1,
//         "name":"Class1",
//         "description":"xxxxx",
//         "num":100 
//     },
//     {
//         "id":2,
//         "name":"Class2",
//         "description":"xxxxx",
//         "num":100 
//     },
//     {
//         "id":3,
//         "name":"Class2",
//         "description":"xxxxx",
//         "num":100 
//     },
//     {
//         "id":4,
//         "name":"Class2",
//         "description":"xxxxx",
//         "num":100 
//     },
//     {
//         "id":5,
//         "name":"Class2",
//         "description":"xxxxx",
//         "num":100 
//     },
//     {
//         "id":6,
//         "name":"Class2",
//         "description":"xxxxx",
//         "num":100 
//     },
//     {
//         "id":7,
//         "name":"Class2",
//         "description":"xxxxx",
//         "num":100 
//     },
//     {
//         "id":8,
//         "name":"Class2",
//         "description":"",
//         "num":100 
//     },
//     {
//         "id":9,
//         "name":"Class23",
//         "description":"xxxxxxddddxxx",
//         "num":100 
//     }
// ]


// var postData = {"msgcode":1,"msg":"cccccc"}

var postData=[
    {
        "id":1,
        "name":"QuestionLib1",
        "description":"xxxhhxx",
        "num":18
    },
    {
        "id":2,
        "name":"QuestionLib2",
        "description":"xxxxx",
        "num":100 
    }
    
]


app.all('/getData', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.all('/postData', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});





app.post('/postData', function(request, response) {
    // 输出 JSON 格式

    // if (request.body.data) {
    //     if (request.body.data != '') {
    //         postData = {
    //             'name': request.body.data
    //         }
    //     }
    // }
    // response.json(postData);

    //  setTimeout(function(){
    //     response.json(postData);
    //  },500);
    //  response.end(JSON.stringify(data));



    
    let checkRes={};
    if(request.body.key=="123"){
        checkRes={isisRight:true};
    }else{
        checkRes={isisRight:false};
    }

    response.json(checkRes);

});

app.get('/getData', function(request, response) {
    response.json(getData);
});

var server = app.listen(12331, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("address: %s, port: %d", host, port);
});