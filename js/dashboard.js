//DATA is stored in SALES_DATA


var transaction = function (data) {
    var self = this;
    self._id = data._id;
    self.product = data.product;
    self.to = data.to;
    self.dealer = data.dealer;
    self.ammount = data.ammount;
    self.saleDate = data.date;
    self.displayDate = self.saleDate;
};


/**
 * The following object structure is based off of the Knockoutjs framework
 * The Main Model will be bound to the page itself, and will contain the
 * the additional models
 */
var MainModel = function (data) {
    var self = this;
    /**
     * This call sends each object in the data array one at time through the movie row function
     * creating an array of movieRow objects
     * ko.observableArray means updates to the array update on the page
     */
    self.gridData = ko.observableArray($.map(data, function (text) { return new transaction(text) }));

    //self.gridData = ko.observableArray(self.sales);

    self.headers = [
        { title: 'Product', sortPropertyName: 'product', asc: true },
        { title: 'Customer', sortPropertyName: 'to', asc: true },
        { title: 'Dealer', sortPropertyName: 'dealer', asc: true },
        { title: 'Amount', sortPropertyName: 'ammount', asc: true },
        { title: 'Sale Date', sortPropertyName: 'saleDate', asc: true }
    ];

    //Standard sort function, don't worry about how it works
    self.sort = function (header, event) {
        var prop = header.sortPropertyName;
        var asc = header.asc;
        header.asc = !header.asc;
        var ascSort = function (a, b) { return a[prop] < b[prop] ? -1 : a[prop] > b[prop] ? 1 : 0; };
        var descSort = function (a, b) { return ascSort(b, a); };
        var sortFunc = asc ? ascSort : descSort;
        self.gridData.sort(sortFunc);
    };
};

$(document).ready(function () {
    //load in initial state
    window.KO_MODEL = new MainModel(SALES_DATA);
    ko.applyBindings(window.KO_MODEL);
    drawBarChart();
});
var drawBarChart = function () {
    var ctxBar = document.getElementById("barChart");
    var barChart = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            responsive: true,
            legend:{
                position:'bottom'
            }            
        }
    });
    var ctxLine = document.getElementById("lineChart");
    var lineChart = new Chart(ctxLine, {
        type: 'line',
        data: {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "My First dataset",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    data: [65, 59, 80, 81, 56, 55, 40],
                    spanGaps: false,
                }
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            legend: {
                position: 'bottom'
            }

        }
    });

    var ctxLine = document.getElementById("radarChart");
    var lineChart = new Chart(radarChart, {
        type: 'radar',
        data: {
            labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
            datasets: [
                {
                    label: "My First dataset",
                    backgroundColor: "rgba(179,181,198,0.2)",
                    borderColor: "rgba(179,181,198,1)",
                    pointBackgroundColor: "rgba(179,181,198,1)",
                    pointBorderColor: "#fff",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "rgba(179,181,198,1)",
                    data: [65, 59, 90, 81, 56, 55, 40]
                },
                {
                    label: "My Second dataset",
                    backgroundColor: "rgba(255,99,132,0.2)",
                    borderColor: "rgba(255,99,132,1)",
                    pointBackgroundColor: "rgba(255,99,132,1)",
                    pointBorderColor: "#fff",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "rgba(255,99,132,1)",
                    data: [28, 48, 40, 19, 96, 27, 100]
                }
            ]
        },
        options: {
            legend: {
                position: 'bottom'
            }
        }
    });
}