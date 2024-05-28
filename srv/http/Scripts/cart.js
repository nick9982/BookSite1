pids = [];
let tax = 0.06;

function populateCart()
{
    const cart_table = document.querySelector('.table-container table');
    let cart;

    const cookies = document.cookie.split(';');
    for(let i = 0; i < cookies.length; i++)
    {
        const trimmedCookie = cookies[i].trim();
        if(trimmedCookie.startsWith('cart='))
        {
            cart = JSON.parse(trimmedCookie.split('=')[1]);
        }
    }

    const request = {
        pids: cart
    };

    fetch("Server/getProductsById.php", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request)
    })
    .then(response => response.text())
    .then(text => JSON.parse(text))
    .then(json => {
        if(json.length == 0)
        {
            cartIsEmptySettings();
            return;
        }
        for(let i = 0; i < json.length; i++)
        {
            const row = document.createElement('tr');

            let quantity_editable = true;
            let product = '';
            switch(json[i]['product_type'])
            {
                case 0:
                    product = 'Digital Copy';
                    quantity_editable = false;
                    break;
                case 1:
                    product = 'Hard Cover';
                    break;
                case 2:
                    product = 'Audio';
                    quantity_editable = false;
                    break;
            }

            const bookTitle = document.createElement('td');
            bookTitle.innerHTML = '<div class="product-cell-content"><button onclick=removeItem('+i+') class="removeItem"><object type="image/svg+xml" data="svg.php?image=x-solid.svg"></object></button><img src="image.php?image='+json[i]['image_path']+'"></img><span>' + json[i]['book_title'] + ' ' + product + '</span></div>';

            const price = document.createElement('td');
            price.classList.add('priceCell');
            price.innerHTML = '<span>$'+json[i]['price']+'</span>';

            const quantity = document.createElement('td');

            let input;
            if(quantity_editable)
                input = "<input class=\"pageSelectionInput\" type=\"text\" value=\""+1+"\" size=\"3\" class=\"quantitySelect\" onkeyup=\"handleKeyUp(event)\" id=\"quantitySelect"+i+"\">";
            else
                input = '<span id="quantitySelect'+i+'">1</span>'
            quantity.innerHTML = input;

            const subtotal = document.createElement('td');
            subtotal.innerHTML = '<span>$'+json[i]['price']+'</span>';
            subtotal.classList.add('subTotalCell');

            row.appendChild(bookTitle);
            row.appendChild(price);
            row.appendChild(quantity);
            row.appendChild(subtotal);
            cart_table.appendChild(row);

            pids.push(json[i]['pid']);
        }
    })
    .then(delay => calculateTotalPrice())
    .then(delay =>  {
        var svgs = document.getElementsByClassName('product-cell-content');
        for(let x = 0; x < svgs.length; x++)
        {
            svgs[x].querySelector('object').addEventListener('load', function(){
                var svgDoc = event.target.contentDocument;
                var svgElements = svgDoc.querySelectorAll('path, rect, circle, svg');
                svgElements.forEach(function(element){
                    element.style.fill = '#9a9a9a';

                    element.addEventListener('mouseenter', function(){
                        event.target.style.cursor = 'pointer';
                    });

                    element.addEventListener('click', function(){
                        removeItem(x);
                    });

                    element.addEventListener('mouseleave', function(){
                        event.target.style.cursor = 'default';
                    });
                });
            });
        }


    });
}

function removeItem(idx)
{
    const quant = document.getElementById('quantitySelect' + idx);
    if(quant == null) return;

    quant.parentNode.parentNode.remove();

    const cookies = document.cookie.split(';');
    for(let i = 0; i < cookies.length; i++)
    {
        const trimmedCookie = cookies[i].trim();
        if(trimmedCookie.startsWith('cart='))
        {
            cart = JSON.parse(trimmedCookie.split('=')[1]);
            for(const item in cart)
            {
                if(cart[item] == pids[idx])
                {
                    cart.splice(item, 1);
                    pids.splice(item, 1);
                    document.cookie = "cart="+JSON.stringify(cart)+";secure;SameSite=None;path=/";
                    break;
                }
            }
        }
    }

    let numberOfRows = document.querySelector('.table-container').querySelectorAll('tr').length-1; 

    updateTotalPrice();
    if(numberOfRows == 0)
        cartIsEmptySettings();
}

function clearCart()
{
    const cookies = document.cookie.split(';');
    document.cookie = "cart="+JSON.stringify([])+"; SameSite=None; path=/; secure;";

    for(let i = 0; i < pids.length; i++)
    {
        document.getElementById('quantitySelect' + i).parentNode.parentNode.remove();
    }
    pids = [];
    cartIsEmptySettings();
}

function calculateTotalPrice()
{
    const rows = document.getElementsByTagName('table')[0].getElementsByTagName('tr');

    let subtotal = 0;
    for(let i = 1; i < pids.length+1; i++)
    {
        let price = rows[i].getElementsByTagName('td')[3].innerText;
        subtotal += parseFloat(price.substring(1, price.length));
    }

    const totalTable = document.getElementsByTagName('table')[1];
    const subtotalRow = document.createElement('tr');
    const subtotalTitle = document.createElement('td');
    subtotalTitle.innerHTML = "<span>Subtotal</span>";
    const subtotalValue = document.createElement('td');
    subtotalValue.innerHTML = '<span>$' + formatFloatP2(subtotal) + '</span>';
    
    const taxRow = document.createElement('tr');
    const taxTitle = document.createElement('td');
    taxTitle.innerHTML = '<span>Tax</span>';
    const taxValue = document.createElement('td');
    taxValue.innerHTML = '<span>$'+formatFloatP2(subtotal*tax)+'</span>';

    const totalRow = document.createElement('tr');
    const totalTitle = document.createElement('td');
    totalTitle.innerHTML = "<span>Total</span>";
    const totalValue = document.createElement('td');
    totalValue.innerHTML= '<span>$' + formatFloatP2(subtotal * (1+tax))+'</span>';

    subtotalRow.appendChild(subtotalTitle);
    subtotalRow.appendChild(subtotalValue);
    totalTable.appendChild(subtotalRow);
    
    taxRow.appendChild(taxTitle);
    taxRow.appendChild(taxValue);
    totalTable.appendChild(taxRow);

    totalRow.appendChild(totalTitle);
    totalRow.appendChild(totalValue);
    totalTable.appendChild(totalRow);
}

function updateTotalPrice()
{
    let rows = document.getElementsByTagName('table')[0].getElementsByTagName('tr');

    let subtotal = 0;
    for(let i = 1; i < pids.length+1; i++)
    {
        let price = rows[i].getElementsByTagName('td')[3].innerText;
        subtotal += parseFloat(price.substring(1, price.length));
    }

    rows = document.getElementsByClassName('total')[0].querySelectorAll('tr');
    rows[0].querySelectorAll('td')[1].innerText = '$' + formatFloatP2(subtotal);
    rows[1].querySelectorAll('td')[1].innerText = '$' + formatFloatP2(subtotal * 0.06);
    rows[2].querySelectorAll('td')[1].innerText = '$' + formatFloatP2(subtotal * 1.06);
    console.log('total price updated');
}

function handleKeyUp(event)
{
    let value = event.target.value;
    let numericValue = value.replace(/\D/g, '');
    event.target.value = numericValue;

    if(numericValue === '')
        numericValue = '0';

    let price = event.target.parentNode.previousSibling.querySelector('span').innerText;

    event.target.parentNode.nextSibling.querySelector('span').innerText = '$'+formatFloatP2(parseFloat(price.substring(1, price.length)) * parseInt(numericValue));


    updateTotalPrice();
}

function formatFloatP2(input)
{
    input = String(input);
    let length = input.length;
    for(let i = 0; i < length; i++)
    {
        if(input.charAt(i) === '.')
        {
            console.log(length - i);
            if(length - i > 3)
            {
                if(parseInt(input.charAt(i+3)) >= 5)
                    input = String(parseFloat(input) + 0.01);
                else
                    input = String(parseFloat(input) - 0.01);
                input = input.substring(0, i+3);
                length = input.length;
                if(length - i == 2) input += '0';
            }
            else if(length - i == 2)
            {
                input += '0';
            }
            return input;
        }
    }
    return input + '.00';
}

function cartIsEmptySettings()
{
    document.querySelector('.cart_container').style.visibility = 'collapse';
    document.querySelector('.cart_container').style.height = 0;
    document.querySelector('.empty-cart-prompt').style.height = 'auto';
    document.querySelector('.empty-cart-prompt').style.visibility = 'visible';
}

function enableCreditCardPopup()
{
    const cc_form_cont = document.querySelector('.credit-card-form-container');

    document.body.scrollTop = document.documentElement.scrollTop = 0;
    cc_form_cont.style.visibility = 'visible';
    cc_form_cont.style.height = '100vh';

    const bg = document.querySelector('.cart_container');

    bg.style.filter = 'blur(4px)';
    bg.style.webkitFilter = 'blur(4px)';
    bg.style.mozFilter = 'blur(4px)';
    bg.style.oFilter = 'blur(4px)';
    bg.style.msFilter = 'blur(4px)';

    const nav = document.querySelector('header');
    nav.style.visibility = 'collapse';
    nav.style.height = '0';

    const footer = document.querySelector('.footer-container');
    footer.style.visibility = 'collapse';
    footer.style.height = '0';

    document.body.style.overflow = 'hidden';
}

function disableCreditCardPopup()
{
    const cc_form_cont = document.querySelector('.credit-card-form-container');
    cc_form_cont.style.visibility = 'collapse';
    cc_form_cont.style.height = '0';

    const bg = document.querySelector('.cart_container');
    bg.style.removeProperty('filter');
    bg.style.removeProperty('webkitFilter');
    bg.style.removeProperty('mozFilter');
    bg.style.removeProperty('oFilter');
    bg.style.removeProperty('msFilter');

    const nav = document.querySelector('header');
    nav.style.visibility = 'visible';
    nav.style.removeProperty('height');

    const footer = document.querySelector('.footer-container');
    footer.style.visibility = 'visible';
    footer.style.removeProperty('height');

    document.body.style.overflow = 'visible';

}

function setUpCreditCardXSVG(){
    document.getElementById('closeSel').querySelector('object').addEventListener('load', function(){
        var svgDoc = event.target.contentDocument;
        var svgElements = svgDoc.querySelectorAll('path, rect, circle, svg');
        svgElements.forEach(function(element){
            element.style.fill = 'rgb(140, 140, 140)';
            console.log(element)

            element.addEventListener('mouseenter', function(){
                event.target.style.cursor = 'pointer';
            });

            element.addEventListener('click', function(){
                disableCreditCardPopup();
            });

            element.addEventListener('mouseleave', function(){
                event.target.style.cursor = 'default';
            });
        });
    });
}
setUpCreditCardXSVG();
