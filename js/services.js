chartService.$inject = ['$interval'];

function chartService($interval) {
    var service = this;
    var container = document.getElementById("svgContainer");
    service.amount = 33693938;
    service.lastYear = '2014/2015';
    service.rows = [0, 12.5, 25, 37.5];
    service.rows = service.rows.reverse();
    service.cols = [
        {
            value: 13,
            year: "'09/10"
        },
        {
            value: 16,
            year: "'10/11"
        },
        {
            value: 20,
            year: "'11/12"
        },
        {
            value: 24,
            year: "'12/13"
        },
        {
            value: 28,
            year: "'13/14"
        },
        {
            value: 34,
            year: "'14/15"
        }
    ];
    service.buildChart = function (windowSize) {
        var s = Snap("#svg");
        var cellDistance, startPoint;
        s.clear();
        if (windowSize < 600) {
            cellDistance = 80;
            startPoint = 45;
        } else {
            cellDistance = 120;
            startPoint = 85;
        }
        var chartsHeight = 200;
        var chartsWidth = container.offsetWidth;
        var rowsSpacing = 10;
        var rowsDistance = chartsHeight / service.rows.length;
        var colsDistance = (chartsWidth - cellDistance) / service.cols.length;
        for (var i = 1; i <= service.rows.length; i++) {
            s.line(rowsSpacing + startPoint, (rowsDistance * i) - 15, chartsWidth - rowsSpacing, (rowsDistance * i) - 15);
            var v = (service.rows[i - 1] === 0) ? 15 : 10;
            s.text(startPoint + 5, (rowsDistance * i) - v, '£ ' + service.rows[i - 1] + ' m').attr({'text-anchor': 'end'});
        }
        s.line(startPoint + 25, 20, startPoint + 25, chartsHeight + 10); //y axes

        for (var n = 1; n <= service.cols.length; n++) {
            s.line((colsDistance * n) + startPoint + 25, 20, (colsDistance * n) + startPoint + 25, chartsHeight + 10); // vertical lines
            s.text((colsDistance * n) + 42, chartsHeight + 25, service.cols[n - 1].year);
        }

        var j = 1;

        function createChart() {
            var deltaY = (((colsDistance * j) + startPoint + 25) - ((colsDistance * (j-1)) + startPoint + 25))/2;
            var x1 = (colsDistance * j) + startPoint + 25 - deltaY;
            var y1 = chartsHeight - 16;
            s.path("M" + x1 + " " + y1 + "l" + 0 + " " + 0)
                .animate({path: "M" + x1 + " " + y1 + "l" + 0 + " " + service.cols[j - 1].value * -4}, 1000, mina.easein);
            return j++;
        }

        var intervalFunction = $interval(function () {
            if (j <= service.cols.length) {
                createChart();
            } else {
                $interval.cancel(intervalFunction);
            }
        }, 250);

    }
}

function carouselService() {
    var service = this;
    service.data = [
        {
            image: 'charity.jpg',
            text: 'See how we\'ve helped<br class="hidden-sm"> our local community',
            button: 'read full story'
        },
        {
            image: 'school.jpg',
            text: 'See where we\'ve helped<br class="hidden-sm"> our local community',
            button: 'find out more'
        },
        {
            image: 'donation.jpg',
            text: 'See what we\'ve done<br class="hidden-sm"> for our local community',
            button: 'read the article'
        }
    ]

}