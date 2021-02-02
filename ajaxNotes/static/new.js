const data = document.getElementById('data');

// getting the csrf token here.
const csrf = data.dataset.csrf;

const submitBtn = document.getElementById('ok');

const newDiv = document.querySelector('.new');

console.log(csrf);


const submitNote = () => {

    // getting title and text
    const title=document.getElementById('title').value;
    const text=document.getElementById('text').value;

    const body = {
        title:title,
        text:text
    }

    console.log(
        {"title":title,
        "text":text}
    );
    
    // utilizing fetch api
    // we are making a post request.
    // to /new/
    fetch('/new/', {
        "method":"POST",
        "headers":{
            "Accept":"application/json",
            "Content-Type":"application/json",
            "X-CSRFToken":csrf
        },
        "body": JSON.stringify(body)
    })
        .then(res => res.json())
            .then(data => {
                const small = document.createElement('small');
                small.textContent = data.msg;

                newDiv.appendChild(small);

                title='';
                text='';
            });
    
}




submitBtn.addEventListener('click', submitNote);



