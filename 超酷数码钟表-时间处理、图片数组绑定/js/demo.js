window.onload = function() {
    var aDate = document.getElementsByClassName('year')[0].getElementsByClassName('num');
    var aTime = document.getElementsByClassName('time')[0].getElementsByClassName('num');
    var oWeek = document.getElementsByClassName('num2')[0];
    refresh();
    setInterval(refresh, 1000);

    function refresh() {
        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth() + 1; 
        var day = d.getDate();
        var hour = d.getHours();
        var min = d.getMinutes();
        var sec = d.getSeconds();
        var weekDay = '' + d.getDay();

        var strDate = '' + year + toDb(month) + toDb(day);
        var strTime = toDb(hour) + toDb(min) + toDb(sec);

        var aDateNum = strDate.split('');
        var aTimeNum = strTime.split('');

        for (var i = 0; i < aDate.length; i++) {
            aDate[i].src = cvtNum(aDateNum[i]);
        }
        for (var i = 0; i < aTime.length; i++) {
            aTime[i].src = cvtNum(aTimeNum[i]);
        }
        oWeek.src = cvtWeekDay(weekDay);
        // alert('a');
    }

    function toDb(n) {
        return n < 10 ? '0' + n : '' + n;
    }

    function cvtNum(str) {
        return 'images/' + str + '.png';
    }

    function cvtWeekDay(str) {
        switch (str) {
            case '1':
                return 'images/one.png';
                break;
            case '2':
                return 'images/two.png';
                break;
            case '3':
                return 'images/three.png';
                break;
            case '4':
                return 'images/four.png';
                break;
            case '5':
                return 'images/five.png';
                break;
            case '6':
                return 'images/six.png';
                break;
            case '7':
                return 'images/seven.png';
                break;
        }
    }
};