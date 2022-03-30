function getDataSync(transaction, route, input) {
  var results;
  var transactionCall = route + "/" + transaction;

  input.TRANSACTION = transactionCall;
  input.OutputParameter = "*";

  $.ajax({
    type: "POST",
    data: input,
    dataType: "xml",
    async: false,
    url: "https://srvmes.icms.it/XMII/Runner",
    success: function (data) {
      results = JSON.parse(data.documentElement.textContent);
    },
    error: function (xhr, err) {
      console.error("Error on ajax call: " + err);
      console.log(JSON.stringify(xhr));
    },
  });
  return results;
}

function getDataAsync(transaction, route, input, bool) {
  sap.ui.core.BusyIndicator.show();

  var transactionCall = route + "/" + transaction;

  input.TRANSACTION = transactionCall;
  input.OutputParameter = "*";

  jQuery.ajax({
    url: "https://srvmes.icms.it/XMII/Runner",
    data: input,
    method: "POST",
    dataType: "xml",
    async: true,

    success: function (data) {
      sap.ui.core.BusyIndicator.hide();
      let result = JSON.parse(data.documentElement.textContent);
      console.log(result);
    },

    error: function (data) {
      sap.ui.core.BusyIndicator.hide();
      console.log(data);
    },
  });
}
