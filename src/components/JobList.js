import{

    jobListSearchEl,
    jobDetailsContentEl,
    BASE_API_URL,
    getData,
    state
} from '../App.js';

import renderSpinner from './Spinner.js';
import renderJonDetails from './JobDetails.js';
import renderError from './Error.js';

function renderJobList() {
    //remove old searches
    jobListSearchEl.innerHTML = '';

    //display job items
    state.serachJobItems.slice(0,7).forEach(jobitem =>{
        const newJobItemHTML= `
        <li class="job-item">
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
                    <i class="fa-solid fa-bookmark job-item__bookmark-icon"></i>
                    <time class="job-item__time">${jobitem.daysAgo}d</time>
                </div>
            </a>
        </li>
        `;
        jobListSearchEl.insertAdjacentHTML('beforeend' , newJobItemHTML);
    });
}

// job list compontne
async function clickHandler(event){
    event.preventDefault();

    const jobItemEl = event.target.closest('.job-item');

    document.querySelector('.job-item--active')?.classList.remove('job-item--active');
    

    jobItemEl.classList.add('job-item--active');


    jobDetailsContentEl.innerHTML = '';
    renderSpinner('job-details');

    // get id
    const id = jobItemEl.children[0].getAttribute('href');
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
        


};
jobListSearchEl.addEventListener('click' , clickHandler);


export default renderJobList;