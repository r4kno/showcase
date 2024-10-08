//page loader
const loader = document.querySelector(".loader")
window.addEventListener('load', ()=>{
    loader.classList.add('loader-hidden');
    loader.addEventListener('transitionend', ()=>{
        document.body.removeChild(loader)
    })
})

//intro loading animation
const letter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const intros = document.querySelectorAll('.render');
intros.forEach((intro) =>{

    let iterations = 0;

    const interval = setInterval(() =>{
    intro.innerHTML = intro.innerHTML.split("").map((char, index) => {
        if(index < iterations){
            return intro.dataset.value[index];
        }
        return letter[Math.floor(Math.random() * 26)];
    }).join("");
    if(iterations >= intro.dataset.value.length){ clearInterval(interval)}
    iterations += 1/3;
    }, 30);
});

//Show cards when are in view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry =>{
        if (entry.isIntersecting){
            entry.target.classList.add('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

//show images when in view
const image = document.querySelectorAll('.image');
image.forEach((image, index) =>{
    image.style.transitionDelay = `${index * 100}ms`;
});
if(window.innerWidth <= 1080){
    document.querySelectorAll('.hidden1').forEach((el) => observer.observe(el));
    document.querySelectorAll('.hidden2').forEach((el) => observer.observe(el));
} else{
    image.forEach(el =>{
        el.classList.remove('hidden1');
        el.classList.remove('hidden2');
    });
}
//card button clicks

document.getElementById('btn1').addEventListener('click', () => {
    window.location.href = 'https://github.com/r4kno/showcase/raw/main/videos/fogg_orignal.mp4';
});
document.getElementById('btn2').addEventListener('click', () => {
    window.location.href = 'https://github.com/r4kno/showcase/raw/main/videos/bike_orignal.mp4';
});
document.getElementById('btn3').addEventListener('click', () => {
    window.location.href = 'https://github.com/r4kno/showcase/raw/main/videos/facewash_orignal.mp4';
});
//following blob

const blob = document.getElementById("blob");
document.body.onpointermove = event =>{
    const { clientX , clientY} = event;
    
    blob.animate({
        left: `${clientX}px`,
        top: `${clientY}px`
    }, {duration: 3000, fill: "forwards"});

}
console.log(window.innerWidth);
console.log(window.innerHeight);

//play video on hover for big screens and on view for small screens
document.querySelectorAll('.card video').forEach(video =>{
    if(window.innerWidth > 1081){
    video.addEventListener('mouseenter' , ()=>{
        video.play();
    });
    video.addEventListener('mouseleave', () => {
        video.load();
    });} else{
        const observer2 = new IntersectionObserver((entries) => {
            entries.forEach(entry =>{
                if(entry.isIntersecting){
                    entry.target.querySelector('video').play();
                } else{
                    const video = entry.target.querySelector('video').pause();
                    video.load();
                    
                };
            });
        } ,{
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        });
        observer2.observe(video.closest('.card'))
    };
});
//move image track on drag
const track = document.getElementById("img-track");
function handleStart(e){
    track.dataset.mouseDownAt = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
};

function handleMove(e){
    if(track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
    maxDelta = window.innerWidth / 2;
    const percentage = (mouseDelta / maxDelta) * -100;
    let nextPercentage = percentage + parseFloat(track.dataset.prevPercentage);

    const minPercentage = -100;
    const maxPercentage = 0;

    nextPercentage = Math.max(minPercentage, Math.min(nextPercentage, maxPercentage));

    track.dataset.percentage = nextPercentage;

    track.animate({
        transform : `translate(${nextPercentage}%, 0)`
}, {duration: 1200, fill: "forwards"});

    for (const image of track.getElementsByClassName("image")) {
        image.animate({
            objectPosition: `${nextPercentage + 100}% 50%`
        }, {duration: 1200 , fill: "forwards"});
    };
};
track.addEventListener('mouseup' , () =>{
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
});

track.addEventListener('mousedown', handleStart);
track.addEventListener('mousemove', handleMove);

//hover blob for img track

const imgblob = document.getElementById("img-blob");
const blobtext = document.getElementById("blob-text");
function anime(className, style, duration){
    const element = document.querySelectorAll(`.${className}`);
    element.animate(style, {duration: duration, fill:"forwards"});
}
track.addEventListener('mousemove' , (e) =>{
    const clienX = e.pageX;
    const clienY = e.pageY;
    imgblob.animate({
        left :`${clienX + 50}px`,
        top: `${clienY }px`,
    },{duration:600, fill:"forwards"});
});
track.addEventListener('mousedown' , () =>{
    imgblob.animate({
        width: `20px`,
},{duration:200, fill:"forwards"});
    blobtext.animate({
        opacity: `1`,
        opacity: `0`
}, {duration:200, fill:"forwards"});
});

track.addEventListener('mouseup' , ()=>{
    imgblob.animate({
        width: `90px`
    }, {duration: 200, fill: "forwards"});
    blobtext.animate({
        opacity: `0`,
        opacity: `1`
}, {duration:200, fill:"forwards"});});
track.addEventListener('mouseleave' , () =>{
    imgblob.animate({
        opacity: 1,
        opacity: 0,
        display: `none`
}, {duration: 200, fill:"forwards"});
    blobtext.style.opacity= `0`
});
track.addEventListener('mouseenter' , ()=>{
    imgblob.animate({
        opacity:1,
        display: `block`
    },{duration:200, fill:"forwards"});
    blobtext.style.opacity = `1`;
});