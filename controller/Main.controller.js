jQuery.sap.require("pod.utilities.baseFN");
jQuery.sap.require("pod.utilities.transaction");
var that;

sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel",
    "sap/ui/core/routing/History",
    "sap/ui/model/Filter",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Text",
    "sap/m/BusyIndicator",
    "sap/m/BusyDialog",
  ],

  function (
    Controller,
    JSONModel,
    ResourceModel,
    History,
    Filter,
    MessageBox,
    MessageToast,
    Dialog,
    Button,
    Text,
    BusyIndicator,
    BusyDialog
  ) {
    ("use strict");

    return Controller.extend("pod.controller.Main", {
      locale: navigator.language || navigator.userLanguage,
      model: new JSONModel(),
      route: "ACADEMY22/GIANMARCO/RESRCE/TRANSACTION",

      onInit: function () {
        that = this;
        //set model
        that.getView().setModel(that.model);
        //set USER and SITE
        logOn(that.model);
      },

      onAfterRendering: function () {
        //set page title
        const title = that.getView().getModel("i18n").getProperty("page.title");
        that.getView().byId("page-title").setText(title);
      },

      onPress: function () {
        const data = getDataSync("GET_SITE", that.route, {});
        that.model.setProperty("/SITE", data);
      },
    });
  }
);
