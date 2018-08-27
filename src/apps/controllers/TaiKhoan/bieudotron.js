Highcharts.chart('bieudotron', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Danh mục khóa học, 2018'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true
        }
    },
    series: [{
        name: 'Tỷ lệ',
        colorByPoint: true,
        data: [{
            name: 'Front End',
            y: 61.41,
            sliced: true,
            selected: true
        }, {
            name: 'Back End',
            y: 11.84
        }, {
            name: 'Tư duy',
            y: 10.85
        }, {
            name: 'JavaScript',
            y: 4.67
        }, {
            name: 'AngularJS',
            y: 4.18
        }, {
            name: 'Khác',
            y: 7.05
        }]
    }]
});