var dropdownOpen = false;

function setupSmallResNavbar() {
    const burger = document.getElementById('burger');
    const pop_up_nav = document.getElementById('pop-up-nav-container');
    document.getElementsByClassName('burgerMenuContainer')[0].addEventListener('click', function() {
        if(dropdownOpen)
        {
            burger.src = 'svg.php?image=bars-solid.svg';
            burger.style.width = '22px';
            pop_up_nav.style.visibility = "collapse";
            document.body.style.overflow = 'visible';
        }
        else
        {
            burger.src = 'svg.php?image=x-solid.svg';
            burger.style.width = '17px';
            pop_up_nav.style.visibility = "visible";
            document.body.style.overflow = 'hidden';
        }
        dropdownOpen = !dropdownOpen;
    });

    window.addEventListener('resize', function() {
        if(dropdownOpen && window.innerWidth > 700)
        {   
            burger.src = 'svg.php?image=bars-solid.svg';
            burger.style.width = '22px';
            pop_up_nav.style.visibility = "collapse";
            document.body.style.overflow = "visible";
            dropdownOpen = !dropdownOpen;
        }
    });

    pop_up_nav.querySelectorAll('li').forEach(function(element){
        element.addEventListener('click', function(){
            let href = event.target.querySelector('a').getAttribute('href');
            window.location.href = href;
        });
    });
}
