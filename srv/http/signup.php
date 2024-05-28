<html>
<head>
    <title>Sign Up - Anna Rogers</title>
    <link rel="stylesheet" href="Styles/styles.css">
    <link rel="stylesheet" href="Styles/auth.css">
</head>
<body>

<?php
echo "<div class=\"form-container\">
        <p id=\"brandauth\">ANNA<br>ROGERS</p>
        <div class=\"form-inner-container create-acc\">
            <div class=\"form-content\">
                <label for=\"email\">Email address</label>
                <input type=\"text\" name=\"email\" class=\"textfield\"/>
                <label for=\"pass\">Password</label>
                <input type=\"password\" name=\"pass\" class=\"textfield\">
                <label for=\"re-enter-pass\">Re-enter password</label>
                <input type=\"password\" name=\"re-enter-pass\" class=\"textfield\">
                <input type=\"submit\" id=\"auth-submit\" value=\"Sign Up\" onclick=\"signup()\">
                <span id=\"alt-option-txt\">I already have an account. <a href=\"signin.php\">Sign In</a>.</span>
            </div>
        </div>
    </div><script src=\"Scripts/authentication.js\"></script>"
?>
</body>
</html>
