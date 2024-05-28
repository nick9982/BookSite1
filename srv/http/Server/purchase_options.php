<?php
include 'connect_db.php';

$request_info = json_decode(file_get_contents('php://input'), true);

$bookTitle = $request_info['bookTitle'];
$conn = connect_db();

$get_product_list = $conn->prepare("SELECT PID, PRODUCT_TYPE, STATUS, PRICE FROM PRODUCTS WHERE BID IN (SELECT BID FROM BOOKS WHERE BOOK_TITLE = ?)");

$get_product_list->bind_param("s", $bookTitle);
$get_product_list->execute();
$get_product_list->bind_result($pid, $product_type, $status, $price);

$product_list = array();
while($get_product_list->fetch())
{
    array_push($product_list,
    array(
        "pid" => $pid,
        "product_type" => $product_type,
        "status" => $status,
        "price" => $price
    ));
}

$json_products = json_encode($product_list);
header('Content-Type: application/json');

echo $json_products;

$get_product_list->close();
close_db();
?>
