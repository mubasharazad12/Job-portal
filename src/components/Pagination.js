import {
    state,
    paginationEl,
    paginationBtnBackEl,
    paginationBtnNextEl,
    paginationNumberBackEl,
    paginationNumberNextEl,
    RESULTS_PER_PAGE
} from '../App.js'

import renderJobList from './JobList.js'

function renderPaginationButtons() {
    if (state.currentPage > 1) {
        paginationBtnBackEl.classList.remove('pagination__button--hidden');
    } else{
        paginationBtnBackEl.classList.add('pagination__button--hidden');
    }

    if ((state.serachJobItems.length - state.currentPage * RESULTS_PER_PAGE) <= 0 ) {
        paginationBtnNextEl.classList.add('pagination__button--hidden');
    } else{
        paginationBtnNextEl.classList.remove('pagination__button--hidden');
    }

    paginationNumberNextEl.textContent = state.currentPage + 1;
    paginationNumberBackEl.textContent = state.currentPage - 1;

    paginationBtnNextEl.blur();
    paginationBtnBackEl.blur();

}

function clickHandler (event) {
    const clickedButtonEl = event.target.closest('.pagination__button');
    if(!clickedButtonEl) return;


    const nextPage = clickedButtonEl.className.includes('--next') ? true : false;

    nextPage ? state.currentPage++ : state.currentPage--;
    renderPaginationButtons();
    renderJobList();
    

}

paginationEl.addEventListener('click' , clickHandler);

export default renderPaginationButtons;