gsap.registerPlugin(ScrollTrigger);
const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
    smooth: true,
    smoothMobile: true, // Enable smooth scrolling on mobile devices
    multiplier: 0.5,
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();


// Mouse Follower div
 let cursor = document.querySelector(".cursor");
 let main = document.querySelector(".main")

//  })
document.body.addEventListener('mousemove', (event) => {
  cursor.style.transform = `translate(${event.clientX-10}px, ${event.clientY-10}px)`;
});


// Mouse Follower becomes a button on entering the video
let video = document.querySelector("#duo-reel");
 video.addEventListener('mouseenter',()=>{
   cursor.innerHTML = "Sound On";
   cursor.classList.add("cursor-on-video");
 })
 video.addEventListener('mouseleave',()=>{
   cursor.innerHTML = "";
   cursor.classList.remove("cursor-on-video");
 })

video.addEventListener('click', (event) => {
  cursor.classList.add("cursor-on-video");
  if (video.muted) {
    video.muted = false; // Unmute the video
    cursor.innerHTML = "Sound Off";
  } else {
    video.muted = true; // Mute the video
    cursor.innerHTML = "Sound On";
  }
});


// Discover Div becomes magnetic to mouse
const discover = document.getElementsByClassName("discover")[0];

Shery.makeMagnet(".discover" /* Element to target.*/, {
  //Parameters are optional.
  ease: "cubic-bezier(0.23, 1, 0.320, 1)",
  duration: 1,
});

// Mouse changes to images
var innerRows = document.querySelectorAll(".inner-row")
innerRows.forEach((e)=>{
  e.addEventListener('mouseenter',()=>{
    let attr = e.getAttribute("data-image");
    cursor.classList.add("cursor-on-page4");
    cursor.style.backgroundImage = `url(${attr})`;
  })

  e.addEventListener('mouseleave',()=>{
    let attr = e.getAttribute("data-image");
    cursor.classList.remove("cursor-on-page4");
    cursor.style.backgroundImage = `none`;
  })
})

// Toggle between clients and mentions
let p5Headings = document.querySelectorAll(".p5-headings h1");
let mentionDiv = document.querySelector(".p5-mentions");
let clientsDiv = document.querySelector(".p5-clients");
let toggleHeadingChanges  = document.querySelectorAll(".toggle-h2 .change h4");
let p5h1 =  document.querySelectorAll(".p5-1 h1");
let p5h2 =  document.querySelectorAll(".p5-2 h1");


p5h1[0].addEventListener('click',()=>{
  p5h1.forEach((el)=>{
    el.style.transform = "translateY(-100%)";
  })
  p5h2.forEach((el)=>{
    el.style.transform = "translateY(-100%)";
  })
  mentionDiv.style.display = "block";
  clientsDiv.style.display = "none";
  toggleHeadingChanges.forEach((el)=>{
    el.style.transform = "translateY(0%)";
  })
})

p5h2[0].addEventListener('click',()=>{
  p5h1.forEach((el)=>{
    el.style.transform = "translateY(-100%)";
  })
  p5h2.forEach((el)=>{
    el.style.transform = "translateY(-100%)";
  })
    mentionDiv.style.display = "none";
    clientsDiv.style.display = "block";
    toggleHeadingChanges.forEach((el)=>{
      el.style.transform = "translateY(-100%)";
    })
    
})
p5h1[1].addEventListener('click',()=>{
  p5h1.forEach((el)=>{
    el.style.transform = "translateY(0%)";
  })
  p5h2.forEach((el)=>{
    el.style.transform = "translateY(0%)";
  })
  mentionDiv.style.display = "block";
  clientsDiv.style.display = "none";
  toggleHeadingChanges.forEach((el)=>{
    el.style.transform = "translateY(0%)";
  })
})

p5h2[1].addEventListener('click',()=>{
  p5h1.forEach((el)=>{
    el.style.transform = "translateY(0%)";
  })
  p5h2.forEach((el)=>{
    el.style.transform = "translateY(0%)";
  })
    mentionDiv.style.display = "none";
    clientsDiv.style.display = "block";
    toggleHeadingChanges.forEach((el)=>{
      el.style.transform = "translateY(-100%)";
    })
    
})

// Purple div for navbar contents
let manyCircles = document.querySelector("#many-circles");
let navContents = document.querySelectorAll("#nav-contents h4");
let scrollingText = document.querySelector(".scrolling-text");
let purpleDiv = document.getElementById("purple");
let circle = document.querySelector("#circle");
let deepCopy;

navContents.forEach((e)=>{
    e.addEventListener('mouseenter',()=>{
      let text = "";
      for(let i=0;i<50;i++)
      {
        text = text + " "+ e.textContent;
      }
      scrollingText.innerHTML = text;
      purpleDiv.style.display = "block";
    })
    e.addEventListener('mouseleave',()=>{
      purpleDiv.style.display = "none";
    })
})

// Hovering over last circle in the navbar creates a new circle and shows purple div

manyCircles.addEventListener('mouseenter',()=>{
  let text = "";
  deepCopy = circle.cloneNode(true);
    for(let i=0;i<50;i++)
    {
      text = text + " ExtraCredit";
    }
    scrollingText.innerHTML = text;
    manyCircles.appendChild(deepCopy);
    purpleDiv.style.display = "block";
})
manyCircles.addEventListener('mouseleave',()=>{
manyCircles.removeChild(manyCircles.lastElementChild);
purpleDiv.style.display = "none";
})


// Cursor over images and vids in page3 changes text
let workShowcase = document.querySelectorAll(".work-showcase");
 workShowcase.forEach((e)=>{
  e.addEventListener('mouseenter',()=>{
    cursor.innerHTML = "View";
    cursor.classList.add("cursor-on-works");
  })
  e.addEventListener('mouseleave',()=>{
    cursor.innerHTML = "";
    cursor.classList.remove("cursor-on-works");
  })  
 })

//GSAP

gsap.from("#line__inner, #line__outer", {
  y: 10,
  rotate: 10,
  opacity: 0,
  delay: 0.3,
  duration: 0.7
})

gsap.from("#text-above-video",{
  opacity: 0,
  duration: 1,
  delay: 0.5,
})

gsap.from("#duo-reel",{
  opacity: 0,
  duration: 1,
  delay: 0.7,
})

let tl = gsap.timeline({
    scrollTrigger: {
        trigger: "#line__inner",
        scroller: ".main",
        start: "top 30%",
        end: "top 0", 
        //markers: true,
        scrub: 3,
    }
});

tl.to("#line__inner",{
    x: -100,
},"anim")

tl.to("#line__outer",{
    x: 100,
},"anim")
 tl.to(".page1 video,#text-above-video",{
     width: "96%",
 },"anim")
 tl.to(".page2, .page1",{
  backgroundColor: "#fff",
  color: "#000",
  scrollTrigger: {
    trigger: "#page2-text",
    scroller: ".main",
    end: "top 70%",
    // markers: true,
    scrub: 4,
  }
 },"anim")

 tl.to(".page3, .page4",{
    backgroundColor: "#000",
    color: "#fff",
    borderTopColor: "#fff", // Change borderTop color
    borderTopWidth: "1px",  // Change borderTop width
    scrollTrigger: {
      trigger: ".elem2 .text-div h1",
      scroller: ".main",
      end: "top 70%",
      // markers: true,
      scrub: 2,
    }
 })

let tl1 = gsap.timeline({
  scrollTrigger:{
    scroller: ".main",
    trigger: "#page2-text",
    end: "top 50%",
   // markers: true,
  }
})
 tl1.from(".page2 h1",{
    y: 10,
    rotate: 10,
    opacity: 0,
    duration: 0.7,
 })
 tl1.from(".p2-left h2",{
    y: 10,
    rotate: 10,
    opacity: 0,
    duration: 0.5,
 })
 tl1.from(".p2-right",{
    y: 50,
    opacity: 0,
    duration: 0.5,
 })
 
 let tl2 = gsap.timeline({
  scrollTrigger:
  {
  scroller: ".main",
  trigger: ".page3",
  end: "top 0%",
  start: "top 60%",
  //markers: true,
  }
});

   tl2.from(".page3 h1",{
       y: 10,
       rotate: 10,
       delay:0.3,
       duration: 0.7,
       opacity: 0,
    });
   tl2.from("#work1",{
      y: 60,
      opacity: 0,
      duration: 1.2,
    });
  tl2.from("#work2",{
      y: 70,
      opacity: 0,
      duration: 1.2,
   });
  tl2.from("#work3",{
      y: 60,
      opacity: 0,
      duration: 1.2,
   });
  tl2.from("#work4",{
      y: 60,
      opacity: 0,
      duration: 1.2,
   });

tl2.from("#all-projects .discover",{
    x: 40,
    opacity: 0,
    delay: 0.4,
});


let tl4 = gsap.timeline({
  scrollTrigger:{
    scroller: ".main",
    trigger: ".toggle-h2",
    start: "top 25%",
    //markers: true,
  }
});

tl4.from(".p5-headings",{
  y: 20,
  rotate: 10,
  opacity: 0,
  delay: 0.3,
  duration: 0.5,
});

tl4.from(".toggle-h2",{
  y: 20,
  rotate: 10,
  opacity: 0,
  duration: 0.5,
});

tl4.from(".inner-row",{
  x: -60,
  opacity: 0,
  delay: 0.3,
  duration: 0.7,
  stagger: 0.4,
});


let tl5 = gsap.timeline({
     scrollTrigger:{
      scroller: ".main",
      trigger: ".footer-contact-details",
      end: "top 80%",
      //markers: true,
   }
 })

 tl5.from(".main-footer-details h1",{
  y: 20,
  rotate: 10,
  delay: 0.5,
  opacity: 0,
  duration: 0.5,
 })

 tl5.from(".get-in-touch",{
  x: 40,
  opacity: 0,
  duration: 0.5,
 })

 tl5.from("footer h2",{
  x: -40,
  opacity: 0,
  duration: 0.5,
 })

 tl5.from(".footer-contact-details",{
  x: -40,
  opacity: 0,
  duration: 0.5,
  stagger: 0.4,
 })



