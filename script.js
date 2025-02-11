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

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photo = document.getElementById('photo');
const captureButton = document.getElementById('captureButton');
const capturedphoto = document.querySelector('.captured-polaroid');
const lens = document.querySelector('.lens-glass');

async function startCamera() {
	try {
		const stream = await navigator.mediaDevices.getUserMedia({ 
			video: { 
				facingMode: 'user' 
			} 
		});
		video.srcObject = stream;
	} catch (err) {
		console.error("Error accessing the camera", err);
		alert("Error accessing the camera: " + err.message);
	}
}

captureButton.addEventListener('click', () => {
	canvas.width = video.videoWidth;
	canvas.height = video.videoHeight;
	lens.classList.remove("rotate");
	void lens.offsetWidth;
	lens.classList.add("rotate");
	lens.addEventListener('animationend', () => {
		capturedphoto.classList.add("show");
		canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
		const imageDataUrl = canvas.toDataURL('image/jpeg'); 
		photo.src = imageDataUrl;
		photo.classList.add("show")
	}, { once: true });
});

window.addEventListener('load', startCamera);