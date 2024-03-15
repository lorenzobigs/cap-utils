sap.ui.define([
    "./BaseController"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController) {
        "use strict";

        return BaseController.extend("frontend.controller.Master", {
            onInit: function () {

            },
            onNavToBooks: function(){
                this.getRouter().navTo("books");
            },
            onListItemPressed : function(oEvent){
                var oItem, oCtx;
                oItem = oEvent.getSource();
                oCtx = oItem.getBindingContext();
                this.getRouter().navTo("author",{
                    authorId : oCtx.getProperty("ID")
                });
            }
        });
    });
