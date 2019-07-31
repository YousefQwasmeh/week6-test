const cities=document.getElementById("cities");
const request = (url, cb) => {
	fetch(url)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			return cb(data);
		});
};
request("/cities",(data)=>{
    data.forEach(element => {
        const li=document.createElement("li");
        li.innerText=element.name+" in "+element.country;
        cities.appendChild(li);
    });
})