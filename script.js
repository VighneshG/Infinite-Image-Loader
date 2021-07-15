const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photos = [];
let initialLoad = true

// Unsplash API
let count = 5;
const apiKey = '6Pl04edp88VZaSbfHfqg_uMXLvl9TOyNTlLNGcO4WxI';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imgLoaded(){
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        initialLoad = false;
        count = 10;
    }
    
}

// Helper function for setAttribute to avoid repeating code
function set(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}


// Create elements for links and photos, Add to DOM
function display(){
  
    imagesLoaded = 0;
    totalImages = photos.length;
    // console.log('Total Images =', totalImages);
    photos.forEach((photo) => {

        // create <a> to link
        const elem = document.createElement('a');
        // elem.setAttribute('href', photo.links.html);
        // elem.setAttribute('target', '_blank');
        set(elem, {
            href: photo.links.html,
            target: '_blank',
        });
        

        // create <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        
        set(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        // check when the loading is finished
        img.addEventListener('load', imgLoaded);

        // Put <img> inside <a> and Put both inside image-container
        elem.appendChild(img);
        imageContainer.appendChild(elem);
    });
}

// Get Photos from Unsplash API

async function getPhotos() {
    try{
        const response = await fetch(apiUrl);
        photos = await response.json();
        display();
        // console.log(photos);
    } catch (error) {
        // catch error here
    }
}

// Load More photos when scrolling near bottom of the page
window.addEventListener('scroll', () => {
    // console.log('ok');
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
      ready = false;
      getPhotos();
    }
  });

// On Loading
getPhotos();