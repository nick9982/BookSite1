function signin()
{
    const userEmail = document.getElementsByName('email')[0].value;
    const userPass = document.getElementsByName('pass')[0].value;

    const request = {
        email: userEmail,
        pass: userPass
    };

    fetch("Server/signin.php", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    })
    .then(response => response.text())
    .then(text => {
        if(text != 0){
            console.log(text);
            injectCookie("SID", text);
            injectCookie("user", userEmail);
        }
        else{
            
        }
    });

}

function injectCookie(key, value){
    document.cookie = key + "=" + value + "; SameSite=None; path=/; secure;";
}

function replaceCookieValue(key, newValue)
{
    const cookie = document.cookie;
    let eq_found = false;
    let idx = -1;
    for(let i = 0; i < cookie.length; i++)
    {
        let matches = true;
        if(eq_found && cookie[i] == ';') eq_found = false;
        if(!eq_found)
        {
            for(let j = 0; j < key.length && i+j < cookie.length; j++)
            {
                if(cookie[i+j] != key[j]){
                    matches = false;
                    break;
                }
            }
        }
        if(matches && !eq_found) {
            idx = i;
            break;
        }
        if(cookie[i] == '=') eq_found = true;
    }


    if(idx == -1) return;
    let end=-1;

    for(let i = idx; i < cookie.length; i++)
    {
        if(cookie[i] == ';') {
            end = i-1;
            break;
        }
        end=i+1;
    }

    if(end == -1) return;
    let first_half = cookie.substring(0, idx);
    let second_half = cookie.substring(end);
    return first_half + key + "=" + newValue + second_half;
}


function signup()
{
    const userEmail = document.getElementsByName('email')[0].value;
    const userPass = document.getElementsByName('pass')[0].value;
    const userRePass = document.getElementsByName('re-enter-pass')[0].value;

    if(userPass != userRePass) return; // add an error for this later

    const request = {
        email: userEmail,
        pass: userPass
    };

    fetch("Server/signup.php", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    })
    .then(response => response.text())
    .then(text => console.log("response: " + text));
}
