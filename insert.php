<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$password = $_POST['password'];

$host = "localhost";
$dbUsername = "root";
$dbPassword = "";
$dbname = "pinkpenguin";

// Create connection
$conn = new mysqli($host, $dbUsername, $dbPassword, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$SELECT = "SELECT email FROM pinkpenguin WHERE email = ? LIMIT 1";
$INSERT = "INSERT INTO pinkpenguin (name, phone, email, password) VALUES (?, ?, ?, ?)";

// Prepare statement for SELECT
$stmt = $conn->prepare($SELECT);
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($db_email);
$stmt->fetch();

if ($stmt->num_rows == 0) { // Email does not exist, proceed to insert
    $stmt->close();

    // Prepare statement for INSERT
    $stmt = $conn->prepare($INSERT);
    $stmt->bind_param("ssss", $name, $phone, $email, $password);
    $stmt->execute();
    echo "New record entered successfully";
} else {
    echo "Someone already registered using this email";
}

$stmt->close();
$conn->close();
?>
