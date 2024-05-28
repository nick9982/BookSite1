<?php

$pdfName = isset($_GET['pdf']) ? $_GET['pdf'] : null;
    $secure_directory = __DIR__ . '/../book_pdfs/';

// Check if the file exists
if (file_exists($secure_directory . $pdfName)) {
    // Set the appropriate content type for a PDF file
    header('Content-Type: application/pdf');

    // Use content-disposition to force a download or display inline
    // header('Content-Disposition: attachment; filename="yourfilename.pdf"'); // Uncomment this line to force download

    // Output the file content
    readfile($secure_directory . $pdfName);
} else {
    // File not found, you can handle this case accordingly
    header("HTTP/1.0 404 Not Found");
}
?>
