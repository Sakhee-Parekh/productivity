
function updateButtonText() {
    let current = document.getElementById('goal').value; 
    let prev = document.getElementById('txtName').innerHTML; 
    let final = prev + "<br>" + "<br>" + current; 
    document.getElementById('txtName').innerHTML = final;
}
