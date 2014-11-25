$(function(){
	//bind events
	$('.input-needs-validation').on( "click", input_validation );
	//$('.input-needs-validation').bind( "click", input_validation );

	$('#units-button').on( "click", unit_radio_check );
	//$('#units-button').bind( "click", unit_radio_check );


	function unit_radio_check(event){
		event.stopImmediatePropagation();
    	//event.preventDefault();

		var closest_input_val = $(this).parent().find('input')

		if(!($('#radio1').is(':checked') || $('#radio2').is(':checked'))){
			alert('Please choose a unit of measurement');
			return false;
		}

		$.mobile.changePage($(this).attr('href'), { transition: 'slide', reverse: false });
		//var pageID = $(this).attr('href');
	}
    
	function input_validation(event){
		event.stopImmediatePropagation();
    	event.preventDefault();
    	
        //find the closest input to the button as this is the one the user has inputed a value and the previous ones exsist with values
		var closest_input_val = $(this).parent().find('input').val();
		
        //which units are we using
		var units = ($('#radio1').is(':checked')) ? 'mmol' : 'mg';
        
		//not empty and greater than 0
		if(closest_input_val.length == 0 || closest_input_val <= 0){
			alert('This value must be a positive number and cannot be empty');
			return false;
		}
        
		//is numeric
		else if(! $.isNumeric(closest_input_val)){
			alert('This value must be a number');
			return false;
		}
        
		//next two ifs alert them they are in danger is blood suger is too low or high
		else if($(this).attr("id") == 'before_meal_blood_suger_button'){
			var blood_val = $('#textinput2').val();
			if(units == 'mmol'){
		        if(blood_val < 4){
		        	alert('Your blood sugar is low! Please treat the low blood sugar.');
		        	return false;
		        	
		        }
		      	else if(blood_val > 25){
		      		alert('Your blood sugar is high! Please seek medical attention!');
		      		//return false;
		      		
		      	}
	      	}
            //units are in mg
	      	else{
	      		//blood_val = blood_val / 18;
	      		if(blood_val < 72){
		        	alert('Your blood sugar is low! Please treat the low blood sugar.');
		        	return false;
		        	
		        }
		      	else if(blood_val > 450){
		      		alert('Your blood sugar is high! Please seek medical attention!');
		      		//return false;
		      		
		      	}
	      	}
		}
		else if($(this).attr("id") == 'after_meal_blood_suger_button'){
			var blood_val = $('#textinput3').val();
			if(units == 'mmol'){
		        if(blood_val < 5){
		        	alert('Your blood sugar is low! Please treat the low blood sugar.');
		        	return false;
		        }
		      	else if(blood_val > 25){
		      		alert('Your blood sugar is high! Please seek medical attention!');
		      		//return false;
		      	}
		      }
		      else{
		      	//blood_val = blood_val / 18;
				if(blood_val < 90){
		        	alert('Your blood sugar is low! Please treat the low blood sugar.');
		        	return false;
		        }
		      	else if(blood_val > 450){
		      		alert('Your blood sugar is high! Please seek medical attention!');
		      		//return false;
		      	}
		      }
		}
		//calculate their level if at that step
		else if($(this).attr("id") == 'calc_levels'){
			var isfcf 		= $('#textinput1').val();
			var beforemeal 	= $('#textinput2').val();
			var aftermeal 	= $('#textinput3').val();
			var insulin 	= $('#textinput4').val();
			var carbs 		= $('#textinput5').val();
			
			var response 	= calculate(units,  parseFloat(isfcf), parseFloat(beforemeal), parseFloat(aftermeal), parseFloat(insulin), parseFloat(carbs));	
		   // alert(response);
		    $('#calculation_result_text').html(response);
		    
		}
		//if all passes move to the next slide
		$.mobile.changePage($(this).attr('href'), { transition: 'slide', reverse: false });
		var pageID = $(this).attr('href');
		/*setTimeout(function(){
			$(pageID).find('input').focus();
		}, 350);*/
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
		
		var decimal = M.indexOf('.');

		if(decimal !== -1){
			M = M + '</span>';
			M = M.replace('.', '<span class="decimal">.');
		}
		
		$('#calculation_result_text2').html(M);
		
		return '1:' + M;
	}
	else{
		return calculate_mg(isfcf, beforemeal, aftermeal, insulin, carbs);
	}
}

function calculate_mg(isfcf, beforemeal, aftermeal, insulin, carbs) {
	
		//beforemeal = beforemeal / 18;
		if(beforemeal < 72){
			//return 'ALERT! Your After Meal Blood Sugar is Low!';
		}
		else if(beforemeal >= 72 && beforemeal <= 126){
			var B = 126 / 18;		
		}else{
			var B = beforemeal / 18;
		}
		B = B.toFixed(1);
		//aftermeal = aftermeal / 18;
		if(aftermeal < 90){
			//return 'ALERT! Your After Meal Blood Sugar is Low!';
		}
		else if(aftermeal >= 90 && aftermeal <= 180){
			var E = 180 / 18;
		}
		else{
			var E = aftermeal / 18;
		}
		
		E = E.toFixed(1);
		
		var A = (isfcf/ 18).toFixed(1);

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
		
		var decimal = M.indexOf('.');

		if(decimal !== -1){
			M = M + '</span>';
			M = M.replace('.', '.<span class="decimal">');
		}

		$('#calculation_result_text2').html(M);
		
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
      		alert('Your blood sugar is high! Please seek medical attention!');
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
      		alert('Your blood sugar is high! Please seek medical attention!');
      		return false;
      	}

      	window.location = $(this).attr('href');
	}
});
