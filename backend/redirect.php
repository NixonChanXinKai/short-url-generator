<?php
include "db.php";

// Get short code from URL
$code = isset($_GET['code']) ? trim($_GET['code']) : "";

// Validate input
if (empty($code)) {
    echo "Invalid request: missing short code";
    exit;
}

// Find original URL
$stmt = $conn->prepare("SELECT original_url FROM urls WHERE short_code=?");
$stmt->bind_param("s", $code);
$stmt->execute();
$result = $stmt->get_result();

// Redirect if found
if ($row = $result->fetch_assoc()) {
    header("Location: " . $row['original_url']);
    exit;
} else {
    echo "404 - URL not found";
}
?>