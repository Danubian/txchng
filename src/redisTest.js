var redis = require("redis"),
    client = redis.createClient();

// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });

client.on("error", function (err) {
    console.log("Error " + err);
});

var GM_MARKER = "marker";
var markerId = 1;
var marker = {
    x : -1,
    y : -1,
    text : "SWAG OVERLOAD"
}

var string = JSON.stringify(marker);
client.hset(GM_MARKER, markerId, string, redis.print);
client.hset([GM_MARKER, markerId + 1, string], redis.print);
client.hkeys(GM_MARKER, function (err, replies) {
    console.log(replies.length + " replies:");
    replies.forEach(function (reply, i) {
        client.hget(GM_MARKER, i + 1, redis.print);
        console.log("    " + i + ": " + reply);
    });
    client.quit();
});