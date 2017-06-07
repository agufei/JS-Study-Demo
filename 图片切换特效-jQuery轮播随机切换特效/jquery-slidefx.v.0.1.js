$.fn.slidefx = function() {
    this.each(function() {
        var aPic = ['images/0.jpg', 'images/1.jpg', 'images/2.jpg'];
        var oDiv = $(this).css({
            position: 'relative'
        });
        var oImg = $('<img/>').appendTo(oDiv).css({
            width: '100%',
        }).attr({
            src: aPic[1]
        });
        var W = oDiv.width();
        var H = oDiv.height();
        var cols = 20;
        var rows = 10;
        var w = W / cols;
        var h = H / rows;
        var curPic = 0;
        var bFlag = false;
        var aMode = ['lb2rt', 'rt2lb', 'lt2rb', 'rb2lt', 'row', 'col', 'centerOut', 'centerIn', ''];
        var styleVal = 0;

        for (var r = 0; r < rows; r++) {
            for (var c = 0; c < cols; c++) {
                nLeft = c * w;
                nTop = r * h;
                $('<span/>').css({
                    position: 'absolute',
                    left: nLeft + 'px',
                    top: nTop + 'px',
                    width: w + 'px',
                    height: h + 'px',
                    opacity: 1,
                    'background-image': 'url(' + aPic[curPic] + ')',
                    'background-position': -nLeft + 'px -' + nTop + 'px'
                }).attr({
                    'data-r': r,
                    'data-c': c
                }).appendTo(oDiv);
            }
        }
        $(document).click(function() {
            if (bFlag) {
                return;
            }
            bFlag = true;
            var aSpan = oDiv.find('span');
            var count = aSpan.length;
            var mode = aMode[Math.floor(Math.random() * aMode.length)];
            aSpan.each(function(i) {
                (function(index) {
                    var oSpan = aSpan.eq(index);
                    var nSpanC = parseInt(oSpan.attr('data-c'));
                    var nSpanR = parseInt(oSpan.attr('data-r'));
                    switch (mode) {
                        case 'lb2rt':
                            styleVal = nSpanC - nSpanR + rows - 1;
                            break;
                        case 'rt2lb':
                            styleVal = nSpanR - nSpanC + cols - 1;
                            break;
                        case 'lt2rb':
                            styleVal = nSpanC + nSpanR;
                            break;
                        case 'rb2lt':
                            styleVal = rows + cols - nSpanC - nSpanR - 2;
                            break;
                        case 'row':
                            styleVal = nSpanR;
                            break;
                        case 'col':
                            styleVal = nSpanC;
                            break;
                        case 'centerOut':
                            styleVal = Math.abs(nSpanC - nSpanR - Math.round(Math.abs(cols - rows) / 2));
                            break;
                        case 'centerIn':
                            styleVal = Math.max(rows, cols) - 1 - Math.abs(nSpanC - nSpanR - 2);
                            break;
                        default:
                            styleVal = index;
                            break;
                    }
                    setTimeout(function() {
                        oSpan.animate({
                            opacity: 0
                        }, {
                            duration: 300,
                            complete: function() {
                                if (!--count) {
                                    curPic = (++curPic) % aPic.length;
                                    aSpan.css({
                                        'background-image': 'url(' + aPic[curPic] + ')',
                                        opacity: 1
                                    });
                                    oImg.attr({
                                        src: aPic[(curPic + 1) % aPic.length]
                                    });
                                    bFlag = false;
                                }
                            }
                        });
                    }, 50 * styleVal);
                })(i);
            });
        });
        $(document).mousedown(function() {
            return false;
        });


    });
}