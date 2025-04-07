<?php
// Activer l'affichage des erreurs pour le débogage
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('error_log', 'error.log');

// Forcer le type de contenu JSON avant tout
header('Content-Type: application/json; charset=utf-8');

// Headers CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Log des données reçues pour le débogage
error_log('Méthode HTTP: ' . $_SERVER['REQUEST_METHOD']);
error_log('Données reçues: ' . file_get_contents('php://input'));

// Gérer les requêtes OPTIONS (pre-flight CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Vérifier la méthode HTTP
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
    exit();
}

// Récupérer et décoder les données JSON
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Log des données décodées
error_log('Données décodées: ' . print_r($data, true));

// Vérifier les données requises
if (!$data || !isset($data['name']) || !isset($data['email']) || !isset($data['message'])) {
    http_response_code(400);
    echo json_encode([
        'success' => false, 
        'message' => 'Données manquantes',
        'received' => $data
    ]);
    exit();
}

// Nettoyer les données
$name = strip_tags(trim($data['name']));
$email = filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL);
$message = strip_tags(trim($data['message']));

// Valider l'email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Email invalide']);
    exit();
}

// Préparer l'email
$to = 'info@ateliervcube.be';
$subject = 'Nouveau message de ' . $name;
$email_content = "Nom: $name\n";
$email_content .= "Email: $email\n\n";
$email_content .= "Message:\n$message\n";

// En-têtes de l'email
$headers = 'From: ' . $email . "\r\n" .
          'Reply-To: ' . $email . "\r\n" .
          'X-Mailer: PHP/' . phpversion();

// Envoyer l'email
try {
    error_log('Tentative d\'envoi d\'email à ' . $to);
    if (mail($to, $subject, $email_content, $headers)) {
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Message envoyé avec succès'
        ]);
        error_log('Email envoyé avec succès');
    } else {
        throw new Exception("Erreur lors de l'envoi de l'email");
    }
} catch (Exception $e) {
    error_log("Erreur d'envoi d'email: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => "Une erreur est survenue lors de l'envoi du message"
    ]);
} 