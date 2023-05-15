import Swiper, { EffectFlip, Autoplay } from 'swiper';

let collageSwipers = document.querySelectorAll('.collage-swiper');
collageSwipers.forEach(swiperContainer => {
	let swiper = new Swiper(swiperContainer, {
	  modules: [EffectFlip, Autoplay],
	  
	  effect: "flip",
	  flipEffect: {
	    slideShadows: false,
	  },

	  loop: true,
	  allowTouchMove: false,
	  speed: 1000,

		autoplay: {
			delay: 2000,
		}
	});
});

let options = {
  threshold: 0.25
};

const handleAnimatedBlocks = function(entries, observer) {
  entries.map((entry) => {  	
    if (entry.isIntersecting) {
    	for (const className of entry.target.classList) {
    		if (className.includes('animated--')) {
    			entry.target.style.animationName = className.substring(10);
    		}
    	}

    	entry.target.style.visibility = 'visible';
    	entry.target.classList.add('animated');
    }
  });
};

const observer = new IntersectionObserver(handleAnimatedBlocks, options);
let animatedBlocks = document.querySelectorAll('.animated-on-scroll');

animatedBlocks.forEach(block => {
	block.style.animationName = 'none';
	block.style.visibility = 'hidden';

	observer.observe(block);
});

// Parallax
const parallax = document.querySelector('.parallax');
const parallaxLayers = document.querySelectorAll('.parallax__layer');

const handleParallax = (evt) => {
  const parallaxLeftOffset = parallax.getBoundingClientRect().left;
  const parallaxTopOffset = parallax.getBoundingClientRect().top;

  const coordX = evt.clientX - parallaxLeftOffset - 0.5 * parallax.offsetWidth;
  const coordY = evt.clientY - parallaxTopOffset - 0.5 *  parallax.offsetHeight;
    
  parallaxLayers.forEach((layer)=>{
    const layerSpeed = layer.dataset.speed;
    const x = - (coordX * layerSpeed).toFixed(2);
    const y = - (coordY * layerSpeed).toFixed(2);
    layer.setAttribute('style', `transform: translate(${x}px, ${y}px);`)
  });
};

const reset = () => {
  parallaxLayers.forEach((layer)=>{
  	layer.removeAttribute('style');
  });
}
 
parallax.addEventListener('mousemove', handleParallax);
parallax.addEventListener('mouseout', reset);



