//page loader
const loader = document.querySelector(".loader")
window.addEventListener('load', ()=>{
    loader.classList.add('loader-hidden');
    loader.addEventListener('transitionend', ()=>{
        document.body.removeChild(loader)
    })
})


//Show cards when are in view
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry =>{
        if (entry.isIntersecting){
            entry.target.classList.add('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

//following blob

const blob = document.getElementById("blob");
document.body.onpointermove = event =>{
    const { pageX , pageY} = event;
    
    blob.animate({
        left: `${pageX}px`,
        top: `${pageY}px`
    }, {duration: 3000, fill: "forwards"});

}

//play video on hover for big screens and on view for small screens
document.querySelectorAll('.card video').forEach(video =>{
    if(window.innerWidth > 1080){
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
                    if(!video.paused){
                        video.load();
                    };
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
    },{duration:200, fill:"forwards"});
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
        width: `50px`
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