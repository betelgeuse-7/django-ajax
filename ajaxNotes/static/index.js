const deleteBtn = document.querySelectorAll('.delete');

const csrfData = document.getElementById("csrfData");

const csrf = csrfData.dataset.csrf;


const deletePost = (e) => {
    const noteID = e.target.dataset.noteid;

    console.log("gsrg");
    console.log(noteID);

    const body = {
        "id":noteID
    }

    fetch('/delete/', {
        "method":"POST",
        "headers":{
            "Accept":"application/json",
            "Content-Type":"application/json",
            "X-CSRFToken": csrf
        },
        "body": JSON.stringify(body)
    }).then(res => res.json())
        .then(data => {
            if(data.errmsg){
                const small = document.createElement('small');
                small.textContent=data.errmsg;
                e.target.parentElement.parentElement.appendChild(small)
            } else if(data.msg){
                const small = document.createElement('small');
                small.textContent=data.msg;
                e.target.parentElement.parentElement.appendChild(small)
                e.target.parentElement.style.display='none';
            }
        });
    

}



deleteBtn.forEach(btn => {
    btn.addEventListener('click', deletePost);
})
