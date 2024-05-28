
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Display PDF</title>
</head>
<body>

<?php
    //$book = isset($_GET['book']) ? $_GET['book'] : null;
    //if($book == null) header("Location: portfolio.php");

echo "<iframe src=\"pdf.php?pdf=sample.pdf\" width=\"100%\" height=\"500px\" frameborder=\"0\"></iframe>";

?>

</body>
</html>
