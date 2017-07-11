'use strict';

import angular from 'angular';


import AppContentComponent from './app-content.component';

import GoogleMapComponent from '../google-map/google-map';


export default angular.module('AppView', [GoogleMapComponent.name])
    .component(AppContentComponent.name, new AppContentComponent);