import{

    jobListSearchEl,
    jobListBookmarksEl,
    jobDetailsContentEl,
    BASE_API_URL,
    getData,
    state,
    RESULTS_PER_PAGE
} from '../App.js';

import renderSpinner from './Spinner.js';
import renderJonDetails from './JobDetails.js';
import renderError from './Error.js';

function renderJobList(whichJobList = 'search') {
    //determine the searches

    const jobListEl = whichJobList === 'search' ? jobListSearchEl : jobListBookmarksEl;


    //remove old searches
    jobListEl.innerHTML = '';

    //determine the job items
    let jobItems;
    if(whichJobList === 'search'){
        jobItems = state.serachJobItems.slice(state.currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE, state.currentPage * RESULTS_PER_PAGE);
    }else if(whichJobList === 'bookmarks'){
        jobItems =  state.bookmarkJobItems;
    }

    //display job items
    jobItems.forEach(jobitem =>{
        const newJobItemHTML= `
        <li class="job-item ${state.activeJobItem.id === jobitem.id ? 'job-item--active' : ''}">
            <a class="job-item__link" href="${jobitem.id}">
                <div class="job-item__badge ${jobitem.badgeLetters}">${jobitem.badgeLetters}</div>
                <div class="job-item__middle">
                    <h3 class="third-heading">${jobitem.title}</h3>
                    <p class="job-item__company">${jobitem.company}</p>
                    <div class="job-item__extras">
                        <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i> ${jobitem.duration}</p>
                        <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i>${jobitem.salary}</p>
                        <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i> ${jobitem.location}</p>
                    </div>
                </div>
                <div class="job-item__right">
                    <i class="fa-solid fa-bookmark job-item__bookmark-icon ${state.bookmarkJobItems.some(item => item.id === jobitem.id) ? 'job-item__bookmark-icon--bookmarked' : ''}"></i>
                    <time class="job-item__time">${jobitem.daysAgo}d</time>
                </div>
            </a>
        </li>
        `;
        jobListEl.insertAdjacentHTML('beforeend' , newJobItemHTML);
    });
}

// job list compontne
async function clickHandler(event){
    event.preventDefault();

    const jobItemEl = event.target.closest('.job-item');

    document.querySelectorAll('.job-item--active').forEach(items =>{
        items.classList.remove('job-item--active');
    })
    

    jobDetailsContentEl.innerHTML = '';
    renderSpinner('job-details');

    // get id
    const id = jobItemEl.children[0].getAttribute('href');

    const allJobItems = [...state.serachJobItems, ...state.bookmarkJobItems];
    state.activeJobItem = allJobItems.find(jobItem => jobItem.id === +id);

    renderJobList();

    history.pushState(null, '' , `/#${id}`);


    const badgeColor = jobItemEl.children[0].children[0].getAttribute('class');

    try {
        const  data = await getData(`${BASE_API_URL}/jobs/${id}`);

        const { jobItem } = data;

        renderSpinner('job-details');
        renderJonDetails(jobItem, badgeColor);

    } catch (error) {
        renderSpinner('job-details');
        renderError(error.message);
    }


};
jobListSearchEl.addEventListener('click' , clickHandler);
jobListBookmarksEl.addEventListener('click' , clickHandler);



export default renderJobList;




    // fetch(`${BASE_API_URL}/jobs/${id}`)
    //     .then(response => {
    //         if(!response.ok){
    //             throw new Error('Resouse issue(eg resource dosent extist) or server issue');
    //         }
    //         return response.json();
    //     })
    //     .then(data => {
    //         const { jobItem } = data;
    //         renderSpinner('job-details');
            
    //         renderJonDetails(jobItem, badgeColor);

    //     })
    //     .catch( error => {
    //         renderSpinner('job-details');
    //         renderError(error.message);
    //     }
    //     );