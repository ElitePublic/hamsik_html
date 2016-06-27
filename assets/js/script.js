jQuery(document).ready(function ($) {
    "use strict";
    var $body = $('body');

    var window_width = $(window).innerWidth();
    var windowWidth = $(window).width();
    var scrollbar_width = window_width-$(window).width();
    // CSS Classes
    var classHeaderFixed = 'header-on-scroll';
    var classSlideMenuOpen = 'slide-menu-open';
    var classWidgetPanelOpen = 'widget-panel-open';

    var $slideMenuBtn = $('.mobile-menu-icon');
    var $slideMenu = $('#nm-slide-menu');
    var $slideMenuScroller = $slideMenu.children('.nm-slide-menu-scroll');
    var $slideMenuLi = $slideMenu.find('ul li');

    //Sticky header
    var stickyNavTop = $('.site-main-navigation').offset().top;
    var stickyNav = function(){
        var scrollTop = $(window).scrollTop();
        if($('.site-main-navigation').hasClass('ticky-enabledbled')){
            if(scrollTop > stickyNavTop){
                $('.site-main-navigation').addClass('sticky_active').css('top',$('body').offset().top);
            }else{
                $('.site-main-navigation').removeClass('sticky_active').css('top','');
            }
        }
    };
    if( $('body').hasClass('device-lg') || $('body').hasClass('device-md') ) {
        stickyNav();
    }
    //Shopping Mini Cart
    $('#eliteup-menu-cart-btn, #sticky-menu-cart-btn').bind('click', function(e) {
        //console.log('clicked');
        e.preventDefault();

        // Close the slide menu first
        if ($('body').hasClass(classSlideMenuOpen)) {
            var $this = $(this);
            $('#eliteup-page-overlay').trigger('click');
            setTimeout(function() {
                $this.trigger('click');
            }, 200);
            return;
        }

        widgetPanelShowCart();
    });
    /* Bind: "Close" button */
    $('#eliteup-widget-panel-close').bind('click', function(e) {
        $('body').removeClass(classWidgetPanelOpen);
        $('#eliteup-widget-panel-overlay').removeClass('show');
        $('#eliteup-widget-panel-overlay').trigger('click');
    });
    /* Bind: Page overlay */
    $('#eliteup-page-overlay, #eliteup-widget-panel-overlay').bind('click', function() {
        var $this = $(this);

        if ($('body').hasClass(classSlideMenuOpen)) {
            $('body').removeClass(classSlideMenuOpen);
        } else {
            $('body').removeClass(classWidgetPanelOpen);
        }

        $this.addClass('fade-out');
        setTimeout(function() {
            $this.removeClass('show fade-out');
        }, 200);
    });
    function widgetPanelShowCart() {
        //console.log('clicked');
        $('body').addClass(classWidgetPanelOpen);
        $('#eliteup-widget-panel-overlay').addClass('show');
    }

    function superfish(){

        if( $('body').hasClass('device-lg') || $('body').hasClass('device-md') ) {
           $('#primary-menu ul ul, #primary-menu ul .mega-menu-content').css('display', 'block');
            menuInvert();
            $('#primary-menu ul ul, #primary-menu ul .mega-menu-content').css('display', '');
        }
        $('#primary-menu > ul, #primary-menu > div > ul').superfish({
            popUpSelector: 'ul,.mega-menu-content',
            delay: 250,
            speed: 350,
            animation: {opacity:'show'},
            animationOut:  {opacity:'hide'},
            cssArrows: false
        });
    }
    superfish();
    function menuInvert() {

        $('#primary-menu .mega-menu-content, #primary-menu ul ul').each( function( index, element ){
            var $menuChildElement = $(element),
                menuChildOffset = $menuChildElement.offset(),
                menuChildWidth = $menuChildElement.width(),
                menuChildLeft = menuChildOffset.left;

            if(windowWidth - (menuChildWidth + menuChildLeft) < 0) {
                $menuChildElement.addClass('menu-pos-invert');
            }
        });

    }
    function menufunctions(){

        $( '#primary-menu ul li:has(ul)' ).addClass('sub-menu');
    }
    menufunctions();

    /* Bind: Slide menu button */
    $slideMenuBtn.bind('click', function(e) {
        e.preventDefault();

        if (!$body.hasClass(classSlideMenuOpen)) {
            var headerPosition = $('.site-top-bar').outerHeight(true) + $('.header-section').outerHeight(true);
            $slideMenuScroller.css('margin-top', headerPosition+'px');
            $body.addClass(classSlideMenuOpen);

        } else {
            $body.removeClass(classSlideMenuOpen);
        }
    });
    /* Function: Slide menu - Toggle sub-menu */
    var _slideMenuToggleSub = function($menu, $subMenu) {
        $menu.toggleClass('active');
        $subMenu.toggleClass('open');
    };

    /* Bind: Slide menu list elements */
    $slideMenuLi.bind('click', function(e) {
        e.preventDefault();
        e.stopPropagation(); // Prevent click event on parent menu link
        var $this = $(this),
            $thisSubMenu = $this.children('ul');

        if ($thisSubMenu.length) {
            _slideMenuToggleSub($this, $thisSubMenu);
        }
    });

    /* Bind: Slide menu links */
    $slideMenuLi.find('a').bind('click', function(e) {
        e.stopPropagation(); // Prevent click event on parent list element

        var $this = $(this),
            $thisLi = $this.parent('li'),
            $thisSubMenu = $thisLi.children('ul');

        if (($thisSubMenu.length || $this.attr('href').substr(0, 1) == '#') && !$thisLi.hasClass('nm-notoggle')) {
            e.preventDefault();
            _slideMenuToggleSub($thisLi, $thisSubMenu);
        }
    });


    // Searh box
    $('.mini-search .search_link').bind('click', function(e) {
        $('.mini-search .close').css('display', 'block');
        $('.mini-search .search_link').css('display', 'none');
        $('.mini-search .mini-search-content').addClass('show');
    });
    $('.mini-search .close').bind('click', function(e) {
        $('.mini-search .close').css('display', 'none');
        $('.mini-search .search_link').css('display', 'block');
        $('.mini-search .mini-search-content').removeClass('show');
    });
    function columns_auto_height_func() {

        $('.columns_auto_height').each(function(){

            var column_min_height = 0;

            var that = $(this);

            that.imagesLoaded('always',function(){

                that.find('.columns').first().siblings().addBack().css('min-height',0).each(function(){
                    if ( $(this).outerHeight(true) > column_min_height ) {
                        column_min_height = $(this).outerHeight(true);
                    }
                })
                that.addClass('height_balanced')
                    .find('.columns').first().siblings().addBack().css('min-height',column_min_height);

            });


        });
    };
    if ( $('.row').hasClass('columns_auto_height') )  {
        if ( window_width > 640 ) {
            setTimeout(function(){
                columns_auto_height_func();
            },1)
        } else {
            $('.columns_auto_height').addClass('height_balanced');
        }
    }
    // Grid List View
    $('.grid_view').bind('click', function(e) {
        $('.grid_view').addClass('current');
        $('.list_view').removeClass('current');
        if( $('#products-grid').hasClass('list') ) {
            $('#products-grid').removeClass('list');
        }
    });
    $('.list_view').bind('click', function(e) {
        $('.list_view').addClass('current');
        $('.grid_view').removeClass('current');
        if( !$('#products-grid').hasClass('list') ) {
            $('#products-grid').addClass('list');
        }
    });
    //Resonsive Classes
    function responsiveclasses (){

        if( typeof jRespond === 'undefined' ) {
            console.log('responsiveClasses: jRespond not Defined.');
            return true;
        }

        var jRes = jRespond([
            {
                label: 'smallest',
                enter: 0,
                exit: 479
            },{
                label: 'handheld',
                enter: 480,
                exit: 767
            },{
                label: 'tablet',
                enter: 768,
                exit: 991
            },{
                label: 'laptop',
                enter: 992,
                exit: 1199
            },{
                label: 'desktop',
                enter: 1200,
                exit: 10000
            }
        ]);
        jRes.addFunc([
            {
                breakpoint: 'desktop',
                enter: function() { $('body').addClass('device-lg'); },
                exit: function() { $('body').removeClass('device-lg'); }
            },{
                breakpoint: 'laptop',
                enter: function() { $('body').addClass('device-md'); },
                exit: function() { $('body').removeClass('device-md'); }
            },{
                breakpoint: 'tablet',
                enter: function() { $('body').addClass('device-sm'); },
                exit: function() { $('body').removeClass('device-sm'); }
            },{
                breakpoint: 'handheld',
                enter: function() { $('body').addClass('device-xs'); },
                exit: function() { $('body').removeClass('device-xs'); }
            },{
                breakpoint: 'smallest',
                enter: function() { $('body').addClass('device-xxs'); },
                exit: function() { $('body').removeClass('device-xxs'); }
            }
        ]);
    }
    responsiveclasses();

    //Active Lighbox
    $('a[data-rel^=lightcase]').lightcase( {
        maxHeight: 800
    });
    // Checkout
    $('#createaccount').click(function(){
        if($(this).attr("value")==1){
            $("div.create-account").slideToggle();
        }
    });
    $('#ship-to-different-address-checkbox').click(function(){
        if($(this).attr("value")==1){
            $("div.shipping_address").slideToggle();
        }
    });
    // Progress Bars
    $('.progress-percent').each(function() {
        $(this).css('right', 100-$(this).attr('data-progress') + '%');
    });
    $('.progress-bar').each(function() {
        $(this).css('width', $(this).attr('data-progress') + '%');
    });

    // Contact Map
    function google_map() {

        var lat = $('#map').data('lat');
        var long = $('#map').data('long');

        var myLatlng = new google.maps.LatLng(lat, long);

        var styles = [{
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{"color": "#e9e9e9"}, {"lightness": 17}]
        }, {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [{"color": "#f5f5f5"}, {"lightness": 20}]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [{"color": "#ffffff"}, {"lightness": 17}]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [{"color": "#ffffff"}, {"lightness": 29}, {"weight": 0.2}]
        }, {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [{"color": "#ffffff"}, {"lightness": 18}]
        }, {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [{"color": "#ffffff"}, {"lightness": 16}]
        }, {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{"color": "#f5f5f5"}, {"lightness": 21}]
        }, {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [{"color": "#dedede"}, {"lightness": 21}]
        }, {
            "elementType": "labels.text.stroke",
            "stylers": [{"visibility": "on"}, {"color": "#ffffff"}, {"lightness": 16}]
        }, {
            "elementType": "labels.text.fill",
            "stylers": [{"saturation": 36}, {"color": "#333333"}, {"lightness": 40}]
        }, {"elementType": "labels.icon", "stylers": [{"visibility": "off"}]}, {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [{"color": "#f2f2f2"}, {"lightness": 19}]
        }, {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [{"color": "#fefefe"}, {"lightness": 20}]
        }, {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [{"color": "#fefefe"}, {"lightness": 17}, {"weight": 1.2}]
        }];

        var mapOptions = {
            zoom: 12,
            center: myLatlng,
            mapTypeControl: false,
            disableDefaultUI: true,
            zoomControl: false,
            scrollwheel: false,
            styles: styles
        }

        var map = new google.maps.Map(document.getElementById('map'), mapOptions);

        var infowindow = new google.maps.InfoWindow({
            content: "We are here!"
        });

        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            icon: 'http://localhost/html/thebear/assets/img/marker.svg',
            title: 'We are here!'
        });

        google.maps.event.addListener(marker, 'click', function () {
            infowindow.open(map, marker);
        });
    }
    if ($('#map').length) {
        google.maps.event.addDomListener(window, 'load', google_map);
        $('#map').css('position', 'absolute');
    }

    $(window).resize(function(){
        if ( $('.row').hasClass('columns_auto_height') )  {

            if ( $(window).width() > 640 ) {
                columns_auto_height_func();
            } else {
                $('.columns_auto_height').find('.column_container').css('min-height',300);
            }
        }

    });

    $(window).scroll(function() {
        if( $('body').hasClass('device-lg') || $('body').hasClass('device-md') ) {
            stickyNav();
        }
    });
    $(window).load(function() {
        $('.single_product_image_slider').flexslider({
            animation: "slide",
            controlNav: "thumbnails"
        });
    });
    $('html').css('cursor', '');
}(jQuery));
