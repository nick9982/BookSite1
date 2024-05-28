var bookCards = [...document.getElementsByClassName("book-card-content")];
var initialText = new Array(bookCards.length);

var fullData = new Map();
var lastModifiedID = -1;
var headers = [];

window.mobileCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

function setData()
{
    var x = 0;
    bookCards.forEach(card => {
        const title = card.getElementsByClassName("bookTitle")[0].innerText;
        const desc = card.getElementsByClassName("description")[0].innerText.substring(0, card.getElementsByClassName("description")[0].innerText.length-10);
        fullData.set(title, desc);
        headers[x++] = title;
    })
}

function getMoreLink(element)
{
    const title = element.parentNode.parentNode.querySelector('.titleLink').innerText;
    return title.replace(/ /g, '+');
}

var lastCallWidth = 0;
var previousElementName = '';
function recalculateText(element, calledInRuntime){
    var lineHeight = 21;
    var characterWidth = 8.3;
    var characterWidthH3 = 13.1;
    var idealContainerWidth = 84;
    if(Math.round(window.devicePixelRatio * 100) != 100){ // the ratio gets messed up when zoom/unzoom. can deal with this later not huge issue
        //idealContainerWidth = elem/4;
    }
    lineHeight = Math.ceil(idealContainerWidth/4);

    var currentElementName = element.parentElement.parentElement.id;
    const containerWidth = element.offsetWidth;
    if((containerWidth === lastCallWidth && currentElementName == previousElementName) && calledInRuntime) return;
    lastCallWidth = containerWidth;
    previousElementName = currentElementName;

    var lineCount = element.offsetHeight/lineHeight;

    var characterCount = element.innerText.length;


    var MaxCharPerLine = Math.floor(containerWidth/characterWidth);
    var linesOccupied = element.innerText.length * 8.3 / containerWidth;
    const moreLink = "book.php?book="+getMoreLink(element);
    const moreLinkLength = moreLink.length;
    if(Math.ceil(element.offsetHeight/lineHeight > 4)){
        reducing = true;
        var amountToRemove = (characterCount*8.3/containerWidth - 4) * containerWidth/8.3-10;
        var data = fullData.get(element.parentNode.parentNode.querySelector('.titleLink').innerText);
        element.innerHTML = data.substring(0, characterCount - amountToRemove) + "...<span class=\"more-section\">(<a href=\"" + moreLink + "\" class=\"more-link\">more</a>)</span>";
        while(element.offsetHeight/lineHeight > 4)
        {
            element.innerHTML = data.substring(0, characterCount - (++amountToRemove)) + "...<span class=\"more-section\">(<a href=\""+moreLink+"\" class=\"more-link\">more</a>)</span>";
        }
    }
    else
    {
        var amountToAdd = (4 - linesOccupied) * containerWidth/8.3 - 50;
        element.innerHTML = element.innerText.substring(0, element.innerText.length-10) + fullData.get(element.parentNode.parentNode.querySelector('.titleLink').innerText).substring(element.innerText.length-10, element.innerText.length-10+amountToAdd) + "...<span class=\"more-section\">(<a href=\""+moreLink+"\" class=\"more-link\">more</a>)</span>";
        var size = element.innerText.length-10;
        const data = fullData.get(element.parentNode.parentNode.querySelector('.titleLink').innerText);
        while(Math.ceil(element.offsetHeight/lineHeight) < 5){
            element.innerHTML = data.substring(0, size++) + "...<span class=\"more-section\">(<a href=\""+moreLink+"\" class=\"more-link\">more</a>)</span>";
        }
        while(Math.ceil(element.offsetHeight/lineHeight) > 4)
        {
            element.innerHTML = data.substring(0, --size) + "...<span class=\"more-section\">(<a href=\""+moreLink+"\" class=\"more-link\">more</a>)</span>";
        }
    }
}

const resizeObserver = new ResizeObserver(entries => {
    for (const entry of entries){
        const targetElement = entry.target;
        const newWidth = entry.contentRect.width;
        recalculateText(targetElement, true);
    }
});

function addObserversToDescriptions(){
    const cardDescriptions = [...document.getElementsByClassName('description')];
    const cardTitles = [...document.getElementsByClassName('bookTitle')];
    const cards = [...document.getElementsByClassName('book-card-content')];

    cards.forEach(card =>{
        const bounded = recalculateText.bind(null, card.getElementsByClassName('description')[0], true);
        card.addEventListener("mouseenter", bounded);
        card.addEventListener("mouseleave", bounded);
    });
    cardDescriptions.forEach(description => {
        resizeObserver.observe(description);
        recalculateText(description, false);
    });
}

function handleWindowResize(){
    const cardDescriptions = [...document.getElementsByClassName('description')];
    cardDescriptions.forEach(description => {
        recalculateText(description, true);
    });
}

window.addEventListener('resize', handleWindowResize);

/*window.onload = () => {
    setData();
    addObserversToDescriptions();
    if(window.mobileCheck())
    {
        const right_panes = document.getElementsByClassName("book-card-right-pane");
        for(let i = 0; i < right_panes.length; i++)
        {
            right_panes[i].style.visibility = "visible";
            right_panes[i].style.width = "auto";
        }
        console.log("is mobile");
    }
}*/
