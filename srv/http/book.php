<?php
    include 'header.php';
    include 'footer.php';
    include 'purchase_options.php';

    $url = "";
    $bookName = isset($_GET['book']) ? $_GET['book'] : null;
    if($bookName == null) header("Location: portfolio.php");
    else
    {
        $dataStr = file_get_contents(__DIR__ . '/../books.json');
        $data = json_decode($dataStr, true);

        if($data === null && json_last_error() !== JSON_ERROR_NONE)
        {
            die('Error decoding JSON: ' . json_last_error_msg());
        }

        foreach($data as $book)
        {
            if($book['title'] == $bookName)
            {
                displayBook($book);
                break;
            }
        }
    }

    function displayBook($book)
    {
    echo"<!DOCTYPE HTML>
        <html>
        <head>
            <title>Who is Anna Rogers? - Anna Rogers</title>
            <link rel=\"stylesheet\" href=\"Styles/styles.css\">
            <link rel=\"stylesheet\" href=\"Styles/book.css\">
            <link rel=\"stylesheet\" href=\"Styles/purchaseOptions.css\">
            <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no\">
        </head>";
    
    PageHeader(1);

echo "<div id=\"book-purchase-content-container\">
        <div class=\"book-container\">
            <div class=\"book-content\">
                <div class = \"book-image-and-read-sample\">
                    <div class=\"book-image-container\">
                        <img src=\"image.php?image=".$book['imageName']."\" alt=\"".$book['imageName']."\" class=\"bookImage\"></img>
                    </div>
                        <button class=\"readSampleBtn\">Read Sample</button>
                    </div>
                    <div class=\"title-container\">
                        <h1 class=\"book-title\">".$book['title']."</h1>
                    </div>
                    <div class=\"right-pane\">
                        <div class=\"description-container\">
                            ".$book['description']."
                        </div>
                    </div>
                ";
                renderPurchaseInfo();
        echo "</div>
        </div>
    </div>
    <script>
    window.onload = () =>
    {
        setupSmallResNavbar();
        establishPurchaseOptions();
        cartVisibility();
        document.addEventListener('click', closeAllSelect);
    }
    </script>";


    PageFooter();
    }
?>
