let site, user, username;

function formatDate(...args) {
  if (!args || isNaN(date)) {
    var date = new Date();
  } else {
    var date = new Date(args);
  }

  var options = {
    month: "long",
    year: "numeric",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  var formattedDate = date.toLocaleString(this.locale, options);
  console.log(formattedDate);
}

function logOn(model) {
  const params = {
    Service: "Admin",
    Mode: "UserAttribList",
    Session: "false",
    "content-Type": "text/xml",
  };

  jQuery.ajax({
    url: "https://srvmes.icms.it/XMII/Illuminator",
    data: params,
    method: "GET",
    async: true,

    success: function (data) {
      site = jQuery(data).find("DEFAULT_SITE").text();
      user = jQuery(data).find("User").text();
      username = jQuery(data).find("FullName").text();

      if (!site) window.open("https://srvmes.icms.it/XMII/Illuminator");

      model.setProperty("/site", site);
      model.setProperty("/user", user);
      model.setProperty("/userName", username.toUpperCase());
    },

    error: function (err) {
      console.log(err);
    },
  });
}

function onLogout() {
  var that = this;
  var dialog = new sap.m.Dialog({
    title: that.getView().getModel("i18n").getProperty("dialog.logout"),
    type: "Message",
    state: "Warning",
    content: new sap.m.Text({
      text: that.getView().getModel("i18n").getProperty("dialog.logoutConfirm"),
    }),
    beginButton: new sap.m.Button({
      icon: "sap-icon://undo",
      type: "Reject",
      press: function () {
        dialog.close();
      },
    }).addStyleClass("halfSizeButton"),
    endButton: new sap.m.Button({
      icon: "sap-icon://accept",
      type: "Accept",
      press: function () {
        dialog.close();
        var params = {
          Service: "Logout",
          Session: "false",
          "content-Type": "text/xml",
        };
        $.ajax({
          type: "POST",
          data: params,
          async: false,
          url: "https://srvmes.icms.it/XMII/Illuminator",
          success: function (data) {
            try {
              var urll = window.location.href;
              history.pushState({}, null, urll);
              location.reload(true);
            } catch (err) {}
          },
          error: function searchError(xhr, err) {
            console.error("Error on ajax call: " + err);
            console.log(JSON.stringify(xhr));
          },
        });
      },
    }).addStyleClass("halfSizeButton"),
    afterClose: function () {
      dialog.destroy();
    },
  });

  dialog.open();
}
