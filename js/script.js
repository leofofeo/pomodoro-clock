//JS and jQuery for RQ
$('document').ready(function(){
	var defaultWorkTime = 25;
	var defaultRestTime = 5;
	displayWorkTime(defaultWorkTime);
	displayRestTime(defaultRestTime);
	displayTime();
});


var GlobalClearIntervalId;

$('button').on('click', function(){
	switch($(this).attr('id')){
		case 'work-time-decrement':
		decrementWorkTime();
		break;
		case 'work-time-increment':
		incrementWorkTime();
		break;
		case 'rest-time-decrement':
		decrementRestTime();
		break;
		case 'rest-time-increment':
		incrementRestTime();
		break;
		case 'pause-resume':
		manageClock();
		break;
		case 'reset':
		resetClock();
		break;

	}
});



var manageClock = function(){
	if($('#pause-resume').hasClass('in-play')){
		pauseClock();
	} else if ($('#pause-resume').hasClass('in-pause')){
		startClock();
	} else {
		startClock();
	}

}

var startClock = function(){

	if($('#pause-resume').hasClass('in-pause')){
		$('#pause-resume').removeClass('in-pause');
	}

	$('#pause-resume').addClass('in-play');

	$('#pause-resume').html('<i class="fa fa-pause fa-4x"></i>');

	setClockColor('start');	

	GlobalClearIntervalId = window.setInterval(function(){

		var minutes = parseInt($('#main-minutes').html());
		var seconds = parseInt($('#main-seconds').html());

		if(minutes === 0 && seconds === 0){
			if($('#main-clock-display').hasClass('in-work')){
				$('#main-clock-display').removeClass('in-work').addClass('in-rest');
			} else {
				$('#main-clock-display').removeClass('in-rest').addClass('in-work');

			}
			clearInterval(GlobalClearIntervalId);
			pauseClock();
			displayTime();
			setClockColor('start');
			return;

		}

		if(seconds === 0){
			minutes -= 1;
			seconds = 59;
		} else if (seconds < 1) {
			seconds = '00';
		} else {
			seconds -= 1;
		}

		if(seconds < 10){
			seconds = '0' + seconds;
		}

		if (minutes < 10){
			minutes = '0' + minutes;
		}

		$('#main-minutes').html(minutes);
		$('#main-seconds').html(seconds);

	}, 1000);

}

var pauseClock = function(){
	
	if($('#pause-resume').hasClass('in-play')){
		$('#pause-resume').removeClass('in-play');
	}

	$('#pause-resume').addClass('in-pause'); 

	$('#pause-resume').html('<i class="fa fa-play fa-4x"></i>');

	setClockColor('pause');
	window.clearInterval(GlobalClearIntervalId);
}

var resetClock = function(){
	
	if($('#main-clock-display').hasClass('in-rest')){
		$('#main-clock-display').removeClass('in-rest').addClass('in-work');
	}

	displayTime();

	if ($('#pause-resume').hasClass('in-pause')){
		$('#pause-resume').removeClass('in-pause');
	} else if($('#pause-resume').hasClass('in-play')){
		$('#pause-resume').removeClass('in-play');
	}

	$('#pause-resume').html('<i class="fa fa-play fa-4x"></i>')

	setClockColor('');
	clearInterval(GlobalClearIntervalId);
}

var incrementWorkTime  = function(){
	var workTime = parseInt($('#work-time-display').html());
	workTime += 1;
	displayWorkTime(workTime);
	displayTime();
}

var decrementWorkTime = function(){
	var workTime = parseInt($('#work-time-display').html());
	if(workTime === 1){
		alert('You can\'t go below 1 minute.');
	} else {
		workTime -= 1;
		displayWorkTime(workTime);
	}
	displayTime();
}

var incrementRestTime = function(){
	var restTime = parseInt($('#rest-time-display').html());
	restTime += 1;
	displayRestTime(restTime);
	displayTime();
}

var decrementRestTime = function(){
	var restTime = parseInt($('#rest-time-display').html());
	if(restTime === 1){
		alert('You can\t go below 1 minute of rest time.');
		return;
	} else {
		restTime -= 1;
		displayRestTime(restTime);
	}
	displayTime();
}

var displayWorkTime = function(workTime){
	
	$('#work-time-display').html(workTime);
}

var displayRestTime = function(restTime){

	$('#rest-time-display').html(restTime);
}

var displayTime = function(){

	if($('#main-clock-display').hasClass('in-work')){
		//take time from workTime and display it
		$('#main-minutes').html($('#work-time-display').html());

	} else {
		//take time from restTime and display it
		console.log('from displayTime else');
		$('#main-minutes').html( $('#rest-time-display').html());
	}
	$('#main-seconds').html('00');
}


var setClockColor = function(runningStatus){
	if(runningStatus === 'start'){
		if($('#main-clock-display').hasClass('in-work')){
			$('#main-clock-display').css('border-color', "#f39c12");	
		} else {
			$('#main-clock-display').css('border-color', '#27ae60');
		}		
	} else if (runningStatus === 'pause'){
		$('#main-clock-display').css('border-color', '#e74c3c');
	} 
	else {
		$('#main-clock-display').css('border-color', 'black');
	}
}


// var runClock = function(){

// 	var minutes = parseInt($('#main-minutes').html());
// 	var seconds = parseInt($('#main-seconds').html());

// 	if(seconds === 0){
// 		minutes -= 1;
// 		seconds = 59;
// 	} else if (seconds === 1) {
// 		seconds = '00';
// 	} else {
// 		seconds -= 1;
// 	}

// 	$('#main-minutes').html(minutes);
// 	$('#main-seconds').html(seconds);

// }