try {
  // Get user input
  // const { user_email, user_password } = req.body;
  // // const id = parseInt(req.params.id);
  // // Validate user input
  // if (!(user_email && user_password)) {
  //   return apiResponse.errorResponseData(res);
  // }
  // // Validate if user exist in our database
  // const user = await Models.Users.findOne({ where: { user_email } });
  // // res.status(400).send("Invalid Credentials");
  // return apiResponse.successResponseData(res, user);
  // if (user && (await bcrypt.compare(user_password, user.user_password))) {
  //   // Create token
  //   const token = jwt.sign(
  //     { user_id: id, user_email },
  //     process.env.TOKEN_KEY,
  //     {
  //       expiresIn: 86400000,
  //     }
  //   );
  //   // save user token
  //   user.token = token;
  // user
  // res.status(200).send("Welcome 🙌 ", user);
  // }
} catch (err) {
  return apiResponse.errorResponseData(res, err);
}
