var bootTitle;
var data = [];
var pid = -1;

/*window.onload = () => {
    establishPurchaseOptions();
    cartVisibility();
    document.addEventListener('click', closeAllSelect);
}*/

function customDropdown()
{
    let x, i, j, l, ll, selElmnt, a, b, c, opts;
    x = document.getElementsByClassName('custom_select')[0];
    selElmnt = x.getElementsByTagName('select')[0];
    opts = selElmnt.getElementsByTagName('option');
    ll = selElmnt.length;
    a = document.createElement('div');
    a.setAttribute('class', 'select_selected');
    a.setAttribute('unselectable', 'on');
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x.appendChild(a);
    b = document.createElement('div');
    b.setAttribute('class', 'select-items select-hide');
    console.log(ll);
    for(j = 1; j < ll; j++)
    {
        c = document.createElement('div');
        c.innerHTML = opts[j].innerHTML;
        c.addEventListener('click', function(e) {
            let y, i, k, s, h, sl, yl;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            sl = s.length;
            h = this.parentNode.previousSibling;
            for(i = 0; i < sl; i++)
            {
                if(s.options[i].innerHTML == this.innerHTML)
                {
                    s.selectedIndex = i;
                    h.innerHTML = this.innerHTML;
                    y = this.parentNode.getElementsByClassName('same-as-selected');
                    yl = y.length;
                    for(k = 0; k < yl; k++)
                    {
                        y[k].removeAttribute("class");
                    }
                    this.setAttribute("class", "same-as-selected");
                    break;
                }
            }
            h.click();
            updateStatus();
        });
        b.appendChild(c);
    }
    x.appendChild(b);

    a.addEventListener('click', function(e) {
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
    });
}

function closeAllSelect(elmnt)
{
    var x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName('select-items');
    y = document.getElementsByClassName('select_selected');
    xl = x.length;
    yl = y.length;
    for(i = 0; i < yl; i++)
    {
        if (elmnt == y[i])
        {
            arrNo.push(i);
        }
        else
        {
            y[i].classList.remove('select-arrow-active');
        }
    }
    for(i = 0; i < xl; i++)
    {
        if(arrNo.indexOf(i))
        {
            x[i].classList.add('select-hide');
        }
    }
}

function establishPurchaseOptions()
{
    const purchaseOptions = document.getElementById('product_dropdown');

    const urlParams = new URLSearchParams(window.location.search);

    bookTitle = urlParams.get('book');

    const request = {
        bookTitle: bookTitle
    };


    fetch("Server/purchase_options.php", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    })
        .then(response => response.json())
        .then(json => {
            data = json;

            json.forEach(tuple =>{
                let Status = tuple['status'];
                if(Status != 4) // Status does not equal invisible
                {
                    var product_type = '';
                    switch(tuple['product_type'])
                    {
                        case 0:
                            product_type = 'Digital';
                            break;
                        case 1:
                            product_type = 'Hard Cover';
                            break;
                        case 2:
                            product_type = 'Audio';
                            break;
                    }
                    purchaseOptions.innerHTML += '<option value="'+product_type+'">'+product_type+'</option>';
                }
            });
        })
        .then(delay => updateStatus())
        .then(delay => purchaseOptions.addEventListener('change', updateStatus))
        .then(delay => customDropdown());
}

var product_type = 0;
function updateStatus()
{
    console.log('runs');
    const selectedPurchaseOption = document.getElementById('product_dropdown').value;
    const status_info = document.getElementById('status_info');
    console.log(selectedPurchaseOption);
    switch(selectedPurchaseOption)
    {
        case 'Digital':
            product_type = 0;
            break;
        case 'Hard Cover':
            product_type = 1;
            break;
        case 'Audio':
            product_type = 2;
            break;
        default:
            console.log('value not detected');
            status_info.innerText = 'Select a product to see the price/availability';
            return;
    }
    for(let i = 0; i < data.length; i++)
    {
        console.log('ouch');
        if(data[i]['product_type'] == product_type)
        {
            console.log('pid: ' + data[i]['pid'] + ', status: ' +  data[i]['status']);
            const Status = data[i]['status'];
            pid = data[i]['pid'];
            status_info.classList.value = '';
            status_info.classList.add('Status_'+Status);
            switch(Status)
            {
                case 0:
                    status_info.innerText = 'Available for $' + data[i]['price'];
                    displayAddToCart();
                    break;
                case 1:
                    status_info.innerText = 'Not Available';
                    cantAddToCart();
                    break;
                case 2:
                    status_info.innerText = 'Coming Soon';
                    cantAddToCart();
                    break;
                case 3:
                    status_info.innerText = 'Out Of Stock';
                    cantAddToCart();
                    break;
            }
            break;
        }
    }
}

function displayAddToCart()
{
    const cart_button = document.getElementById('add_to_cart');
    const cookies = document.cookie.split(';');
    let isInCart = false;
    for(let i = 0; i < cookies.length; i++)
    {
        const trimmedCookie = cookies[i].trim();
        if(trimmedCookie.startsWith('cart='))
        {
            let cart = trimmedCookie.split('=')[1];
            cart = JSON.parse(cart);
            for(const item in cart){
                if(cart[item] == pid)
                {
                    isInCart = true;
                    cart_button.classList.add("greyed");
                    cart_button.disabled = true;
                    break;
                }
            }
            break;
        }
    }
    if(!isInCart)
    {
        cart_button.disabled = false;
        cart_button.classList.remove("greyed");
    }
}

function cantAddToCart()
{
    document.getElementById('add_to_cart').classList.add("greyed");
    document.getElementById('add_to_cart').disabled = true;
}

function addToCart()
{
    const cookies = document.cookie.split(';');
    for(let i = 0; i < cookies.length; i++)
    {
        const trimmedCookie = cookies[i].trim();
        if(trimmedCookie.startsWith('cart='))
        {
            let cart = trimmedCookie.split('=')[1];
            cart = JSON.parse(cart);
            for(const item in cart){
                if(cart[item] == pid) return;
            }
            cart.push(pid);
            document.cookie = "cart="+JSON.stringify(cart)+"; SameSite=None; path=/; secure;";
            displayAddToCart();
            return;
        }
    }
    let cart = [pid];
    document.cookie = "cart="+JSON.stringify(cart)+"; SameSite=None; path=/; secure;"; 
    document.getElementById('view_cart').style.visibility = 'visible';
    displayAddToCart();
}

function expireCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

function cartVisibility()
{
    const cookies = document.cookie.split(';');
    for(let i = 0; i < cookies.length; i++)
    {
        const trimmedCookie = cookies[i].trim();
        if(trimmedCookie.startsWith('cart='))
            document.getElementById('view_cart').style.visibility = 'visible';
    }
}

function visitCart()
{
    window.location.href = 'cart.php';
}
