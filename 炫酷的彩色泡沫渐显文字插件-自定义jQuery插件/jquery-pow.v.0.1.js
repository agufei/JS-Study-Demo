$.fn.pow = function() {
    this.each(function() {
        for (var i = 0; i < 10; i++) {
            $('<i/>').addClass('pow').appendTo($(this));
            var nTemp = parseInt($(this).css('font-size'));
            // console.log(nTemp);
            $(this).find('.pow').css({
                position: 'absolute',
                left: Math.floor(Math.random() * 0.5 * nTemp) + 'px',
                top: Math.floor(Math.random() * 0.5 * nTemp) + 'px',
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                // border: '1px solid #000',
                background: 'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')'
            });
        }
        $(this).find('.pow').each(function() {
            $(this).animate({
                left: -Math.floor(Math.random() * 80 + 20) + 'px',
                top: -Math.floor(Math.random() * 80 + 20) + 'px',
                opacity: .3
            }, {
                duration: Math.floor(Math.random() * 700 + 100),
                complete: function() {
                    $(this).remove();
                }
            });
        });
    });
};