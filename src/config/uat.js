export const uatConfig = () => {
    return {
        environment: "UAT", // to toggle between environments: DEVELOPMENT | PRODUCTION
        debug: true, // true | false

        // endpoints and tokens
        apiUrl: "https://uat-cust-api.jarvisinvest.com", // node api server endpoint

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