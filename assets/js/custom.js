if (sessionStorage.getItem('scrollToProjects')) {
    document.body.style.visibility = 'hidden';
}

var isMobile = window.innerWidth <= 768;

$('html').css('overflow', 'hidden');

$(window).on('load', function() {

    var snapping = false;
    var hasSnappedForward = false;

    function getSnapTarget() {
        var offset;
        if (window.innerHeight <= 450) {
            offset = 80;
        } else if (window.innerHeight <= 600) {
            offset = 110;
        } else {
            offset = 60.5;
        }
        return $('#intro').outerHeight() - $('#nav').outerHeight() + offset;
    }

    if (sessionStorage.getItem('scrollToProjects')) {
        sessionStorage.removeItem('scrollToProjects');
        $('#nav').css('display', 'flex');
        window.scrollTo({ top: getSnapTarget() });
        document.body.style.visibility = 'visible';
        $('html').css('overflow', '');
        hasSnappedForward = true;
    } else {
        $('#nav').hide();
        window.scrollTo({ top: 0 });
        document.body.style.visibility = 'visible';
    }

    function snapForward() {
        snapping = true;
        hasSnappedForward = true;
        $('#nav').css('display', 'flex');
        $('html').animate({ scrollTop: getSnapTarget() }, 400, function() {
            if (window.innerHeight <= 450) {
                window.scrollBy(0, 0);
            }
            setTimeout(function() {
                $('html').css('overflow', '');
                snapping = false;
            }, 600);
        });
    }

    function snapBack() {
        snapping = true;
        hasSnappedForward = false;
        $('#nav').hide();
        $('html').css('overflow', 'hidden');
        $('html, body').scrollTop(0);
        setTimeout(function() { snapping = false; }, 500);
    }

    window.addEventListener('wheel', function(e) {
        if (snapping) return;
        var scrollTop = window.pageYOffset;
        var snapTarget = getSnapTarget();

        if (e.deltaY > 0 && !hasSnappedForward) {
            snapForward();
        } else if (e.deltaY < 0 && scrollTop <= snapTarget - (window.innerWidth <= 736 ? 50 : 180) && hasSnappedForward) {
            snapBack();
        }
    }, { passive: false });

    var touchStartY = 0;

    window.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener('touchend', function(e) {
        var touchEndY = e.changedTouches[0].clientY;
        var diff = touchStartY - touchEndY;

        if (snapping) return;
        var scrollTop = window.pageYOffset;
        var snapTarget = getSnapTarget();

        if (diff > 30 && !hasSnappedForward) {
            snapForward();
        } else if (diff < -30 && scrollTop <= snapTarget - 50 && hasSnappedForward) {
            snapBack();
        }
    }, { passive: true });

    window.addEventListener('scroll', function() {
        if (!hasSnappedForward || snapping) return;
        if (window.pageYOffset <= 400) {
            snapBack();
        }
    });

    $('.scrolly').on('click', function(e) {
        e.preventDefault();
        snapForward();
    });

});