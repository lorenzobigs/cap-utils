sap.ui.define(
    [
      "./BaseController",
        "sap/ui/model/json/JSONModel"
    ],
    function(BaseController, JSONModel) {
      "use strict";
  
      return BaseController.extend("app.controller.App", {
        onInit: function() {
          var oViewModel = new JSONModel({
            busy : true,
            delay : 0,
            layout : "OneColumn",
            previousLayout : "",
            actionButtonsInfo : {
              midColumn : {
                fullScreen : false
              }
            }
          });
          this.setModel(oViewModel, "appView");
        }
      });
    }
  );
  