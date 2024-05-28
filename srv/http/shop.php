<?php
    include 'header.php';
    include 'footer.php';
?>

<?php

    function shortenDescription($str, $link)
    {
        $description_length = 800;
        $stripped_tags = strip_tags($str);
        if(strlen($stripped_tags) <= $description_length)
        {
            echo "<p class=\"description\">".$stripped_tags."</p>";
            return;
        }
        $resulting_description = '';
        for($i = 0; $i < $description_length; $i++)
        {
            $resulting_description .= $stripped_tags[$i];
        }

        echo "<p class=\"description\">".$resulting_description."...<span class=\"more-section\">(<a class=\"more-link\" href=\"".$link."\">more</a>)</span></p>";
    }

    function card($item, $idx)
    {
        $bookLink = "book.php?book=".htmlspecialchars(str_replace(' ', '+', $item['title']), ENT_QUOTES, 'UTF-8');
        echo "<div class=\"book-card-container\">
                <div class=\"book-card-content\" id=\"book-content".strval($idx)."\">
                    <div class=\"book-card-left-pane\">
                        <div class = \"book-image-container\">
                            <a href=\"".$bookLink."\" class=\"imgLink\"><img src=\"image.php?image=".$item['imageName']."\" alt=\"".$item['imageName']."\" class=\"bookImage\"></img></a>
                        </div>
                    </div>
                        <a href=\"".$bookLink."\" class=\"titleLink\"><h3 class=\"bookTitle\" id=\"h3-book-".strval($idx)."\">".$item['title']."</h3></a>
                    <div class=\"book-card-middle-pane\">";

                shortenDescription($item['description'], $bookLink);

       echo      "</div>
                <div class=\"book-card-right-pane\">
                    <a href=\"".$bookLink."\"><button class=\"view-book book-card-button\">View Book</button></a>
                    <a href=\"#\"><button class=\"purchase-copy book-card-button\">Read Sample</button></a>
                </div>
               </div>
            </div>";
    }
?>

<!DOCTYPE HTML>
<html>
<head>
    <title>Books For Today and the Future By Anna Rogers - Anna Rogers</title>
    <link rel="stylesheet" href="Styles/styles.css">
    <link rel="stylesheet" href="Styles/portfolio.css">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
</head>
<body>
<?php
    PageHeader(1); //1 signifies that current page is portfolio page
?>
<div id="portfolio-container">
    <div id="portfolio-content">
        <div class="notLandingPageHeaderContainer">
            <h1 class="headerNotLandingPage">Books and Future Works</h1>
        </div>
        <div id="card-container">
            <div id="cards">
<?php
    $dataStr = file_get_contents(__DIR__ . '/../books.json');
    $data = json_decode($dataStr, true);

    if($data === null && json_last_error() !== JSON_ERROR_NONE)
    {
        die('Error decoding JSON: ' . json_last_error_msg());
    }
    $x = 0;
    foreach($data as $book)
    {
        card($book, $x++);
    }
?>
            </div>
        </div>
    </div>
</div>
<script src="Scripts/cardScript.js"></script>
<?php
    PageFooter();
?>
<script>
    window.onload = () =>
    {
        setupSmallResNavbar();
        setData();
        addObserversToDescriptions();
        if(window.mobileCheck())
        {
            const right_panes = document.getElementsByClassName("book-card-right-pane");
            for(let i = 0; i < right_panes.length; i++)
            {
                right_panes[i].style.visibility = "visible";
                right_panes[i].style.width = "auto";
            }
        }
    }
</script>
</body>
</html>
