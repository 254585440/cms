var CATID, BCID, SUBCATFIXED, NAVLEFTC, NAVHOVER, NAVCHILDER, MAP, ONCONTEXT, ONCOPY, ONSELECT;
$(function () {

	//==========导航
	var that, datacid;
	$(".nav ul li").hover(function () {
		that = $(this),
			dcid = $(this).attr("data-cid");
		that.css("background", NAVHOVER).addClass("on").siblings("li").css("background", '').removeClass("on");
	}, function () {
		//判断是否当前栏目
		$(".nav ul li").each(function (i, v) {
			datacid = $(this).attr("data-cid");
			if (datacid == CATID && datacid != undefined || BCID == datacid) {
				$(this).css("background", NAVHOVER).addClass("on");
				return false;
			}
		});
		if (dcid != BCID) {
			$(this).css("background", '').removeClass("on");
		}
	});
	//背景
	if (NAVHOVER) { $(".nav ul li.on").css("background", NAVHOVER); }
	if (NAVCHILDER) { $(".nav ul li .childer").css("background", NAVCHILDER); }
	//右侧高度
	$(window).load(function () {
		$(".con-right").css({ 'min-height': ($(window).height() - $(".nbanner").height() - $(".header").height() - $(".nav-all").height() - $(".footer").outerHeight() - 60) });
		//详情页高度
		var confindH = $(".pro-content .pro-layer-detail"),
			conimgH = confindH.find("img").height(),
			conremH = confindH.find("h5").outerHeight(),
			conpH = confindH.find("p.type").height(),
			conlinkH = confindH.find(".links").height(),
			cmaxH = conimgH - conremH - conpH - conlinkH - 70;
		//console.log(cmaxH);
		$(".pro-content .pro-layer-detail .detail-right .remark").css("max-height", cmaxH);
	});
	//左侧边线	
	$(".nav ul li .childer a").hover(function () { $(this).css({ "border-color": NAVLEFTC }); }, function () { $(this).css({ "border-color": '' }); });
	//二级悬浮导航
	if (SUBCATFIXED) {
		$(window).load(function () {
			var scrollObj = $('.con-left');
			if (scrollObj[0]) {
				if (scrollObj.height() < $('.con-right').height()) {
					var offsetLeft = scrollObj.offset().left,
						objOffsetTop = scrollObj.offset().top,
						objHeight = scrollObj.height(),
						windowHeight = $(document).height(),
						objFooter = $('.footer'),
						footer = objFooter.offset().top,
						footerMarginTop = objFooter.css('margin-top'),
						footerMarginTop = footerMarginTop.replace('px', '');
					$(window).scroll(function (e) {
						var scrollTop = $(document).scrollTop();
						if (scrollTop >= objOffsetTop) {
							scrollObj.addClass('fixed');
							if (scrollTop >= (footer - objHeight - parseInt(footerMarginTop))) {
								scrollObj.css({ 'top': (-((objHeight + scrollTop + objFooter.height() + parseInt(footerMarginTop)) - windowHeight)) + 'px' });
							}
						} else {
							scrollObj.removeClass('fixed');
						}
					});
				}
			}
		});
	}
	//站点地图
	$(".getmap").on("click", function () {
		layer.open({
			type: 2,
			title: false,
			offset: '20px',
			skin: 'map-layer-detail', //样式类名
			closeBtn: 1, //不显示关闭按钮
			anim: 2,
			shadeClose: true, //开启遮罩关闭
			content: MAP
		});
	});
	//=========搜索
	$(".click-search").on("click", function () {
		var keywords = $.trim($(".keywords").val());
		if (keywords == '') { return false; }
	});
	//=========返回顶部
	$("#get_top").on("click", function () {
		$("body,html").animate({
			scrollTop: 0
		}, 1000);
	});
	//强制100%
	$(".detail iframe,.detail table").css("width", "100%");
	//禁止右键
	if (ONCONTEXT) {
		document.oncontextmenu = function (event) {
			if (window.event) {
				event = window.event;
			} try {
				var the = event.srcElement;
				if (!((the.tagName == "INPUT" && the.type.toLowerCase() == "text") || the.tagName == "TEXTAREA")) {
					return false;
				}
				return true;
			} catch (e) {
				return false;
			}
		}
	}
	//屏蔽复制
	if (ONCOPY) {
		document.oncopy = function (event) {
			if (window.event) {
				event = window.event;
			} try {
				var the = event.srcElement;
				if (!((the.tagName == "INPUT" && the.type.toLowerCase() == "text") || the.tagName == "TEXTAREA")) {
					return false;
				}
				return true;
			} catch (e) {
				return false;
			}
		}
	}
	//屏蔽选中
	if (ONSELECT) {
		document.onselectstart = function (event) {
			if (window.event) {
				event = window.event;
			} try {
				var the = event.srcElement;
				if (!((the.tagName == "INPUT" && the.type.toLowerCase() == "text") || the.tagName == "TEXTAREA")) {
					return false;
				}
				return true;
			} catch (e) {
				return false;
			}
		}
	}

})
//加入收藏
function shoucang(sTitle, sURL) {
	try {
		window.external.addFavorite(sURL, sTitle);
	} catch (e) {
		try {
			window.sidebar.addPanel(sTitle, sURL, "");
		} catch (e) {
			alert("加入收藏失败，请使用Ctrl+D进行添加");
		}
	}
} 