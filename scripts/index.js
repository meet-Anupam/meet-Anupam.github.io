$(document).ready(function () {
  // SCROLL TO THE TOP
  // $(window).on("beforeunload", function () {
  //     $(window).scrollTop(0);
  // });

  // STICKY NAVIGATION
  $('#about').waypoint(
    function (direction) {
      if (direction == 'down') {
        $('nav').addClass('sticky')
      } else {
        $('nav').removeClass('sticky')
      }
    },
    {
      offset: '50px'
    }
  )

  // NAV HIGHLIGHTING ON SCROLL
  $('#nav').onePageNav({
    currentClass: 'active',
    changeHash: false,
    scrollSpeed: 1000,
    scrollThreshold: 0.3,
    filter: '',
    easing: 'swing'
  })

  var nav = $('.main-nav')

  // ACTIVE HIGHLIGHTER
  $('#nav').on('click', 'ul li a', function () {
    $('ul li > a').removeClass('active')
    $(this).addClass('active')
    var icon = $('.mobile-nav-icon')
    if (icon.css('display') !== 'none') {
      nav.hide()
      $('.mobile-nav-icon ion-icon').attr('name', 'menu-outline')
    }
  })
  $('#scroll-to-about').click(function () {
    $('ul li > a').removeClass('active')
    $('#nav-about').addClass('active')
  })
  $('#scroll-to-home').click(function () {
    $('ul li > a').removeClass('active')
    $('#nav-home').addClass('active')
  })
  $('#scroll-to-contact').click(function () {
    $('ul li > a').removeClass('active')
    $('#nav-contact').addClass('active')
  })
  $('#project-filter').on('click', 'button', function () {
    $('button').removeClass('active')
    $(this).addClass('active')
  })
  /* Mobile navigation */
  $('.mobile-nav-icon').click(function () {
    var icon = $('.mobile-nav-icon ion-icon')
    nav.slideToggle(200)
    if (icon.attr('name') === 'menu-outline') {
      icon.attr('name', 'close-outline')
    } else if (icon.attr('name', 'close-outline')) {
      icon.attr('name', 'menu-outline')
    }
  })

  // BAR-GRAPH ANIMATION
  $('.bars-wrap').waypoint(
    function (direction) {
      if (direction === 'down') {
        $('.bar.fill').each(function () {
          $this = $(this)
          var delay = $this.data('delay')
          var width = parseInt($this.data('width'))
          $this.delay(delay).animate(
            {
              width: width + '%'
            },
            1000
          )
        })
      }
    },
    {
      offset: '500px'
    }
  )

  // FADE OTHER PUBLICATION
  $('.publication-wrap').hover(
    function () {
      $(this).siblings($(this)).fadeTo(100, 0.5)
      $(this).parent().siblings().fadeTo(100, 0.5)
    },
    function () {
      $(this).siblings($(this)).fadeTo(100, 1)
      $(this).parent().siblings().fadeTo(100, 1)
    }
  )

  // MESSAGE SUBMITTED TEXT

  $('form').submit(function (event) {
    event.preventDefault()

    url = $('form').attr('action')

    /* Send the data using post with element id name and name2*/
    var posting = $.post(url, {
      name: $('#name').val(),
      email: $('#email').val(),
      message: $('#message').val()
    })
    /* Alerts the results */
    posting.done(function () {
      $('#contact .text')
        .parent()
        .fadeTo(0, 0)
        .delay(300)
        .children()
        .text('Anupam will be in touch!!')
        .css('color', '#e67e22')
      $('#contact .text').parent().delay(300).fadeTo(500, 1)

      $('form').delay(500).trigger('reset')
    })
    posting.fail(function () {
      $('#contact .text')
        .parent()
        .fadeTo(0, 0)
        .delay(300)
        .children()
        .text('Something Went Wrong! Please try again.')
        .css('color', 'red')
      $('#contact .text').parent().delay(300).fadeTo(500, 1)
    })
  })

  // SCROLLING- REPETITIVE CODE
  // $(".js--scroll--to--home").click(function () {
  //     $("html, body").animate({ scrollTop: $("#home").offset().top });
  // });

  // SMOOTH SCROLLING
  let hashTagActive = ''
  $('.scroll').on('click touchstart', function (event) {
    if (hashTagActive != this.hash) {
      //this will prevent if the user click several times the same link to freeze the scroll.
      event.preventDefault()
      //calculate destination place
      var dest = 0
      if ($(this.hash).offset().top > $(document).height() - $(window).height()) {
        dest = $(document).height() - $(window).height()
      } else {
        dest = $(this.hash).offset().top
      }
      //go to destination
      $('html,body').animate(
        {
          scrollTop: dest
        },
        1000,
        'swing'
      )
      hashTagActive = this.hash
    }
  })

  // MixItUp
  mixitup('#gallery', {
    animation: {
      duration: 700
    }
  })
})
