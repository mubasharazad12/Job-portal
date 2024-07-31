import {
    spinnerSearchEl,
    spinnerJobDetailsEl
} from '../App.js';

const renderSpinner = WhichSpinner => {
    const spinnerEl = WhichSpinner === 'search' ? spinnerSearchEl : spinnerJobDetailsEl;
    spinnerEl.classList.toggle('spinner--visible');
    
}

export default renderSpinner;