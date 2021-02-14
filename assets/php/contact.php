<?php

if(isset($_POST['message'])){

	$name = $_POST['name'];
	$email = $_POST['email'];
	$message = $_POST['message'];
    
	
	$to      = 'tipa.ivan0806@gmail.com';
	$subject = 'Site Contact Form';

	$headers = 'From: '. $email . "\r\n" .
    'Reply-To: '. $email . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

	$status = mail($to, $subject, $message, $headers);

	if($status == TRUE){	
		$res['sendstatus'] = 'сделано';
	
		//Edit your message here
		$res['message'] = 'Форма отправлена ​​успешно';
    }
	else{
		$res['message'] = 'Не удалось отправить почту. Напишите мне на адрес tipa.ivan0806@gmail.com';
	}
	
	
	echo json_encode($res);
}

?>