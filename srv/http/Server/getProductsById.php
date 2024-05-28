<?php
include 'connect_db.php';

$input = json_decode(file_get_contents('php://input'), true);

$pids = $input['pids'];
$conn = connect_db();

$err_code = 0;
$product_list = array();
foreach ($pids as &$pid)
{
    $get_product = $conn->prepare("SELECT BOOK_TITLE, IMAGE_PATH, PRODUCT_TYPE, PRICE FROM PRODUCTS JOIN BOOKS ON BOOKS.BID = PRODUCTS.BID WHERE PID = ?");
    $get_product->bind_param("s", $pid);
    $get_product->execute();
    $get_product->bind_result($book_title, $image_path, $product_type, $price);

    if($get_product->fetch())
    {
        array_push($product_list,
        array(
            "pid" => $pid,
            "book_title" => $book_title,
            "image_path" => $image_path,
            "product_type" => $product_type,
            "price" => $price
        ));
    }

    $get_product->close();
}
close_db();

$json_products = json_encode($product_list);
header('Content-Type: application/json');

echo $json_products;
?>
