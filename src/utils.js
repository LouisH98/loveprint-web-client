export function addItemToHistory(messageObj){
    //get history
    const history  = JSON.parse( localStorage.getItem('history') || "[]");

    //add message
    history.push(messageObj);

    //put history back
    localStorage.setItem('history', JSON.stringify(history))

    return history;
}

export function getHistory(){
    return JSON.parse(localStorage.getItem('history') || "[]")
}