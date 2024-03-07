<?php
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	require 'phpmailer/src/Exception.php';
	require 'phpmailer/src/OAuth.php';
    require 'phpmailer/src/PHPMailer.php';
    require 'phpmailer/src/SMTP.php';

	$mail = new PHPMailer(true);
	$mail->CharSet = 'UTF-8';
	$mail->setLanguage('ru', 'phpmailer/language/');
	$mail->IsHTML(true);

    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'smtp.beget.com';                       // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                            // Enable SMTP authentication
    $mail->Username = 'send@nicehtml.ru';                // Наш логин                 
    $mail->Password = 'q1w2e3R$T%Y^';                    // Наш пароль от ящика
                            
    $mail->SMTPSecure = 'ssl';                           // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 465;     
    // $mail->SMTPAutoTLS = false;
    // $mail->SMTPSecure = false;
    // $mail->Port = 2525;                              // TCP port to connect to

	//От кого письмо
	$mail->setFrom('send@nicehtml.ru', 'Тест отправки писем');                          // TCP port to connect to
 
	//От кого письмо
	$mail->setFrom('send@nicehtml.ru', 'Тест отправки писем');
	//Кому отправить
	$mail->addAddress('iordanov.d.g@yandex.ru');
	//Тема письма
	$mail->Subject = 'Заявка с сайта';

	//Тело письма
	// $body = '<h1>Встречайте супер письмо!</h1>';
	
	if(trim(!empty($_POST['user-name']))){
		$body.='<p><strong>Имя:</strong> '.$_POST['user-name'].'</p>';
	}
	if(trim(!empty($_POST['user-phone']))){
		$body.='<p><strong>Телефон:</strong> '.$_POST['user-phone'].'</p>';
	}
    if(trim(!empty($_POST['user-email']))){
		$body.='<p><strong>Почта:</strong> '.$_POST['user-email'].'</p>';
	}
    if(trim(!empty($_POST['user-text']))){
		$body.='<p><strong>Сообщение:</strong> '.$_POST['user-text'].'</p>';
	}
    if(trim(!empty($_POST['wtf']))){
		$body.='<p><strong>С какой формы отправили данные:</strong> '.$_POST['wtf'].'</p>';
	}
	
	
	
	// if(trim(!empty($_POST['message']))){
	// 	$body.='<p><strong>Сообщение:</strong> '.$_POST['message'].'</p>';
	// }
	
	

	$mail->Body = $body;

	//Отправляем
	if (!$mail->send()) {
		$message = $mail->ErrorInfo;
	} else {
		$message = 'Данные отправлены!';
	}

	$response = ['message' => $message];

	header('Content-type: application/json');
	echo json_encode($response);
?>