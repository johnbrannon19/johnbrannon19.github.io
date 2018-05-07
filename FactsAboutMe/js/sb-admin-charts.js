// Chart.js scripts
// -- Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';
// -- Area Chart Example
var ctx = document.getElementById("myAreaChart");
var myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ["1 minute", "5 minutes", "10 minutes", "15 minutes", "20 minutes", "25 minutes", "30 minutes"],
    datasets: [{
      label: "percentage of Attention",
      lineTension: 0.4,
      backgroundColor: "rgba(2,117,216,0.2)",
      borderColor: "rgba(2,117,216,1)",
      pointRadius: 5,
      pointBackgroundColor: "rgba(2,117,216,1)",
      pointBorderColor: "rgba(255,255,255,0.8)",
      pointHitRadius: 20,
      pointBorderWidth: 2,
      data: [1.00, .95, .60, .55, .60, .20, .70],
    }],
  },
  options: {
    scales: {
      xAxes: [{
        time: {
          unit: 'Time'
        },
        gridLines: {
          display: false
        },
        ticks: {
          maxTicksLimit: 7
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 1,
          maxTicksLimit: 5
        },
        gridLines: {
          color: "rgba(0, 0, 0, .125)",
        }
      }],
    },
    legend: {
      display: false
    }
  }
});
// -- Bar Chart Example
var ctx = document.getElementById("myBarChart");
var myLineChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    datasets: [{
      backgroundColor: "rgba(2,117,216,1)",
      borderColor: "rgba(2,117,216,1)",
      data: [5, 6, 10, 6, 4, 9, 8, 6, 3, 7, 8, 6],
    }],
  },
  options: {
    scales: {
      xAxes: [{
        time: {
          unit: 'month'
        },
        gridLines: {
          display: false
        },
        ticks: {
          maxTicksLimit: 6
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 10,
          maxTicksLimit: 5
        },
        gridLines: {
          display: true
        }
      }],
    },
    legend: {
      display: false
    }
  }
});
// -- Pie Chart Example
var ctx = document.getElementById("myPieChart");
var myPieChart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ["Friends", "Family", "Work", "Arts"],
    datasets: [{
      data: [.27, .36, .25 , .12],
      backgroundColor: ['#007bff', '#dc3545', '#ffc107', '#28a745'],
    }],
  },
});
//Purple Line Chart
var ctx = document.getElementById("PurpleLineChart");
var Purple = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ["5 years", "6 years", "7 years", "8 years", "9 years", "10 years", "11 years", "12 years", "13 years", "14 years", "15 years", "16 years", "17 years"],
    datasets: [{
      label: "percentage of graditude toward purple",
      lineTension: 0.4,
      backgroundColor: "rgba(81, 24, 112,0.2)",
      borderColor: "rgba(81, 24, 112,1)",
      pointRadius: 4,
      pointBackgroundColor: "rgba(81, 24, 112,1)",
      pointBorderColor: "rgba(81, 24, 112,.5)",
      pointHitRadius: 20,
      pointBorderWidth: 2,
      data: [ 0, 0, 0, .2, .1, .15, .12, .20, .25, 1, .80, .70, .75, .60],
    }],
  },
  options: {
    scales: {
      xAxes: [{
        time: {
          unit: 'Time'
        },
        gridLines: {
          display: false
        },
        ticks: {
          maxTicksLimit: 7
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 1,
          maxTicksLimit: 5
        },
        gridLines: {
          color: "rgba(0, 0, 0, .125)",
        }
      }],
    },
    legend: {
      display: false
    }
  }
});
