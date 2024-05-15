<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "client-form";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Menerima data dari request
$data = json_decode(file_get_contents("php://input"));

// Prepare statement
// $stmt = $conn->prepare("INSERT INTO users (name, address, phone) VALUES (?, ?, ?)");
// $stmt->bind_param("sss", $name, $address, $phone);

// Set parameter dari data yang diterima
$name = $data->name;
$address = $data->address;
$phone = $data->phone;

// Eksekusi statement
// if ($stmt->execute()) {
//     echo json_encode(array("message" => "New record created successfully"));
// } else {
//     echo json_encode(array("message" => "Error: " . $sql . "<br>" . $conn->error));
// }

$sql = "INSERT INTO users (name, address, phone) VALUES ('$name', '$address', '$phone')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(array("message" => "New record created successfully"));
} else {
    echo json_encode(array("message" => "Error: " . $sql . "<br>" . $conn->error));
}

$conn->close();

// Menutup statement dan koneksi
// $stmt->close();
// $conn->close();
?>
