if (sessionStorage.getItem('scrollToProjects')) {
    document.body.style.visibility = 'hidden';
}

$(window).on('load', function() {

    var snapping = false;

    if (sessionStorage.getItem('scrollToProjects')) {
        sessionStorage.removeItem('scrollToProjects');
        $('#nav').show();
        var target = $('#intro').outerHeight() - $('#nav').outerHeight() - 50;
        window.scrollTo({ top: target });
        document.body.style.visibility = 'visible';
    } else {
        $('#nav').hide();
        window.scrollTo({ top: 0 });
        document.body.style.visibility = 'visible';
    }

    function snapForward() {
        snapping = true;
        $('#nav').show();
        $('html').animate({ scrollTop: $('#intro').outerHeight() - $('#nav').outerHeight() - 50 }, 400);
        setTimeout(function() { snapping = false; }, 1000);
    }

    function snapBack() {
        snapping = true;
        $('#nav').hide();
        $('html, body').scrollTop(0);
        setTimeout(function() { snapping = false; }, 500);
    }

    $(window).on('wheel', function(e) {
        if (snapping) return;
        var scrollTop = window.pageYOffset;
        var snapTarget = $('#intro').outerHeight() - $('#nav').outerHeight() - 50;

        if (e.originalEvent.deltaY > 0 && scrollTop < snapTarget) {
            snapForward();
        } else if (e.originalEvent.deltaY < 0 && scrollTop <= snapTarget) {
            snapBack();
        }
    });

    $('.scrolly').on('click', function(e) {
        e.preventDefault();
        snapForward();
    });

});