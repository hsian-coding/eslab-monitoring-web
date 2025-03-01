// Image Update Configuration
const CONFIG = {
    imageId: 'MAP',
    images: {
        stream: {
            path: 'assets/images/Lantai_stream.png',
            current: true
        },
        spectrogram: {
            path: 'assets/images/Lantai_stream_spectrogram.png',
            current: false
        }
    },
    updateInterval: 2000  // 2 seconds
};

// Image Update Function
function updateImage() {
    const img = document.getElementById(CONFIG.imageId);
    if (img) {
        // Get current image type
        const currentType = CONFIG.images.stream.current ? 'stream' : 'spectrogram';
        const currentPath = CONFIG.images[currentType].path;
        
        // Add timestamp to prevent caching
        img.src = `${currentPath}?t=${new Date().getTime()}`;
    }
}

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', () => {
    // Start periodic image updates
    setInterval(updateImage, CONFIG.updateInterval);

    // Initialize Leaflet map
    const map = L.map('map').setView([23.7, 121.2], 7); // Taiwan coordinates

    // Define base layers
    const baseLayers = {
        'OpenStreetMap': L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap contributors'
        }),
        'OpenTopoMap': L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
            maxZoom: 17,
            attribution: '© OpenTopoMap contributors'
        }),
        'Satellite': L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            maxZoom: 19,
            attribution: '© Esri'
        })
    };

    // Add default layer to map
    baseLayers.OpenStreetMap.addTo(map);

    // Add your seismic station markers here
    const stations = [
        {
            lat: 23.0,
            lng: 121.0,
            name: 'Station 1',
            info: {
                id: 'LT01',
                location: 'Lantai Mountain',
                elevation: '1200m',
                type: 'Broadband',
                status: 'Active'
            }
        },
        // Add more stations with their information...
    ];

    // Create a marker layer group
    const markers = L.layerGroup();
    
    // Add markers for each station
    stations.forEach(station => {
        // Create popup content with HTML formatting
        const popupContent = `
            <div class="station-popup">
                <h3 class="station-title">${station.name}</h3>
                <div class="station-info">
                    <p><strong>Station ID:</strong> ${station.info.id}</p>
                    <p><strong>Location:</strong> ${station.info.location}</p>
                    <p><strong>Elevation:</strong> ${station.info.elevation}</p>
                    <p><strong>Type:</strong> ${station.info.type}</p>
                    <p><strong>Status:</strong> <span class="status-${station.info.status.toLowerCase()}">${station.info.status}</span></p>
                </div>
            </div>
        `;

        // Create marker with custom popup
        L.marker([station.lat, station.lng])
            .bindPopup(popupContent, {
                maxWidth: 300,
                className: 'station-popup-container'
            })
            .addTo(markers);
    });

    // Define overlay layers
    const overlays = {
        'Stations': markers
    };

    // Add markers to map
    markers.addTo(map);

    // Add layer control to map
    L.control.layers(baseLayers, overlays, {
        position: 'topright',
        collapsed: true  // Change to true to collapse into icon
    }).addTo(map);

    // Image switch functionality
    const switchBtn = document.getElementById('switchImageBtn');
    const image = document.getElementById(CONFIG.imageId);

    switchBtn.addEventListener('click', () => {
        // Add rotation animation to button
        switchBtn.style.transform = CONFIG.images.stream.current ? 'rotate(180deg)' : 'rotate(0deg)';
        
        // Toggle current state
        CONFIG.images.stream.current = !CONFIG.images.stream.current;
        CONFIG.images.spectrogram.current = !CONFIG.images.spectrogram.current;
        
        // Update image immediately
        updateImage();
    });
});

