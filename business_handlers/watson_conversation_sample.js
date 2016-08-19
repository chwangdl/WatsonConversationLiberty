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
        //alternate_intents: true,
        //entities:[{entity:"Innovation",value:"Innovation Center"}],
        //intents:[{intent:"Define"}],
        context: context
    },  function(err, response) {
        if (err){
            res.send("error");
            return;
        }
        else{
            var responseText =response.output.text[0];
            input ={"text": "Define"};
            if (responseText == "OK! No problem,Innovation center is built."){
                res.send("Conversation over");
                return;
            }
            sendMessage(req, res, input, response.context);
            console.log(JSON.stringify(response));
            return;
            // else {
            //     sendMessage(req, res, input, response.context);
            //     console.log(JSON.stringify(response));
            //
            // }




        }

    });

}

var context ={};
var input ={};

//00cef515-4849-424e-bbd6-73556eb37cc3

router.get("/",function (req, res, next) {
    //console.log("hello");
    sendMessage(req, res, input, context);
});

module.exports = router;



