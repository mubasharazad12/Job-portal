import{
    errorTextEl,
    errorEl,
    DEFAULT_DISPLAY_TIME
} from '../App.js';


function renderError(message){

    errorTextEl.textContent = message;
    errorEl.classList.add('error--visible');
    setTimeout(() => {
        errorEl.classList.remove('error--visible');
    } , DEFAULT_DISPLAY_TIME);
    
}

export default renderError;