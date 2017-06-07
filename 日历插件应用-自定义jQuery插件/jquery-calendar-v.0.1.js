$.fn.calendar = function() {
    var flag = false;
    var oCal = null;
    var now = 0;
    var left = 0;
    var top = 0;
    this.each(function() {
        var that = this;
        if (!flag) {
            $('<link/>').attr({ rel: 'stylesheet', href: 'calendar-v.0.1.css' }).appendTo($('head'));
            flag = true;

            oCal = $('<div/>').addClass('calendar').html(`
				<a href="javascript:;" class="prev">←</a>
				<a href="javascript:;" class="next">→</a>
				<h2></h2>
				<ol>
					<li>一</li>
					<li>二</li>
					<li>三</li>
					<li>四</li>
					<li>五</li>
					<li class="weekend">六</li>
					<li class="weekend">日</li>
				</ol>
				<ul></ul>
			`);
            oCal.insertAfter(this);
            // oCal.css({ 'left': '100px', 'top': '100px', 'display': 'block' });
        }
        $(this).focus(function() {
            now = 0;
            _refreshCal(now);
            oCal.show();
            left = $(this).offset().left + $(this).scrollLeft();
            top = $(this).offset().top + $(this).scrollTop() + $(this).outerHeight();
            oCal.css({ left: left + 'px', top: top + 5 + 'px' });
            // console.log($(this)[0]);
            oCal.find('.prev').off('click').click(function() {
                _refreshCal(--now);
                console.log(`now=${now}`);
            });
            oCal.find('.next').off('click').click(function() {
                _refreshCal(++now);
                console.log(`now=${now}`);
            });
        });

        function _refreshCal(m) {
            console.log(`innow=${m}`);
            // 修改标题时间
            var date = new Date();
            date.setMonth(date.getMonth() + m);
            var year = date.getFullYear();
            var month = date.getMonth();
            oCal.find('h2').html(`${year}年${month+1}月`);

            var oUl = oCal.find('ul');
            // 清空原日历内容
            oUl.html('');

            // 创建空格
            date.setDate(1);
            var day = date.getDay();
            (day == 0) && (day = 7);
            for (var i = 0; i < day - 1; i++) {
                $('<li/>').appendTo(oUl);
            }

            // 插入日期
            var date = new Date();
            date.setMonth(date.getMonth() + 1, 0);
            var nTotal = date.getDate();
            for (var i = 0; i < nTotal; i++) {
                var oLi = $('<li/>').appendTo(oUl).html(i + 1);
                if (m >= 0) {
                    oLi.click(_selectDate)
                }
            }

            // 设置周末样式
            oUl.children().each(function(index) {
                // console.log(index);
                if (index % 7 == 5 || index % 7 == 6) {
                    oUl.children().eq(index).addClass('weekend');
                }
            });

            // 设置今天样式
            if (m == 0) {
                var date = new Date();
                var nToday = date.getDate();
                oUl.children().each(function(index) {
                    if ($(this).html() == nToday) {
                        $(this).addClass('today');
                    } else if ($(this).html() < nToday) {
                        $(this).addClass('past');
                        $(this).off('click');
                    }
                });
            } else if (m < 0) {
                oUl.children().addClass('past');
            }

            function _selectDate() {
                console.log(that);
                $(that).val(`${oCal.find('h2').html()}${this.innerHTML}日`);
                oCal.hide();
            }
        }
    });

    // 阻止冒泡
    oCal.click(function(ev) {
        ev.stopPropagation();
    });
    this.click(function(ev) {
        ev.stopPropagation();
    });
    oCal.hide();

    // 添加清除事件
    $(document).click(function() {
        oCal.hide();
    });


};