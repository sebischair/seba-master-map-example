'use strict';

class GoogleMapComponent {
    constructor() {
        this.restrict = 'E';
        this.replace = true;
        this.scope = {
            options: '=',
        };
    }

    link(scope, element, attrs) {

        let options = scope.options;
        // If we don't pass any data, return out of the element
        if (!options) return;

        // DOM element where the Map will be attached
        let container = element[0];

        container.style['height'] = '100%' ;
        container.style['min-height'] = '600px';

        this.loadGoogleMapsAPI(options).then((googleMaps) => {
                let map = new googleMaps.Map(container, {
                center: new googleMaps.LatLng(51.508742,-0.120850),
                zoom: 8
            });

        }).catch((err) => {
            console.error(err)
        });

    }



    static get name() {
        return 'googleMap';
    }

    loadGoogleMapsAPI(options){

        const CALLBACK_NAME = '__googleMapsApiOnLoadCallback';
        const  OPTIONS_KEYS = ['client', 'key', 'language', 'region', 'v'];

        options = options || {};

        return new Promise((resolve, reject) => {
            // Exit if not running inside a browser.
            if (typeof window === 'undefined') {
                return reject(
                    new Error('Can only load the Google Maps API in the browser')
                )
            }

            // Reject the promise after a timeout.
            let timeoutId = setTimeout(function() {
                window[CALLBACK_NAME] = function() {} ;// Set the on load callback to a no-op.
                reject(new Error('Could not load the Google Maps API'))
            }, options.timeout || 10000);

            // Hook up the on load callback.
            window[CALLBACK_NAME] = function() {
                if (timeoutId !== null) {
                    clearTimeout(timeoutId)
                }
                resolve(window.google.maps);
                delete window[CALLBACK_NAME]
            };

            // Prepare the `script` tag to be inserted into the page.
            let scriptElement = document.createElement('script');

            let params = ['callback=' + CALLBACK_NAME];
            OPTIONS_KEYS.forEach( (key) => {
                if (options[key]) {
                    params.push(key + '=' + options[key])
                }
            });
            if (options.libraries && options.libraries.length) {
                params.push('libraries=' + options.libraries.join(','))
            }
            scriptElement.src =
                'https://maps.googleapis.com/maps/api/js?' + params.join('&');

            // Insert the `script` tag.
            document.body.appendChild(scriptElement)
        })

    }


}



export default GoogleMapComponent;