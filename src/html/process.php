<?php



$to ="joaocostajjsc@gmail.com";
$subject = "Email from EscapeRoom";

$name = $_POST['name'];
$email = $_POST['email'];
$notes = $_POST['notes'];

$headers .= "Content-type: text/html\r\n";
$header  = "MIME-Version: 1.0\r\n";
 $header .= "Content-type: text/html; charset: utf8\r\n";
$headers .= "From: $email";
mail($to, $Subject, $notes, $headers);

echo"Email has been sent";
 ?>
