<?php

/**
 * Simple funci�n que devuelve una respuesta HTTP 303 See Other,
 * que genera un Redirect al sitio Web de KMS con el Formulario
 * de Login con el mensaje de Login Incorrecto.
 */
function redirect_fail() {
    header('HTTP/1.1 303 See Other');
    header('Location: ' . $_SERVER['KMS_WEB_FAIL_REDIRECT']);
    exit();
}

/**
 * Verificar que se tienen las configuraciones necesarias del server.
 */
if (
       ! isset($_SERVER['KMS_API_KEY'])
    || ! isset($_SERVER['KMS_API_SECRET'])
    || ! isset($_SERVER['KMS_WEB_FAIL_REDIRECT'])
    || ! isset($_SERVER['KMS_API_LOGIN_ENDPOINT'])
    || ! isset($_SERVER['KMS_API_REDIRECT'])
) {
    header('HTTP/1.1 503 Service Unavailable');
    exit('KMS API communication settings are not set.');
}

/**
 * Parsear la petici�n seg�n sea el caso, y devolver la respuesta.
 */
if ( isset($_GET['g']) && $_GET['g'] == 'csrf' ) {
    // > Calcular componentes de un CSRF medio erizo.
    $csrf['csrf_key']    = substr(sha1(time() . rand()), 30);
    $csrf['csrf_secret'] = hash_hmac('sha1', $csrf['csrf_key'], $_SERVER['KMS_API_SECRET']);
    
    exit(json_encode($csrf));
} else if (
    isset($_GET['g'])
    && $_GET['g'] == 'login'
    && isset($_POST['email'])
    && strlen($_POST['email']) > 5
    && isset($_POST['password'])
    && strlen($_POST['password']) > 5
    && isset($_POST['csrf_key'])
    && strlen($_POST['csrf_key']) == 10
    && isset($_POST['csrf_secret'])
    && strlen($_POST['csrf_secret']) == 40
) {
    // > Validar que valores CSRF son v�lidos.
    if ( $_POST['csrf_secret'] != hash_hmac('sha1', $_POST['csrf_key'], $_SERVER['KMS_API_SECRET']) )
        redirect_fail();
    
    // > Construir URL para genera nueva sesi�n en App.
    $uri =
        $_SERVER['KMS_API_LOGIN_ENDPOINT']
        . '?username=' . urlencode($_POST['username'])
        . '&password=' . urlencode($_POST['password'])
        . '&nonce=' . urlencode($_POST['csrf_key'])
        . '&apikey=' . urlencode($_SERVER['KMS_API_KEY']);
    
    // > Enviar petici�n a App.
    $raw_response = file_get_contents($uri);
    if ( $raw_response === FALSE ) {
        header('HTTP/1.1 500 Internal Server Error');
        exit('Cross-Site communication error');
    }
    
    // > Validar respuesta de App.
    $reponse = json_decode($raw_response);
    if ( $response == NULL || ! isset($response['k']) || ! isset($response['h']) ) {
        if ( isset($response['error']) ) {
            redirect_fail();
        } else {
            header('HTTP/1.1 500 Internal Server Error');
            exit('Cross-Site communication parsing error: ' . $raw_response);
        }
    }
    
    // > Generar redirecci�n.
    $redirect_uri =
        $_SERVER['KMS_API_REDIRECT']
        . '?k=' . urlencode($response['k'])
        . '&h=' . urlencode($response['h'])
        . '&d=token';
    
    header('HTTP/1.1 303 See Other');
    header('Location: ' . $redirect_uri);
} else {
    // > Redirigir a Login con error.
    redirect_fail();
}
