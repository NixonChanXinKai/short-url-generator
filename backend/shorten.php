<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "db.php";

/* Generate secure random code (6–8 chars) */
function generateCode($length = 6) {
    $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    $code = "";

    for ($i = 0; $i < $length; $i++) {
        $code .= $chars[random_int(0, strlen($chars) - 1)];
    }

    return $code;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $url = isset($_POST["url"]) ? trim($_POST["url"]) : "";

    // Validate input
    if (empty($url)) {
        echo json_encode(["error" => "URL is required"]);
        exit;
    }

    if (!filter_var($url, FILTER_VALIDATE_URL)) {
        echo json_encode(["error" => "Invalid URL format"]);
        exit;
    }

    // Generate UNIQUE code
    do {
        $code = generateCode(6);
        $check = $conn->query("SELECT id FROM urls WHERE short_code='$code'");
    } while ($check && $check->num_rows > 0);

    // Insert into database
    $stmt = $conn->prepare("INSERT INTO urls (original_url, short_code) VALUES (?, ?)");
    $stmt->bind_param("ss", $url, $code);
    $stmt->execute();

    // Return response
    echo json_encode([
        "short_url" => "https://short.me/" . $code,
        "code" => $code
    ]);
}
?>