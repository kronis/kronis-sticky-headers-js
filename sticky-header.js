$.fn.sticky = function() {
    'use strict';
    return this.each(function() {
        var $this = $(this);
        var doResizing;

        function resetHeaderInfo() {
            $this.children('tbody').children('tr:first').children('td').css('width', '');
            $this.children('tbody, thead, tfoot').children('tr').children('th').css('min-width', '');
            $this.children('thead.sticky').removeClass('sticky');
            $this.children('thead.sticky-clone-placeholder').remove();
        }

        function init() {
            resetHeaderInfo();
            $this.children('tbody').children('tr:first').children('td').each(function() {
                $(this).css('width', $(this).css('width', '').outerWidth() + 'px');
            });
            $this.children('tbody, thead, tfoot').children('tr').children('th').css('min-width', '').each(function() {
                $(this).css('min-width', $(this).outerWidth() + 'px');
            });

        }

        function scrollFixed() {
            var offset = $(window).scrollTop();
            var tableOffsetTop = $this.offset().top;
            var tableHeight = $this.height();
            var isVisible = (offset > tableOffsetTop) && (offset < tableOffsetTop + tableHeight);
            if (isVisible && offset > tableOffsetTop) {
                // Create a cloned placeholder
                if ($this.children('thead.sticky').size() === 0) {
                    $this.children('thead').addClass('sticky');
                    var clonedHead = $this.children('thead').clone();
                    clonedHead.children('[data-reactid]').removeAttr('data-reactid');
                    clonedHead.addClass('sticky-clone-placeholder').removeClass('sticky').removeAttr('data-reactid');
                    $this.prepend(clonedHead);
                }

                // Fulfill scrolling left and right
                var scrollLeft = $(window).scrollLeft();
                var offsetLeft = $this.children('.sticky-clone-placeholder').offset().left;
                $this.children('thead.sticky').css('left', -1 * scrollLeft + offsetLeft);
            } else {
                $this.children('thead.sticky').removeClass('sticky');
                $this.children('thead.sticky-clone-placeholder').remove();
            }
        }

        function resize() {
            init();
            setTimeout(scrollFixed, 100);
        }

        function waitForResize() {
            clearTimeout(doResizing);
            doResizing = setTimeout(resize, 100);
        }
        $(window).scroll(scrollFixed);
        $(window).resize(waitForResize);
        init();
        scrollFixed();
    });
};
