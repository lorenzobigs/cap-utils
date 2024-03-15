sap.ui.define(function() {
	"use strict";

	var formatter = {

		status :  function (hype) {
				if (hype === "high") {
					return "Success";
				} else if (hype === "medium") {
					return "Warning";
				} else if (hype === "low"){
					return "Error";
				} else {
					return "None";
				}
		}
	};

	return formatter;

},  /* bExport= */ true);