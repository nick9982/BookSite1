<?php
    include_once 'connect_db.php';
    include_once 'Sessions/verifySession.php';
    //based on session id get the user's information

    $input = json_decode(file_get_contents('php://input'), true); // passing in limit as the maximum number of rows I would like to retrieve
    header('Content-Type: application/json');

    //echo json_encode($input);
    if(verifySession())
    {
        $conn = connect_db();

        $getUID = $conn->prepare("SELECT UID FROM SESSIONS WHERE SID = \"{$_COOKIE['SID']}\"");
        $getUID->execute();
        $getUID->bind_result($uid);
        if(!$getUID->fetch())
        {
            $getUID->close();
            echo json_encode(array("error" => "UID does not exist"));
            //Error of some sort
        }
        else
        {
            $getUID->close();
            $getPurchaseHistory = $conn->prepare("SELECT ORDER_NUMBER, PRODUCTS, DATE, PRICE FROM PURCHASES WHERE UID = \"{$uid}\" ORDER BY DATE DESC LIMIT {$input['limit']}");
            $getPurchaseHistory->execute();
            $getPurchaseHistory->bind_result($order_num, $products, $date, $price);
            $items = array();
            while($getPurchaseHistory->fetch())
            {
                array_push($items,
                    array(
                        "order_num" => $order_num,
                        "products" => json_decode($products, true),
                        "date" => $date,
                        "price" => $price
                    )
                );
            }

            $getPurchaseHistory->close();

            $json_products = json_encode($items);
            echo $json_products;
        }
    }
    else
    {
        echo json_encode(array("error" => "User session is not active"));
    }
?>
