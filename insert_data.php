<?php

// Replace hostname, username, password, and database name with your own details
$dsn = "mysql:host=localhost;dbname=dfc;charset=utf8mb4";
$username = "root";
$password = "";

try {
    $pdo = new PDO($dsn, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
    exit;
}

$date = $_POST['date'];
$n_piece = $_POST['n_piece'];
$n_cheque = $_POST['n_cheque'];
$libelle = $_POST['libelle'];
$destination = $_POST['destination'];
$debit = $_POST['debit'];
$credit = $_POST['credit'];
$solde = $_POST['solde'];
$lieux = $_POST['lieux'];

$sql = "INSERT INTO bdb2 (date, n_piece, n_cheque, libelle, destination, debit, credit, solde, validate, lieux) 
        VALUES (:date, :n_piece, :n_cheque, :libelle, :destination, :debit, :credit, :solde, :validate, :lieux)";

$stmt = $pdo->prepare($sql);
$stmt->bindParam(':date', $date);
$stmt->bindParam(':n_piece', $n_piece);
$stmt->bindParam(':n_cheque', $n_cheque);
$stmt->bindParam(':libelle', $libelle);
$stmt->bindParam(':destination', $destination);
$stmt->bindParam(':debit', $debit);
$stmt->bindParam(':credit', $credit);
$stmt->bindParam(':solde', $solde);
$stmt->bindValue(':validate', 1);
$stmt->bindParam(':lieux', $lieux);

try {
    $stmt->execute();
    echo "Record inserted successfully.";
} catch (PDOException $e) {
    echo "ERROR: Could not able to execute $sql. " . $e->getMessage();
}

$pdo = null;

?>
