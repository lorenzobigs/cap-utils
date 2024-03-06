sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",

], function(BaseController, JSONModel) {
	"use strict";


	return BaseController.extend("app.controller.Detail", {


		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		onInit : function () {
			// Model used to manipulate control states. The chosen values make sure,
			// detail page is busy indication immediately so there is no break in
			// between the busy indication for loading the view's meta data
			this._aValidKeys = ["shipping", "processor"];
			var oViewModel = new JSONModel({
				busy : false,
				delay : 0,
				lineItemListTitle : this.getResourceBundle().getText("detailLineItemTableHeading"),
				// Set fixed currency on view model (as the OData service does not provide a currency).
				currency : "EUR",
				// the sum of all items of this order
				totalOrderAmount: 0,
				selectedTab: ""
			});

			this.getRouter().getRoute("object").attachPatternMatched(this._onObjectMatched, this);

			this.setModel(oViewModel, "detailView");

			
		},
		
	});
});