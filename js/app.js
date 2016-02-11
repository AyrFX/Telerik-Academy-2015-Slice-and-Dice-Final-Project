(function setColorPickers() {
  $('#colorpickerHolder2').ColorPicker({
    flat: true,
    onChange: function (hsb, hex, rgb) {
      $('body').css('backgroundColor', '#' + hex);
      showReset();
    }
  });
  $('#colorpickerHolder1').ColorPicker({
    flat: true,
    onSubmit: function (hsb, hex, rgb) {
      $('body').css('color', '#' + hex);
      showReset();
    }
  });
  $('#colorpickerHolder3').ColorPicker({
    flat: true,
    onSubmit: function (hsb, hex, rgb) {
      $('h3, h4').css('color', '#' + hex);
      showReset();
    }
  });
})();

(function setEvents() {
  $('.cp-icons-wrapper').on('mouseenter', 'div, a', openPanel);

  $('.textures-icons-wrapper').on('click', 'div', changeBodyTexture);

  $('body').on('click', closePanelOnClick);

  $('.reset').on('click', resetSettings);

  $('#newTexture').on('change', selectBodyTexture);

  $('#trigger').on('click', openMainPanel);

  $('.article div').on({
    mouseenter: hoverArticle,
    mouseleave: leaveArticle
  }, 'a');

  $('.mm-thumb, .mm-thumb-last').on({
    mouseenter: hoverMediaIcon,
    mouseleave: leaveMediaIcon
  }, 'a');

  $('.mm-control').on('click', '> a', changeMmSlide);

  $('.slides-nav-arrows').on('click', 'li', changeSlide);

  $('.slides-nav').on('click', 'li', changeSlideFromNav);

  $('.small-menu').on('click', toggleSmallMenu);
}());

(function carousel() {
  setInterval(function () {
    $('.slide-next-btn').trigger('click');
  }, 10000);
}());



function openMainPanel() {
  if ($('.main').offset().left < 0) {
    $('.main')
      .show()
      .css({
        left: $(this).left,
      })
      .animate({
        left: 0
      }, 500);
    $('#trigger div')
      .css('background-image', 'url(images/trigger-close-sign.png)');
  } else {
    $('.main')
      .show()
      .css({
        left: $(this).left,
      })
      .animate({
        left: -39
      }, 500);
    $('#trigger div')
      .css('background-image', 'url(images/trigger-open-sign.png)');
  }
}

function openPanel(e) {
  if ($('.main').offset().left < 0) {
    return;
  }
  if ($('.active').length > 0) {
    return;
  }

  var $target, $bind;
  if ((e.target.id == "bg-color-icon") || (e.target.parentNode.id == 'bg-color-icon')) {
    $target = $('.bg-colors-panel');
    $bind = $('#bg-color-bind');
  } else if ((e.target.id == "bg-texture-icon") || (e.target.parentNode.id == 'bg-texture-icon')) {
    $target = $('.bg-textures-panel');
    $bind = $('#bg-texture-bind');
  } else if ((e.target.id == "bg-texture-text-icon") || (e.target.parentNode.id == 'bg-texture-text-icon')) {
    $target = $('.bg-textures-text-panel');
    $bind = $('#bg-texture-text-bind');
    $('#newTexture option:selected').removeAttr('selected');
  } else if ((e.target.id == "cp-body-font-color-icon") || (e.target.parentNode.id == 'cp-body-font-color-icon')) {
    $target = $('.body-font-color-panel');
    $bind = $('#body-font-color-bind');
  } else if ((e.target.id == "cp-header-font-color-icon") || (e.target.parentNode.id == 'cp-header-font-color-icon')) {
    $target = $('.header-font-color-panel');
    $bind = $('#header-font-color-bind');
  } else {
    return;
  }

  closeActivePanel();

  if (!$target.hasClass('active')) {
    $target.show().css({
        left: $(this).left
      })
      .animate({
        left: 50
      }, 500)
      .addClass('active');
    $bind
      .delay(400)
      .addClass('bind-active')
      .fadeTo(400, 1);
  }
}

function closePanelOnClick(e) {
  var $target = $('.active');

  if ($target.length <= 0) {
    return;
  }

  var targetX1 = $target.offset().left * 1,
    targetX2 = targetX1 + ($target.outerWidth()) * 1,
    targetY1 = $target.offset().top * 1 /* - $(document).scrollTop()*/ ,
    targetY2 = targetY1 + ($target.outerHeight()) * 1,
    mouseX = e.pageX,
    mouseY = e.pageY;
  if ((targetX1 > mouseX) || (mouseX > targetX2) || (targetY1 > mouseY) || (mouseY > targetY2)) {
    closeActivePanel();
  }

  $target = $('.cp-icons-wrapper');
  targetX1 = $target.offset().left * 1;
  targetX2 = targetX1 + ($target.outerWidth()) * 1;
  targetY1 = $target.offset().top * 1;
  targetY2 = targetY1 + ($target.outerHeight());
  if ((targetX1 <= mouseX) && (mouseX <= targetX2) && (targetY1 <= mouseY) && (mouseY <= targetY2)) {
    $(e.target).trigger('mouseenter');
  }
}

function closeActivePanel() {
  $('.bind-active')
    .fadeTo(200, 0)
    .removeClass('bind-active');
  var $target = $('.active')
    .css({
      left: $(this).left
    })
    .animate({
      left: -400
    }, 500)
    .removeClass('active');
}

function changeBodyTexture(e) {
  $('body').css('background-image', 'url(images/textures/' + e.target.id + '.png)');
  showReset();
}

function showReset() {
  $('.reset').fadeTo(200, 100);
}

function resetSettings() {
  $('body').css({
    "background-color": "",
    "background-image": "",
    "color": "#929292"
  });
  $('h3, h4').css({
    "color": "#808080"
  });
  $('.reset').fadeTo(200, 0);
}

function selectBodyTexture() {
  var selected = $('#newTexture option:selected').val();

  $('body').css('background-image', 'url(images/textures/texture-' + selected + '.png)');
  showReset();

  selected = '#texture-current-' + selected;
  $(selected).prop('selected', 'selected');
}

function hoverArticle(e) {
  $(e.target).fadeTo(200, 0.8);
  $(e.target.nextElementSibling).fadeTo(200, 1);
}

function leaveArticle(e) {
  $(e.target).fadeTo(200, 1);
  $(e.target.nextElementSibling).fadeTo(200, 0);
}

function hoverMediaIcon(e) {
  $(e.target).fadeTo(200, 0.8);
  $(e.target.nextElementSibling).fadeTo(200, 1);
  var description = $($(e.target).parent()).parent().children('div');
  $(description).fadeTo(200, 1).css('display', 'block');
}

function leaveMediaIcon(e) {
  $(e.target).fadeTo(200, 1);
  $(e.target.nextElementSibling).fadeTo(200, 0);
  var description = $($(e.target).parent()).parent().children('div');
  $(description).fadeTo(200, 0).css('display', 'none');
}

function changeMmSlide(e) {
  e.preventDefault();
  var left = $(e.target).hasClass('mm-left-arrow'),
    slidesCount = $('#mm-slides').children('div').length,
    i,
    activeSlideNumber,
    prevSlideNumber,
    nextSlideNumber;
  for (i = 0; i < slidesCount; i += 1) {
    activeSlideNumber = $('#mm-slides').children('div')[i];
    if ($(activeSlideNumber).hasClass('mm-slide-active')) {
      activeSlideNumber = i;
      break;
    }
  }

  if (activeSlideNumber !== 0) {
    prevSlideNumber = activeSlideNumber - 1;
  } else {
    prevSlideNumber = slidesCount - 1;
  }

  if (activeSlideNumber !== slidesCount - 1) {
    nextSlideNumber = activeSlideNumber + 1;
  } else {
    nextSlideNumber = 0;
  }

  $($('#mm-slides').children('div')[activeSlideNumber])
    .fadeTo(200, 0).css('display', 'none')
    .removeClass('mm-slide-active');
  if (left) {
    $($('#mm-slides').children('div')[prevSlideNumber])
      .fadeTo(200, 1)
      .css('display', 'flex')
      .addClass('mm-slide-active');
  } else {
    $($('#mm-slides').children('div')[nextSlideNumber])
      .fadeTo(200, 1)
      .css('display', 'flex')
      .addClass('mm-slide-active');
  }
}

function changeSlide(e) {
  var slides = $('.slides').children('li'),
    slidesCount = slides.length,
    i,
    activeSlide,
    prev,
    next,
    slidesNav = $('.slides-nav').children('li');

  for (i = 0; i < slidesCount; i += 1) {
    if ($(slides[i]).hasClass('slide-active')) {
      activeSlide = i;
      break;
    }
  }

  if (activeSlide !== 0) {
    prev = activeSlide - 1;
  } else {
    prev = slidesCount - 1;
  }

  if (activeSlide !== slidesCount - 1) {
    next = activeSlide + 1;
  } else {
    next = 0;
  }

  if ($(e.target).hasClass('slide-prev-btn')) {
    $(slides[prev]).fadeTo(300, 1).addClass('slide-active').css('display', 'block');
    $(slides[activeSlide]).fadeTo(300, 0).removeClass('slide-active').css('display', 'none');
    $(slidesNav[prev]).addClass('slides-nav-active');
    $(slidesNav[activeSlide]).removeClass('slides-nav-active');
  } else {
    $(slides[next]).fadeTo(300, 1).addClass('slide-active').css('display', 'block');
    $(slides[activeSlide]).fadeTo(300, 0).removeClass('slide-active').css('display', 'none');
    $(slidesNav[next]).addClass('slides-nav-active');
    $(slidesNav[activeSlide]).removeClass('slides-nav-active');
  }
}

function changeSlideFromNav(e) {
  var slides = $('.slides').children('li'),
    i,
    activeSlide,
    caller,
    slidesNav = $('.slides-nav').children('li');

  for (i = 0; i < slides.length; i += 1) {
    if ($(slides[i]).hasClass('slide-active')) {
      activeSlide = i;
      break;
    }
  }

  caller = $(e.target).text() * 1;

  $(slides[caller]).fadeTo(300, 1).addClass('slide-active').css('display', 'block');
  $(slides[activeSlide]).fadeTo(300, 0).removeClass('slide-active').css('display', 'none');
  $(slidesNav[caller]).addClass('slides-nav-active');
  $(slidesNav[activeSlide]).removeClass('slides-nav-active');
}

function toggleSmallMenu(e) {
  var $menu = $('.small-menu-items');
  if ($menu.css('display') == 'block') {
    $menu
      .css('height', '470')
      .animate({
        height: 0
      }, 700);
    $menu.css('display', 'none');
  } else {
    $menu
      .css('height', '0')
      .css('display', 'block')
      .animate({
        height: 470
      }, 700);
  }
}
