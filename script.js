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

const video = document.getElementById('camera');
const canvas = document.getElementById('photo');
const captureBtn = document.getElementById('capture-btn');
const context = canvas.getContext('2d');

navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
        video.srcObject = stream;
    })
    .catch((error) => {
        console.error("Error accessing the camera: ", error);
    });

captureBtn.addEventListener('click', () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
});