// http://localhost:3000/report
// https://eveapp-api.herokuapp.com/report

function moneyToFloat(money) {
  return parseFloat(money.substring(1));
}

function floatToMoney(num) {
  let n = num.toFixed(2); 
  return Number(n).toLocaleString('en', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function removeMoneySign(money) {
  return money.substring(1);
}

$(document).ready(function() {

  let dailyTotalCost,
      dailyTotalRetail,currentMTDCostTotal = 0,
      currentMTDRetailTotal = 0,
      currentMTDSalesTotal = 0,
      currentBOHTotal = 88903.00,
      purchases,
      mo1Margin,
      unknown;

  let cash_purchases_cost_sum = 0,
      cash_purchases_retail_sum = 0,
      frito_lay_ice_pbs_cost_sum = 0,
      frito_lay_ice_pbs_retail_sum = 0,
      edi_cost_sum = 0,
      edi_retail_sum = 0,
      billbacks_sum = 0,
      price_override_sum = 0,
      markdowns_sum = 0,
      write_offs_sum = 0,
      commissions_sum = 0,
      markups_sum = 0,
      sales_sum = 0,
      boh_adjust_sum = 0,
      dailyTotalCost_sum = 0,
      dailyTotalRetail_sum = 0,
      unknown_sum = 0;
  

  const $container = $("#container");
  $.getJSON("https://eveapp-api.herokuapp.com/report").then(function(report) {
    let numOfDays = 31,
        dayCount = 1;
    report.forEach(function(row) {
      const cash_purchases_cost = removeMoneySign(row.cash_purchases_cost),
      cash_purchases_retail = removeMoneySign(row.cash_purchases_retail),
      frito_lay_ice_pbs_cost = removeMoneySign(row.frito_lay_ice_pbs_cost),
      frito_lay_ice_pbs_retail = removeMoneySign(row.frito_lay_ice_pbs_retail),
      edi_cost = removeMoneySign(row.edi_cost),
      edi_retail = removeMoneySign(row.edi_retail),
      billbacks = removeMoneySign(row.billbacks),
      price_override = removeMoneySign(row.price_override),
      markdowns = removeMoneySign(row.markdowns),
      write_offs = removeMoneySign(row.write_offs),
      commissions = removeMoneySign(row.commissions),
      markups = removeMoneySign(row.markups),
      sales = removeMoneySign(row.sales),
      boh_adjust = removeMoneySign(row.boh_adjust);

      dailyTotalCost = moneyToFloat(row.cash_purchases_cost) + 
      moneyToFloat(row.frito_lay_ice_pbs_cost) + 
      moneyToFloat(row.edi_cost) - 
      moneyToFloat(row.billbacks);

      dailyTotalRetail = moneyToFloat(row.cash_purchases_retail) + 
      moneyToFloat(row.frito_lay_ice_pbs_retail) + 
      moneyToFloat(row.commissions) +
      moneyToFloat(row.markups) +
      moneyToFloat(row.edi_retail) - 
      moneyToFloat(row.price_override) - 
      moneyToFloat(row.markdowns) - 
      moneyToFloat(row.write_offs);

      currentMTDCostTotal += moneyToFloat(row.cash_purchases_cost) + 
      moneyToFloat(row.frito_lay_ice_pbs_cost) + 
      moneyToFloat(row.edi_cost) - 
      moneyToFloat(row.billbacks);

      currentMTDRetailTotal += moneyToFloat(row.cash_purchases_retail) + 
      moneyToFloat(row.frito_lay_ice_pbs_retail) + 
      moneyToFloat(row.commissions) +
      moneyToFloat(row.markups) +
      moneyToFloat(row.edi_retail) - 
      moneyToFloat(row.price_override) - 
      moneyToFloat(row.markdowns) - 
      moneyToFloat(row.write_offs);

      currentMTDSalesTotal += moneyToFloat(row.sales);

      currentBOHTotal += moneyToFloat(row.cash_purchases_retail) + 
      moneyToFloat(row.frito_lay_ice_pbs_retail) + 
      moneyToFloat(row.commissions) +
      moneyToFloat(row.markups) +
      moneyToFloat(row.edi_retail) - 
      moneyToFloat(row.price_override) - 
      moneyToFloat(row.markdowns) - 
      moneyToFloat(row.write_offs) - moneyToFloat(row.sales);

      purchases = (dailyTotalRetail - dailyTotalCost) / dailyTotalRetail;

      mo1Margin = (currentMTDRetailTotal - currentMTDCostTotal) / (currentMTDRetailTotal);

      unknown = sales - 0.00;



      cash_purchases_cost_sum += moneyToFloat(row.cash_purchases_cost);
      cash_purchases_retail_sum += moneyToFloat(row.cash_purchases_retail);
      frito_lay_ice_pbs_cost_sum += moneyToFloat(row.frito_lay_ice_pbs_cost);
      frito_lay_ice_pbs_retail_sum += moneyToFloat(row.frito_lay_ice_pbs_retail);
      edi_cost_sum += moneyToFloat(row.edi_cost);
      edi_retail_sum += moneyToFloat(row.edi_retail);
      billbacks_sum += moneyToFloat(row.billbacks);
      price_override_sum += moneyToFloat(row.price_override);
      markdowns_sum += moneyToFloat(row.markdowns);
      write_offs_sum += moneyToFloat(row.write_offs);
      commissions_sum += moneyToFloat(row.commissions);
      markups_sum += moneyToFloat(row.markups);
      sales_sum += moneyToFloat(row.sales);
      boh_adjust_sum += moneyToFloat(row.boh_adjust);

      dailyTotalCost_sum += dailyTotalCost;
      dailyTotalRetail_sum += dailyTotalRetail;

      
      unknown_sum += unknown;



      let $newRow = $("<tr>"),
          // $date = $("<th>", {
          //   text: `${new Date(row.date).toLocaleDateString("en-US")}`,
          //   "scope": "row"
          // }),
          $day = $("<th>", {
            text: `${dayCount}`,
            "scope": "row",
            class: "grey"
          }),
          $cashPurchasesCost = $("<td>", {
            text: `${cash_purchases_cost}`,
            class: "greyyellow"
          }), 
          $cashPurchasesRetail = $("<td>", {
            text: `${cash_purchases_retail}`,
            class: "greyyellow"
          }),
          $fritoLayIcePBsCost = $("<td>", {
            text: `${frito_lay_ice_pbs_cost}`,
            class: "greyorange"
          }),
          $fritoLayIcePBsRetail = $("<td>", {
            text: `${frito_lay_ice_pbs_retail}`,
            class: "greyorange"
          }),
          $ediCost = $("<td>", {
            text: `${edi_cost}`,
            class: "greyorange"
          }),
          $ediRetail = $("<td>", {
            text: `${edi_retail}`,
            class: "greyorange"
          }),
          $dailyTotalCost = $("<td>", {
            text: `*${floatToMoney((
              moneyToFloat(row.cash_purchases_cost) + 
              moneyToFloat(row.frito_lay_ice_pbs_cost) + 
              moneyToFloat(row.edi_cost) - 
              moneyToFloat(row.billbacks)
             ))}`,
             class: "greygreen",
             "data-toggle": "tooltip","data-placement": "top","title": "Cash Purchases Cost + Frito Lay Ice PBs Cost - Billbacks"
          }),
          $dailyTotalRetail = $("<td>", {
            text: `*${floatToMoney((
              moneyToFloat(row.cash_purchases_retail) + 
              moneyToFloat(row.frito_lay_ice_pbs_retail) + 
              moneyToFloat(row.commissions) +
              moneyToFloat(row.markups) +
              moneyToFloat(row.edi_retail) - 
              moneyToFloat(row.price_override) - 
              moneyToFloat(row.markdowns) - 
              moneyToFloat(row.write_offs)
             ))}`,
             class: "greygreen",
             "data-toggle": "tooltip","data-placement": "top","title": "Cash Purchases Retail + Frito Lay Ice PBs Retail + Commissions + Markups + EDI Retail - Price Override - Markdowns - Write Offs"
          }),
          $mtdCost = $("<td>", {
            text: `*${floatToMoney(currentMTDCostTotal)}`,
            class: "greyorange",
            "data-toggle": "tooltip","data-placement": "top","title": "Sum of Daily Total Cost from beginning of the month to current day"
          }),
          $mtdRetail = $("<td>", {
            text: `*${floatToMoney(currentMTDRetailTotal)}`,
            class: "greyorange",
            "data-toggle": "tooltip","data-placement": "top","title": "Sum of Daily Total Retail from beginning of the month to current day"
          }),
          $billbacks = $("<td>", {
            text: `${billbacks}`,
            class: "yellow"
          }),
          $mtdCost2 = $("<td>", {
            text: `*${floatToMoney(currentMTDCostTotal)}`,
            class: "greyorange",
            "data-toggle": "tooltip","data-placement": "top","title": "Sum of Daily Total Cost from beginning of the month to current day"
          }),
          $mtdRetail2 = $("<td>", {
            text: `*${floatToMoney(currentMTDRetailTotal)}`,
            class: "greyorange",
            "data-toggle": "tooltip","data-placement": "top","title": "Sum of Daily Total Retail from beginning of the month to current day"
          }),
          $priceOverride = $("<td>", {
            text: `${price_override}`
          }),
          $markdowns = $("<td>", {
            text: `${markdowns}`
          }),
          $writeOffs = $("<td>", {
            text: `${write_offs}`
          }),
          $commissions = $("<td>", {
            text: `${commissions}`,
            class: "greygreen"
          }),
          $markups = $("<td>", {
            text: `${markups}`,
            class: "greygreen"
          }),
          $sales = $("<td>", {
            text: `${sales}`,
            class: "greygreen"
          }),
          $mtdSales = $("<td>", {
            text: `*${floatToMoney(currentMTDSalesTotal)}`,
            class: "mediumgreen",
            "data-toggle": "tooltip","data-placement": "top","title": "Sum of Sales from beginning of the month to current day"
          }),
          $boh = $("<td>", {
            text: `*${floatToMoney(currentBOHTotal)}`,
            class: "greyorange",
            "data-toggle": "tooltip","data-placement": "top","title": "Previous day's BOH + Daily Total Retail - Sales Daily"
          }),
          $purchases = $("<td>", {
            text: `*${floatToMoney(purchases)}%`,
            class: "yellow",
            "data-toggle": "tooltip","data-placement": "top","title": "(Daily Total Retail - Daily Total Cost) / Daily Total Retail"
          }),
          $mo1Margin = $("<td>", {
            text: `*${floatToMoney(mo1Margin)}%`,
            class: "yellow",
            "data-toggle": "tooltip","data-placement": "top","title": "(MTD Retail - MTD Cost) / MTD Retail"
          }),
          $bohAdjust = $("<td>", {
            text: `${boh_adjust}`,
            class: "greyred"
          }),
          $unknown = $("<td>", {
            text: `*${floatToMoney(unknown)}`,
            class: "grey",
            "data-toggle": "tooltip","data-placement": "top","title": "Sales - Specified Amount"
          }),
          $deleteButton = $("<button>", {
            "class": "delete",
            text: "Delete",
            "data-id": `${row.id}`
          });
          $delete = $("<td>");
        $delete.append($deleteButton);
      $newRow
        .append($day)
        .append($cashPurchasesCost)
        .append($cashPurchasesRetail)
        .append($fritoLayIcePBsCost)
        .append($fritoLayIcePBsRetail)
        .append($ediCost)
        .append($ediRetail)
        .append($dailyTotalCost)
        .append($dailyTotalRetail)
        .append($mtdCost)
        .append($mtdRetail)
        .append($billbacks)
        .append($mtdCost2)
        .append($mtdRetail2)
        .append($priceOverride)
        .append($markdowns)
        .append($writeOffs)
        .append($commissions)
        .append($markups)
        .append($sales)
        .append($mtdSales)
        .append($boh)
        .append($purchases)
        .append($mo1Margin)
        .append($bohAdjust)
        .append($unknown)
        .append($delete);
      $container.append($newRow);
      dayCount += 1;
    });
    





    /** Blank days */
    while (dayCount <= numOfDays) {
      let $newRow = $("<tr>"),
      $day = $("<th>", {
        text: `${dayCount}`,
        "scope": "row",
        class: "grey"
      }),
      $cashPurchasesCost = $("<td>", {
        text: ``,
        class: "greyyellow"
      }), 
      $cashPurchasesRetail = $("<td>", {
        text: ``,
        class: "greyyellow"
      }),
      $fritoLayIcePBsCost = $("<td>", {
        text: ``,
        class: "greyorange"
      }),
      $fritoLayIcePBsRetail = $("<td>", {
        text: ``,
        class: "greyorange"
      }),
      $ediCost = $("<td>", {
        text: ``,
        class: "greyorange"
      }),
      $ediRetail = $("<td>", {
        text: ``,
        class: "greyorange"
      }),
      $dailyTotalCost = $("<td>", {
        text: ``,
         class: "greygreen"
      }),
      $dailyTotalRetail = $("<td>", {
        text: ``,
         class: "greygreen"
      }),
      $mtdCost = $("<td>", {
        text: ``,
        class: "greyorange",
        "data-toggle": "tooltip","data-placement": "top","title": "Sum of Daily Total Cost from beginning of the month to current day"
      }),
      $mtdRetail = $("<td>", {
        text: ``,
        class: "greyorange",
        "data-toggle": "tooltip","data-placement": "top","title": "Sum of Daily Total Retail from beginning of the month to current day"
      }),
      $billbacks = $("<td>", {
        text: ``,
        class: "yellow"
      }),
      $mtdCost2 = $("<td>", {
        text: ``,
        class: "greyorange",
        "data-toggle": "tooltip","data-placement": "top","title": "Sum of Daily Total Cost from beginning of the month to current day"
      }),
      $mtdRetail2 = $("<td>", {
        text: ``,
        class: "greyorange",
        "data-toggle": "tooltip","data-placement": "top","title": "Sum of Daily Total Retail from beginning of the month to current day"
      }),
      $priceOverride = $("<td>", {
        text: ``
      }),
      $markdowns = $("<td>", {
        text: ``
      }),
      $writeOffs = $("<td>", {
        text: ``
      }),
      $commissions = $("<td>", {
        text: ``,
        class: "greygreen"
      }),
      $markups = $("<td>", {
        text: ``,
        class: "greygreen"
      }),
      $sales = $("<td>", {
        text: ``,
        class: "greygreen"
      }),
      $mtdSales = $("<td>", {
        text: ``,
        class: "mediumgreen",
        "data-toggle": "tooltip","data-placement": "top","title": "Sum of Sales from beginning of the month to current day"
      }),
      $boh = $("<td>", {
        text: ``,
        class: "greyorange",
        "data-toggle": "tooltip","data-placement": "top","title": "Previous day's BOH + Daily Total Retail - Sales Daily"
      }),
      $purchases = $("<td>", {
        text: ``,
        class: "yellow",
        "data-toggle": "tooltip","data-placement": "top","title": "(Daily Total Retail - Daily Total Cost) / Daily Total Retail"
      }),
      $mo1Margin = $("<td>", {
        text: ``,
        class: "yellow",
        "data-toggle": "tooltip","data-placement": "top","title": "(MTD Retail - MTD Cost) / MTD Retail"
      }),
      $bohAdjust = $("<td>", {
        text: ``,
        class: "greyred"
      }),
      $unknown = $("<td>", {
        text: ``,
        class: "grey",
        "data-toggle": "tooltip","data-placement": "top","title": "Sales - Specified Amount"
      })
      $deleteButton = $("<button>", {
        "class": "delete",
        text: "Delete",
        // "data-id": `${row.id}`
      });
      $delete = $("<td>");
    // $delete.append($deleteButton);
  $newRow
    .append($day)
    .append($cashPurchasesCost)
    .append($cashPurchasesRetail)
    .append($fritoLayIcePBsCost)
    .append($fritoLayIcePBsRetail)
    .append($ediCost)
    .append($ediRetail)
    .append($dailyTotalCost)
    .append($dailyTotalRetail)
    .append($mtdCost)
    .append($mtdRetail)
    .append($billbacks)
    .append($mtdCost2)
    .append($mtdRetail2)
    .append($priceOverride)
    .append($markdowns)
    .append($writeOffs)
    .append($commissions)
    .append($markups)
    .append($sales)
    .append($mtdSales)
    .append($boh)
    .append($purchases)
    .append($mo1Margin)
    .append($bohAdjust)
    .append($unknown)
    .append($delete);
  $container.append($newRow);
      dayCount += 1;
    }



    
    (function(){
      /** Summary 1 */

      let $newRow = $("<tr>"),
      $day = $("<th>", {
        text: ``,
        "scope": "row",
      }),
      $cashPurchasesCost = $("<td>", {
        text: `?.??`
      }), 
      $cashPurchasesRetail = $("<td>", {
        text: `?.??`,
      }),
      $fritoLayIcePBsCost = $("<td>", {
        text: `?.??`,
      }),
      $fritoLayIcePBsRetail = $("<td>", {
        text: `?.??`,
      }),
      $ediCost = $("<td>", {
        text: `?.??`,
      }),
      $ediRetail = $("<td>", {
        text: `?.??`,
      }),
      $dailyTotalCost = $("<td>", {
        text: `?.??`,
      }),
      $dailyTotalRetail = $("<td>", {
        text: `?.??`,
      }),
      $mtdCost = $("<td>", {
        text: `?.??`,
        "data-toggle": "tooltip","data-placement": "top","title": "Sum of Daily Total Cost from beginning of the month to current day"
      }),
      $mtdRetail = $("<td>", {
        text: `?.??`,
        "data-toggle": "tooltip","data-placement": "top","title": "Sum of Daily Total Retail from beginning of the month to current day"
      }),
      $billbacks = $("<td>", {
        text: `?.??`,
      }),
      $mtdCost2 = $("<td>", {
        text: `?.??`,
        "data-toggle": "tooltip","data-placement": "top","title": "Sum of Daily Total Cost from beginning of the month to current day"
      }),
      $mtdRetail2 = $("<td>", {
        text: `?.??`,
        "data-toggle": "tooltip","data-placement": "top","title": "Sum of Daily Total Retail from beginning of the month to current day"
      }),
      $priceOverride = $("<td>", {
        text: `?.??`
      }),
      $markdowns = $("<td>", {
        text: `?.??`
      }),
      $writeOffs = $("<td>", {
        text: `?.??`
      }),
      $commissions = $("<td>", {
        text: `?.??`,
      }),
      $markups = $("<td>", {
        text: `?.??`,
      }),
      $sales = $("<td>", {
        text: `?.??`,
      }),
      $mtdSales = $("<td>", {
        text: `?.??`,
        "data-toggle": "tooltip","data-placement": "top","title": "Sum of Sales from beginning of the month to current day"
      }),
      $boh = $("<td>", {
        text: `?.??`,
        "data-toggle": "tooltip","data-placement": "top","title": "Previous day's BOH + Daily Total Retail - Sales Daily"
      }),
      $purchases = $("<td>", {
        text: `?.??`,
        "data-toggle": "tooltip","data-placement": "top","title": "(Daily Total Retail - Daily Total Cost) / Daily Total Retail"
      }),
      $mo1Margin = $("<td>", {
        text: `?.??`,
        "data-toggle": "tooltip","data-placement": "top","title": "(MTD Retail - MTD Cost) / MTD Retail"
      }),
      $bohAdjust = $("<td>", {
        text: `?.??`,
      }),
      $unknown = $("<td>", {
        text: `?.??`,
        "data-toggle": "tooltip","data-placement": "top","title": "Sales - Specified Amount"
      })
      $deleteButton = $("<button>", {
        "class": "delete",
        text: "Delete",
        // "data-id": `${row.id}`
      });
      $delete = $("<td>");
    // $delete.append($deleteButton);
  $newRow
    .append($day)
    .append($cashPurchasesCost)
    .append($cashPurchasesRetail)
    .append($fritoLayIcePBsCost)
    .append($fritoLayIcePBsRetail)
    .append($ediCost)
    .append($ediRetail)
    .append($dailyTotalCost)
    .append($dailyTotalRetail)
    .append($mtdCost)
    .append($mtdRetail)
    .append($billbacks)
    .append($mtdCost2)
    .append($mtdRetail2)
    .append($priceOverride)
    .append($markdowns)
    .append($writeOffs)
    .append($commissions)
    .append($markups)
    .append($sales)
    .append($mtdSales)
    .append($boh)
    .append($purchases)
    .append($mo1Margin)
    .append($bohAdjust)
    .append($unknown)
    .append($delete);
  $container.append($newRow);
    })();





    (function(){
      /** Summary 2 */

      let $newRow = $("<tr>"),
      $day = $("<th>", {
        text: ``,
        "scope": "row",
      }),
      $cashPurchasesCost = $("<td>", {
        text: `*${floatToMoney(cash_purchases_cost_sum)}`,
        class: "greyyellow"
      }), 
      $cashPurchasesRetail = $("<td>", {
        text: `*${cash_purchases_retail_sum}`,
        class: "greyyellow"
      }),
      $fritoLayIcePBsCost = $("<td>", {
        text: `*${frito_lay_ice_pbs_cost_sum}`,
        class: "greyyellow"
      }),
      $fritoLayIcePBsRetail = $("<td>", {
        text: `*${frito_lay_ice_pbs_retail_sum}`,
        class: "greyyellow"
      }),
      $ediCost = $("<td>", {
        text: `*${edi_cost_sum}`,
        class: "greyyellow"
      }),
      $ediRetail = $("<td>", {
        text: `*${edi_retail_sum}`,
        class: "greyyellow"
      }),
      $dailyTotalCost = $("<td>", {
        text: `*${dailyTotalCost_sum}`,
        class: "greyyellow"
      }),
      $dailyTotalRetail = $("<td>", {
        text: `*${dailyTotalRetail_sum}`,
        class: "greyyellow"
      }),
      $mtdCost = $("<td>", {
        text: `*${currentMTDCostTotal}`,
        class: "greyyellow",
        "data-toggle": "tooltip","data-placement": "top","title": "Sum of Daily Total Cost from beginning of the month to current day"
      }),
      $mtdRetail = $("<td>", {
        text: `*${currentMTDRetailTotal}`,
        class: "greyyellow",
        "data-toggle": "tooltip","data-placement": "top","title": "Sum of Daily Total Retail from beginning of the month to current day"
      }),
      $billbacks = $("<td>", {
        text: `*${billbacks_sum}`,
        class: "greyyellow"
      }),
      $mtdCost2 = $("<td>", {
        text: `*${currentMTDCostTotal}`,
        class: "greyyellow",
        "data-toggle": "tooltip","data-placement": "top","title": "Sum of Daily Total Cost from beginning of the month to current day"
      }),
      $mtdRetail2 = $("<td>", {
        text: `*${currentMTDRetailTotal}`,
        class: "greyyellow",
        "data-toggle": "tooltip","data-placement": "top","title": "Sum of Daily Total Retail from beginning of the month to current day"
      }),
      $priceOverride = $("<td>", {
        text: `*${price_override_sum}`,
        class: "greyyellow"
      }),
      $markdowns = $("<td>", {
        text: `*${markdowns_sum}`,
        class: "greyyellow"
      }),
      $writeOffs = $("<td>", {
        text: `*${write_offs_sum}`,
        class: "greyyellow"
      }),
      $commissions = $("<td>", {
        text: `*${commissions_sum}`,
        class: "greyyellow"
      }),
      $markups = $("<td>", {
        text: `*${markups_sum}`,
        class: "greyyellow"
      }),
      $sales = $("<td>", {
        text: `*${sales_sum}`,
        class: "greyyellow"
      }),
      $mtdSales = $("<td>", {
        text: `*${currentMTDSalesTotal}`,
        class: "greyyellow",
        "data-toggle": "tooltip","data-placement": "top","title": "Sum of Sales from beginning of the month to current day"
      }),
      $boh = $("<td>", {
        text: `*${floatToMoney(currentBOHTotal)}`,
        class: "greyyellow",
        "data-toggle": "tooltip","data-placement": "top","title": "Previous day's BOH + Daily Total Retail - Sales Daily"
      }),
      $purchases = $("<td>", {
        text: ``,
        class: "greyyellow",
        "data-toggle": "tooltip","data-placement": "top","title": "(Daily Total Retail - Daily Total Cost) / Daily Total Retail"
      }),
      $mo1Margin = $("<td>", {
        text: ``,
        class: "greyyellow",
        "data-toggle": "tooltip","data-placement": "top","title": "(MTD Retail - MTD Cost) / MTD Retail"
      }),
      $bohAdjust = $("<td>", {
        text: ``,
        class: "greyyellow"
      }),
      $unknown = $("<td>", {
        text: `*${unknown_sum}`,
        class: "greyyellow",
        "data-toggle": "tooltip","data-placement": "top","title": "Sales - Specified Amount"
      })
      $deleteButton = $("<button>", {
        "class": "delete",
        text: "Delete",
        // "data-id": `${row.id}`
      });
      $delete = $("<td>");
    // $delete.append($deleteButton);
  $newRow
    .append($day)
    .append($cashPurchasesCost)
    .append($cashPurchasesRetail)
    .append($fritoLayIcePBsCost)
    .append($fritoLayIcePBsRetail)
    .append($ediCost)
    .append($ediRetail)
    .append($dailyTotalCost)
    .append($dailyTotalRetail)
    .append($mtdCost)
    .append($mtdRetail)
    .append($billbacks)
    .append($mtdCost2)
    .append($mtdRetail2)
    .append($priceOverride)
    .append($markdowns)
    .append($writeOffs)
    .append($commissions)
    .append($markups)
    .append($sales)
    .append($mtdSales)
    .append($boh)
    .append($purchases)
    .append($mo1Margin)
    .append($bohAdjust)
    .append($unknown)
    .append($delete);
  $container.append($newRow);
    })();

  });

  $("#new-day-form").on("submit", function(e) {
    // e.preventDefault();
    const cash_purchases_cost = $("#cash_purchases_cost").val();
    const cash_purchases_retail = $("#cash_purchases_retail").val();
    const frito_lay_ice_pbs_cost = $("#frito_lay_ice_pbs_cost").val();
    const frito_lay_ice_pbs_retail = $("#frito_lay_ice_pbs_retail").val();
    const edi_cost = $("#edi_cost").val();
    const edi_retail = $("#edi_retail").val();
    const billbacks = $("#billbacks").val();
    const price_override = $("#price_override").val();
    const markdowns = $("#markdowns").val();
    const write_offs = $("#write_offs").val();
    const commissions = $("#commissions").val();
    const markups = $("#markups").val();
    const sales = $("#sales").val();
    const boh_adjust = $("#boh_adjust").val();
    $.post("https://eveapp-api.herokuapp.com/report", { 
      cash_purchases_cost,
      cash_purchases_retail,
      frito_lay_ice_pbs_cost,
      frito_lay_ice_pbs_retail,
      edi_cost,
      edi_retail,
      billbacks,
      price_override,
      markdowns,
      write_offs,
      commissions,
      markups,
      sales,
      boh_adjust
     }).then(function(report) {
      $("#new-day-form").trigger("reset");
    });
  });

  $container.on("click", ".delete", function(e) {
    // e.preventDefault();
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