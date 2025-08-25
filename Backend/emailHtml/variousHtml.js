exports.getHtmlForOtp = (otp) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Verification OTP</title>
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    background-color: #f8f9fa;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                }
                .container {
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    text-align: center;
                }
                h2 {
                    color: #007bff;
                }
                .otp {
                    font-size: 24px;
                    font-weight: bold;
                    color: #333;
                    padding: 10px;
                    border: 2px solid #007bff;
                    border-radius: 8px;
                    display: inline-block;
                    margin-top: 20px;
                }
                .website {
                    margin-top: 20px;
                    font-size: 14px;
                    color: #555;
                }
                a {
                    color: #007bff;
                    text-decoration: none;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>Email Verification OTP</h2>
                <p>Please use the following OTP to verify your email address:</p>
                <div class="otp">${otp}</div>
                <div class="website">
                    Visit our website <a href="https://www.ducklingfit.com" target="_blank">www.ducklingfit.com</a> for more information.
                </div>
            </div>
        </body>
        </html>
    `
};

exports.getHtmlForWelcome = (name) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to DuckingFit</title>
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    background-color: #f8f9fa;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                }
                .container {
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    /*text-align: center;*/
                }
                h2 {
                    color: #007bff;
                    text-align: center;
                }
                p {
                    color: #333;
                    margin: 20px 0;
                }
                ul {
                    text-align: left;
                    margin: 20px 0;
                    list-style-type:none;
                }
                a {
                    color: #007bff;
                    text-decoration: none;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>Welcome to <a href="https://www.ducklingfit.com" target="_blank">DuckingFit</a></h2>
                <p>Hey there, <b>${name}</b></p>
                <p>Welcome to ducklingfit.com, We are here to revolutionize your fitness accessibility and flexibility.</p>
                <ul>
                    <li>✅ Overcome the high costs of gym memberships in Tier 1 cities.</li>
                    <li>✅ Provide flexible subscription options tailored to your schedule.</li>
                    <li>✅ Ensure you never waste your gym subscription payments, even while traveling.</li>
                </ul>
                <p>Join us in achieving your fitness goals while saving time and money! Visit our website <a href="https://www.ducklingfit.com" target="_blank">www.duckingfit.com</a> for more information.</p>
            </div>
        </body>
        </html>
    `
}

exports.getPasswordResetHtml = (name,link) => {
    return `
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Password reset</title>
            <style>
                body {
          font-family: Arial, sans-serif;
          background-color: #f9f9f9;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: #007bff;
          text-align: center;
        }
        p {
          color: #333;
          font-size: 16px;
          line-height: 1.5;
        }
        a {
          display: inline-block;
          background-color: #007bff;
          color: #fff;
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 5px;
          text-align: center;
        }
        </style>
        </head>
        <body>
            <div class="container">
                <h1>Duckling Fit</h1>
                <p>Password Reset</p>
                <p>Hello ${name},</p>
                <p>You have requested to reset your password for your Duckling Fit account. Please click the link below to reset your password. This link is valid for 10 minutes:</p>
                <p style="text-align: center;"><a href=${link}>Reset Password</a></p>
                <p>If you did not request this password reset, please ignore this email.</p>
                <p>Please note that the password reset link is only valid for 10 minutes.</p>
                <p>Thank you,</p>
                <p>The Duckling Fit Team</p>
            </div>
        </body>
        </html>
    `
}