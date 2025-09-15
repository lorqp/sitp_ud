var map = L.map('map').setView([4.616176771156486, -74.16097860477704], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
var marker = L.marker([4.616176771156486, -74.16097860477704]).addTo(map);
var marker = L.marker([4.616176771156486, -74.16097860477704]).addTo(map);



// La función `crearGeoJSON` ahora toma el mapa y los datos GeoJSON como argumentos.
// Esto la hace más flexible, ya que puedes usarla para diferentes mapas y conjuntos de datos.
function crearGeoJSON(map, geoJSONData) {
  // 1. **Crea una capa Leaflet GeoJSON.**
  // Usamos `L.geoJSON()` para convertir nuestros datos GeoJSON en una capa de Leaflet.
  // Ahora, la función es más genérica y acepta cualquier dato GeoJSON que le pases.
  const capaGeoJSON = L.geoJSON(geoJSONData, {
    // La opción `onEachFeature` te permite interactuar con cada característica
    // antes de que se agregue al mapa. Aquí agregamos un "popup" si la información existe.
    onEachFeature: function (feature, layer) {
      if (feature.properties && feature.properties.nombre) {
        layer.bindPopup("<h3>" + feature.properties.nombre + "</h3><p>" + feature.properties.descripcion + "</p>");
      } else if (feature.properties && feature.properties.name) {
         // Puedes tener diferentes nombres de propiedades, como 'name' o 'title'.
         layer.bindPopup("<h3>" + feature.properties.name + "</h3>");
      }
    }
  });

  // 2. **Agrega la capa al mapa.**
  // El nombre de tu objeto de mapa es `map`, así que lo usamos aquí.
  capaGeoJSON.addTo(map);
}

// **Instrucciones de uso:**
// Para usar esta función, necesitas cargar tu archivo GeoJSON primero.
// El nombre del archivo es `paraderos-sitp.geojson`. Puedes hacerlo con `fetch`.

// 1. **Carga el archivo GeoJSON.**
// Usa `fetch` para obtener los datos de tu archivo.
fetch('paraderos-sitp.geojson')
  .then(response => {
    // Verifica que la respuesta de la red sea exitosa.
    if (!response.ok) {
      throw new Error('No se pudo cargar el archivo GeoJSON.');
    }
    // Convierte la respuesta a formato JSON.
    return response.json();
  })
  .then(data => {
    // 2. **Crea tu mapa Leaflet.**
    // Asume que ya tienes un div en tu HTML con el id "map".
    const map = L.map('map').setView([4.609, -74.066], 13);
    
    // 3. **Añade una capa base (opcional pero recomendado).**
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // 4. **Llama a la función `crearGeoJSON` con el mapa y los datos.**
    crearGeoJSON(map, data);
  })
  .catch(error => {
    console.error('Hubo un problema con la operación de fetch:', error);
  });
  