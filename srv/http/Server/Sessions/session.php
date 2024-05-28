<?php
    include_once '/srv/http/Server/connect_db.php';
    include_once '/srv/http/Server/GenerateUniqueID.php';
    include_once '/srv/http/Server/getUserID.php';

    function start_session($user)
    {
        $uid = getUserID($user);
        end_sessions_with_UID($uid);
        $sid = gen_random('SID', 'SESSIONS');
        $conn = connect_db();
        $get_user_id = $conn->prepare("INSERT INTO SESSIONS (SID, UID, START) VALUES (?, ?, ?)");
        $get_user_id->bind_param("sss", $sid, $uid, date('Y-m-d h:i:s', time()));
        $get_user_id->execute();
        $get_user_id->close();
        return $sid;
    }

    function end_session($sid)
    {
        /*$conn = connect_db();
        $deleteSession = $conn->prepare("DELETE FROM SESSIONS WHERE SID = {$sid}");
        $deleteSession->execute();

        $deleteSession->close();*/
    }


    function is_session_active($sid)
    {
        $conn = connect_db();
        $getSessions = $conn->prepare("SELECT SID FROM SESSIONS WHERE SID = \"{$sid}\"");
        $getSessions->execute();
        if($getSessions->fetch()) {
            $getSessions->close();
            return true;
        }
        else{
            $getSessions->close();
            return false;
        }
    }

    function end_sessions_with_UID($uid){
        $conn = connect_db();
        $deleteSessions = $conn->prepare("DELETE FROM SESSIONS WHERE UID = \"${uid}\"");
        $deleteSessions->execute();
        $deleteSessions->close();
    }

    function getUIDFromSession($sid)
    {
        /*$conn = connect_db();
        $getSessions = $conn->prepare("SELECT UID FROM SESSIONS WHERE SID = {$sid}");
        $getSessions->execute();
        $getSessions->bind_result($uid);
        if($getSessions->fetch())
            return $uid;
        else
            return '';*/
    }
?>
