$(document).ready(function() {
  const $container = $("#container");
  $.getJSON("https://eveapp-api.herokuapp.com/report").then(function(report) {
    report.forEach(function(row) {
      let $newRow = $("<tr>"),
          $date = $("<td>", {
            text: `${new Date(row.date).toLocaleDateString("en-US")}`
          }),
          $totalSales = $("<td>", {
            text: `${row.total_sales}`
          }), 
          $transactionCount = $("<td>", {
            text: `${row. transaction_count}`
          }),
          $averageTransaction = $("<td>", {
            text: `${row. average_transaction}`
          }),
          $commission = $("<td>", {
            text: `${row.commission}`
          }),
          $markup = $("<td>", {
            text: `${row.markup}`
          }),
          $billBacks = $("<td>", {
            text: `${row.bill_backs}`
          }),
          $writeOffs = $("<td>", {
            text: `${row.write_offs}`
          }),
          $markDown = $("<td>", {
            text: `${row.mark_down}`
          }),
          $priceOverride = $("<td>", {
            text: `${row.price_override}`
          }),
          $cashPurchase = $("<td>", {
            text: `${row.cash_purchase}`
          }),
          $edi = $("<td>", {
            text: `${row.electronic_direct}`
          }),
          $delete = $("<button>", {
            "class": "delete",
            text: "X",
            "data-id": `${row.id}`
          });
      $date.append($delete);
      $newRow
        .append($date)
        .append($totalSales)
        .append($transactionCount)
        .append($averageTransaction)
        .append($commission)
        .append($markup)
        .append($billBacks)
        .append($writeOffs)
        .append($markDown)
        .append($priceOverride)
        .append($priceOverride)
        .append($cashPurchase)
        .append($edi);
      $container.append($newRow);
    });
  });

  $("#new-day-form").on("submit", function(e) {
    // e.preventDefault();
    const total_sales = $("#total_sales").val();
    const transaction_count = $("#transaction_count").val();
    const average_transaction = $("#average_transaction").val();
    const commission = $("#commission").val();
    const markup = $("#markup").val();
    const bill_backs = $("#bill_backs").val();
    const write_offs = $("#write_offs").val();
    const mark_down = $("#mark_down").val();
    const price_override = $("#price_override").val();
    const cash_purchase = $("#cash_purchase").val();
    const electronic_direct = $("#electronic_direct").val();
    $.post("https://eveapp-api.herokuapp.com/report", { total_sales, transaction_count, average_transaction, commission, markup, bill_backs, write_offs, mark_down, price_override, cash_purchase, electronic_direct }).then(function(fish) {
      $("#new-day-form").trigger("reset");
    });
  });

  $container.on("click", ".delete", function(e) {
    e.preventDefault();
    const id = $(e.target)
      .data("id");
    const type = $
      .ajax({
        method: "DELETE",
        url: `https://eveapp-api.herokuapp.com/report/${id}`
      })
      .then(function() {
        $(e.target)
          .parent()
          .parent()
          .remove();
      });
  });
});