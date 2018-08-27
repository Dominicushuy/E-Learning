Highcharts.chart('bieudocot', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Doanh thu các khóa học 2017'
    },
    subtitle: {
        text: 'Source: <a href="http://cybersoft.edu.vn/">CyberSoft</a>'
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Doanh thu (millions)'
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: 'Doanh thu trong năm 2017: <b>{point.y:.1f} millions</b>'
    },
    series: [{
        name: 'Population',
        data: [
            [' Front End', 24.2],
            [' C++', 20.8],
            ['Java', 14.9],
            [' C#', 13.7],
            ['ASP.NET', 13.1],
            ['JavaScript', 12.7],
            ['TypeScript', 12.4],
            ['AngularJS', 12.2],
            ['Algorithms', 12.0],
            ['SpringMVC', 11.7],
            ['Strut2', 11.5],
            ['EJB', 11.2],
            ['JSP&Servlet', 11.1],
            ['JavaServerFace', 10.6],
            ['MeanStack', 10.6],
            ['Ruby', 10.6],
            ['Python', 10.3],
            ['VueJs', 9.8],
            ['NodeJs', 9.3],
            ['React', 9.3]
        ],
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:.1f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }]
});