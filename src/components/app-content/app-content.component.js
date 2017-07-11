'use strict';

import template from './app-content.template.html';

class AppContentComponent {
    constructor(){
        this.controller = AppContentComponentController;
        this.template = template;

    }

    static get name() {
        return 'appContent';
    }


}

class AppContentComponentController{
    constructor(){

        // Create the map config
        this.options = {
            key: 'here is your key'
        };



    }

}


export default AppContentComponent;