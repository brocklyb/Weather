function createURL(){
    const base_url = "https://api.openweathermap.org/data/2.5/weather?lat="
    const api_key = "0a3b8c98efb66db032a1e8537d2a6b4c"
    const latitude = document.getElementById("lat").value
    const longitude = document.getElementById("long").value
    const output = base_url + latitude + "&lon=" + longitude + "&appid=" + api_key
    weatherLookup(output)
    forecast(latitude,longitude)
}



async function forecast(lat,lon){
    const base_url = "https://api.openweathermap.org/data/2.5/forecast?lat="
    const api_key = "0a3b8c98efb66db032a1e8537d2a6b4c"
    const output_url = base_url + lat + "&lon=" + lon + "&appid=" + api_key

    const response = await fetch(output_url, {mode:'cors'})
    const thedata = await response.json()
    console.log(thedata)
    console.log(thedata.list[0].main.temp)

    mon.textContent = "Monday: "+weatherConvert(thedata.list[0].main.temp)
    tue.textContent = "Tuesday: "+weatherConvert(thedata.list[1].main.temp)
    wed.textContent = "Wednesday: "+weatherConvert(thedata.list[2].main.temp)
    thu.textContent = "Thursday: "+weatherConvert(thedata.list[3].main.temp)
    fri.textContent = "Friday: "+weatherConvert(thedata.list[4].main.temp)
    sat.textContent = "Saturday: "+weatherConvert(thedata.list[5].main.temp)
    sun.textContent = "Sunday: "+weatherConvert(thedata.list[6].main.temp)

}

function weatherConvert(x){
    const answer = (((x - 273.15) * 9) / 5) + 32
    return Math.round(answer)
}


async function weatherLookup(url){
    const response = await fetch(url, {mode:'cors'})
    const thedata = await response.json()
    /*console.log(thedata)
    console.log(thedata.name)
    console.log(thedata.main.temp)
    console.log(thedata.weather[0].description)
    console.log(thedata.main.temp_min)
    console.log(thedata.main.temp_max)
*/
    const f = (((thedata.main.temp - 273.15) * 9) / 5) + 32
    city.textContent += thedata.name
    temp.textContent += Math.round(f)

    weather.textContent = thedata.weather[0].description
    high.textContent = "High:"+thedata.main.temp_min
    low.textContent = "Low:"+thedata.main.temp_max
    const cityname = thedata.name
    giphy(cityname)
}

async function giphy(city){
    const the_img = document.querySelector('img')
    const base_url = "https://api.giphy.com/v1/gifs/translate?api_key=ykV4ng59FQqQiq1KxZb3RAo1SD9eHcUp&s="
    const output_url = base_url + city
    
    const response = await fetch(output_url,{mode: 'cors'})
    const thedata = await response.json()
    the_img.src = thedata.data.images.original.url;
}

