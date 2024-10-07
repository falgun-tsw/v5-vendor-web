import { xhrClient } from 'src/FormElements/app/utilities/DataRequest';
import { config } from '@app/FormElements/config';
const { isProd } = config;
//..SCREENBUILDER ENDPOINT 
const API_ENDPOINT = isProd
    ? config.production.api_endpoint
    : config.development.screenbuilder_api_endpoint;

const APIVERSION = "screenbuilder/api/v1";
//..ONBOARDING ENDPOINT
const ONBOARDING_API_ENDPOINT = isProd
    ? config.production.api_endpoint
    : config.development.api_endpoint;
const ONBOARDING_APIVERSION = "api/v1";


const uploadService = (file, type) => {
    return xhrClient.put(`${ONBOARDING_API_ENDPOINT}${ONBOARDING_APIVERSION}/files/upload?fileType=${type}`, null, file);
}

export {
    uploadService
};
