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
        context: context
    },  function(err, response) {
        if (err){
            res.send("Lucky 6 robot breakdown,pls wait a minute.");
            return;
        }
        else{
            console.log(JSON.stringify(response));
            var reply ="";
            replyArr=response.output.text;
            replyArr.forEach(function (v, i, arr) {
                reply +=v;
            });
            context =response.context;
            res.send(JSON.stringify(response));
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

/*
* Hi gus,pls use this api by this.
* When you first use this api pls give the robot a greeting like this
* http://localhost:6001/api/message
* after this you will get a json string,like this:
* {"intents":[],"entities":[],"input":{},"output":{"log_messages":[],"text":["Hello i am robot lucky 6"],"nodes_visited":["node_1_1471574230522"]},"context":{"conversation_id":"72ec1c30-4be3-438b-9852-3b7879a5024a","system":{"dialog_stack":["root"],"dialog_turn_counter":1,"dialog_request_counter":1}}}
*pls copy the context value of the json,after this you get a sub json string from response.
* {"conversation_id":"72ec1c30-4be3-438b-9852-3b7879a5024a","system":{"dialog_stack":["root"],"dialog_turn_counter":1,"dialog_request_counter":1}}
* pls use this as the query parameter compose next api invoke request like this.
* http://localhost:6001/api/message/define_something_general?context={"conversation_id":"72ec1c30-4be3-438b-9852-3b7879a5024a","system":{"dialog_stack":["root"],"dialog_turn_counter":1,"dialog_request_counter":1}}
* so every time you call different api pls take the context json value as request parameter.
* Deficiencies, please exhibitions
*
* */



