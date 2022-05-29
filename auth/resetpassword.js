// resetPassword();

function resetPassword() {
    Parse.User.requestPasswordReset("email@example.com").then(function() {
      console.log("Password reset request was sent successfully");
    }).catch(function(error) {
      console.log("The login failed with error: " + error.code + " " + error.message);
    });
}