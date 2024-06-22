jQuery(function ($) {
  $(document).ready(() => {
    $('.outside-field__select').niceSelect();

    $('.popup-button').magnificPopup({
      type: 'inline',
      fixedContentPos: false,
      callbacks: {
        open: function () {
          $('body').addClass('scroll-lock');
        },
        close: function () {
          $('body').removeClass('scroll-lock');
        },
      },
    });

    $('.popup__close-button').on('click', () => {
      $.magnificPopup.close();
    });

    const animateGravityItems = () => {
      const items = $('.gravity__item');

      if (!items.length) return;

      items.throwable({
        containment: [
          0,
          $('.gravity').offset().top,
          $('.gravity').offset().left + $('.gravity').outerWidth(),
          $('.gravity').offset().top + $('.gravity').outerHeight(),
        ],
        impulse: {
          f: 500,
          p: { x: 0, y: 0.5 },
        },
        gravity: { x: 0, y: 1 },
        shape: 'circle',
        drag: false,
        autostart: true,
        bounce: 0.5,
        damping: 1,
      });
    };

    (handleGravityAnimations = () => {
      if (window.innerWidth <= 1024) return;

      const section = document.getElementsByClassName('gravity')[0];
      const items = document.getElementsByClassName('gravity__items')[0];
      const content = document.getElementsByClassName('gravity__content')[0];

      if (section === undefined || items === undefined || content === undefined)
        return;

      let isStart = false;

      handleScrollObserver(section, () => {
        setTimeout(() => {
          items.style.marginTop = 'translateY(-170px)';
          content.style.transform = 'translateY(-505px)';

          var event = new MouseEvent('mousemove', {
            view: window,
            bubbles: true,
            cancelable: true,
            clientX: 0,
            clientY: 0,
          });

          section.dispatchEvent(event);
        }, 0);
      });

      const setAnimation = () => {
        if (isStart !== true) {
          animateGravityItems();
          isStart = true;
        }
      };

      section.addEventListener('mousemove', () => {
        setAnimation();
      });
      section.addEventListener('mousenter', () => {
        setAnimation();
      });
    })();
  });
});

// throttle event
const throttled = (delay, fn) => {
  let lastCall = 0;
  return (...args) => {
    const now = new Date().getTime();
    if (now - lastCall < delay) return;
    lastCall = now;
    return fn(...args);
  };
};

// handle scroll observer
const handleScrollObserver = (element, fn) => {
  const handleIntersection = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        fn();
      }
    });
  };

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
  };

  const observer = new IntersectionObserver(handleIntersection, options);
  observer.observe(element);
};

// set hero cells
// const setHeroCells = () => {
// 	const hero = document.getElementsByClassName('hero')[0];
// 	const container = document.getElementsByClassName('hero__cells')[0];

// 	if (hero === undefined || container === undefined) return;

// 	const standardCell = '<div class="hero__cell"></div>';
// 	const pool = [
// 		'<div class="hero__cell hero__cell--chessboard-black"></div>',
// 		'<div class="hero__cell hero__cell--chessboard-yellow-small"></div>',
// 		'<div class="hero__cell hero__cell--lines-horizontal-yellow"></div>',
// 		'<div class="hero__cell hero__cell--lines-vertical-yellow"></div>',
// 		'<div class="hero__cell hero__cell--lines-horizontal-black"></div>',
// 		'<div class="hero__cell hero__cell--lines-vertical-black"></div>',
// 		'<div class="hero__cell hero__cell--mix-black-yellow"></div>',
// 		'<div class="hero__cell hero__cell--two-cubes-black"></div>',
// 		'<div class="hero__cell hero__cell--two-cubes-yellow"></div>',
// 		'<div class="hero__cell hero__cell--two-cubes-orange"></div>',
// 		'<div class="hero__cell hero__cell--chessboard-orange"></div>',
// 		'<div class="hero__cell hero__cell--full-yellow"></div>',
// 		'<div class="hero__cell hero__cell--full-black"></div>',
// 		'<div class="hero__cell hero__cell--full-orange"></div>',
// 		'<div class="hero__cell hero__cell--invert hero__cell--chessboard-black"></div>',
// 		'<div class="hero__cell hero__cell--invert hero__cell--chessboard-yellow-small"></div>',
// 		'<div class="hero__cell hero__cell--invert hero__cell--lines-horizontal-yellow"></div>',
// 		'<div class="hero__cell hero__cell--invert hero__cell--lines-vertical-yellow"></div>',
// 		'<div class="hero__cell hero__cell--invert hero__cell--lines-horizontal-black"></div>',
// 		'<div class="hero__cell hero__cell--invert hero__cell--lines-vertical-black"></div>',
// 		'<div class="hero__cell hero__cell--invert hero__cell--mix-black-yellow"></div>',
// 		'<div class="hero__cell hero__cell--invert hero__cell--two-cubes-black"></div>',
// 		'<div class="hero__cell hero__cell--invert hero__cell--two-cubes-yellow"></div>',
// 		'<div class="hero__cell hero__cell--invert hero__cell--two-cubes-orange"></div>',
// 		'<div class="hero__cell hero__cell--invert hero__cell--chessboard-orange"></div>',
// 		'<div class="hero__cell hero__cell--invert hero__cell--full-yellow"></div>',
// 		'<div class="hero__cell hero__cell--invert hero__cell--full-black"></div>',
// 		'<div class="hero__cell hero__cell--invert hero__cell--full-orange"></div>',
// 	];

// 	const shuffle = (array) => {
// 		for (var i = array.length - 1; i > 0; i--) {
// 			var j = Math.floor(Math.random() * (i + 1));
// 			var temp = array[i];
// 			array[i] = array[j];
// 			array[j] = temp;
// 		}
// 	};

// 	const totalCells = ((hero.scrollHeight * 1.5) / 60) * ((hero.scrollWidth * 1.5) / 60);
// 	const cellsFromPool = Math.ceil(totalCells / 2);
// 	const poolIndices = Array.from({ length: totalCells }, (_, index) => index);
// 	shuffle(poolIndices);

// 	for (var i = 0; i < totalCells; i++) {
// 		const cell =
// 			poolIndices[i] < cellsFromPool
// 				? pool[Math.floor(Math.random() * pool.length)]
// 				: standardCell;
// 		container.insertAdjacentHTML('beforeend', cell);
// 	}
// };

// handle mobile menu
const handleMobileMenu = () => {
  const header = document.getElementsByClassName('header')[0];
  const toggleButton = document.getElementsByClassName('header__burger')[0];
  const menu = document.getElementsByClassName('header__menu')[0];

  if (header === undefined || toggleButton === undefined || menu === undefined)
    return;

  toggleButton.addEventListener('click', (event) => {
    event.preventDefault();
    document.body.classList.toggle('scroll-lock');
    header.classList.toggle('active');
    menu.classList.toggle('active');
  });
};

// handle mouse move orbit animation
const handleMousemoveOrbitAnimation = (itemSelector) => {
  const items = document.querySelectorAll(itemSelector);

  if (!items.length) return;

  [...items].forEach((item) => {
    const handleAnimation = (event) => {
      const shiftValue = item.getAttribute('data-anim-speed');
      const moveX = (event.clientX * shiftValue) / 250;
      const moveY = (event.clientY * shiftValue) / 250;
      const animation = gsap.to(item, {
        x: moveX,
        y: moveY,
        duration: 1,
      });

      if (window.innerWidth <= 640) {
        item.setAttribute('style', '');
        animation.pause();
        return;
      }
    };

    window.addEventListener('mousemove', throttled(100, handleAnimation));
  });
};

// handle typical-field
const handleTypicalField = () => {
  const fields = document.getElementsByClassName('typical-field');

  if (!fields.length) return;

  [...fields].forEach((field) => {
    const input = field.getElementsByClassName('typical-field__input')[0];

    if (input === undefined) return;

    if (input.value.length > 0 && input.value !== '') {
      field.classList.add('active');
    } else {
      field.classList.remove('active');
    }

    input.addEventListener('focus', () => {
      field.classList.add('active');
    });

    input.addEventListener('blur', () => {
      if (input.value === '' || input.value.length === 0) {
        field.classList.remove('active');
      }
    });
  });
};

// handle tabs
const handleTabs = (buttonSelector, tabSelector) => {
  const buttons = document.querySelectorAll(buttonSelector);
  const tabs = document.querySelectorAll(tabSelector);

  if (!buttons.length || !tabs.length) return;

  buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();

      tabs.forEach((tab) => tab.classList.remove('active'));
      buttons.forEach((button) => button.classList.remove('active'));

      tabs.forEach((tab) => {
        if (button.getAttribute('data-tab') === tab.getAttribute('data-tab')) {
          tab.classList.add('active');
          button.classList.add('active');
        }
      });
    });
  });
};

// handle thumb-carousel
const handleThumbCarousel = () => {
  const swiperNav = new Swiper('.swiper-nav', {
    spaceBetween: 5,
    freeMode: true,
    watchSlidesProgress: true,
    breakpoints: {
      320: {
        slidesPerView: 2.5,
      },
      640: {
        slidesPerView: 4,
      },
      1025: {
        slidesPerView: 3,
      },
      1441: {
        slidesPerView: 4,
      },
    },
  });

  const swiperMain = new Swiper('.swiper-main', {
    spaceBetween: 5,
    thumbs: {
      swiper: swiperNav,
    },
    breakpoints: {
      320: {
        autoHeight: true,
      },
      1025: {
        autoHeight: false,
      },
    },
  });
};

// handle dlcs__carousel
const handleDlcsCarousel = () => {
  const swiper = new Swiper('.dlcs__carousel .swiper', {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    spaceBetween: 20,
    breakpoints: {
      320: {
        slidesPerView: 2,
      },
      426: {
        slidesPerView: 3,
      },
      641: {
        slidesPerView: 4,
      },
      1025: {
        slidesPerView: 3,
      },
      1441: {
        slidesPerView: 4,
      },
    },
  });
};

// handle qty
// decrease function
const decrease = (input) => {
  let value = input.value;
  value--;
  return value;
};

// increase function
const increase = (input) => {
  let value = input.value;
  value++;
  return value;
};

const setValueForQtyInput = (input, value, maxValue) => {
  if (value === undefined || isNaN(value) === true || value <= 0) {
    input.value = 0;

    return;
  }

  if (value >= maxValue) {
    input.value = maxValue;
    return;
  }

  input.value = value;
};

const handleQty = () => {
  const items = document.getElementsByClassName('qty');

  if (!items.length) {
    return;
  }

  [...items].forEach((item) => {
    const maxValue = item.getAttribute('data-max-value');
    const decrementButton = item.querySelector('.qty__button--decrement');
    const incrementButton = item.querySelector('.qty__button--increment');
    const input = item.querySelector('.qty__input');

    if (
      decrementButton === null ||
      incrementButton === null ||
      input === null
    ) {
      return;
    }

    decrementButton.addEventListener('click', () => {
      if (maxValue === null || maxValue === '') {
        setValueForQtyInput(input, decrease(input));
      } else {
        setValueForQtyInput(input, decrease(input), maxValue);
      }
    });

    incrementButton.addEventListener('click', () => {
      if (maxValue === null || maxValue === '') {
        setValueForQtyInput(input, increase(input));
      } else {
        setValueForQtyInput(input, increase(input), maxValue);
      }
    });
  });
};

// handle cart-popup__delete-button
// const handleCartPopupDeleteButton = () => {
//   const items = document.getElementsByClassName('cart-popup__item');

//   if (!items.length) return;

//   [...items].forEach((item) => {
//     const deleteButton = item.getElementsByClassName(
//       'cart-popup__delete-button'
//     )[0];

//     if (deleteButton === undefined) return;

//     deleteButton.addEventListener('click', (event) => {
//       event.preventDefault();
//       item.remove();
//     });
//   });
// };

// Defer load for youtube embeds
const deferIframeLoad = () => {
  const iframes = document.getElementsByTagName('iframe');

  if (!iframes.length) return;

  setTimeout(() => {
    [...iframes].forEach((iframe) => {
      if (iframe.getAttribute('data-src')) {
        iframe.setAttribute('src', iframe.getAttribute('data-src'));
      }
    });
  }, 0);
};

// Handle simple scroll slider
const handleSimpleScrollSlider = (containerSelector) => {
  const scrollSlider = document.querySelector(containerSelector);

  if (scrollSlider === null) return;

  let isDown = false;
  let startX, scrollLeft;

  scrollSlider.addEventListener('mousedown', (event) => {
    isDown = true;
    startX = event.pageX - scrollSlider.offsetLeft;
    scrollLeft = scrollSlider.scrollLeft;
  });

  scrollSlider.addEventListener('mousemove', (event) => {
    event.preventDefault();

    if (!isDown) {
      return;
    }

    const x = event.pageX - scrollSlider.offsetLeft;
    const walk = x - startX;
    scrollSlider.scrollLeft = scrollLeft - walk;
  });

  scrollSlider.addEventListener('mouseup', () => {
    isDown = false;
  });

  scrollSlider.addEventListener('mouseleave', () => {
    isDown = false;
  });
};

// handle single tabs buttons
const handleSigleTabsButtons = () => {
  const header = document.getElementsByClassName('header')[0];
  const block = document.getElementsByClassName('product-content')[0];
  const buttons = document.getElementsByClassName('product-content__button');

  if (header === undefined || block === undefined || !buttons.length) return;

  [...buttons].forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      window.scrollTo({
        top:
          block.getBoundingClientRect().top +
          window.scrollY -
          header.offsetHeight,
        behavior: 'smooth',
      });
    });
  });
};

// handle delivery-and-payment form
const handleDeliveryAndPaymentFields = (
  formSelector,
  npPostId,
  npCourierId,
  selfPickupId,
  contentsSelector
) => {
  const form = document.querySelector(formSelector);
  const npPost = document.getElementById(npPostId);
  const npCourier = document.getElementById(npCourierId);
  const selfPickup = document.getElementById(selfPickupId);
  const contents = document.querySelectorAll(contentsSelector);

  if (
    form === null ||
    npPost === undefined ||
    npCourier === undefined ||
    selfPickup === undefined ||
    !contents.length
  )
    return;

  const setActive = (id) => {
    [...contents].forEach((content) => {
      if (content.id === id) {
        content.classList.add('active');
      }
    });
  };

  form.addEventListener('change', () => {
    [...contents].forEach((content) => content.classList.remove('active'));

    [npPost, npCourier, selfPickup].forEach((radio) => {
      if (radio.checked) {
        setActive(radio.id);
      }
    });
  });
};

const main = () => {
  handleMobileMenu();
  handleTypicalField();
  handleThumbCarousel();
  handleDlcsCarousel();
  handleQty();
  // handleCartPopupDeleteButton();
  deferIframeLoad();
  handleSigleTabsButtons();
  handleDeliveryAndPaymentFields(
    '.delivery-and-payment',
    'delivery_and_payment_post_np',
    'delivery_and_payment_courier_np',
    'delivery_and_payment_self_pickup',
    '.delivery-and-payment__radio-inputs'
  );
  handleDeliveryAndPaymentFields(
    '.checkout',
    'checkout_post_np',
    'checkout_courier_np',
    'checkout_self_pickup',
    '.checkout__radio-inputs'
  );
  handleSimpleScrollSlider('.product-content__nav');
  handleTabs('.auth__button[data-tab]', '.auth__tab[data-tab]');
  handleTabs(
    '.product-content__button[data-tab]',
    '.product-content__tab[data-tab]'
  );
  handleMousemoveOrbitAnimation('.banner__animate-item');
  handleMousemoveOrbitAnimation('.have-questions__animate-item');
};

window.onload = () => {
  main();
};
