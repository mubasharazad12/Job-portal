import{
    searchInputEl,
    state,
    searchFormEl,
    jobListSearchEl,
    numberEl,
    BASE_API_URL,
    getData,
    sortingBtnRecentEl,
    sortingBtnRelevantEl
} from '../App.js';

import renderError from './Error.js';
import renderSpinner from './Spinner.js';
import renderJobList from './JobList.js';
import renderPaginationButtons from './Pagination.js';

//search component
async function submitHandler (event) {
    event.preventDefault();
    
    //get search text
    const searchText = searchInputEl.value;
    
    // validation (regular expression)

    const forbiddenPattern = /[0-9]/;
    const patternMatch = forbiddenPattern.test(searchText);
    if (patternMatch){
        renderError('test');
        return;
    }

    //blur input
    searchInputEl.blur();

    // remove previous search items
    jobListSearchEl.innerHTML = '';

    sortingBtnRecentEl.classList.remove('sorting__button--active');
    sortingBtnRelevantEl.classList.add('sorting__button--active');

    //render spinner

    renderSpinner('search');

    //fetch search result;

    try {

        const  data = await getData(`${BASE_API_URL}/jobs?search=${searchText}`);

        const { jobItems } = data;
        //update state
        state.serachJobItems = jobItems;
        state.currentPage = 1;

        renderSpinner('search');

        numberEl.textContent = jobItems.length;

        renderPaginationButtons();
        renderJobList();


    } catch (error) {
        renderSpinner('search');
        renderError(error.message);
    }


}
searchFormEl.addEventListener('submit' , submitHandler);