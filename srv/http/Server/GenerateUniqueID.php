<?php
    include_once 'connect_db.php';
    function gen_random($columnName, $tableName){
        $id = 0;
        $conn = connect_db();
        do {
            $id = bin2hex(random_bytes(16));
            $check_id = $conn->prepare("SELECT {$columnName} FROM {$tableName} WHERE {$columnName} = \"{$id}\"");
            $check_id->execute();
        } while ($check_id->fetch());
        $check_id->close();

        return $id;
    }
?>
