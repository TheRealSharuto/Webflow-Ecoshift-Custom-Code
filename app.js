import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

$(".logo-split-grid").each(function (index) {
  let triggerElement = $(this);
  let targetElement = $(".split-list-item");

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement,
      // trigger element - viewport
      start: "top center",
      end: "bottom center",
      scrub: 1
    }
  });
  tl.from(targetElement, {
    yPercent: 10,
    opacity: 0,
    duration: 0.3,
    scrollTrigger: {
      trigger: targetElement,
      start: 'top bottom-=250',
      once: true
    },
});
});

let largeFlowerSVGs = document.querySelectorAll('.large-logo-svg');
let listItems = document.querySelectorAll('.split-list-item');
console.log("The js file is being loaded");
console.log(listItems);
console.log(largeFlowerSVGs);

init();

function animateFlowerSVGs() {
  if (!largeFlowerSVGs.length) {
    return;
  }

  gsap.utils.toArray('.large-logo-svg').forEach((largeFlowerSVG) => {
    // Progressively enhance animation
    // Animation will be only triggered if JS is loaded on the page
    largeFlowerSVG.classList.add('gsap-loaded');

    let animationSequence = gsap.timeline({
      scrollTrigger: {
        trigger: largeFlowerSVG,
        start: 'center bottom-=200',
        // The SVG will be given this clrolled into view
        // It will also be given this class if the section was already scrolled pass on page load
        toggleClass: 'has-been-scrolled',
        once: true
      }
    });
  });
}

function animateListItems() {
  if (!listItems.length) {
    return;
  }

  Array.from(listItems).forEach((splitListItem) => {
    // NOTE: Progressive enhancement isn't needed here since GSAP works well with HTML (non-SVG elements)
    //       Progressively enhance animation
    //       Animation will be only triggered if JS is loaded on the page
    splitListItem.classList.add('gsap-loaded');

    let listItems = document.querySelectorAll('.split-list-item');

    Array.from(listItems)
      // Set a scrolltrigger for each element to ensure the scroll animation only occurs as
      // each element comes into view
      .forEach((listItem) => {
        gsap.from(listItem, {
          yPercent: 10,
          opacity: 0,
          duration: 0.3,
          scrollTrigger: {
            trigger: listItem,
            start: 'top bottom-=250',
            once: true
          }
        });
      });
  });
}

function init() {
  gsap.registerPlugin(ScrollTrigger);

  animateFlowerSVGs();
  animateListItems();

}

