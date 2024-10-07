export var firebaseConfig = {
    apiKey: 'AIzaSyBoUdiDtzQdC-m4nj9CPY5SvY7uKJGL71k',
    authDomain: 'V5Global-15ede.firebaseapp.com',
    databaseURL: '',
    projectId: 'V5Global-15ede',
    storageBucket: 'V5Global-15ede.appspot.com',
    messagingSenderId: '348111707030',
    appId: '1:348111707030:web:70c4ca4eb3f1dbd18e1bb7',
    measurementId: 'G-806629YLNN',
}

export const auth0Config = {
    client_id: 'XmminWIs0S8gR3gIRBydYLWbF58x81vK',
    domain: 'V5Global.us.auth0.com',
}

export const config = {
    isProd: process.env.NODE_ENV === 'production',
    production: {
        api_endpoint: process.env.REACT_APP_PRODUCTION_API_ENDPOINT || 'https://screenbuilder.uat.appslider.co.in/'
    },
    development: {
        api_endpoint: process.env.REACT_APP_DEVELOPMENT_API_ENDPOINT || 'https://screenbuilder.uat.appslider.co.in/',
        screenbuilder_api_endpoint: process.env.REACT_APP_DEVELOPMENT_SCREEN_BUILDER_API_ENDPOINT || 'https://screenbuilder.uat.appslider.co.in/'
    }
};