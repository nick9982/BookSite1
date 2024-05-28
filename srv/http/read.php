<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="Styles/styles.css">
    <link rel="stylesheet" href="Styles/read.css">
    <title>Book</title>
</head>
<body>

<?php
    $jsonFile = isset($_GET['name']) ? $_GET['name'].".json" : null;
    $pageNumber = isset($_GET['page']) ? $_GET['page'] : null;

    if($jsonFile == null) header("Location: portfolio.php");
    $secure_directory = __DIR__ . '/../book_data/';

    function displayNavigator($pageNumber, $records)
    {
        $result = "<div class=\"page-nav-container\">
            <div class= \"page-nav-content\"><ul class=\"page-nav\">";

        $max = $records-$pageNumber < 10? $records: $pageNumber+10;
        $min = $pageNumber - 10 > 1? $pageNumber: 1;
        
        $max_small = $records-$pageNumber < 3? $records-$pageNumber: 3;
        $min_small = $pageNumber - 3 > 1? 3: $pageNumber;

        if($pageNumber - $min_small !== $min-1){
            $result .= "<li><a href=\"read.php?name=".$_GET['name']."&page=".$min."\">".$min."</a></li>";
            $result .= "<span class=\"space-between-min-max\">...</span>";
        }else {//visibility hidden}
        }
        for($i = $min_small-1; $i > 0; $i--)
            $result .= "<li><a href=\"read.php?name=".$_GET['name']."&page=".($pageNumber-$i)."\">".($pageNumber-$i)."</a></li>";
        $result .= "<li id=\"currentPage\"><a href=\"read.php?name=".$_GET['name']."&page=".($pageNumber)."\">".$pageNumber."</a></li>";
        for($i = 1; $i <= $max_small; $i++)
            $result .= "<li><a href=\"read.php?name=".$_GET['name']."&page=".($pageNumber+$i)."\">".($pageNumber+$i)."</a></li>";
        if($max_small + $pageNumber < $max){
            $result .= "<span class=\"space-between-min-max\">...</span>";
            $result .= "<li><a href=\"read.php?name=".$_GET['name']."&page=".$max."\">".$max."</a></li>";
        }else{// visibility: hidden}
        }
        $result .= "</ul></div></div>";

        return $result;
    }

    function displayPage($pageNumber, $content, $records)
    {
        echo "<div class=\"book-container\">
                <div class=\"book-content\">
                <div class=\"topMenu\">
                    <span class=\"BookTitle\">".$_GET['name']."</span>
                    <div class=\"pageSelection\">
                        <input class=\"pageSelectionInput\" type=\"text\" value=\"".$pageNumber."\" size=\"1\" onkeyup=\"handleKeyPress(event)\"><span class=\"pageMax\">/".$records."</span>
                    </div>
                </div><div class=\"book-display\">";
                if(1 !== $pageNumber){
                    echo "<button class=\"nav-button hover-effect\" id=\"page-left\"><i class=\"fa-solid fa-chevron-left\"></i></button>";
                }
                else
                {
                    echo "<button id=\"page-left\" style=\"color:grey;\"><i class=\"fa-solid fa-chevron-left\"></i></button>";
                }
                echo"    <div class=\"book-page-container\">
                        <div class=\"book-page-content\">
                            ".$content."
                            <div id=\"pageNumber-container\">
                                <span id=\"pageNumber\">".$pageNumber.".</span>
                            </div>
                        </div>
                        ".displayNavigator($pageNumber, $records)."
                    </div>";
                    if($records != $pageNumber){
                        echo "<button class=\"nav-button hover-effect\" id=\"page-right\"><i class=\"fa-solid fa-chevron-right\"></i></button>";
                    }
                    else
                    {
                        echo "<button id=\"page-right\" style=\"color:grey;\"><i class=\"fa-solid fa-chevron-right\"></i></button>";
                    }
        echo" </div>
            <div class=\"bottomMenu\"></div></div>
            </div>";
    }


if (file_exists($secure_directory . $jsonFile)) {
    $jsonData = file_get_contents($secure_directory . $jsonFile);
    $decodedData = json_decode($jsonData, true);

    if($pageNumber > count($decodedData) || $pageNumber < 1) header("Location: portfolio.php");
    if ($decodedData !== null) {
        // Successfully decoded JSON data
        foreach($decodedData as $page)
        {
            if($page['pageNumber'] == $pageNumber)
            {
                displayPage($page['pageNumber'], $page['content'], count($decodedData));
                //echo "found";
                break;
            }
        }
    } else {
        // Error decoding JSON
        echo "Error decoding JSON data.";
    }
} else {
    // File not found
    echo "JSON file not found.";
}
?>
<script src="Scripts/bookButtons.js"></script>
</body>
</html>
