if (sessionStorage.getItem('scrollToProjects')) {
    document.body.style.visibility = 'hidden';
}

$(window).on('load', function() {

    var snapping = false;

    function getSnapTarget() {
        return $('#intro').outerHeight() - $('#nav').outerHeight() + 60.5;
    }

    if (sessionStorage.getItem('scrollToProjects')) {
        sessionStorage.removeItem('scrollToProjects');
        $('#nav').show();
        window.scrollTo({ top: getSnapTarget() });
        document.body.style.visibility = 'visible';
    } else {
        $('#nav').hide();
        window.scrollTo({ top: 0 });
        document.body.style.visibility = 'visible';
    }

    function snapForward() {
        snapping = true;
        $('#nav').show();
        $('html').animate({ scrollTop: getSnapTarget() }, 400);
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
        var snapTarget = getSnapTarget();

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