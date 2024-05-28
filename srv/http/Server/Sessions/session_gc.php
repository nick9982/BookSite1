<?php
    include_once '/srv/http/Server/connect_db.php';

    function removeOldSessions()
    {
        $conn = connect_db();
        $expiration_time = time() - (60 * 60); // 1 hour ago
        $getSessions = $conn->prepare("DELETE FROM SESSIONS WHERE START < ?");
        $getSessions->bind_params("s", $expiration_time);
        $getSessions->execute();
    }
?>
