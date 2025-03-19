## ESLab Monitoring System

> The ESLab Monitoring System is a web-based application developed for the Earth Structure Laboratory's seismic networks. Its primary function is to provide real-time visualization of seismic data obtained from multiple monitoring stations. The system employs a figure refreshing mechanism, occurring every 2 seconds, to create a streaming data effect. These figures are generated externally using a separate Python program.

---
## Features

- **Real-time Data Updates**: Automatic updates of seismic waveforms and spectrograms
- **Interactive Map**: Leaflet-based map showing station locations with detailed information
- **Multiple Networks**: Support for different seismic networks:
  - Lantai Seismic Network
  - Chulin Seismic Network
  - Taiwan Real-time Ambient Noise System (TRANS)

## Technologies Used

- HTML5/CSS3
- JavaScript
- [Bulma CSS Framework](https://bulma.io/)
- [Leaflet Maps](https://leafletjs.com/)
- Font Awesome Icons

## Project Structure
   ```bash
/eslab-monitoring-web/  
├── .gitignore  
├── README.md  
├── index.html  
├── lantai.html  
├── chulin.html  
├── assets/  
│   ├── contact_information.json  
│   ├── chulin_station_information.json  
│   ├── lantai_station_information.json  
│   └── images/  
│       ├── Chulin_landscape.png  
│       ├── DOP-E_icon_figure.png   
│       ├── index_background.jpg  
│       └── Lantai_landscape.png  
├── css/  
│   ├── all.css  
│   ├── chulin.css  
│   ├── home.css  
│   ├── lantai.css  
│   └── normalize.min.css  
├── data/  
│   ├── stations.json  
│   ├── Chulin_stream.png  
│   ├── Lantai_stream_spectrogram.png  
│   └── Lantai_stream.png  
└── js/  
    ├── chulin.js  
    ├── lantai.js  
    └── main.js  
   ```
