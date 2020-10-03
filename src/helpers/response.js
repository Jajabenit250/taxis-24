/**
 * Class is for all response return message and errors
 */
class response {

  static error(res, msg, status) {
    return res.status(status).json({
      status,
      error: msg,
    });
  }

  static success(res, msg, status, data) {
    return res.status(status).json({
      status,
      message: msg,
      data,
    });
  }
}
export default response;
