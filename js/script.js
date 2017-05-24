//JS and jQuery for RQ
$('document').ready(function(){
	var defaultWorkTime = 25;
	var defaultRestTime = 5;
	displayWorkTime(defaultWorkTime);
	displayRestTime(defaultRestTime);
	displayTime();
});

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
	displayTime();
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
	console.log('from startClock()');
	if($('#pause-resume').hasClass('in-pause')){
		$('#pause-resume').removeClass('in-pause');
	}

	$('#pause-resume').addClass('in-play');

	$('#pause-resume').html('<i class="fa fa-pause fa-4x"></i>');

	setClockColor('start');

}

var pauseClock = function(){
	console.log('from pauseClock()');
	if($('#pause-resume').hasClass('in-play')){
		$('#pause-resume').removeClass('in-play');
	}

	$('#pause-resume').addClass('in-pause'); 

	$('#pause-resume').html('<i class="fa fa-play fa-4x"></i>');

	setClockColor('pause');
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
}

var incrementWorkTime  = function(){
	var workTime = parseInt($('#work-time-display').html());
	workTime += 1;
	displayWorkTime(workTime);
}

var decrementWorkTime = function(){
	var workTime = parseInt($('#work-time-display').html());
	if(workTime === 1){
		alert('You can\'t go below 1 minute.');
	} else {
		workTime -= 1;
		displayWorkTime(workTime);
	}
}

var incrementRestTime = function(){
	var restTime = parseInt($('#rest-time-display').html());
	restTime += 1;
	displayRestTime(restTime);
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
}

var displayWorkTime = function(workTime){
	console.log('from displayWorkTime()');
	
	$('#work-time-display').html(workTime);
}

var displayRestTime = function(restTime){
	console.log('from displayRestTime');
	// var restTimeMinutes = restTime.getMinutes();
	// var restTimeSeconds = restTime.getSeconds();
	// var fullRestTime = restTimeMinutes + ":" + restTimeSeconds;
	$('#rest-time-display').html(restTime);
}

var displayTime = function(time){
	console.log('from displayTime()');
	if($('#main-clock-display').hasClass('in-work')){
		//take time from workTime and display it
		$('#main-minutes').html($('#work-time-display').html());

	} else {
		//take time from restTime and display it
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
	} else {
		$('#main-clock-display').css('border-color', 'black');
	}
}