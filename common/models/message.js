// Copyright IBM Corp. 2016. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

var OneSignal = require("onesignal-node");

module.exports = function(Message) {
  Message.greet = function(cb) {
    var myClient = new OneSignal.Client({
      userAuthKey: "OGE0MzUyNjAtMjM4Ny00NjNhLTk5NjctMDhmN2EwOTE3NjJm",
      app: {
        appAuthKey: "OGE0MzUyNjAtMjM4Ny00NjNhLTk5NjctMDhmN2EwOTE3NjJm",
        appId: "fd568c3d-4d40-405f-9214-b5acf470fac8"
      }
    });

    // we need to create a notification to send
    var firstNotification = new OneSignal.Notification({
      contents: { en: "Hello dear user" },
      included_segments: ["Subscribed Users"]
    });

    myClient.sendNotification(firstNotification, function(
      err,
      httpResponse,
      data
    ) {
      if (err) {
        console.log("Something went wrong...");
      } else {
        cb(null, "The notification was sent");
      }
    });
  };
};
