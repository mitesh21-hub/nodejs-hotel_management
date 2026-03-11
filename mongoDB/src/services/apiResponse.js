"use strict";

  /**
   * @description This function use for format success response of rest api
   * @param data
   * @param code
   * @param message
   * @param res
   * @param extras
   * @returns {{data: *, meta: {message: *, code: *}}}
   */

 exports.successResponseData = function(res, data, code = 1, message="Success") {
    var response = {
      data:data,
      meta: {
        code,
        message,
      },
    };
    return res.status(200).send(response);
  },

exports.deleteSuccessResponseData = function(res, code = 1, message="Removed successfully") {
    var response = {
      meta: {
        code,
        message,
      },
    };
    return res.status(200).send(response);
  },

  exports.successResponseWithoutData = function(res, message, code = 0) {
    const response = {
      data: [],
      meta: {
        code,
        message,
      },
    };
    return res.status(200).send(response);
  },

  exports.errorResponseData = function(res, message="something went wrong", code = 0) {
    const response = {
      data: null,
      meta: {
        code,
        message,
      },
    };
    return res.status(400).send(response);
  },

  exports.errorResponseWithoutData = function(res, message="Data with given id does not exist", code = 0) {
    const response = {
      data: null,
      meta: {
        code,
        message,
      },
    };
    return res.status(404).send(response);
  };

  exports.forbiddenErrorResponseWithoutData = function(res, message, code = 0) {
    const response = {
      data: null,
      meta: {
        code,
        message,
      },
    };
    return res.status(404).send(response);
  };

  // exports.validationErrorResponseData = function(res, message, code = 400) {
  //   const response = {
  //     code,
  //     message,
  //   };
  //   return res.status(code).send(response);
  // };
