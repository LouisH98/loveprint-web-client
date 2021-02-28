import axios from 'axios'
import store from '@/store/index'

export function addItemToHistory(messageObj){
    //get history
    const history  = JSON.parse( localStorage.getItem('history') || "[]");

    //add message
    history.unshift(messageObj);

    //put history back
    localStorage.setItem('history', JSON.stringify(history))

    return history;
}

export async function sendMessage(message){
    const response = await axios.post(store.state.lovePrintAddress + '/api/print-text', message);

    return response.data || {};
}

export function getHistory(){
    return JSON.parse(localStorage.getItem('history') || "[]")
}

export function removeHistoryItem(messageObj){
    let history = getHistory();
    const messageIndex = history.findIndex(histObj => histObj.id === messageObj.id);

    if(messageIndex >= 0) {
        history.splice(messageIndex, 1)
    }

    //put history back
    localStorage.setItem('history', JSON.stringify(history))
}

//https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
export function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}