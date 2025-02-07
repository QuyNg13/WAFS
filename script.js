const baseURL = 'https://fdnd.directus.app/';
const endpointMe = 'items/person/217'
const myURL = baseURL + endpointMe;

getData(myURL).then( data217 => {
	let deH1 = document.querySelector("h1");
	let myName = data217.data.name;
	deH1.textContent = myName;
});


async function getData(URL) {
	return (
		fetch(URL) 
		.then ( 
			response => response.json() 
		)
		.then ( 
			jsonData => {return jsonData}
		)
	);
}