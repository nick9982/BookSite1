<?php
    function doesCartContainItems()
    {
        if(!isset($_COOKIE["cart"])) return false;
        $cart_cookie = json_decode(htmlspecialchars($_COOKIE["cart"]));
        if(count($cart_cookie) > 0) return true;
        return false;
    }
?>
