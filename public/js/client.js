console.log('running on client');
// puzzle.mead.io/puzzle

// fetch('/weather?address=boston').then((response) => {
//     response.json().then((data) => {

//         console.log(data);
//         if(data.error){
//             console.log(data.error);
//         }
//         else{
//             console.log(data.location);
//         }

//     })

// })

const weatherForm= document.querySelector('form');
const searchElement= document.querySelector('input');
const p1Element= document.querySelector('#p1');
const p2Element= document.querySelector('#p2');

//p1Element.textContent= '';
//p2Element.textContent='';

weatherForm.addEventListener('submit',(evt) => {
    evt.preventDefault();

    const location= searchElement.value;
    console.log(location);

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
    
            console.log(data);
            if(data.error){
                p1Element.textContent= '';
                p2Element.textContent= data.error;
            }
            else{
                p2Element.textContent= '';
                p1Element.textContent = `Location: ${data.location}`;
                p1Element.insertAdjacentHTML('beforeend',`<br/>Latitude: ${data.latitude}<br/>Longitude: ${data.longitude}<br/>Temperature: ${data.temperature}<br/>WindChill: ${data.windchill}<br/>Wind: ${data.windspeed} MPH ${data.wind_dir}<br/>Humidity:${data.humidity}%`);
                console.log(data.location);
            }
    
        })
    
    })

})