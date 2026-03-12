/* FitHeaven - Google Maps Integration
   Handles map initialization, location services, and marker management
   for finding healthy cafés and gyms
*/

const FH_MAP = {
  map: null,
  markers: [],
  userLocation: null,
  currentFilter: 'all', // 'all', 'cafes', 'gyms'
  
  // Sample data for healthy locations
  locations: [
    // Healthy Cafés
    {
      id: 'greenfuel_cafe_1',
      name: 'GreenFuel Café',
      type: 'cafe',
      category: 'Healthy Café',
      lat: 40.7128,
      lng: -74.0060,
      rating: 4.8,
      priceLevel: 2,
      address: '123 Health St, New York, NY',
      phone: '(555) 123-4567',
      hours: 'Mon-Fri: 7AM-8PM, Sat-Sun: 8AM-9PM',
      features: ['Organic', 'Vegan Options', 'Protein Bowls', 'Smoothies'],
      discount: '20% off with FitPoints',
      fitPointsCost: 100,
      description: 'Premium healthy café with organic ingredients and protein-rich meals.'
    },
    {
      id: 'fitbites_restaurant_1',
      name: 'FitBites Restaurant',
      type: 'cafe',
      category: 'Healthy Restaurant',
      lat: 40.7589,
      lng: -73.9851,
      rating: 4.6,
      priceLevel: 3,
      address: '456 Fitness Ave, New York, NY',
      phone: '(555) 234-5678',
      hours: 'Daily: 6AM-10PM',
      features: ['Meal Plans', 'Protein Shakes', 'Salads', 'Grilled Options'],
      discount: '25% off with FitPoints',
      fitPointsCost: 120,
      description: 'Nutritious meals and protein shakes for fitness enthusiasts.'
    },
    {
      id: 'zen_nutrition_1',
      name: 'Zen Nutrition',
      type: 'cafe',
      category: 'Wellness Café',
      lat: 40.7505,
      lng: -73.9934,
      rating: 4.7,
      priceLevel: 2,
      address: '789 Wellness Blvd, New York, NY',
      phone: '(555) 345-6789',
      hours: 'Mon-Sat: 7AM-7PM, Sun: 8AM-6PM',
      features: ['Detox Drinks', 'Superfoods', 'Gluten-Free', 'Raw Options'],
      discount: '15% off with FitPoints',
      fitPointsCost: 80,
      description: 'Wellness-focused café with detox drinks and superfood options.'
    },
    
    // Gyms
    {
      id: 'powergym_1',
      name: 'PowerGym',
      type: 'gym',
      category: 'Premium Gym',
      lat: 40.7614,
      lng: -73.9776,
      rating: 4.9,
      priceLevel: 4,
      address: '321 Strength St, New York, NY',
      phone: '(555) 456-7890',
      hours: '24/7',
      features: ['Premium Equipment', 'Personal Training', 'Group Classes', 'Sauna'],
      discount: '15% off membership with FitPoints',
      fitPointsCost: 150,
      description: 'State-of-the-art fitness facility with premium equipment and expert trainers.'
    },
    {
      id: 'zenyoga_studio_1',
      name: 'ZenYoga Studio',
      type: 'gym',
      category: 'Yoga Studio',
      lat: 40.7282,
      lng: -73.9942,
      rating: 4.8,
      priceLevel: 3,
      address: '654 Peace Ave, New York, NY',
      phone: '(555) 567-8901',
      hours: 'Mon-Fri: 6AM-10PM, Sat-Sun: 7AM-9PM',
      features: ['Yoga Classes', 'Meditation', 'Pilates', 'Wellness Workshops'],
      discount: '30% off classes with FitPoints',
      fitPointsCost: 80,
      description: 'Peaceful yoga studio offering classes for all levels and meditation sessions.'
    },
    {
      id: 'crossfit_warrior_1',
      name: 'CrossFit Warrior',
      type: 'gym',
      category: 'CrossFit Box',
      lat: 40.6892,
      lng: -74.0445,
      rating: 4.7,
      priceLevel: 3,
      address: '987 Warrior Way, New York, NY',
      phone: '(555) 678-9012',
      hours: 'Mon-Fri: 5AM-10PM, Sat: 7AM-6PM, Sun: 8AM-4PM',
      features: ['CrossFit Classes', 'Olympic Lifting', 'HIIT', 'Nutrition Coaching'],
      discount: '20% off membership with FitPoints',
      fitPointsCost: 120,
      description: 'High-intensity CrossFit training with certified coaches and community support.'
    },
    {
      id: 'aqua_fitness_1',
      name: 'Aqua Fitness Center',
      type: 'gym',
      category: 'Aquatic Center',
      lat: 40.7505,
      lng: -73.9934,
      rating: 4.5,
      priceLevel: 3,
      address: '147 Water St, New York, NY',
      phone: '(555) 789-0123',
      hours: 'Daily: 5AM-11PM',
      features: ['Swimming Pool', 'Aqua Aerobics', 'Water Therapy', 'Lap Swimming'],
      discount: '25% off classes with FitPoints',
      fitPointsCost: 100,
      description: 'Aquatic fitness center with swimming pools and water-based exercise classes.'
    }
  ],

  // Initialize map
  init() {
    this.initMap();
    this.setupEventListeners();
    this.loadUserLocation();
  },

  // Initialize Google Map
  initMap() {
    // Default center (New York City)
    const defaultCenter = { lat: 40.7128, lng: -74.0060 };
    
    this.map = new google.maps.Map(document.getElementById("map"), {
      zoom: 13,
      center: defaultCenter,
      styles: this.getMapStyles(),
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
      zoomControl: true
    });

    // Add markers for all locations
    this.addAllMarkers();
  },

  // Get custom map styles for dark theme
  getMapStyles() {
    return [
      {
        "featureType": "all",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#242f3e"
          }
        ]
      },
      {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "lightness": -80
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#746855"
          }
        ]
      },
      {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#d59563"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#d59563"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#263c3f"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#6b9a76"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#2b3544"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9ca5b3"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#746855"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#f3d19c"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#2f3948"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#d59563"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#17263c"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#515c6d"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "lightness": -20
          }
        ]
      }
    ];
  },

  // Add all markers to map
  addAllMarkers() {
    this.clearMarkers();
    
    this.locations.forEach(location => {
      if (this.currentFilter === 'all' || location.type === this.currentFilter) {
        this.addMarker(location);
      }
    });
  },

  // Add individual marker
  addMarker(location) {
    const icon = this.getMarkerIcon(location.type);
    
    const marker = new google.maps.Marker({
      position: { lat: location.lat, lng: location.lng },
      map: this.map,
      title: location.name,
      icon: icon,
      animation: google.maps.Animation.DROP
    });

    // Create info window
    const infoWindow = new google.maps.InfoWindow({
      content: this.createInfoWindowContent(location)
    });

    // Add click listener
    marker.addListener("click", () => {
      this.closeAllInfoWindows();
      infoWindow.open(this.map, marker);
    });

    this.markers.push({ marker, infoWindow, location });
  },

  // Get marker icon based on type
  getMarkerIcon(type) {
    const icons = {
      cafe: {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
          <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="14" fill="#00ff99" stroke="#fff" stroke-width="2"/>
            <text x="16" y="20" text-anchor="middle" fill="#000" font-size="16" font-weight="bold">☕</text>
          </svg>
        `),
        scaledSize: new google.maps.Size(32, 32)
      },
      gym: {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
          <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="14" fill="#007bff" stroke="#fff" stroke-width="2"/>
            <text x="16" y="20" text-anchor="middle" fill="#fff" font-size="16" font-weight="bold">🏋️</text>
          </svg>
        `),
        scaledSize: new google.maps.Size(32, 32)
      }
    };
    
    return icons[type] || icons.cafe;
  },

  // Create info window content
  createInfoWindowContent(location) {
    const stars = '★'.repeat(Math.floor(location.rating)) + '☆'.repeat(5 - Math.floor(location.rating));
    const priceLevel = '$'.repeat(location.priceLevel);
    
    return `
      <div style="color: #333; max-width: 300px; font-family: 'Poppins', sans-serif;">
        <div style="border-bottom: 2px solid #00ff99; padding-bottom: 10px; margin-bottom: 15px;">
          <h3 style="margin: 0; color: #00ff99; font-size: 18px; font-weight: 700;">${location.name}</h3>
          <div style="color: #666; font-size: 14px; margin-top: 5px;">${location.category}</div>
        </div>
        
        <div style="margin-bottom: 10px;">
          <div style="color: #ffa500; font-size: 16px; margin-bottom: 5px;">${stars} ${location.rating}</div>
          <div style="color: #666; font-size: 14px;">${priceLevel} • ${location.address}</div>
        </div>
        
        <div style="margin-bottom: 10px;">
          <div style="font-weight: 600; color: #333; margin-bottom: 5px;">Hours:</div>
          <div style="color: #666; font-size: 14px;">${location.hours}</div>
        </div>
        
        <div style="margin-bottom: 10px;">
          <div style="font-weight: 600; color: #333; margin-bottom: 5px;">Features:</div>
          <div style="color: #666; font-size: 14px;">${location.features.join(', ')}</div>
        </div>
        
        <div style="background: linear-gradient(45deg, #00ff99, #35ffd0); padding: 10px; border-radius: 8px; margin-bottom: 10px;">
          <div style="color: #04150f; font-weight: 700; font-size: 14px;">${location.discount}</div>
          <div style="color: #04150f; font-size: 12px;">Cost: ${location.fitPointsCost} FitPoints</div>
        </div>
        
        <div style="color: #666; font-size: 14px; margin-bottom: 15px;">${location.description}</div>
        
        <div style="display: flex; gap: 10px;">
          <button onclick="FH_MAP.getDirections('${location.id}')" 
                  style="background: #007bff; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: 600;">
            🗺️ Directions
          </button>
          <button onclick="FH_MAP.redeemLocation('${location.id}')" 
                  style="background: #00ff99; color: #04150f; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: 600;">
            🎯 Redeem
          </button>
        </div>
      </div>
    `;
  },

  // Close all info windows
  closeAllInfoWindows() {
    this.markers.forEach(({ infoWindow }) => {
      infoWindow.close();
    });
  },

  // Clear all markers
  clearMarkers() {
    this.markers.forEach(({ marker }) => {
      marker.setMap(null);
    });
    this.markers = [];
  },

  // Filter locations
  filterLocations(type) {
    this.currentFilter = type;
    this.addAllMarkers();
    this.updateFilterButtons();
  },

  // Update filter button states
  updateFilterButtons() {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.filter === this.currentFilter) {
        btn.classList.add('active');
      }
    });
  },

  // Load user location
  loadUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          
          // Center map on user location
          this.map.setCenter(this.userLocation);
          
          // Add user location marker
          const userMarker = new google.maps.Marker({
            position: this.userLocation,
            map: this.map,
            title: "Your Location",
            icon: {
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" fill="#ff6b6b" stroke="#fff" stroke-width="2"/>
                  <circle cx="12" cy="12" r="4" fill="#fff"/>
                </svg>
              `),
              scaledSize: new google.maps.Size(24, 24)
            }
          });
          
          this.markers.push({ marker: userMarker, infoWindow: null, location: null });
        },
        (error) => {
          console.warn('Geolocation error:', error);
          // Keep default center if geolocation fails
        }
      );
    }
  },

  // Get directions to location
  getDirections(locationId) {
    const location = this.locations.find(loc => loc.id === locationId);
    if (!location) return;
    
    const destination = `${location.lat},${location.lng}`;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
    window.open(url, '_blank');
  },

  // Redeem location discount
  redeemLocation(locationId) {
    const location = this.locations.find(loc => loc.id === locationId);
    if (!location) return;
    
    const currentPoints = parseInt(localStorage.getItem('fh_points') || '0');
    
    if (currentPoints < location.fitPointsCost) {
      alert(`You need ${location.fitPointsCost} FitPoints to redeem this discount. You currently have ${currentPoints} points.`);
      return;
    }
    
    if (confirm(`Redeem ${location.discount} for ${location.fitPointsCost} FitPoints?`)) {
      // Deduct points
      localStorage.setItem('fh_points', String(currentPoints - location.fitPointsCost));
      
      // Store redeemed location
      const redeemedLocations = JSON.parse(localStorage.getItem('fh_redeemed_locations') || '[]');
      redeemedLocations.push({
        id: locationId,
        name: location.name,
        cost: location.fitPointsCost,
        redeemedAt: new Date().toISOString()
      });
      localStorage.setItem('fh_redeemed_locations', JSON.stringify(redeemedLocations));
      
      // Show success message
      this.showRedeemSuccess(location);
    }
  },

  // Show redeem success message
  showRedeemSuccess(location) {
    const message = `🎉 ${location.discount} redeemed for ${location.name}!`;
    
    // Create and show toast
    const toast = document.createElement('div');
    toast.className = 'toast show position-fixed top-0 end-0 m-3';
    toast.style.zIndex = '9999';
    toast.innerHTML = `
      <div class="toast-header bg-success text-white">
        <strong class="me-auto">Success!</strong>
        <button type="button" class="btn-close btn-close-white" onclick="this.parentElement.parentElement.remove()"></button>
      </div>
      <div class="toast-body bg-light text-dark">
        ${message}
      </div>
    `;
    
    document.body.appendChild(toast);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 4000);
  },

  // Setup event listeners
  setupEventListeners() {
    // Filter buttons
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('filter-btn')) {
        const filter = e.target.dataset.filter;
        this.filterLocations(filter);
      }
    });
  }
};

// Export for global use
window.FH_MAP = FH_MAP;