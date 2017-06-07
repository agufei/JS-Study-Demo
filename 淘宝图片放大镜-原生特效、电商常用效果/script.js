window.onload = function() {
    var oPic = document.getElementById('pic');
    var aSmPic = oPic.getElementsByTagName('img');
    var oItems = document.getElementById('items');
    var aItem = oItems.children;
    var oMagni = document.getElementById('magnifier');
    var oShow = document.getElementById('show');
    var scrollLeft = 0;
    var scrollTop = 0;
    var nMoveLeft = 0;
    var nMoveTop = 0;
    var nMaxLeft = 0;
    var nMaxTop = 0;
    var aBigInfo = [
        { 'url': 'images/1-big.jpg', 'width': 800, 'height': 800 },
        { 'url': 'images/2-big.jpg', 'width': 800, 'height': 800 },
        { 'url': 'images/3-big.jpg', 'width': 800, 'height': 800 },
        { 'url': 'images/4-big.jpg', 'width': 800, 'height': 800 },
    ];
    var nCurShowBgWidth = aBigInfo[0].width;
    var nCurShowBgHeight = aBigInfo[0].height;
    for (var i = 0; i < aItem.length; i++) {
        (function(index) {
            aItem[index].onclick = function() {
                for (var i = 0; i < aItem.length; i++) {
                    aItem[i].classList.remove('active');
                    aSmPic[i].classList.remove('active');
                }
                aItem[index].classList.add('active');
                aSmPic[index].classList.add('active');
                oShow.style.backgroundImage = 'url("' + aBigInfo[index].url + '")';
                nCurShowBgWidth = aBigInfo[index].width;
                nCurShowBgHeight = aBigInfo[index].height;
            };
        })(i);

    }
    document.onscroll = function() {
        scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
        scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        refresh();
    };
    oPic.onmouseover = function() {
        oMagni.style.display = 'block';
        oShow.style.display = 'block';
        nMaxLeft = oPic.offsetWidth - oMagni.offsetWidth;
        nMaxTop = oPic.offsetHeight - oMagni.offsetHeight;
        nMaxImgLeft = nCurShowBgWidth - oShow.offsetWidth;
        nMaxImgTop = nCurShowBgHeight - oShow.offsetHeight;
        // console.log(nCurShowBgWidth);
    };
    oPic.onmouseout = function() {
        oMagni.style.display = 'none';
        oShow.style.display = 'none';
    };
    oPic.onmousemove = function(ev) {
        var oEvent = ev || event;
        nMoveLeft = oEvent.clientX + scrollLeft - getPos(oPic).left - oMagni.offsetWidth / 2;
        nMoveTop = oEvent.clientY + scrollTop - getPos(oPic).top - oMagni.offsetHeight / 2;
        if (nMoveLeft < 0) {
            nMoveLeft = 0;
        } else if (nMoveLeft > nMaxLeft) {
            nMoveLeft = nMaxLeft;
        }
        if (nMoveTop < 0) {
            nMoveTop = 0;
        } else if (nMoveTop > nMaxTop) {
            nMoveTop = nMaxTop;
        }
        refresh();
    };

    function getPos(obj) {
        var left = obj.getBoundingClientRect().left + scrollLeft - document.documentElement.clientLeft;
        var top = obj.getBoundingClientRect().top + scrollTop - document.documentElement.clientTop;
        return { left: left, top: top };
    }

    function refresh() {
        oMagni.style.left = nMoveLeft + 'px';
        oMagni.style.top = nMoveTop + 'px';
        var x = nMoveLeft / nMaxLeft * nMaxImgLeft;
        var y = nMoveTop / nMaxTop * nMaxImgTop;
        // console.log('x:' + x + ';y:' + y);
        oShow.style.backgroundPosition = -x + 'px -' + y + 'px';
    }
};