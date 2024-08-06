import { state } from "../App.js";

const storedJobItems = localStorage.getItem('bookmarkJobItems');
if (storedJobItems){
    state.bookmarkJobItems = JSON.parse(storedJobItems);
}