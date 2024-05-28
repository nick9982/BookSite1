<?php
    include_once 'connect_db.php';
    
    function getUserID($username){
        $conn = connect_db();

        $get_user_id = $conn->prepare("SELECT UID FROM ACCOUNTS WHERE EMAIL = ?");
        $get_user_id->bind_param("s", $username);
        $get_user_id->execute();
        $get_user_id->bind_result($uid);
        if($get_user_id->fetch())
        {
            $get_user_id->close();
            return $uid;
        }
        else
        {
            $get_user_id->close();
            return '';
        }
    }
?>
