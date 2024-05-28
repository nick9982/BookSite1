<?php
include_once 'connect_db.php';
include_once 'Sessions/session.php';

$credentials = json_decode(file_get_contents('php://input'), true);

$email = $credentials['email'];
$pass = $credentials['pass'];
$conn = connect_db();

$authenticate = $conn->prepare("SELECT UID FROM ACCOUNTS WHERE EMAIL = ? AND PASSWORD = ?");
$authenticate->bind_param("ss", $email, hash('sha256', $pass));
$authenticate->execute();
if(!$authenticate->fetch())
{
    $authenticate->close();
    echo 0; //invalid account 
}
else
{
    $authenticate->close();
    echo start_session($email);
}

close_db();
?>
