console.log("ESTOU AQUI");
var urlsend = "https://js0ngfd102.execute-api.eu-west-1.amazonaws.com/beta";

var lb9lang = $('meta[name=lb9lang]').attr("content");

var $slides = void 0,
    interval = void 0,
    $selectors = void 0,
    $btns = void 0,
    currentIndex = void 0,
    nextIndex = void 0;



var cycle = function cycle(index) {
	var $currentSlide = void 0,
	    $nextSlide = void 0,
	    $currentSelector = void 0,
	    $nextSelector = void 0;

	nextIndex = index !== undefined ? index : nextIndex;

	$currentSlide = $($slides.get(currentIndex));
	$currentSelector = $($selectors.get(currentIndex));

	$nextSlide = $($slides.get(nextIndex));
	$nextSelector = $($selectors.get(nextIndex));

	$currentSlide.removeClass("active").css("z-index", "0");

	$nextSlide.addClass("active").css("z-index", "1");

	$currentSelector.removeClass("current");
	$nextSelector.addClass("current");

	currentIndex = index !== undefined ? nextIndex : currentIndex < $slides.length - 1 ? currentIndex + 1 : 0;

	nextIndex = currentIndex + 1 < $slides.length ? currentIndex + 1 : 0;
};

$(function () {
	currentIndex = 0;
	nextIndex = 1;

	$slides = $(".slide");
	$selectors = $(".selector");
	$btns = $(".btn");

	$slides.first().addClass("active");
	$selectors.first().addClass("current");



	$selectors.on("click", function (e) {
		var target = $selectors.index(e.target);
		if (target !== currentIndex) {
			window.clearInterval(interval);
			cycle(target);
			interval = window.setInterval(cycle, 4000);
		}
	});

	$btns.on("click", function (e) {
		window.clearInterval(interval);
		if ($(e.target).hasClass("prev")) {
			var target = currentIndex > 0 ? currentIndex - 1 : $slides.length - 1;
			cycle(target);
		} else if ($(e.target).hasClass("next")) {
			cycle();
		}
		interval = window.setInterval(cycle, 4000);
	});
});


// hide nav
// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('.logo').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();

    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('.logo').removeClass('nav-down').addClass('nav-up');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('.logo').removeClass('nav-up').addClass('nav-down');
        }
    }

    lastScrollTop = st;
}

// hide nav
$(window).resize(function(event) {
  resizevid();
  // alert("Hello!");
});

var resizevid = function(){
  $(".leftvid").css("margin-left", 1-($('.leftvid').width()/2));
  $(".rightvid").css("margin-right", 1-($('.rightvid').width()/2));

}
var vid = document.getElementById("vid1");
vid.oncanplay = function() {
resizevid();
};
// var vid = document.getElementById("vid2");
// vid.oncanplay = function() {
// resizevid();
// };


function openNav() {
    document.getElementById("myNav").style.width = "100%";
      $(".aboutUs").fadeIn();
}

function closeNav() {
    document.getElementById("myNav").style.width = "0%";
      $(".aboutUs").fadeOut("fast");
}

function openFill() {
    document.getElementById("fill").style.width = "100%";
    $(".brevemente").fadeIn();
    $("body").css("height", $("#fill").height());
    $("body").css("position", "fixed");
    console.log($("#abcd").width());
    setTimeout(function(){
      if($(window).width() < 767){
         $(".teamName").css("padding-left",10);
         $(".membros, .membros2, .membros3, .membros4").css("padding-left", 10);
         $(".email, .email2, .email3, .email4").css("padding-left",10 );
         $(".telem, .telem2, .telem3, .telem4").css("padding-left", 10 );
         $(".dataNascimento, .dataNascimento2, .dataNascimento3, .dataNascimento4").css("padding-left", 10 );
         $(".responsa").css("padding-left", 10 );
         $(".responsamail").css("padding-left", 10 );
         $(".datapre, .horapre").css("padding-left", 10 );
     }else{
        $(".teamName").css("padding-left", $(".bosta").width()+ 40 );
        $(".membros, .membros2, .membros3, .membros4").css("padding-left", $(".member").width()+ 40 );
        $(".email, .email2, .email3, .email4").css("padding-left", $(".mail").width()+ 40 );
        $(".telem, .telem2, .telem3, .telem4").css("padding-left", $(".phone").width()+ 40 );
        $(".dataNascimento, .dataNascimento2, .dataNascimento3, .dataNascimento4").css("padding-left", $(".born").width()+ 40 );
        $(".responsa").css("padding-left", $(".master").width()+ 40 );
        $(".responsamail").css("padding-left", $(".masteremail").width()+ 40 );
        $(".datapre, .horapre").css("padding-left", $(".pres").width()+ 40 );


  }  },700);



}

function closeFill() {
    document.getElementById("fill").style.width = "0%";
    $(".brevemente").fadeOut("fast");
    $("body").css("height","auto");
    $("body").css("position", "relative");
}







      (function (root, factory) {
        if (typeof define === 'function' && define.amd) {
          // AMD. Register as an anonymous module.
          define([], factory);
        } else if (typeof module === 'object' && module.exports) {
          // Node. Does not work with strict CommonJS, but
          // only CommonJS-like environments that support module.exports,
          // like Node.
          module.exports = factory();
        } else {
          // Browser globals (root is window)
          root.Rellax = factory();
        }
      }(this, function () {
        var Rellax = function(el, options){
          "use strict";

          var self = Object.create(Rellax.prototype);

          var posY = 0;
          var screenY = 0;
          var posX = 0;
          var screenX = 0;
          var blocks = [];
          var pause = true;

          // check what requestAnimationFrame to use, and if
          // it's not supported, use the onscroll event
          var loop = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            function(callback){ setTimeout(callback, 1000 / 60); };

          // check which transform property to use
          var transformProp = window.transformProp || (function(){
              var testEl = document.createElement('div');
              if (testEl.style.transform === null) {
                var vendors = ['Webkit', 'Moz', 'ms'];
                for (var vendor in vendors) {
                  if (testEl.style[ vendors[vendor] + 'Transform' ] !== undefined) {
                    return vendors[vendor] + 'Transform';
                  }
                }
              }
              return 'transform';
            })();

          // Default Settings
          self.options = {
            speed: -2,
            center: false,
            wrapper: null,
            round: true,
            vertical: true,
            horizontal: false,
            callback: function() {},
          };

          // User defined options (might have more in the future)
          if (options){
            Object.keys(options).forEach(function(key){
              self.options[key] = options[key];
            });
          }

          // By default, rellax class
          if (!el) {
            el = '.rellax';
          }

          // check if el is a className or a node
          var elements = typeof el === 'string' ? document.querySelectorAll(el) : [el];

          // Now query selector
          if (elements.length > 0) {
            self.elems = elements;
          }

          // The elements don't exist
          else {
            throw new Error("The elements you're trying to select don't exist.");
          }

          // Has a wrapper and it exists
          if (self.options.wrapper) {
            if (!self.options.wrapper.nodeType) {
              var wrapper = document.querySelector(self.options.wrapper);

              if (wrapper) {
                self.options.wrapper = wrapper;
              } else {
                throw new Error("The wrapper you're trying to use don't exist.");
              }
            }
          }


          // Get and cache initial position of all elements
          var cacheBlocks = function() {
            for (var i = 0; i < self.elems.length; i++){
              var block = createBlock(self.elems[i]);
              blocks.push(block);
            }
          };


          // Let's kick this script off
          // Build array for cached element values
          var init = function() {
            for (var i = 0; i < blocks.length; i++){
              self.elems[i].style.cssText = blocks[i].style;
            }

            blocks = [];

            screenY = window.innerHeight;
            screenX = window.innerWidth;
            setPosition();

            cacheBlocks();

            // If paused, unpause and set listener for window resizing events
            if (pause) {
              window.addEventListener('resize', init);
              pause = false;
            }
            animate();
          };

          // We want to cache the parallax blocks'
          // values: base, top, height, speed
          // el: is dom object, return: el cache values
          var createBlock = function(el) {
            var dataPercentage = el.getAttribute( 'data-rellax-percentage' );
            var dataSpeed = el.getAttribute( 'data-rellax-speed' );
            var dataZindex = el.getAttribute( 'data-rellax-zindex' ) || 0;

            // initializing at scrollY = 0 (top of browser), scrollX = 0 (left of browser)
            // ensures elements are positioned based on HTML layout.
            //
            // If the element has the percentage attribute, the posY and posX needs to be
            // the current scroll position's value, so that the elements are still positioned based on HTML layout
            var wrapperPosY = self.options.wrapper ? self.options.wrapper.scrollTop : (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop);
            var posY = self.options.vertical ? ( dataPercentage || self.options.center ? wrapperPosY : 0 ) : 0;
            var posX = self.options.horizontal ? ( dataPercentage || self.options.center ? (window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft) : 0 ) : 0;

            var blockTop = posY + el.getBoundingClientRect().top;
            var blockHeight = el.clientHeight || el.offsetHeight || el.scrollHeight;

            var blockLeft = posX + el.getBoundingClientRect().left;
            var blockWidth = el.clientWidth || el.offsetWidth || el.scrollWidth;

            // apparently parallax equation everyone uses
            var percentageY = dataPercentage ? dataPercentage : (posY - blockTop + screenY) / (blockHeight + screenY);
            var percentageX = dataPercentage ? dataPercentage : (posX - blockLeft + screenX) / (blockWidth + screenX);
            if(self.options.center){ percentageX = 0.5; percentageY = 0.5; }

            // Optional individual block speed as data attr, otherwise global speed
            var speed = dataSpeed ? dataSpeed : self.options.speed;

            var bases = updatePosition(percentageX, percentageY, speed);

            // ~~Store non-translate3d transforms~~
            // Store inline styles and extract transforms
            var style = el.style.cssText;
            var transform = '';

            // Check if there's an inline styled transform
            if (style.indexOf('transform') >= 0) {
              // Get the index of the transform
              var index = style.indexOf('transform');

              // Trim the style to the transform point and get the following semi-colon index
              var trimmedStyle = style.slice(index);
              var delimiter = trimmedStyle.indexOf(';');

              // Remove "transform" string and save the attribute
              if (delimiter) {
                transform = " " + trimmedStyle.slice(11, delimiter).replace(/\s/g,'');
              } else {
                transform = " " + trimmedStyle.slice(11).replace(/\s/g,'');
              }
            }

            return {
              baseX: bases.x,
              baseY: bases.y,
              top: blockTop,
              left: blockLeft,
              height: blockHeight,
              width: blockWidth,
              speed: speed,
              style: style,
              transform: transform,
              zindex: dataZindex
            };
          };

          // set scroll position (posY, posX)
          // side effect method is not ideal, but okay for now
          // returns true if the scroll changed, false if nothing happened
          var setPosition = function() {
            var oldY = posY;
            var oldX = posX;

            posY = self.options.wrapper ? self.options.wrapper.scrollTop : (document.documentElement || document.body.parentNode || document.body).scrollTop || window.pageYOffset;
            posX = self.options.wrapper ? self.options.wrapper.scrollLeft : (document.documentElement || document.body.parentNode || document.body).scrollLeft || window.pageXOffset;


            if (oldY != posY && self.options.vertical) {
              // scroll changed, return true
              return true;
            }

            if (oldX != posX && self.options.horizontal) {
              // scroll changed, return true
              return true;
            }

            // scroll did not change
            return false;
          };

          // Ahh a pure function, gets new transform value
          // based on scrollPosition and speed
          // Allow for decimal pixel values
          var updatePosition = function(percentageX, percentageY, speed) {
            var result = {};
            var valueX = (speed * (100 * (1 - percentageX)));
            var valueY = (speed * (100 * (1 - percentageY)));

            result.x = self.options.round ? Math.round(valueX) : Math.round(valueX * 100) / 100;
            result.y = self.options.round ? Math.round(valueY) : Math.round(valueY * 100) / 100;

            return result;
          };

          // Loop
          var update = function() {
            if (setPosition() && pause === false) {
              animate();
            }

            // loop again
            loop(update);
          };

          // Transform3d on parallax element
          var animate = function() {
            var positions;
            for (var i = 0; i < self.elems.length; i++){
              var percentageY = ((posY - blocks[i].top + screenY) / (blocks[i].height + screenY));
              var percentageX = ((posX - blocks[i].left + screenX) / (blocks[i].width + screenX));

              // Subtracting initialize value, so element stays in same spot as HTML
              positions = updatePosition(percentageX, percentageY, blocks[i].speed);// - blocks[i].baseX;
              var positionY = positions.y - blocks[i].baseY;
              var positionX = positions.x - blocks[i].baseX;

              var zindex = blocks[i].zindex;

              // Move that element
              // (Set the new translation and append initial inline transforms.)
              var translate = 'translate3d(' + (self.options.horizontal ? positionX : '0') + 'px,' + (self.options.vertical ? positionY : '0') + 'px,' + zindex + 'px) ' + blocks[i].transform;
              self.elems[i].style[transformProp] = translate;
            }
            self.options.callback(positions);
          };

          self.destroy = function() {
            for (var i = 0; i < self.elems.length; i++){
              self.elems[i].style.cssText = blocks[i].style;
            }

            // Remove resize event listener if not pause, and pause
            if (!pause) {
              window.removeEventListener('resize', init);
              pause = true;
            }
          };

          // Init
          init();

          // Start the loop
          update();

          // Allow to recalculate the initial values whenever we want
          self.refresh = init;

          return self;
        };
        return Rellax;
      }));

      $( ".versoes" ).hover(
        function() {
          $('.themes').fadeIn() ;
        }, function() {
          $('.themes').fadeOut() ;
        }
      );
      $( ".unavailable" ).hover(
        function() {
          $('.nextthemes').fadeIn() ;
        }, function() {
          $('.nextthemes').fadeOut() ;
        }
      );



function avançar(){
  document.getElementById("endfooter").style.display = "block";
  document.getElementById("explicaçao").style.display = "block";
  document.getElementById("massive-wrapper").style.display = "block";
  document.getElementById("firstscreen").style.display = "none";
  document.getElementById("posso-participar").style.display = "block";
  document.getElementById("melhores-tempos").style.display = "block";
  document.getElementById("bttm").style.display = "block";
  // document.getElementById("all-escape-rooms").style.display = "block";
  resizevid();
  interval = window.setInterval(cycle, 4000);

}

$(document).ready(function(){
	$('.fade').fadeIn(1500);
});

$('.submit').click(function(event) {

  if(!$(this).hasClass("processing")){
    mandaform();
  }

});

var mandaform = function(things){
  $('.submit').addClass("processing");
  var agarratudo = {};
  $('.onegroup').each(function(index, el) {
    var grupo = {};
    $(el).find('.dainputs').each(function(indexy, ely) {

      grupo[$(ely).attr("class").split(" ")[0]] = $(ely).val();
    });
    agarratudo["membro"+(parseInt(index)+1)] = grupo;
  });
  agarratudo["teamName"] = $('.teamName').val();
  agarratudo["responsavel"] = $('.responsa').val();
  agarratudo["responsavelmail"] = $('.responsamail').val();
  agarratudo["hora"] = $('.horapre').val();
  agarratudo["data"] = $('.datapre').val();
  console.log(agarratudo);

        var doit = true;
        var obj = {};
        $('.obrigatorio').removeClass("invalid");
        $('.obrigatorio').each(function(index, element){
          console.log($(element), $(element).val());
          if(!$(element).val()){

            doit = false;
            $(element).addClass('invalid');
            $(element).parent().velocity("callout.shake");
            console.log("NAO TEM COISAS!");
          }else if($(element).val() == "" || $(element).val() == " " || $(element).val() == "  " || $(element).val() == "   "){
            doit = false;
            $(element).addClass('invalid');
            $(element).parent().velocity("callout.shake");
            console.log("NAO TEM COISAS!");
          }
        });

        var dafinalhtml = "<p><strong>NOME DA EQUIPA</strong> "+agarratudo.teamName+"</p>" +
        "<p><strong>NOME DO RESPONSÁVEL</strong> "+agarratudo.responsavel+"</p>" +
        "<p><strong>MAIL DO RESPONSÁVEL</strong> "+agarratudo.responsavelmail+"</p>" +
        "<p><strong>DATA</strong> "+agarratudo.data+"</p>" +
        "<p><strong>HORA</strong> "+agarratudo.hora+"</p>";

        _.each(agarratudo, function(value, key){
          console.log(agarratudo);
          if(_.includes(key, "membro")){
            dafinalhtml += "<br><br><p><strong>"+_.upperCase(key)+"</strong></p><br>";

            _.each(value, function(valuein, keyin){

              dafinalhtml += "<p><strong>"+keyin+"</strong> "+valuein+"</p>";

            });
          }



        });

        console.log(dafinalhtml, "O HTML FINAL DASS!");

        obj['reservation'] = "none";
        obj['site'] = 'escaperoom';
        obj['anythingiwant'] = 'escaperoom';
        obj["main"] = {"damessage": "<div><p>NOVA INSCRIÇÃO EFETUADA NO WEBSITE. FAVOR PROCESSAR OS DADOS E CONFIRMAR A HORA E DATA PRETENDIDA.</p><p>" + dafinalhtml + "</p></div>"};
        obj["client"] = {"datofield": agarratudo.responsavelmail, "damessage" : "<div><p>Muito obrigado pela sua inscrição. Receberá um e-mail com a confirmação da hora e data pretendida com a maior brevidade possível. Abaixo poderá ver os dados que constam da sua inscrição.</p><br><p>" + dafinalhtml + "</p></div>"};



        //var doit = false;//comentar depois
        console.log("enviar??");
        if(doit){
          $('.submit').addClass("processar");
          if(lb9lang=="PT"){
              $('.submit').find("label").html("ENVIANDO...");

          }else{
              $('.submit').find("label").html("SENDING...");
          }
          $.ajax({
                url: urlsend + "/mailgun",
                type: 'POST',
                crossDomain: true,
                data: JSON.stringify(obj),
                success: function(data){
                  $('.submit').removeClass("processing");
                  if(lb9lang=="PT"){
                    $('.submit').find("label").html("ENVIADO");
                    $('.forms').html("<div class='grandecena'><h3>OBRIGADO PELA SUA INSCRIÇÃO!</h3><h5>SERÁ CONTACTADO POR E-MAIL BREVEMENTE PARA CONFIRMAR A INSCRIÇÃO</h5></div>");

                    window.setTimeout(function(){
                      window.location.reload();
                    }, 5000);
                  }

                  console.log("O GAJO ENVIOU ESTA MERDA");
                },
                error: function(){
                  $('.submit').removeClass("processing");
                  if(lb9lang=="PT"){
                    $('.submit').find("label").html("ERRO");
                  }
                  console.log("nao enviou nada...");
                }
          });//.ajax end
        }//doit END





} // function end
