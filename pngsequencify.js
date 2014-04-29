/*!
 * jQuery PNG Sequencify Plug in v0.0.1
 *
 * 2014 Twist Image
 * www.twistimage.com
 * Author: Ryan Krochko
*/
(function ($) {
    $.fn.pngsequencify = function(options) {
    	var _this = this;
    	var imageArray = [];
    	var animationNum = 1;
    	var ext = '.' + this.attr('src').split('.').pop();
		var settings = $.extend({
			slides: 1,
			speed: 100,
			imagePath: '/',
			imgSeqName: 'image-sequencer-'
		}, options);
		window.requestTimeout = function(fn, delay) {
			if( !window.requestAnimationFrame       &&
				!window.webkitRequestAnimationFrame &&
				!window.mozRequestAnimationFrame    &&
				!window.oRequestAnimationFrame      &&
				!window.msRequestAnimationFrame)
					return window.setTimeout(fn, delay);
			var start = new Date().getTime(),
				handle = new Object();
			function loop(){
				var current = new Date().getTime(),
				delta = current - start;
				delta >= delay ? fn.call() : handle.value = requestAnimFrame(loop);
			};
			handle.value = requestAnimFrame(loop);
			return handle;
		};
		var runAnimation = function(pngArray) {
			requestTimeout(function() {
				if(animationNum >= (settings.slides - 1)) {
					return false;
				} else {
					animationNum++;
				}
				$('.anim-seq img').attr('src', pngArray[animationNum].src);
				runAnimation(pngArray);
			}, settings.speed);
		}
		var preloader = function() {
			var folder = settings.imagePath;
			var imgSeqName = settings.imgSeqName;
			var fileExt = ext;
			var j;
			if (document.images) {
				for(var i=0;i<settings.slides;i++) {
					imageArray[i] = new Image();
					if(i < 10) {
						j = "0" + i;
					} else {
						j = i;
					}
					imageArray[i].src = folder + imgSeqName + j + fileExt;
				}
				_this.attr('src', imageArray[0].src);
				runAnimation(imageArray);
			}
		}
		var addLoadEvent = function(func) {
			var oldonload = window.onload;
			if (typeof window.onload != 'function') {
				window.onload = func;
			} else {
				window.onload = function() {
					if (oldonload) {
						oldonload();
					}
					func();
				}
			}
		};
		addLoadEvent(preloader);	
	}
}(jQuery));