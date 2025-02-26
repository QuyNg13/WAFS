const baseURL = 'https://fdnd.directus.app/';
const endpointMe = 'items/person/217'
const myURL = baseURL + endpointMe;

getData(myURL).then(data217 => {
    let deH1 = document.querySelector("h1");
    let wbisection = document.getElementById("wbi");
    let user = data217.data;
    let myName = user.name;
    let birthDate = user.birthdate;

    let customData = JSON.parse(user.custom);

    let age = customData.leeftijd;
    let hometown = customData.woonplaats;

    let wbiHTML = `<ul>
        <li>Naam: ${myName}</li>
        <li>Geboortedatum: ${birthDate}</li>
        <li>Leeftijd: ${age}</li>
        <li>Woonplaats: ${hometown}</li>
    </ul>`;

    wbisection.insertAdjacentHTML("beforeend", wbiHTML);
    deH1.textContent = myName;
});

async function getData(URL) {
	return (
		fetch(URL)
			.then(
				response => response.json()
			)
			.then(
				jsonData => { return jsonData }
			)
	);
}

document.querySelectorAll(".card-wrapper").forEach(wrapper => 
    wrapper.addEventListener("click", () => wrapper.classList.toggle("flipped"))
);

// https://developer.mozilla.org/en-US/docs/Web/API/Media_Capture_and_Streams_API/Taking_still_photos#the_html_markup
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photo = document.getElementById('photo');
const captureButton = document.getElementById('captureButton');
const capturedphoto = document.querySelector('.captured-polaroid');
const lens = document.querySelector('.lens-glass');

const gallery = document.getElementById('photo-gallery');
const capturedPhotos = JSON.parse(localStorage.getItem('photos')) || [];

// camera starten en streamen naar video element
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

// met knop animatie beginnen en canvas maken
// captureButton.addEventListener('click', () => {
// 	canvas.width = video.videoWidth;
// 	canvas.height = video.videoHeight;
// 	lens.classList.remove("rotate");
// 	void lens.offsetWidth;
// 	lens.classList.add("rotate");
// 	document.getElementById("shutter-sound").play();

// 	lens.addEventListener('animationend', () => {
// 		capturedphoto.classList.add("show");
// 		// frame uit video element halen en in canvas zetten
// 		canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
// 		// afbeelding in canvas opslaan
// 		const imageDataUrl = canvas.toDataURL('image/jpeg');
// 		// opgeslagen afbeelding tonen in photo element
// 		photo.src = imageDataUrl;
// 		photo.classList.add("show")
// 		capturedPhotos.push(imageDataUrl);
//         localStorage.setItem('photos', JSON.stringify(capturedPhotos));
// 		addPhotoToGallery(imageDataUrl);
// 	}, { once: true });
// });

captureButton.addEventListener('click', () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    lens.classList.remove("rotate");
    void lens.offsetWidth;
    lens.classList.add("rotate");
    document.getElementById("shutter-sound").play();

    if (photo.classList.contains("show")) {
        // Eerst de class "show" verwijderen en wachten op animatie-einde
        photo.classList.remove("show");
        capturedphoto.classList.remove("show");
        // Wacht op het einde van de animatie voordat een nieuwe foto wordt gemaakt
        capturedphoto.addEventListener("transitionend", () => {
            takePhoto();
        }, { once: true });
    } else {
        takePhoto();
    }
});

function takePhoto() {
    lens.addEventListener('animationend', () => {
        capturedphoto.classList.add("show");
        // Frame uit video element halen en in canvas zetten
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
        // Afbeelding in canvas opslaan
        const imageDataUrl = canvas.toDataURL('image/jpeg');
        // Opgeslagen afbeelding tonen in photo element
        photo.src = imageDataUrl;
        photo.classList.add("show");
        // Foto opslaan in localStorage en galerij
        capturedPhotos.push(imageDataUrl);
        localStorage.setItem('photos', JSON.stringify(capturedPhotos));
        addPhotoToGallery(imageDataUrl);
    }, { once: true });
}

function addPhotoToGallery(imageDataUrl) {
    const polaroidDiv = document.createElement('li');
    polaroidDiv.classList.add('gallery-polaroid');

    const img = document.createElement('img');
    img.src = imageDataUrl;
    img.alt = "gallery-photo";
	img.classList.add('gallery-photo')

    polaroidDiv.appendChild(img);
    gallery.appendChild(polaroidDiv);
}

const clearButton = document.getElementById('clear-gallery');

clearButton.addEventListener('click', () => {
    localStorage.removeItem('photos');
    gallery.innerHTML = '';
});

window.addEventListener('load', startCamera);