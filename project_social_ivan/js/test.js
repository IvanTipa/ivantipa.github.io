$(document).ready(function(){ 
		var local_score  = 0,
		global_score = 0;

		for(let i = 0; i < 20; i++){
			$(`.tab:eq(${i})`).attr('data-action', 'confirm');
		}

		$(".answer:nth-child(1) > input[name='test_radio_tab']").attr('data-value', '1');
		$(".answer:nth-child(2) > input[name='test_radio_tab']").attr('data-value', '2');
		$(".answer:nth-child(3) > input[name='test_radio_tab']").attr('data-value', '3');


		$("input[name='test_radio_tab']").click(function(){
			local_score = +$(this).attr('data-value');
		});
		$('.tab[data-action="confirm"]').click(function(){
			global_score += local_score;
			local_score = 0;
		});
		$('#get_res').click(function(){
			$( ".results_text").html("Ваш результат:<br />" + global_score);
		});

}
);