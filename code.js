
function updateButtonText() {
    // var goals  = [];
    let current = document.getElementById('goal').value; 
    let prev = document.getElementById('txtName').innerHTML; 
    // goals.push(txtname);
    let final = prev + "<br>" + "<br>" + current; 
    document.getElementById('txtName').innerHTML = final;
}

// function clear(){
//     goals.length = 0;
// }

