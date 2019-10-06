var OneSignal = require("onesignal-node");

module.exports = function(Item) {
  Item.beforeRemote("prototype.patchAttributes", function(ctx, unused, next) {
    if (
      ctx.instance.oneSignalUserID &&
      ctx.instance.quantity === 0 &&
      ctx.args.data.quantity > 0
    ) {
      // instantiate the OneSignal app client
      var myClient = new OneSignal.Client({
        userAuthKey: "OGE0MzUyNjAtMjM4Ny00NjNhLTk5NjctMDhxdN2EwOTE3NjJm", // REST API Key
        app: {
          appAuthKey: "OGE0MzUyNjAtMjM4Ny00NjNhLTk5NjctMDhxdN2EwOTE3NjJm", // REST API Key
          appId: "fd568c3d-4d40-405f-9214-b5aaf470fac8" // OneSignal App ID
        }
      });

      // we put the item inside an object
      const instance = {
        ...((ctx && ctx.instance && ctx.instance.toJSON()) || {})
      };

      // create the notification
      var firstNotification = new OneSignal.Notification({
        contents: { en: "The item is available again" },
        data: instance, // we can send the item data so the user know what exactly is available again
        include_player_ids: [ctx.instance.oneSignalUserID] // we put the user OneSignal id here
      });

      //send
      myClient.sendNotification(firstNotification, function(
        err,
        httpResponse,
        data
      ) {
        if (err) {
          console.log("Something went wrong...");
        } else {
          console.log(data, httpResponse.statusCode);
        }
      });
    }
    next();
  });
};
