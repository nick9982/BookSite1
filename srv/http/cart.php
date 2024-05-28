<?php
    include 'header.php';
    include 'footer.php';
?>

<!DOCTYPE HTML>
<html>
<head>
    <title>Cart - Anna Rogers</title>
    <link rel="stylesheet" href="Styles/styles.css">
    <link rel="stylesheet" href="Styles/cart.css">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
</head>
<body>

<?php
    PageHeader(3);
    function getYears(){

        // Get the next 5 years
        for ($i = 0; $i < 8; $i++) {
            echo "<option>" . date('Y', strtotime('+' . $i . ' year')) . "</option>";
        }
    }
?>

<div class="cart_container">
    <div class="cart_content">
        <div class="title-container">
            <h2>Shopping Cart</h2>
        </div>
        <div class="table-container">
            <table>
                <tr>
                    <th><span>Product</span></th>
                    <th><span>Price</span></th>
                    <th><span>Quantity</span></th>
                    <th><span>Subtotal</span></th>
                </tr>
            </table>
        </div>
        <h4>Cart Totals</h4>
        <div class="total">
            <table></table>
        </div>
        <div class="clear_cart_container">
            <button id="clear_cart" onclick=clearCart()>Clear Cart</button>
        </div>
        <div class="proceed_container">
            <button id="proceed_to_checkout" onclick=enableCreditCardPopup()>Proceed to checkout</button>
        </div>
    </div>
</div>
<div class="credit-card-form-container">
    <div class="credit-card-form">
        <div id="title">
            <h3>Credit card details</h3>
            <div id="closeSel"><object type="image/svg+xml" data="svg.php?image=x-solid.svg"></object></div>
        </div>
        <input id="cardHolderName" placeholder='Card Holder Name' type='text'/>
        <input id="cardNumber" placeholder='Card Number' type='text'/>
        <div id="MonthSelect">
            <select>
                <option value="" selected disabled hidden>Month</option>
                <option>01</option>
                <option>02</option>
                <option>03</option>
                <option>04</option>
                <option>05</option>
                <option>06</option>
                <option>07</option>
                <option>08</option>
                <option>09</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
            </select>
        </div>
        <div id="YearSelect">
            <select id="YearSelect">
                <option value="" selected disabled hidden>Year</option>
                <?php
                    getYears();
                ?>
            </select>
        </div>
        <input id="ccv" placeholder='CCV' type='text' />
        <span id="ccv_desc">3 or 4 digits usually found on the signature strip</span>
        <button class='proceedBtn'>Proceed</button>
    </div>
</div>
<div class="empty-cart-prompt">
    <div>
        <p>The cart is empty. If you would like to add products to the cart, visit the portfolio where books can be purchased. Click this button to reach the portfolio.</p>
        <button onclick=toShop()>Shop</button> 
    </div>
</div>
<script src="Scripts/cart.js"></script>
<script src="Scripts/creditCardForm.js"></script>

<?php
    PageFooter();
?>
<script>
    function toShop(){
        window.location.href = 'shop.php';
    }

    window.onload = () =>
    {
        customDropdown('MonthSelect');
        customDropdown('YearSelect');
        setupSmallResNavbar();
        populateCart();
    }
</script>
</body>
</html>
