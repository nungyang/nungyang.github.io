$(window).on('load', function() {

    var snapping = false;
    var introHeight = $('#intro').outerHeight();

    $('#nav').hide();

    function snapForward() {
        snapping = true;
        $('#nav').show();
        $('html').animate({ scrollTop: introHeight }, 300);
        setTimeout(function() { snapping = false; }, 1000);
    }

    function snapBack() {
        snapping = true;
        $('#nav').hide();
        $('html').animate({ scrollTop: 0 }, 300);
        setTimeout(function() { snapping = false; }, 1000);
    }

    $(window).on('wheel', function(e) {
        if (snapping) return;
        var scrollTop = window.pageYOffset;

        if (e.originalEvent.deltaY > 0 && scrollTop < introHeight) {
            snapForward();
        } else if (e.originalEvent.deltaY < 0 && scrollTop <= introHeight) {
            snapBack();
        }
    });

    $('.scrolly').on('click', function(e) {
        e.preventDefault();
        snapForward();
    });

});