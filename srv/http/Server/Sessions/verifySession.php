<?php
    include '/srv/http/Server/Sessions/session.php';

    function verifySession()
    {
        if(!isset($_COOKIE['SID'])) return false;
        if(is_session_active($_COOKIE['SID'])) return true;
        return false;
    }
?>
