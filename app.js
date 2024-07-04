// Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBD3ZUhDp-Se0WgVrJcsG55-O6nt0awO6E",
    authDomain: "real-time-current-voltage-data.firebaseapp.com",
    databaseURL: "https://real-time-current-voltage-data-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "real-time-current-voltage-data",
    storageBucket: "real-time-current-voltage-data.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

const voltageData = [];
const currentData = [];
const timestamps = [];

// Fetch data from Firebase
database.ref('/data').on('child_added', (snapshot) => {
    const data = snapshot.val();
    voltageData.push(data.voltage);
    currentData.push(data.current);
    timestamps.push(new Date(data.timestamp * 1000).toLocaleTimeString());

    updateCharts();
});

// Initialize Charts
const voltageCtx = document.getElementById('voltageChart').getContext('2d');
const currentCtx = document.getElementById('currentChart').getContext('2d');

const voltageChart = new Chart(voltageCtx, {
    type: 'line',
    data: {
        labels: timestamps,
        datasets: [{
            label: 'Voltage',
            data: voltageData,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: false
        }]
    },
    options: {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'minute'
                }
            },
            y: {
                beginAtZero: true
            }
        }
    }
});

const currentChart = new Chart(currentCtx, {
    type: 'line',
    data: {
        labels: timestamps,
        datasets: [{
            label: 'Current',
            data: currentData,
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
            fill: false
        }]
    },
    options: {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'minute'
                }
            },
            y: {
                beginAtZero: true
            }
        }
    }
});

function updateCharts() {
    voltageChart.update();
    currentChart.update();
}
