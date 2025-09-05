var map = L.map('map').setView([4.616176771156486, -74.16097860477704], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
var marker = L.marker([4.616176771156486, -74.16097860477704]).addTo(map);
var marker = L.marker([4.616176771156486, -74.16097860477704]).addTo(map);
