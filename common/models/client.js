var OneSignal = require("onesignal-node");

module.exports = function(Client) {
  Client.afterRemote("create", function(ctx, modelInstance, next) {
    if (modelInstance.oneSignalUserID && modelInstance.bioFoodEnthusiast) {
      // instantiate the OneSignal app client
      var myClient = new OneSignal.Client({
        userAuthKey: "OGE0MzUyNjAtMjM4Ny00NjNhLTk5NjctMDhmN2EwOTE3NjJm", // REST API Key
        app: {
          appAuthKey: "OGE0MzUyNjAtMjM4Ny00NjNhLTk5NjctMDhmN2EwOTE3NjJm", // REST API Key
          appId: "fd568c3d-4d40-405f-9214-b5acf470fac8" // OneSignal App ID
        }
      });

      // create a device object and specify what tag it has
      var deviceBody = {
        tags: {
          bioFoodEnthusiast: modelInstance.bioFoodEnthusiast
        }
      };

      // edit the current user device with what we created
      myClient.editDevice(modelInstance.oneSignalUserID, deviceBody, function(
        err,
        httpResponse,
        data
      ) {
        if (err) next(err);
        next();
      });
    } else {
      next();
    }
  });
};
