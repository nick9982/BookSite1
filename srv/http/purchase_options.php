<?php
function renderPurchaseInfo()
{
    echo "<div class=\"purchase_container\">
            <div class=\"purchase_content\">
                <h2>Purchase Options</h2>
                <div class=\"custom_select\">
                    <select name=\"product_type\" id=\"product_dropdown\">
                        <option value=\"\" selected disabled hidden>Select product...</option>
                    </select>
                </div>
                <div id=\"status_region\">
                    <span id=\"status_info\">Not Available</button>
                </div>
                <div class=\"purchase-opt-btns\">
                    <button id=\"add_to_cart\" class=\"greyed\"  onclick=\"addToCart()\">Add to cart</button>
                    <button id=\"view_cart\" style=\"visibility:collapse\" onclick=\"visitCart()\">View cart</button>
                </div>
                <script src=\"Scripts/purchaseOptions.js\"></script>
            </div>
        </div>";
}
?>
