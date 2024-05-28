<?php
    include 'Server/doesCartContainItems.php';
    include_once 'Server/Sessions/verifySession.php';
?>

<?php
//home page = 0, shop = 1, settings = 2, cart = 3
function PageHeader($selectedpage){
    $authenticated = verifySession();
    $doesCartContainItems = doesCartContainItems();

    echo "<header>
            <div class=\"logo\">ANNA ROGERS</div>
            <nav class=\"navbar\">
                <ul>";
    switch($selectedpage)
    {
        case 0:
            echo "<li id=\"activeTab\"><a href=\"home.php\">Home</a></li>
                    <li><a href=\"shop.php\">Shop</a></li>";
                    if($doesCartContainItems) echo "<li><a href=\"cart.php\">Cart</a></li>";
                    if($authenticated) echo "<li><a href=\"settings.php\">Settings</a></li>";
            break;
        case 1:
            echo "<li><a href=\"home.php\">Home</a></li>
                    <li id=\"activeTab\"><a href=\"shop.php\">Shop</a></li>";
                    if($doesCartContainItems) echo "<li><a href=\"cart.php\">Cart</a></li>";
                    if($authenticated) echo "<li><a href=\"settings.php\">Settings</a></li>";
            break;
        case 2:
            echo "<li><a href=\"home.php\">Home</a></li>
                    <li><a href=\"shop.php\">Shop</a></li>";
                    if($doesCartContainItems) echo "<li><a href=\"cart.php\">Cart</a></li>";
                    if($authenticated) echo "<li id=\"activeTab\"><a href=\"settings.php\">Settings</a></li>";
            break;
        case 3:
            echo "<li><a href=\"home.php\">Home</a></li>
                <li><a href=\"shop.php\">Shop</a></li>
                <li id=\"activeTab\"><a href=\"cart.php\">Cart</a></li>";
                if($authenticated) echo "<li><a href=\"settings.php\">Settings</a></li>";
            break;

        default:
            echo "<li><a href=\"home.php\">Home</a></li>
                    <li><a href=\"shop.php\">Shop</a></li>";
            break;

    }

    echo          "</ul>
        <div class=\"burgerMenuContainer\">
            <div class=\"menuText\">Menu</div>
            <img id=\"burger\" src=\"svg.php?image=bars-solid.svg\"></img>
        </div>";

    if(!$authenticated)
    {
        echo "
            <div class=\"auth-button-cont\">
                <button class=\"signin-btn auth-btn\" onclick=\"signInNav()\">Sign In</button>
                <button class=\"signup-btn auth-btn\" onclick=\"signUpNav()\">Sign Up</button>
            </div>
            <script>
                function signInNav()
                {
                    window.location = \"signin.php\";
                }

                function signUpNav()
                {
                    window.location = \"signup.php\";
                }
            </script>";
    }

    echo "</nav></header>
        <div id=\"pop-up-nav-container\">
            <ul>";

                    echo "<li><a href=\"home.php\">Home</a></li>
                    <li><a href=\"shop.php\">Shop</a></li>";
                    if($selectedpage == 3 || $doesCartContainItems) echo "<li><a href=\"cart.php\">Cart</a></li>";
                    if(!$authenticated)
                    {
                       echo  "<li><a href=\"signin.php\">Sign In</a></li>
                        <li><a href=\"signup.php\">Sign Up</a></li>";                 
                    }
                    else
                    {
                        echo "<li><a href=\"settings.php\">Settings</a></li>";
                    }

    echo        "</ul>
        </div>
        <script src=\"Scripts/NavBar.js\"></script>";
}
?>
