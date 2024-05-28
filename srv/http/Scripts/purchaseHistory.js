let limit = 10;
var purchaseHistoryData = Array();
function loadPurchaseHistory(){

    const request = {
        limit: 10
    };

    fetch("Server/purchaseHistory.php", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request)
    })
    .then(response => response.text())
    .then(text => JSON.parse(text.trim()))
    .then(json => {
        if(json.length == 0)
        {
            noPurchaseHistory();
        }
        else
        {
            purchaseHistoryData = json;
            const table = document.getElementById('purchaseHistoryContainer').querySelector('table');
            for(let i = 0; i < json.length; i++) {
                const row = document.createElement('tr');
                
                const orderDate = document.createElement('td');
                orderDate.classList.add('date_cell');
                orderDate.innerHTML = '<span>'+json[i]['date']+'</span>';

                const orderId = document.createElement('td');
                orderId.classList.add('order_id_cell');
                orderId.innerHTML = '<span>'+json[i]['order_num'] + '</span>';

                const price = document.createElement('td');
                price.classList.add('price_cell');
                price.innerHTML = '<span>$' + sumPrice(JSON.parse(json[i]['price'])) + '</span>';

                const details = document.createElement('td');
                details.classList.add('details_cell');
                details.innerHTML = '<button class="detailsButton" onclick="getDetails(' + i + ')">Details</button>';

                row.appendChild(orderDate);
                row.appendChild(orderId);
                row.appendChild(price);
                row.appendChild(details);
                table.appendChild(row);
            }
        }
    })
}

function sumPrice(prices){
    let sum = 0;
    for(let i= 0; i < prices.length; i++)
    {
        sum += prices[i];
    }
    console.log(sum);
    return formatFloatP2(sum);
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

function noPurchaseHistory()
{
    document.getElementById("purchaseHistoryTitle").style.visibility = 'collapsed';
    document.getElementById("purchaseHistoryContainer").style.visibility = 'collapsed';
    document.getElementById("purchaseHistoryTitle").style.height = 0;
    document.getElementById("purchaseHistoryContainer").style.height = 0;
}

function getDetails(index){
    const purchase_detail_popup = document.getElementsByClassName("purchase_detail_popup_container")[0];
    purchase_detail_popup.style.height = "100vh";
    purchase_detail_popup.style.visibility = "visible";
    const purchases_table = document.getElementById("purchaseDetails").querySelector('table');
    console.log(purchaseHistoryData[index]['products']);
    const products = purchaseHistoryData[index]['products'];
    const prices = JSON.parse(purchaseHistoryData[index]['price']);
    let subtotal = 0;

    const request = {
        pids: products
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
    .then(prod_information_list => {
        const map = new Map();
        for(let i = 0; i < products.length; i++)
        {
            if(!map.has(products[i]))
            {
                map.set(products[i], {price: prices[i], quantity: 1, title: prod_information_list[i]['book_title'], product_type: prod_information_list[i]['product_type']});
            }
            else
            {
                let initial = map.get(products[i]);
                initial['quantity'] = initial['quantity'] + 1;
                initial['price'] = initial['price'] + prices[i];
                map.set(products[i], initial);
            }
        }

        console.log('map size; ' + map.size);
        map.forEach((value, key) => {
            const row = document.createElement('tr');
            const quantity = document.createElement('td');
            quantity.classList.add('q_cell');
            quantity.innerHTML = '<span>'+value['quantity']+'</span>';

            const product = document.createElement('td');
            product.classList.add('product_cell');
            product.innerHTML = '<span>'+value['title'] + '&nbsp;' + value['product_type'] + '</span>'

            const price = document.createElement('td');
            price.classList.add('price_cell2');
            let prc = formatFloatP2(value['price']);
            price.innerHTML = '<span>$' + prc + '</span>';
            subtotal += parseFloat(prc);

            row.appendChild(quantity);
            row.appendChild(product);
            row.appendChild(price);
            purchases_table.appendChild(row);
        });

        console.log(purchaseHistoryData[index]);

        document.getElementById('date-p').innerHTML = purchaseHistoryData[index]['date'];

        const summary_charges = document.getElementById('summary-charges');
        const summary_rows = summary_charges.querySelectorAll('tr')
        summary_rows[0].querySelectorAll('td')[1].innerHTML = '$' + String(subtotal);
        if(products.length - prices.length == 1)
        {
            summary_rows[1].querySelectorAll('td')[1].innerHTML = '$' + prices[index][prices[index].length-1];
            summary_rows[2].querySelectorAll('td')[2].innerHTML = '$' + parseFloat(prices[index][prices[index].length-1]) + parseFloat(subtotal);
        }
        else
            console.log('shipping should handle this.');
    });
}
