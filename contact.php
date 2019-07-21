<?php
    $to = "tygelica@gmail.com"; 
    //$from = $_REQUEST['emailInput']; 
    $from = 'Cantilevers Website';
    $name = $_REQUEST['nameInput']; 
    $headers = "From: $from"; 
    $subject = "The Cantilevers - New Inquiry "; 
    $fields = array(); 
    $fields{"name"} = 'Name: '.$_REQUEST['nameInput']; 
    $fields{"email"} = 'Email: '.$_REQUEST['emailInput']; 
    $fields{"message"} = 'Message: '.$_REQUEST['messageField'];

    //$body = "RSVP FOR ENCON 2016\n\n"; foreach($fields as $a => $b){   $body .= sprintf("%20s: %s\n",$b,$_REQUEST[$a]); }
    $body = "Contact inquery form The Cantilevers\n\n"; foreach($fields as $a => $b){   $body .= sprintf("%20s \n",$b,$_REQUEST[$a]); }
    $send = mail($to, $subject, $body, $headers);
?>