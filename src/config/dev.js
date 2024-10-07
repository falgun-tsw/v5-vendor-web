export const devConfig = () => {
    return {
        environment: "DEVELOPMENT", // to toggle between environments: DEVELOPMENT | PRODUCTION
        debug: true, // true | false

        // endpoints and tokens
        apiUrl: "https://freelancer.uat.appslider.co.in/api/v1/",
        // imageBaseUrl: "https://cdn.appslider.co.in/",
        imageBaseUrl:"https://nocode-app-store.s3.ap-south-1.amazonaws.com/",
        screen_builder_api_endpoint:'https://screenbuilder.uat.appslider.co.in/screenbuilder/api/v1/',

        // general info
        companyName: "Brandpulse", // app name
        companyLogo: "https://www.jarvisinvest.com/img/jarvis-text.png", // company logo
        localStorageKeys: {
            tokenKey: "token", // node api token
            legacyTokenKey: "legacyToken", // php api token
            appsflyerData: "appsflyerData", // store campaign related data
            geoLocation: "geoLocation", // store lat and long data
            trackerConfig: "trackerConfig", // store tracker config
        },
        toastTimeout: 4000,
    };
}