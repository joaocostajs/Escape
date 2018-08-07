<?php
print"Funciona";
if(isset($_POST["submit"]))

$to ="joaocostajjsc@gmail.com";
$subject = "Email from EscapeRoom";

$name = $_POST['name'];
$email = $_POST['email'];
$notes = $_POST['notes'];

$headers .= "Content-type: text/html\r\n";
$headers .= "From: $email";
mail($to, $Subject, $notes, $headers);

echo"Email has been sent";


 ?>
