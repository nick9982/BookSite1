<?php
    include 'header.php';
    include 'footer.php';

    echo "<!DOCTYPE HTML>
        <html>
        <head>
            <title>Settings - Anna Rogers</title>
            <link rel=\"stylesheet\" href=\"Styles/styles.css\">
            <link rel=\"stylesheet\" href=\"Styles/settings.css\">
            <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no\">
            <script src=\"Scripts/NavBar.js\"></script>
        </head>";
        PageHeader(2);

?>

<div id="page-outer-cont">
    <div id="page-cont">
        <div id="settings-title">Account Settings</div>
        <div id="settings-description">Change your profile and account settings</div>
        <div id="settings-page">
            <div id="settings-tab-left">
                <ul>
                    <li class="selected-setting-view">Account</li>
                    <li>Password</li>
                    <li>Notifications</li>
                </ul>
            </div>
            <div id="settings-content-right">
                <div id="settings-content-right-container">
                    <div id="account-view">
                        <div id="account-container">
                            <div id="info-title" class="secondary-title">
                                Information
                            </div>
                            <div id="email" class="textfield">
                                <p>EMAIL</p>
                                <?php
                                    echo "<input type=\"text\" value=\"{$_COOKIE['user']}\"></input>";
                                ?>
                            </div>
                            <div id="purchaseHistoryTitle" class="secondary-title">
                                Purchase History
                            </div>
                            <div id="purchaseHistoryContainer">
                                <table>
                                    <tr>
                                        <th>Order Date</th>
                                        <th>Order ID</th>
                                        <th>Total</th>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div id="password-view" style="visibility:collapsed;">
                    </div>
                    <div id="notifications-view" style="visibility:collapsed;">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="purchase_detail_popup_container">
    <div class="purchase_detail_popup">
        <div id="details-title">Products Purchased</div>
        <div id="purchaseDetails">
            <table>
                <tr class="table-title">
                    <td>Quantity</td>
                    <td>Product</td>
                    <td>Price</td>
                </tr>
            </table>
        </div>
        <div id="summary-charges">
            <table>
                <tr>
                    <td>Subtotal</td><td>$0.00</td>
                </tr>
                <tr>
                    <td>Tax</td><td>$0.00</td>
                </tr>
                <tr>
                    <td>Total</td><td>$0.00</td>
                </tr>
            </table>
        </div>
        <div id="date-p"></div>
        <button id="report">Report Issue</button>
        </div>
    </div>
</div>
<script src="Scripts/purchaseHistory.js"></script>
<script>
    function toShop(){
        window.location.href = 'shop.php';
    }

    window.onload = () =>
    {
        setupSmallResNavbar();
        loadPurchaseHistory();
    }
</script>

<?php
    PageFooter();
?>
