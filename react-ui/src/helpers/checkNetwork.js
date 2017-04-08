export default function checkNetwork(err) {
  if (!navigator.onLine) {
    return 'No Internet connexion';
  } else if (err.response === undefined) {
    return 'No response from the server';
  }
  // Error message from the server
  const { status, message } = err.response.data.errors[0];
  return 'Error - "' + message + '" (' + status + ')';
}
