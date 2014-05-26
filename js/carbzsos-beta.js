
$(function(){
	//bind events
	$('.input-needs-validation').bind( "tap", input_validation );
	$('.input-needs-validation').bind( "click", input_validation );

	$('#units-button').bind( "tap", unit_radio_check );
	$('#units-button').bind( "click", unit_radio_check );


	function unit_radio_check(event){
		event.stopImmediatePropagation();
    	event.preventDefault();

		var closest_input_val = $(this).parent().find('input')

		if(!($('#radio1').is(':checked') || $('#radio2').is(':checked'))){
			alert('Please choose a unit of measurement');
			return false;
		}

		$.mobile.changePage($(this).attr('href'), { transition: 'slide', reverse: false });
	}
	function input_validation(event){
		event.stopImmediatePropagation();
    	event.preventDefault();

		var closest_input_val = $(this).parent().find('input').val();

		if(closest_input_val.length == 0){
			alert('This value must be a number and cannot be empty');
			return false;
		}
		else if(! $.isNumeric(closest_input_val)){
			alert('This value must be a number');
			return false;
		}
		else if($(this).attr("id") == 'before_meal_blood_suger_button'){
			var blood_val = $('#textinput2').val();

	        if(blood_val < 4){
	        	alert('Your blood sugar is too low');
	        	return false;
	        	
	        }
	      	else if(blood_val > 25){
	      		alert('Your blood sugar is very high! Please seek medical attention!');
	      		return false;
	      		
	      	}
		}
		else if($(this).attr("id") == 'after_meal_blood_suger_button'){
			var blood_val = $('#textinput3').val();

	        if(blood_val < 5){
	        	alert('Your blood sugar is too low');
	        	return false;
	        }
	      	else if(blood_val > 25){
	      		alert('Your blood sugar is very high! Please seek medical attention!');
	      		return false;
	      	}
		}
		else if($(this).attr("id") == 'calc_levels'){
			var isfcf = $('#textinput1').val();
			var beforemeal = $('#textinput2').val();
			var aftermeal = $('#textinput3').val();
			var insulin = $('#textinput4').val();
			var carbs = $('#textinput5').val();

			var response = calculate('mmol',  parseFloat(isfcf), parseFloat(beforemeal), parseFloat(aftermeal), parseFloat(insulin), parseFloat(carbs));	
		   // alert(response);
		    $('#calculation_result_text').text(response);
		}
		$.mobile.changePage($(this).attr('href'), { transition: 'slide', reverse: false });
		//window.location = $(this).attr('href');
	}

	function calc_levels(event){
		
		
		var isfcf = $('#textinput1').val();
		var beforemeal = $('#textinput2').val();
		var aftermeal = $('#textinput3').val();
		var insulin = $('#textinput4').val();
		var carbs = $('#textinput5').val();

		var response = calculate('mmol', parseFloat(isfcf), parseFloat(beforemeal), parseFloat(aftermeal), parseFloat(insulin), parseFloat(carbs));	
	    alert(response);
	    $('#calculation_result_text').text(response);
	 }
	
	function calculate(measurement, isfcf, beforemeal, aftermeal, insulin, carbs) {
	
	if(measurement == 'mmol'){
		if(beforemeal < 4){
			//return 'ALERT! Your After Meal Blood Sugar is Low!';
		}
		else if(beforemeal >= 4 && beforemeal <= 7){
			var B = 7;		
		}else{
			var B = beforemeal;
		}
		
		
		if(aftermeal < 5){
			//return 'ALERT! Your After Meal Blood Sugar is Low!';
		}
		else if(aftermeal >= 5 && aftermeal <= 10){
			var E = 10;
		}
		else{
			var E = aftermeal;
		}
		
		
		var A = isfcf;

		var I = insulin;	
		
		var K = carbs;	
		
		var C = B - 7;
		
		var D = C / A;	
		
		var F = E - 10;
		
		var G = F / A;
		
		var H = G - D;
		
		var J = I + H;
		
		var L = K / J;
		
		var M = (Math.round( L * 10 ) / 10).toFixed(1);	
		
		return '1:' + M;
	}
	else{
		return calculate_mg(isfcf, beforemeal, aftermeal, insulin, carbs);
	}
}

function calculate_mg(isfcf, beforemeal, aftermeal, insulin, carbs) {
	
	
		if(beforemeal < 4){
			//return 'ALERT! Your After Meal Blood Sugar is Low!';
		}
		else if(beforemeal >= 4 && beforemeal <= 7){
			var B = 7;		
		}else{
			var B = beforemeal;
		}
		
		
		if(aftermeal < 5){
			//return 'ALERT! Your After Meal Blood Sugar is Low!';
		}
		else if(aftermeal >= 5 && aftermeal <= 10){
			var E = 10;
		}
		else{
			var E = aftermeal;
		}
		
		
		var A = isfcf;

		var I = insulin;	
		
		var K = carbs;	
		
		var C = B - 7;
		
		var D = C / A;	
		
		var F = E - 10;
		
		var G = F / A;
		
		var H = G - D;
		
		var J = I + H;
		
		var L = K / J;
		
		var M = (Math.round( L * 10 ) / 10).toFixed(1);	
		
		return '1:' + M;
}

	function before_meal_blood_sugar_alert( event ){
		event.stopImmediatePropagation();
    	event.preventDefault();
		var blood_val = $('#textinput2').val();

        if(blood_val < 4){
        	alert('Your blood sugar is too low');
        	return false;
        }
      	else if(blood_val > 25){
      		alert('Your blood sugar is very high! Please seek medical attention!');
      		return false;
      	}

      	window.location = $(this).attr('href');
	}

	function after_meal_blood_sugar_alert( event ){
		event.stopImmediatePropagation();
    	event.preventDefault();
		var blood_val = $('#textinput3').val();

        if(blood_val < 5){
        	alert('Your blood sugar is too low');
        	return false;
        }
      	else if(blood_val > 25){
      		alert('Your blood sugar is very high! Please seek medical attention!');
      		return false;
      	}

      	window.location = $(this).attr('href');
	}
});
