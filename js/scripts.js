/*- tabs -*/
const tabs = document.querySelectorAll('[data-tab-target]')
const tabContents = document.querySelectorAll('[data-tab-content]')

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.tabTarget)
    tabContents.forEach(tabContent => {
      tabContent.classList.remove('active')
    })
    tabs.forEach(tab => {
      tab.classList.remove('active')
    })
    tab.classList.add('active')
    target.classList.add('active')
  })
})

/*- gl-select -*/
function checkboxDropdown(el) {
  var $el = $(el)

  function updateStatus(label, result) {
    if(!result.length) {
      label.html('Все');
    }
  };
  
  $el.each(function(i, element) {
    var $list = $(this).find('.gl-select__dropdown'),
      $label = $(this).find('.gl-select__text'),
      $checkAll = $(this).find('.check-all'),
      $inputs = $(this).find('.check'),
      defaultChecked = $(this).find('input[type=checkbox]:checked'),
      result = [];
    
    updateStatus($label, result);
    if(defaultChecked.length) {
      defaultChecked.each(function () {
        result.push($(this).next().text());
        $label.html(result.join(", "));
      });
    }
    
    $label.on('click', ()=> {
      $(this).toggleClass('open');
    });

    $checkAll.on('change', function() {
      var checked = $(this).is(':checked');
      var checkedText = $(this).next().text();
      result = [];
      if(checked) {
        result.push(checkedText);
        $label.html(result);
        $inputs.prop('checked', false);
      }else{
        $label.html(result);
      }
        updateStatus($label, result);
    });

    $inputs.on('change', function() {
      var checked = $(this).is(':checked');
      var checkedText = $(this).next().text();
      if($checkAll.is(':checked')) {
        result = [];
      }
      if(checked) {
        result.push(checkedText);
        $label.html(result.join(", "));
        $checkAll.prop('checked', false);
      }else{
        let index = result.indexOf(checkedText);
        if (index >= 0) {
          result.splice(index, 1);
        }
        $label.html(result.join(", "));
      }
      updateStatus($label, result);
    });

    $(document).on('click touchstart', e => {
      if(!$(e.target).closest($(this)).length) {
        $(this).removeClass('open');
      }
    });
  });
};

checkboxDropdown('.gl-select');

/*- gl-select__scroll -*/
var swiper = new Swiper(".gl-select__scroll", {
  direction: "vertical",
  slidesPerView: "auto",
  freeMode: true,
  scrollbar: {
    el: ".gl-select__scroll .swiper-scrollbar",
  },
  mousewheel: true,
});

/*- gl-scroll -*/
var swiper = new Swiper(".gl-scroll", {
  direction: "vertical",
  slidesPerView: "auto",
  freeMode: true,
  scrollbar: {
    el: ".gl-scroll .swiper-scrollbar",
  },
  mousewheel: true,
});

/*- gallery-slider -*/
var swiper = new Swiper(".gallery-slider", {
  spaceBetween: 30,
  effect: "fade",
  pagination: {
    el: ".gallery-slider .swiper-pagination",
    clickable: true,
  },
});

/*- phone-input -*/
[].forEach.call(document.querySelectorAll('.phone-input'), function (input) {
    let keyCode;
    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        let pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        let matrix = "+7 (___) ___-__-__",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            newValue = matrix.replace(/[_\d]/g, function (a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
            });
        i = newValue.indexOf("_");
        if (i != -1) {
            i < 5 && (i = 3);
            newValue = newValue.slice(0, i);
        }
        let reg = matrix.substr(0, this.value.length).replace(/_+/g,
            function (a) {
                return "\\d{1," + a.length + "}";
            }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = newValue;
        if (event.type == "blur" && this.value.length < 5) this.value = "";
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false);
});

/*- info-panel__item_add-button -*/
let buttons = document.querySelectorAll(".info-panel__item_add-button, .sort-btn");
for(let i = 0; i < buttons.length; i++) {
  buttons.item(i).addEventListener("click", doClickButton);
}

function doClickButton(e) {
  toggleButton(e.target);
}

function toggleButton(button) {
  button.classList.toggle('active');
}

/*- custom-select -*/
$(".custom-select").each(function() {
  var classes = $(this).attr("class"),
      id      = $(this).attr("id"),
      name    = $(this).attr("name");
  var template =  '<div class="' + classes + '">';
      template += '<span class="custom-select-trigger">' + $(this).attr("placeholder") + '</span>';
      template += '<div class="custom-options">';
      $(this).find("option").each(function() {
        template += '<span class="custom-option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
      });
  template += '</div></div>';
  
  $(this).wrap('<div class="custom-select-wrapper"></div>');
  $(this).hide();
  $(this).after(template);
});

$(".custom-option:first-of-type").hover(function() {
  $(this).parents(".custom-options").addClass("option-hover");
}, function() {
  $(this).parents(".custom-options").removeClass("option-hover");
});

$(".custom-select-trigger").on("click", function() {
  $('html').one('click',function() {
    $(".custom-select").removeClass("opened");
  });
  $(this).parents(".custom-select").toggleClass("opened");
  event.stopPropagation();
});

$(".custom-option").on("click", function() {
  $(this).parents(".custom-select-wrapper").find("select").val($(this).data("value"));
  $(this).parents(".custom-options").find(".custom-option").removeClass("selection");
  $(this).addClass("selection");
  $(this).parents(".custom-select").removeClass("opened");
  $(this).parents(".custom-select").find(".custom-select-trigger").text($(this).text());
});

/*- price -*/
let priceGap = 1000;

document.querySelectorAll(".price-slider").forEach((container) => {
  const rangeInput = container.querySelectorAll(".range-input input"),
    priceInput = container.querySelectorAll(".price-input input"),
    range = container.querySelector(".slider .progress");

  priceInput.forEach((input) => {
    input.addEventListener("input", (e) => {
      let minPrice = parseInt(priceInput[0].value),
        maxPrice = parseInt(priceInput[1].value);

      if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInput[1].max) {
        if (e.target.className === "input-min") {
          rangeInput[0].value = minPrice;
          range.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
        } else {
          rangeInput[1].value = maxPrice;
          range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
        }
      }
    });
  })

  rangeInput.forEach((input) => {
    input.addEventListener("input", (e) => {
      let minVal = parseInt(rangeInput[0].value),
        maxVal = parseInt(rangeInput[1].value);

      if (maxVal - minVal < priceGap) {
        if (e.target.className === "range-min") {
          rangeInput[0].value = maxVal - priceGap;
        } else {
          rangeInput[1].value = minVal + priceGap;
        }
      } else {
        priceInput[0].value = minVal;
        priceInput[1].value = maxVal;
        range.style.left = (minVal / rangeInput[0].max) * 100 + "%";
        range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
      }
    });
  });
});

/*- accordion -*/
const accordionContent = document.querySelectorAll('.accordion__content');

const accordion = document.querySelectorAll(".accordion__top-panel");

accordion.forEach((element) => {
  element.addEventListener("click", () => {
    element.classList.toggle("active");
    let panel = element.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
});

/*- modal -*/
const myModal = new HystModal({
  closeOnEsc: true,
  backscroll: true,
  afterClose: function(modal){
    let videoframe = modal.openedWindow.querySelector('iframe');
    if(videoframe){
        videoframe.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
    }
  },
});

/*- consultant_steps -*/
$('.consultant_step-1 .btn').click(function(e) {
  $('.consultant_step-2').addClass('active');
  $('.consultant_step-1').removeClass('active');
});

$('.consultant_step-2 .btn').click(function(e) {
  $('.consultant_step-3').addClass('active');
  $('.consultant_step-2').removeClass('active');
});

/*- accordion -*/
let comparison = document.querySelectorAll(".comparison__panel");

comparison.forEach((comparisonItem) => {
  comparisonItem.addEventListener("click", function () {
    comparisonItem.classList.toggle("open");
    const nextElement = comparisonItem.nextElementSibling;
    nextElement.classList.toggle("open");
  });
});

/*- global-slider -*/
var swiper = new Swiper(".global-slider", {
  loop: true,
  slidesPerView: 24,
  spaceBetween: 30,
  navigation: {
    nextEl: ".global-slider__arrows .swiper-button-next",
    prevEl: ".global-slider__arrows .swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: "auto",
      spaceBetween: 20,
    },
    767: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
    1326: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
  },
});

/*- real-estate-slider -*/
var swiper = new Swiper(".real-estate-slider__small", {
  loop: true,
  spaceBetween: 4,
  slidesPerView: "auto",
});

var swiper2 = new Swiper(".real-estate-slider__big", {
  loop: true,
  spaceBetween: 10,
  navigation: {
    nextEl: ".real-estate-slider__big .swiper-button-next",
    prevEl: ".real-estate-slider__big .swiper-button-prev",
  },
  thumbs: {
    swiper: swiper,
  },
});

/*- mobile menu -*/
let toggleBtn = document.querySelector('.menu-btn');
let navBar = document.querySelector('.header__right-col');
toggleBtn.addEventListener('click', function () {
  toggleBtn.classList.toggle('open');
  navBar.classList.toggle('open');
});

/*- main-navi -*/
const iconUpDown = document.querySelectorAll(".main-nav_down-arrow a, .language span");
iconUpDown.forEach(link => {
  link.addEventListener("click", e => {
    link.classList.toggle("active")
    link.parentElement.classList.toggle("open");
  })
})

/*- teams -*/
var mixer = mixitup(".teams");