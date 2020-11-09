function readStorage() {
    let val = localStorage.getItem("goal");
    document.getElementById('txtName').innerHTML = val;
}



function updateText() {
    let current = document.getElementById('goal').value; 
    let prev = document.getElementById('txtName').innerHTML; 
    let final; 
    if (prev.length == 0) { 
        final = current; 
    } else { 
       final = prev + " " + "|" + " " + current; 
    } 

    document.getElementById('txtName').innerHTML = final;
    // local storage
    localStorage.setItem("goal", final); 
}

function clearText() {
    localStorage.setItem("goal", ""); 
    document.getElementById('txtName').innerHTML = "";
}
