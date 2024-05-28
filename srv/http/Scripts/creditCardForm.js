function customDropdown(elementName)
{
    let x, i, j, l, ll, selElmnt, a, b, c, opts;
    x = document.getElementById(elementName);
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
    for(j = 1; j < ll; j++)
    {
        c = document.createElement('div');
        c.innerHTML = opts[j].innerHTML;
        c.addEventListener('click', function(e) {
            let y, i, k, s, h, sl, yl;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            sl = s.length;
            h = this.parentNode.previousSibling;
            x.querySelector('.select_selected').style.color = 'black';
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
