import {
    jobDetailsContentEl,
    BASE_API_URL,
    getData,
    state
} from '../App.js'
import renderSpinner from './Spinner.js';
import renderJonDetails from './JobDetails.js';
import renderError from './Error.js';


async function  loadHashChnageHandler() {
    const id = window.location.hash.substring(1);


    if(id){
        jobDetailsContentEl.innerHTML = '';
        renderSpinner('job-details');

        try {
            const  data = await getData(`${BASE_API_URL}/jobs/${id}`);
    
            const { jobItem } = data;

            state.activeJobItem = jobItem;
    
            renderSpinner('job-details');
            renderJonDetails(jobItem);
    
        } catch (error) {
            renderSpinner('job-details');
            renderError(error.message);
        }

    }

    
}
window.addEventListener('DOMContentLoaded', loadHashChnageHandler);
window.addEventListener('hashchange' , loadHashChnageHandler)