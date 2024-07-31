import {
    state,
    sortingEl,
    sortingBtnRecentEl,
    sortingBtnRelevantEl
} from '../App.js'
import renderJobList from './JobList.js'

function clickHandler(event) {
    const clickedButtonE1 = event.target.closest('.sorting__button');

    if(!clickedButtonE1) return;

    const recent = clickedButtonE1.className.includes('--recent')? true : false;
    

    if(recent){

        sortingBtnRecentEl.classList.add('sorting__button--active');
        sortingBtnRelevantEl.classList.remove('sorting__button--active');
        
        //sorting
        state.serachJobItems.sort((a,b) =>{
           return a.daysAgo - b.daysAgo;

        });
    } else {
        sortingBtnRecentEl.classList.remove('sorting__button--active');
        sortingBtnRelevantEl.classList.add('sorting__button--active');
        
        //sorting
        state.serachJobItems.sort((a,b) =>{
            return b.relevanceScore - a.relevanceScore;
        })

    }

    renderJobList();

}

sortingEl.addEventListener('click' , clickHandler)