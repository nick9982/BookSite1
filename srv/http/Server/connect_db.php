<?php
function connect_db()
{
    $servername = 'localhost';
    $username = 'webserver';
    $password = 'The monkey from 807413 street ate the basketball and choked. The bill was $100 which is the #4 highest of them all. Okay?';
    $dbname = 'AnnaRogersSite';
    if(!isset($GLOBALS['db_connection']))
    {
        $conn = new mysqli($servername, $username, $password, $dbname);
        if($conn->connect_error)
            die("Connection failed: ". $conn->connect_error);

        $GLOBALS['db_connection'] = $conn;
        return $conn;
    }

    return $GLOBALS['db_connection'];
}

function close_db()
{
    if(isset($GLOBALS['db_connection']))
    {
        $GLOBALS['db_connection']->close();
        unset($GLOBALS['db_connection']);
    }
}
?>
