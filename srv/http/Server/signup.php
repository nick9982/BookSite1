<?php
include 'GenerateUniqueID.php';
include_once 'connect_db.php';
include 'doesCartContainItems.php';

$credentials = json_decode(file_get_contents('php://input'), true);

$email = $credentials['email'];
$pass = $credentials['pass'];
$conn = connect_db();

$email_validation = $conn->prepare("SELECT UID FROM ACCOUNTS WHERE EMAIL = ?");
$email_validation->bind_param("s", $email);
$email_validation->execute();
if($email_validation->fetch())
{
    echo 0; // the email is taken
}
else
{
    $create_acc = $conn->prepare("INSERT INTO ACCOUNTS (UID, EMAIL, PASSWORD) VALUES (?, ?, ?)");
    $create_acc->bind_param("sss", gen_random('UID', 'ACCOUNTS'), $email, hash('sha256', $pass));
    $create_acc->execute();
    $create_acc->close();
    echo 1; // successfully created an account
}

$email_validation->close();
close_db();
?>
