var spawn_cloud = function(){
	var positive = Math.floor(Math.random()*11) > 5 ? true : false;
	var speed = (Math.floor(Math.random()*70)+1)*2;
	var cloudType = Math.floor(Math.random()*100)+1;
	if(cloudType <= 80){
		cloudType = 3;
	} else if(cloudType > 80 && cloudType <= 95) {
		cloudType = 2;
	} else if(cloudType > 95) {
		cloudType = 1;
	}
	
	var cloud = $('<div class="cloud'+cloudType+'" style="display:none;">&nbsp;</div>');
	cloud.appendTo('#sky');
	
	var top = Math.floor(Math.random()*($(window).height()+cloud.height()))-cloud.height();
	cloud.css('top', top+"px");
	
	if(positive){
		cloud.css('left', 0-cloud.width() + "px");
		var end = $(window).width();
	} else {
		cloud.css('left', $(window).width() + "px");
		var end = 0-cloud.width();
	}
	
	var delay = ($(window).width() / speed)*1000;
	cloud.fadeIn();
	cloud.animate({'left':end+"px"}, delay, 'linear');
	setTimeout(function() {
		cloud.remove();
	}, delay+1000);
}

var spawn_bird = function(){
	var positive = Math.floor(Math.random()*11) > 5 ? true : false;
	var class="bird-left"; 
	if(positive){ class="bird-right"; }
	var bird = $('<div class="bird '+class+'" frames="5" style="display:none;">&nbsp;</div>');
	bird.appendTo('#sky');
	var speed = (Math.floor(Math.random()*70)+1)*10;
	if(speed < 40){ bird.remove(); return false; }
	var top = Math.floor(Math.random()*($(window).height()+bird.height()))-bird.height();
	bird.css('top', top+"px");
	
	if(positive){
		bird.css('left', 0-bird.width() + "px");
		var end = $(window).width();
	} else {
		bird.css('left', $(window).width() + "px");
		var end = 0-bird.width();
	}
	
	var delay = ($(window).width() / speed)*1000;
	bird.fadeIn();
	bird.animate({'left':end+"px"}, delay, 'linear');
	setTimeout(function() {
		bird.remove();
	}, delay+1000);
}

jQuery.fn.flap = function(){
	var bpos = this.css('background-position');
	var height = this.height();
	if(!bpos){ return; }
	var topPx = parseFloat(bpos.split(' ')[1].replace('px',''));
	this.frames = this.attr('frames');
	this.maxPos = -((this.frames * height) - height);
	if(topPx == 0){
		this.removeClass('down');
	}
	if((topPx == 0 || this.maxPos != topPx) && !this.hasClass('down')){
		this.increment = -(height);
	} else {
		this.increment = height;
		this.addClass('down');
	}
	var total = topPx + this.increment;
	this.css('background-position','0px '+total+'px');
}

jQuery.fn.drift = function(){
	if(typeof this.vPos == 'undefined'){
		this.vPos = Math.floor(Math.random()*11) > 5 ? true : false;
	}
	if(typeof this.vPos == 'undefined'){
		this.hPos = Math.floor(Math.random()*11) > 5 ? true : false;
	}
	this.vPos = !this.vPos;
	this.hPos = !this.hPos;
	var hPos = Math.floor(Math.random()*11) > 5 ? true : false;
	var vShift = Math.floor(Math.random()*10);
	vShift = this.vPos ? vShift : vShift*(-1);
	var hShift = Math.floor(Math.random()*10);
	hShift = this.hPos ? hShift : hShift*(-1);	
	var speed = 10000;
	
	var position = this.offset();
	this.animate({'left':position.left+hShift+"px",'top':position.top+vShift+"px"}, speed, 'swing');
}

jQuery.fn.center = function () {
    this.css("top", ( $(window).height() - this.height() ) / 2+$(window).scrollTop() + "px");
    this.css("left", ( $(window).width() - this.width() ) / 2+$(window).scrollLeft() + "px");
    return this;
}

$(document).ready(function() {
	$('#piggy').center().fadeIn().drift();
	spawn_cloud();
	setInterval('spawn_cloud()', 2000);
	setInterval('spawn_bird()', 10000);
	//setInterval('$(\'#piggy\').drift()', 10000);
	setInterval('$(\'.bird\').flap()', 75);
});

$(window).resize(function() {
	$('#piggy').center();
});