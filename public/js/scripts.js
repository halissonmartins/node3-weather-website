const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = ''

    const location = search.value;
    
    fetch(`http://localhost:3000/weather?address=${location}`)
        .then((response) => {
            response.json().then((data) => {
                console.log(data);

                if(data.error){
                    const {error: errorMessage} = data; 
                    console.error(errorMessage);
                    messageOne.textContent = errorMessage;

                    return;
                }

                const {location, forecast} = data;                
                messageOne.textContent = location;
                messageTwo.textContent = forecast;

            });
        })
        .catch((error) => {
            error.json().then((data) => {
                console.error(data);
                const {error: errorMessage} = data; 
                console.error(errorMessage);
                messageOne.textContent = errorMessage;
                messageTwo.textContent = '';
            });
        });
});