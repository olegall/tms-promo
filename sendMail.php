<?php
if(!$_POST) exit;

$name     = $_POST['name'];
$phone    = $_POST['phone'];
$email    = $_POST['email'];

$address = "marketing@bit-it.ru, mic.v.romanov@gmail.com, eduardf@bit-it.ru, bit@bit-it.ru, aleynikov.oleg@gmail.com";

$subject = 'Запрос с сайта БИТ Аудитор';
$e_subject = '=?utf-8?B?'.base64_encode($subject).'?=';

$msg = 'Имя: '.$name."\n".'Тел.: '.$phone."\n".'E-mail: '.$email;

$headers = "From: no-reply@bit-it.ru" . PHP_EOL;
$headers .= "Reply-To: $email" . PHP_EOL;
$headers .= "MIME-Version: 1.0" . PHP_EOL;
$headers .= "Content-type: text/plain; charset=utf-8" . PHP_EOL;
$headers .= "Content-Transfer-Encoding: quoted-printable" . PHP_EOL;

if(mail($address, $e_subject, $msg, $headers)) {
	echo "<fieldset>";
	echo "<div id='success_page'>";
	echo "<h4 class='highlight' style='text-align: center;'>Спасибо, <strong>$name</strong>, Ваше сообщение отправлено. В ближайшее время наш менеджер свяжется с Вами.</h4>";
	echo "</div>";
	echo "</fieldset>";
} else {
	echo 'ERROR!';
}