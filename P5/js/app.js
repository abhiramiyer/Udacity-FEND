function googleMapError() {
    alert('Error: Unable to load Google Maps!');
}

var LocationData = function (name, lat, lng) {
    this.name = name;
    this.lat = lat;
    this.lng = lng;
};

var heritageSiteModel = [
    new LocationData('Kaziranga National Park', 26.666667, 93.35),
    new LocationData('Manas National Park', 26.716667, 90.933333),
    new LocationData('Mahabodhi Temple', 24.696004, 84.991358),
    new LocationData('Humayun\'s Tomb', 28.593264, 77.250602),
    new LocationData('Qutb complex', 28.524382, 77.18543),
    new LocationData('Red Fort', 28.656, 77.241),
    new LocationData('Old Goa', 15.503, 73.912),
    new LocationData('Champaner-Pavagadh Archaeological Park', 22.483333, 73.533333),
    new LocationData('Hampi', 15.335, 76.462),
    new LocationData('Pattadakal', 15.9484, 75.8159),
    new LocationData('Sanchi', 23.47941, 77.739616),
    new LocationData('Bhimbetka rock shelters', 22.937222, 77.6125),
    new LocationData('Khajuraho Group of Monuments', 24.8519236, 79.9195934),
    new LocationData('Ajanta Caves', 20.552377, 75.700436),
    new LocationData('Ellora Caves', 20.026389, 75.179167),
    new LocationData('Elephanta Caves', 18.9633525, 72.9292977),
    new LocationData('Chhatrapati Shivaji Terminus', 18.9398259, 72.8332789),
    new LocationData('Konark Sun Temple', 19.887444, 86.094596),
    new LocationData('Keoladeo National Park', 27.166667, 77.516667),
    new LocationData('Jantar Mantar (Jaipur)', 26.92472, 75.82444),
    new LocationData('Great Living Chola Temples', 10.783056, 79.1325),
    new LocationData('Group of Monuments at Mahabalipuram', 12.6167, 80.1917),
    new LocationData('Agra Fort', 27.179542, 78.021101),
    new LocationData('Fatehpur Sikri', 27.091, 77.661),
    new LocationData('Taj Mahal', 27.175, 78.041944),
    new LocationData('Mountain Railways of India', 27.023041,88.2408571),
    new LocationData('Valley of Flowers National Park', 30.733333, 79.633333),
    new LocationData('Sundarbans National Park', 21.945, 88.895833),
    new LocationData('Western Ghats', 10.166667, 77.066667),
    new LocationData('Hill Forts of Rajasthan', 24.8833, 74.6461),
    new LocationData('Rani ki vav', 23.85892, 72.10162),
    new LocationData('Great Himalayan National Park', 31.733333, 77.55)
    ];

var AppViewModel = function (model) {
    var self = this;
    self.locationList = model;
    self.searchText = ko.observable('');

    self.filteredList = ko.computed(function() {
        var searchStr = self.searchText().toLowerCase();
        return self.locationList.filter(function(item) {
            if ((searchStr === '') || (item.name.toLowerCase().indexOf(searchStr) !== -1)) {
                return true;
            } else {
                return false;
            }
        });
    });

    var mapOptions = {
        disableDefaultUI: true,
        zoom:8
    };
    self.map = new google.maps.Map(document.querySelector('#map'), mapOptions);
    self.mapBounds = new google.maps.LatLngBounds();
    self.markers = [];
    self.infoWindow = new google.maps.InfoWindow();

    self.sendClickToMarker = function(locationItem) {
        var markerIndex = self.locationList.indexOf(locationItem);
        google.maps.event.trigger(self.markers[markerIndex], 'click');
    };
};


ko.bindingHandlers.showMarkers = {
    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        var fullLocationList = viewModel.locationList;
        var map = viewModel.map;
        var markers = viewModel.markers;
        var infoWindow = viewModel.infoWindow;

        // create marker and info window for each location item
        // markers are created here once. They will be made visible in the update function
        fullLocationList.forEach(function(locationItem) {
            var markerLocation = new google.maps.LatLng(locationItem.lat, locationItem.lng);
            var marker = new google.maps.Marker({
                position: markerLocation,
                map: map,
                title: locationItem.name,
                label: locationItem.name[0],
                animation: google.maps.Animation.DROP
            });

            marker.addListener('click', function() {
                map.setCenter(markerLocation);
                marker.setAnimation(google.maps.Animation.BOUNCE);
                setTimeout(function() {
                    marker.setAnimation(null);
                }, 2800);  // 700ms per bounce. 4 bounces

                var markerContent ='Contacting Wikipedia...';
                infoWindow.close();
                infoWindow.setContent(markerContent);
                infoWindow.setOptions({maxWidth: 250});

                var apiTimeout = setTimeout(function() {
                    markerContent = 'Unable to access Wikipedia. Try again later';
                    infoWindow.setContent(markerContent);
                }, 5000);
                
                infoWindow.open(map, marker);

                // get the data for info window from wikipedia
                $.ajax({
                    url: "https://en.wikipedia.org//w/api.php?action=query&format=json&prop=pageimages%7Cextracts&indexpageids=1&piprop=thumbnail&pithumbsize=250&pilimit=1&exintro=1&titles=" + locationItem.name,
                    dataType: "jsonp"
                }).done(function(response) {
                    var pageId = response.query.pageids[0];
                    var thumbnailSrc = response.query.pages[pageId].thumbnail.source;
                    var extract = response.query.pages[pageId].extract;

                    clearTimeout(apiTimeout);

                    markerContent = '<div class="info-window-content">' +
                                        '<h3>' + locationItem.name + '</h3>' +
                                        '<img class="img-responsive" style="width:100%" src="' + thumbnailSrc + '">' +
                                        '<div>' +
                                            extract +
                                            '<br>' +
                                            'Source: Wikipedia' +
                                        '</div>' +
                                    '</div>';
                    infoWindow.setContent(markerContent);
                }).fail(function() {
                    markerContent = 'Unable to access Wikipedia. Try again later';
                    infoWindow.setContent(markerContent);
                });
            });

            markers.push(marker);
        });

        // set up handler for the div resize events
        google.maps.event.addDomListener(window, 'resize', function() {
            google.maps.event.trigger(map, 'resize');
            // fit the map to the marker bounds and center the map
            map.fitBounds(viewModel.mapBounds);
            map.setCenter(viewModel.mapBounds.getCenter());
        });
    },
    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        // This will be called once when the binding is first applied to an element,
        // and again whenever any observables/computeds that are accessed change
        // Update the DOM element based on the supplied values here.

        var map = viewModel.map;
        var markers = viewModel.markers;
        var fullLocationList = viewModel.locationList;
        var infoWindow = viewModel.infoWindow;

        // Close any open info window before clearing the markers
        infoWindow.close();

        // clear all markers first.
        markers.forEach(function(markerItem) {
            markerItem.setVisible(false);
        });

        var filteredLocationList = ko.unwrap(valueAccessor());

        if (filteredLocationList.length === 0) {
            // Nothing to do if the filterlist is empty
            return;
        }

        //
        // draw markers for the filtered locations
        //
        // There is a 1:1 mapping between the location list and array of markers although
        // they are in separate arrays. Could have used a dictionary i guess.
        // Find the index of the filtered location item in the full location list and use the index
        // to find the corresponding marker.
        //
        var markerIndex;
        mapBounds = new google.maps.LatLngBounds();
        filteredLocationList.forEach(function(locationItem) {
            markerIndex = fullLocationList.indexOf(locationItem);
            // show the marker on map
            markers[markerIndex].setVisible(true);
            mapBounds.extend(markers[markerIndex].getPosition());
        });

        viewModel.mapBounds = mapBounds;

        // fit the map to the marker bounds and center the map
        map.fitBounds(mapBounds);
        map.setCenter(mapBounds.getCenter());

        if (map.getZoom() > 7) {
            map.setZoom(7);
        }
    }
};

function init() {
    var appViewModel = new AppViewModel(heritageSiteModel);
    ko.applyBindings(appViewModel);
}

