<?php

// Path to the secure directory outside the web root
$secureDirectory = __DIR__ . '/../resources/';

// Get the image filename from the query string
$imageFilename = isset($_GET['image']) ? $_GET['image'] : null;

// Check if the filename is valid
if ($imageFilename && is_readable($secureDirectory . $imageFilename)) {
    // Set the appropriate content type
    header('Content-Type: image/svg+xml');
    header('X-Content-Type-Options: nosniff'); // Prevent XSS attacks

    // Read and output the image file
    echo file_get_contents($secureDirectory . $imageFilename);
} else {
    // Image not found or invalid filename
    header("HTTP/1.0 404 Not Found");
}

?>
