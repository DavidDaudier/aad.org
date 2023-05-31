// (function(){

// 	'use strict'


// 	var siteMenuClone = function() {
// 		var jsCloneNavs = document.querySelectorAll('.js-clone-nav');
// 		var siteMobileMenuBody = document.querySelector('.site-mobile-menu-body');
		


// 		jsCloneNavs.forEach(nav => {
// 			var navCloned = nav.cloneNode(true);
// 			navCloned.setAttribute('class', 'site-nav-wrap');
// 			siteMobileMenuBody.appendChild(navCloned);
// 		});

// 		setTimeout(function(){

// 			var hasChildrens = document.querySelector('.site-mobile-menu').querySelectorAll(' .has-children');

// 			var counter = 0;
// 			hasChildrens.forEach( hasChild => {
				
// 				var refEl = hasChild.querySelector('a');

// 				var newElSpan = document.createElement('span');
// 				newElSpan.setAttribute('class', 'arrow-collapse collapsed');

// 				// prepend equivalent to jquery
// 				hasChild.insertBefore(newElSpan, refEl);

// 				var arrowCollapse = hasChild.querySelector('.arrow-collapse');
// 				arrowCollapse.setAttribute('data-bs-toggle', 'collapse');
// 				arrowCollapse.setAttribute('data-bs-target', '#collapseItem' + counter);

// 				var dropdown = hasChild.querySelector('.dropdown');
// 				dropdown.setAttribute('class', 'collapse');
// 				dropdown.setAttribute('id', 'collapseItem' + counter);

// 				counter++;
// 			});

// 		}, 1000);


// 		// Click js-menu-toggle

// 		var menuToggle = document.querySelectorAll(".js-menu-toggle");
// 		var mTog;
// 		menuToggle.forEach(mtoggle => {
// 			mTog = mtoggle;
// 			mtoggle.addEventListener("click", (e) => {
// 				if ( document.body.classList.contains('offcanvas-menu') ) {
// 					document.body.classList.remove('offcanvas-menu');
// 					mtoggle.classList.remove('active');
// 					mTog.classList.remove('active');
// 				} else {
// 					document.body.classList.add('offcanvas-menu');
// 					mtoggle.classList.add('active');
// 					mTog.classList.add('active');
// 				}
// 			});
// 		})



// 		var specifiedElement = document.querySelector(".site-mobile-menu");
// 		var mt, mtoggleTemp;
// 		document.addEventListener('click', function(event) {
// 			var isClickInside = specifiedElement.contains(event.target);
// 			menuToggle.forEach(mtoggle => {
// 				mtoggleTemp = mtoggle
// 				mt = mtoggle.contains(event.target);
// 			})

// 			if (!isClickInside && !mt) {
// 				if ( document.body.classList.contains('offcanvas-menu') ) {
// 					document.body.classList.remove('offcanvas-menu');
// 					mtoggleTemp.classList.remove('active');
// 				}
// 			}

// 		});

// 	}; 
// 	siteMenuClone();


// })()


var navbarInit = function navbarInit() {
	var Selector = {
	  NAVBAR: '[data-navbar-on-scroll]',
	  NAVBAR_COLLAPSE: '.navbar-collapse',
	  NAVBAR_TOGGLER: '.navbar-toggler'
	};
	var ClassNames = {
	  COLLAPSED: 'collapsed'
	};
	var Events = {
	  SCROLL: 'scroll',
	  SHOW_BS_COLLAPSE: 'show.bs.collapse',
	  HIDE_BS_COLLAPSE: 'hide.bs.collapse',
	  HIDDEN_BS_COLLAPSE: 'hidden.bs.collapse'
	};
	var DataKey = {
	  NAVBAR_ON_SCROLL: 'navbar-light-on-scroll'
	};
	var navbar = document.querySelector(Selector.NAVBAR); // responsive nav collapsed
  
	navbar.addEventListener('click', function (e) {
	  if (e.target.classList.contains('nav-link') && window.innerWidth < utils.getBreakpoint(navbar)) {
		navbar.querySelector(Selector.NAVBAR_TOGGLER).click();
	  }
	});
  
	if (navbar) {
	  var windowHeight = window.innerHeight;
	  var html = document.documentElement;
	  var navbarCollapse = navbar.querySelector(Selector.NAVBAR_COLLAPSE);
  
	  var allColors = _objectSpread(_objectSpread({}, utils.colors), utils.grays);
  
	  var name = utils.getData(navbar, DataKey.NAVBAR_ON_SCROLL);
	  var colorName = Object.keys(allColors).includes(name) ? name : 'light';
	  var color = allColors[colorName];
	  var bgClassName = "bg-".concat(colorName);
	  var shadowName = 'shadow-transition';
	  var colorRgb = utils.hexToRgb(color);
  
	  var _window$getComputedSt = window.getComputedStyle(navbar),
		  backgroundImage = _window$getComputedSt.backgroundImage;
  
	  var transition = 'background-color 0.35s ease';
	  navbar.style.backgroundImage = 'none'; // Change navbar background color on scroll
  
	  window.addEventListener(Events.SCROLL, function () {
		var scrollTop = html.scrollTop;
		var alpha = scrollTop / windowHeight * 0.35; // Add class on scroll
  
		navbar.classList.add('backdrop');
  
		if (alpha === 0) {
		  navbar.classList.remove('backdrop');
		}
  
		alpha >= 1 && (alpha = 1);
		navbar.style.backgroundColor = "rgba(".concat(colorRgb[0], ", ").concat(colorRgb[1], ", ").concat(colorRgb[2], ", ").concat(alpha, ")");
		navbar.style.backgroundImage = alpha > 0 || utils.hasClass(navbarCollapse, 'show') ? backgroundImage : 'none';
		alpha > 0 || utils.hasClass(navbarCollapse, 'show') ? navbar.classList.add(shadowName) : navbar.classList.remove(shadowName);
	  }); // Toggle bg class on window resize
  
	  utils.resize(function () {
		var breakPoint = utils.getBreakpoint(navbar);
  
		if (window.innerWidth > breakPoint) {
		  navbar.style.backgroundImage = html.scrollTop ? backgroundImage : 'none';
		  navbar.style.transition = 'none';
		} else if (!utils.hasClass(navbar.querySelector(Selector.NAVBAR_TOGGLER), ClassNames.COLLAPSED)) {
		  navbar.classList.add(bgClassName);
		  navbar.classList.add(shadowName);
		  navbar.style.backgroundImage = backgroundImage;
		}
  
		if (window.innerWidth <= breakPoint) {
		  navbar.style.transition = utils.hasClass(navbarCollapse, 'show') ? transition : 'none';
		}
	  });
	  navbarCollapse.addEventListener(Events.SHOW_BS_COLLAPSE, function () {
		navbar.classList.add(bgClassName);
		navbar.classList.add(shadowName);
		navbar.style.backgroundImage = backgroundImage;
		navbar.style.transition = transition;
	  });
	  navbarCollapse.addEventListener(Events.HIDE_BS_COLLAPSE, function () {
		navbar.classList.remove(bgClassName);
		navbar.classList.remove(shadowName);
		!html.scrollTop && (navbar.style.backgroundImage = 'none');
	  });
	  navbarCollapse.addEventListener(Events.HIDDEN_BS_COLLAPSE, function () {
		navbar.style.transition = 'none';
	  });
	}
  };
  /* -------------------------------------------------------------------------- */