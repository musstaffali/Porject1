var APIkey = "LMLYK2TEYEV7H4G5";
var queryCompanyURL = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + searchTerm + "&apikey=LMLYK2TEYEV7H4G5";
var querySearchURL = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" + searchTerm + "&apikey=LMLYK2TEYEV7H4G5";
// var queryIndURL = "https://cloud.iexapis.com/stable/stock/market/collection/sector?collectionName=" + searchTerm + "?token=pk_671c931364a84a08aae2391ce68605f7";


function getTopTrending() {
    var queryTopURL = "https://cloud.iexapis.com/stable/stock/market/list/gainers?token=pk_671c931364a84a08aae2391ce68605f7"
    $.ajax({
        url: queryTopURL,
        method: "GET"
    }).then(function (topTrendstop10) {
        console.log(topTrendstop10);

        //TOP TRENDING COL 1

        $("#compName1").text(topTrendstop10[0].companyName);
        $("#compSymb1").text(topTrendstop10[0].symbol);
        $("#price1").text("$" + topTrendstop10[0].latestPrice);
        $("#change1").text("$" + topTrendstop10[0].change);
        $("#upDown1").text((topTrendstop10[0].changePercent * 100).toFixed(2) + "%");

        //TOP TRENDING COL 2
        $("#compName2").text(topTrendstop10[1].companyName);
        $("#compSymb2").text(topTrendstop10[1].symbol);
        $("#price2").text("$" + topTrendstop10[1].latestPrice);
        $("#change2").text("$" + topTrendstop10[1].change);
        $("#upDown2").text((topTrendstop10[1].changePercent * 100).toFixed(2) + "%");

        //TOP TRENDING COL 3
        $("#compName3").text(topTrendstop10[2].companyName);
        $("#compSymb3").text(topTrendstop10[2].symbol);
        $("#price3").text("$" + topTrendstop10[2].latestPrice);
        $("#change3").text("$" + topTrendstop10[2].change);
        $("#upDown3").text((topTrendstop10[2].changePercent * 100).toFixed(2) + "%");

        //TOP TRENDING COL 4
        $("#compName4").text(topTrendstop10[3].companyName);
        $("#compSymb4").text(topTrendstop10[3].symbol);
        $("#price4").text("$" + topTrendstop10[3].latestPrice);
        $("#change4").text("$" + topTrendstop10[3].change);
        $("#upDown4").text((topTrendstop10[3].changePercent * 100).toFixed(2) + "%");

        //TOP TRENDING COL 5
        $("#compName5").text(topTrendstop10[4].companyName);
        $("#compSymb5").text(topTrendstop10[4].symbol);
        $("#price5").text("$" + topTrendstop10[4].latestPrice);
        $("#change5").text("$" + topTrendstop10[4].change);
        $("#upDown5").text((topTrendstop10[4].changePercent * 100).toFixed(2) + "%");

        var upDownC = $(".changes").val();
        if (upDownC >= 0) {
            $(".upDownPct").css("color", "green");
        } else {
            $(".upDownPct").css("color", "red");
        }


    });
}
getTopTrending();




function setIndexRows() {

    var tagName = document.getElementsByTagName("tr");
    var i;
    for (i = 0; i < tagName.length; i++) {
        (i + 1) + tagName[i].rowIndex
        console.log("The Index of Row" + (i + 1) + " is:" + tagName[i].rowIndex);
    };
}
setIndexRows();


$(".button").on("click", function (event) {
    event.preventDefault();
    var searchTerm = $("#searchTerm")
        .val()
        .trim()
    // .toLowerCase();
    $("#searchTerm").val("");
    console.log(searchTerm);

    getStocks(searchTerm);
    // getIndustry();

})


function getStocks(searchTerm) {
    var querySearchURL = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" + searchTerm + "&apikey=LMLYK2TEYEV7H4G5";
    console.log(querySearchURL);
    jQuery.ajax({
        url: querySearchURL,
        method: "GET"
    }).then(function (data) {
        console.log(data);
        console.log(data.bestMatches[0]);
        var symbol = data.bestMatches[0]["1. symbol"];
        console.log(symbol);
        localStorage.saveName = JSON.stringify(data.bestMatches[0]);

        var symbol = data.bestMatches[0]["1. symbol"];
        var queryCompanyURL = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + symbol + "&apikey=LMLYK2TEYEV7H4G5";
        jQuery.ajax({
            url: queryCompanyURL,
            dataType: 'json',
            contentType: "application/json",
            success: function (results) {
                console.log(results);

                //save company name and global quote
                localStorage.saveData = JSON.stringify(results);
                // location.href = "results.html";
            }
        });
        var queryNewsURL = "https://cloud.iexapis.com/stable/stock/" + symbol + "/news?token=pk_671c931364a84a08aae2391ce68605f7";
        console.log(queryNewsURL);
        jQuery.ajax({
            url: queryNewsURL,
            method: "GET"
        }).then(function (indData) {
            console.log(indData);
        });
    })

};


//When a blank star is clicked, the data will be moved to the favorites table and appended

function saveFaves() {
    localStorage.saveArr = JSON.stringify(favorites);
}

var favorites = [];


function renderFavesList() {
    $("#faveTable").empty();
    console.log(favorites);
    for (i = 0; i < favorites.length; i++) {
        var cellRank = $("<td>").append("<i class='fas fa-star'</i>");
        var cellCompany = $("<td>").text(favorites[i].name);
        var cellPrice = $("<td>").text(favorites[i].price);
        var cellChange = $("<td>").text(favorites[i].change);
        var upDown = $("<td>").text(favorites[i].percent);
        var tableRow = $("<tr>");
        tableRow.append(cellRank, cellCompany, cellPrice, cellChange, upDown);
        $("#faveTable").append(tableRow);
        var percentColor = cellChange.innerHTML;
        if (percentColor >= 0) {
            $(".upDownFav").css("color", "green");
        } else {
            $(".upDownFav").css("color", "red");
        }
    };
    
};


$("#star-rank-1").on("click", function (event) {
    event.preventDefault();
    // makeFavorites();
    // loopCompanies();
    // saveArray();
    // company1 = []
    var companyUno = new Object();
    console.log(companyUno);
    //name
    var compInfo1 = $("#compName1")[0].innerHTML;
    // company1.push(compInfo1);
    companyUno.name = compInfo1;
    //price
    var priceInfo1 = $("#price1")[0].innerHTML;
    companyUno.price = priceInfo1;
    // company1.push(priceInfo1);
    //change
    var chng1 = $("#change1")[0].innerHTML;
    companyUno.change = chng1;
    // company1.push(chng1);
    //percentage
    var pct1 = $("#upDown1")[0].innerHTML;
    companyUno.percent = pct1;
    // company1.push(pct1);
    //push to favorites
    // console.log(company1);
    favorites.push(companyUno);
    saveFaves();
    renderFavesList();

});



$("#star-rank-2").on("click", function (event) {
    event.preventDefault();
    // makeFavorites();
    // loopCompanies();
    var company2 = new Object();
    console.log(company2);
    //name
    var compInfo2 = $("#compName2")[0].innerHTML;
    company2.name = compInfo2;
    //price
    var priceInfo2 = $("#price2")[0].innerHTML;
    company2.price = priceInfo2;
    //change
    var chng2 = $("#change2")[0].innerHTML;
    company2.change = chng2;
    //percentage
    var pct2 = $("#upDown2")[0].innerHTML;
    company2.percent = pct2;
    //push to favorites
    favorites.push(company2);
    console.log(favorites);
    saveFaves();
    renderFavesList();
});

$("#star-rank-3").on("click", function (event) {
    event.preventDefault();
    var company3 = new Object();
    //name
    var compInfo3 = $("#compName3")[0].innerHTML;
    company3.name = compInfo3;
    //price
    var priceInfo3 = $("#price3")[0].innerHTML;
    company3.price = priceInfo3;
    //change
    var chng3 = $("#change3")[0].innerHTML;
    company3.change = chng3;
    //percentage
    var pct3 = $("#upDown3")[0].innerHTML;
    company3.percent = pct3;
    //push to favorites
    favorites.push(company3);
    console.log(favorites);
    saveFaves();
    renderFavesList();
});

$("#star-rank-4").on("click", function (event) {
    event.preventDefault();
    company4 = new Object();
    //name
    var compInfo4 = $("#compName4")[0].innerHTML;
    company4.name = compInfo4;
    //price
    var priceInfo4 = $("#price4")[0].innerHTML;
    company4.price = priceInfo4;
    //change
    var chng4 = $("#change4")[0].innerHTML;
    company4.change = chng4;
    //percentage
    var pct4 = $("#upDown4")[0].innerHTML;
    company4.percent = pct4;
    //push to favorites
    favorites.push(company4);
    console.log(favorites);
    saveFaves();
    renderFavesList();
});

$("#star-rank-5").on("click", function (event) {
    event.preventDefault();
    company5 = new Object();
    //name
    var compInfo5 = $("#compName5")[0].innerHTML;
    company5.name = compInfo5;
    //price
    var priceInfo5 = $("#price5")[0].innerHTML;
    company5.price = priceInfo5;
    //change
    var chng5 = $("#change5")[0].innerHTML;
    company5.change = chng5;
    //percentage
    var pct5 = $("#upDown5")[0].innerHTML;
    company5.percent = pct5;
    //push to favorites
    favorites.push(company5);
    console.log(favorites);
    saveFaves();
    renderFavesList();
});



window.onload = (function () {
    var favesStringified = localStorage.getItem("saveArr");
    var favesList = JSON.parse(favesStringified);
    if (favesList == null) {
        favesList = {};
    }
    renderFavesList(favesList);
})










