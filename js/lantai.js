// Image Update Configuration
const CONFIG = {
    imageId: 'MAP',
    images: {
        stream: {
            path: 'data/Lantai_stream.png',
            current: true
        },
        spectrogram: {
            path: 'data/Lantai_stream_spectrogram.png',
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

// Add this after CONFIG definition
async function loadStationData() {
    try {
        const response = await fetch('assets/lantai_station_information.json');
        const data = await response.json();
        return data.stations;
    } catch (error) {
        console.error('Error loading station data:', error);
        return [];
    }
}

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', async () => {
    // Start periodic image updates
    setInterval(updateImage, CONFIG.updateInterval);

    // Initialize Leaflet map
    const map = L.map('map').setView([24.531, 121.521], 16); // Taiwan coordinates

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

    // Load station data
    const stations = await loadStationData();
    
    // Create markers using loaded data
    const markers = L.layerGroup();
    
    stations.forEach(station => {
        const popupContent = `
            <div class="station-popup">
                <h3 class="station-title">Station Information</h3>
                <div class="station-info">
                    <p><strong>Station ID:</strong> ${station.id}</p>
                    <p><strong>Location:</strong> ${station.coordinates.lon}, ${station.coordinates.lat}</p>
                    <p><strong>Elevation:</strong> ${station.info.elevation}</p>
                    <p><strong>Type:</strong> ${station.info.type}</p>
                    <p><strong>Status:</strong> <span class="status-${station.info.status.toLowerCase()}">${station.info.status}</span></p>
                    <p><strong>Sampling Rate:</strong> ${station.info.samplingRate}</p>
                </div>
            </div>
        `;

        // // Using DOMPurify to sanitize popup content
        // const sanitizedPopupContent = DOMPurify.sanitize(popupContent);
        // L.marker([station.coordinates.lat, station.coordinates.lon])
        //     .bindPopup(sanitizedPopupContent, {
        //         maxWidth: 300,
        //         className: 'station-popup-container'
        //     })
        //     .addTo(markers);

        // Using DOMPurify to sanitize popup content
        const sanitizedPopupContent = DOMPurify.sanitize(popupContent); 
            
        // Create marker with tooltip (for hover) and popup (for click)
        L.marker([station.coordinates.lat, station.coordinates.lon])
            .bindTooltip(station.id, {
                permanent: false,
                direction: 'top',
                offset: L.point(0, -15),
                className: 'station-tooltip'
            })
            .bindPopup(sanitizedPopupContent, {
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
    const icon = switchBtn.querySelector('.icon');
    const image = document.getElementById(CONFIG.imageId);

    switchBtn.addEventListener('click', () => {
        // Add rotation animation to icon only
        icon.style.transform = CONFIG.images.stream.current ? 'rotate(180deg)' : 'rotate(0deg)';
        
        // Update tooltip text
        switchBtn.dataset.tooltip = CONFIG.images.stream.current ? 'Show Stream' : 'Show Spectrogram';
        
        // Toggle current state
        CONFIG.images.stream.current = !CONFIG.images.stream.current;
        CONFIG.images.spectrogram.current = !CONFIG.images.spectrogram.current;
        
        // Update image immediately
        updateImage();
    });
});

