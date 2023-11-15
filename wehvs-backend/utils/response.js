function responseBuilder(res, error = null, data = null, message = null, statusCode = 200) {
  return res.send(
    {
      error,
      data,
      message,
      statusCode,
    },
    statusCode
  );
}

module.exports = responseBuilder;
