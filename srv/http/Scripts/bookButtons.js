function handleKeyPress(event)
{
    if(event.keyCode === 13)
    {
        const value = document.getElementsByClassName('pageSelectionInput')[0].value;
        if(value < 1 || value > maxPageNumber || value == pageNumber)
        {
            document.getElementsByClassName('pageSelectionInput')[0].value = pageNumber;
        }
        else
        {
            window.location.replace('http://localhost/read.php?name='+bookTitle+'&page='+(value));
        }
    }
}


var bookTitle = '';
var pageNumber = 1;
var maxPageNumber = 1;
window.onload = () =>
{
    bookTitle = document.getElementsByClassName('BookTitle')[0].innerText;
    pageNumber = parseInt(document.getElementById('pageNumber').innerText.replace(/^\D+/g, ''));
    maxPageNumber = parseInt(document.getElementsByClassName('pageMax')[0].innerText.replace(/^\D+/g, ''));
    const buttons = document.getElementsByClassName('nav-button');
    const left = document.getElementById('page-left');
    const right = document.getElementById('page-right');
    if(left.classList.contains('nav-button'))
    {
        left.addEventListener('click', function() {
            window.location.replace('http://localhost/read.php?name='+bookTitle+'&page='+(pageNumber-1));
        });
    }
    if(right.classList.contains('nav-button'))
    {
        right.addEventListener('click', function() {
            window.location.replace('http://localhost/read.php?name='+bookTitle+'&page='+(pageNumber+1));
        });
    }
    document.addEventListener('keydown', function(event) {
      // Log the key code and key value to the console
        console.log(event.keyCode);
        if(event.keyCode == 37)
        {
            if(pageNumber == 1) return;
            window.location.replace('http://localhost/read.php?name='+bookTitle+'&page='+(pageNumber-1));
        }
        if(event.keyCode == 39)
        {
            if(pageNumber == maxPageNumber) return;
            window.location.replace('http://localhost/read.php?name='+bookTitle+'&page='+(pageNumber+1));
        }
        
    });
}
