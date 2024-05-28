<html>
<head>
    <title>Sign In - Anna Rogers</title>
    <link rel="stylesheet" href="Styles/styles.css">
    <link rel="stylesheet" href="Styles/auth.css">
</head>
<body>

<?php
echo "<div class=\"form-container\">
        <p id=\"brandauth\">ANNA<br>ROGERS</p>
        <div class=\"form-inner-container\">
            <div class=\"form-content\">
                <label for=\"email\">Email address</label>
                <input type=\"text\" name=\"email\" class=\"textfield\"/>
                <label for=\"pass\">Password</label>
                <input type=\"password\" name=\"pass\" class=\"textfield\">
                <input type=\"submit\" id=\"auth-submit\" value=\"Sign In\" onclick=\"signin()\">
                <span id=\"alt-option-txt\">I do not have an account. <a href=\"signup.php\">Create Account</a>.</span>
            </div>
        </div>
    </div><script src=\"Scripts/authentication.js\"></script>"
?>
</body>
</html>
