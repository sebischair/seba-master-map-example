'use strict';

import angular from 'angular';


import GoogleMapComponent from './google-map.component';


export default angular.module('GoogleMap', [])
    .directive(GoogleMapComponent.name, () => new GoogleMapComponent);