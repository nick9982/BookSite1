<?php
    include 'header.php';
    include 'footer.php';
?>

<!DOCTYPE HTML>
<html>
<head>
    <title>Who is Anna Rogers? - Anna Rogers</title>
    <link rel="stylesheet" href="Styles/styles.css">
    <link rel="stylesheet" href="Styles/home.css">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
</head>
<body>
<?php
    PageHeader(0); // 0 arg because we are on the home page
?>
    <div class="home_container">
        <div class="home_content">
            <h1 class="home_title">Who is Anna Rogers?</h1>
            <div class="image_container">
                <img src="image.php?image=Annas.jpg" alt="Photo of Anna Rogers"></img>
            </div>
            <p class="body-p">I am new to fictional writing but being an octogenarian gives me a rich background of education and experiences to allow my imagination to take hold and create stories based on real life issues. I was born near Chicago and grew up on 12 acres where I had my first of many horses. After high school I joined the Navy and spent six years traveling and meeting people of all ethnicities who shared their cultural heritages with me. After military service I attended college in Wisconsin to become a teacher and live with my mother and daughter on a 160 acre farm. Country living allowed me to raise and train horses, show personally, judge horse shows throughout the Midwest, and teach riding to many students while often mentoring them as did the ranch owner in my first book.</p>
            <p class="body-p">I taught middle school for 25 years before moving on to college age students who inspired to become teachers of all grades and subjects. Now that I am retired, writing has become my passion. I may be new to writing, but my older brother published 30 books covering history, romance, and adventure stories plus receiving several state and national awards. He has been my mentor throughout my first attempt to emulate his career. I have already started my second book and have more ideas for future books, centering around issues that strongly affect people’s lives past, present, and future.</p>
            <p class="body-p">Part of the research needed for my first book, Shepherd Ranch, was taken from my dissertation, Exploring the Career Development Experiences of American Indian Educators Becoming K-12 Teachers. I interviewed fifteen American Indians currently teaching on Midwest reservations. They had become teachers to give back to their people while fostering the next generation’s future. I used information for the factual history and insight to help me build the plot and setting for the book. I feel it is important to write books based on accurate research involving settings, and the historical era portrayed in the fictional story.</p>
            <form action="contact.php">
                <button class="main-button">Contact Anna</button>
            </form>
        </div>
    </div>
    <?php
    PageFooter();
?>
<script>
    window.onload = () =>
    {
        setupSmallResNavbar();
    }
</script>
</body>
</html>
