/**
 * Created by wangchuanhe on 8/19/2016.
 */
var express =require("express");
var router =express.Router();
var watson =require("watson-developer-cloud");
var conversation = watson.conversation({
    username: "42af86aa-5753-4bc5-ab03-2b7109deef55",
    password: "fTlUCZvlZg5J",
    version: "v1",
    version_date: "2016-07-11"
});
function sendMessage(req, res, input, context) {
    conversation.message({
        workspace_id: "00cef515-4849-424e-bbd6-73556eb37cc3",
        input: input,
        alternate_intents:false,
        //intents:intents,
        //entities:entities,
        //entities:[{entity:"Innovation",value:"Innovation Center"}],
        context: context
    },  function(err, response) {
        if (err){
            res.send("Lucky 6 robot breakdown,pls wait a minute.");
            return;
        }
        else{
            // var responseText =response.output.text[0];
            // input ={"text": "Define"};
            // if (responseText == "OK! No problem,Innovation center is built."){
            //     res.send("Conversation over");
            //     return;
            // }
            // sendMessage(req, res, input, response.context);
            // console.log(JSON.stringify(response));
            // return;
            // else {
            //     sendMessage(req, res, input, response.context);
            //     console.log(JSON.stringify(response));
            //
            // }
            console.log(JSON.stringify(response));
            var reply ="";
            replyArr=response.output.text;
            replyArr.forEach(function (v, i, arr) {
                reply +=v;
            });
            //reply =response.output.text[1];
            context =response.context;
            //console.log("Reply from robot lucky 6 is-"+reply+" context is "+JSON.stringify(response.context));
            res.send("reply "+reply+" context is "+JSON.stringify(response.context));
        }

    });

}

var context ={};
var input ={};
var replyArr =[];
var intents =[];
var entities =[];

//00cef515-4849-424e-bbd6-73556eb37cc3

router.get("/",function (req, res, next) {
    //console.log("hello");
    sendMessage(req, res, input, context);
});

router.get("/define_something_general",function (req, res, next) {
    //console.log("hello");
    var contextEncode =req.query["context"];
    var contextDecode =decodeURI(contextEncode);
    context =JSON.parse(contextDecode);
    console.log("context decode is "+contextDecode);
    input ={"text":"define something general"};
    sendMessage(req, res, input, context);
});

router.get("/define_bluemix_team",function (req, res, next) {
    //console.log("hello");
    var contextEncode =req.query["context"];
    var contextDecode =decodeURI(contextEncode);
    context =JSON.parse(contextDecode);
    input ={"text":"define bluemix team"};
    sendMessage(req, res, input, context);
});

module.exports = router;



