const statusMessages = {
  200: 'Done',
  201: 'Created',
  400: 'Invalid Format',
  500: 'Internal Error'
}

exports.success = (req, res, message, status) => {
  const statusCode = status || 200;
  let statusMessage = message || statusMessages[statusCode] ;
  res.status(status).send({
    error: '',
    body: statusMessage
  });
}

exports.error = (req, res, message, status, details) => {
  console.error('[response error]: ' + details);
  res.status(status || 500).send({
    error: message,
    body: ''
  });
}