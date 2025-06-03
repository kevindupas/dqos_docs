---
title: Two-Factor Authentication
nextjs:
  metadata:
    title: Two-Factor Authentication
    description: Secure your DQoS account with two-factor authentication.
---

Two-factor authentication (2FA) adds an extra layer of security to your DQoS account. When enabled, you'll need both your password and a time-based code from your mobile device to log in.

This feature is optional but highly recommended, especially for administrator accounts and users handling sensitive data.

---

## Enabling Two-Factor Authentication

To enable 2FA on your account, navigate to your **Profile Settings** after logging in.

In the **Two Factor Authentication** section, click **"Enable"** to begin the setup process.

![Two-factor authentication settings](/images/2fa-settings.png)

---

## Setting up your authenticator app

Once you click "Enable", a QR code will be displayed on your screen.

You'll need an authenticator app on your mobile device such as:
- **Google Authenticator** (iOS/Android)
- **Microsoft Authenticator** (iOS/Android)  
- **Authy** (iOS/Android)
- **1Password** (if you have a subscription)

Open your authenticator app and scan the QR code displayed on the screen.

![QR code setup](/images/2fa-qr-code.png)

---

## Confirming the setup

After scanning the QR code, your authenticator app will start generating 6-digit codes that refresh every 30 seconds.

Enter the current code from your app into the **"Code"** field and click **"Confirm"** to complete the setup.

![2FA confirmation](/images/2fa-confirm.png)

---

## Recovery codes

Once 2FA is enabled, you'll be shown a list of **recovery codes**. These are one-time use codes that allow you to access your account if you lose your mobile device.

**Important:** Save these codes in a secure location (password manager, printed copy in a safe place, etc.). Each code can only be used once.

![Recovery codes](/images/2fa-recovery-codes.png)

You can regenerate new recovery codes at any time from your profile settings if needed.

---

## Logging in with Two-Factor Authentication

When 2FA is enabled on your account, the login process requires an additional step:

1. Enter your **email** and **password** as usual
2. Click **"Log in"**
3. You'll be redirected to the 2FA verification page
4. Open your authenticator app and enter the current 6-digit code
5. Click **"Verify"** to complete the login

![2FA login verification](/images/2fa-login.png)

The verification code expires after 30 seconds, so make sure to enter it quickly.

---

## Using recovery codes

If you don't have access to your mobile device, you can use one of your recovery codes instead:

1. On the 2FA verification page, click **"Use a recovery code"**
2. Enter one of your saved recovery codes
3. Click **"Verify"**

![Recovery code login](/images/2fa-recovery-login.png)

**Remember:** Each recovery code can only be used once. Consider regenerating new codes after using several of them.

---

## Managing Two-Factor Authentication

From your profile settings, you can:

- **View recovery codes**: See your current unused recovery codes
- **Regenerate recovery codes**: Create a new set of codes (this invalidates all previous codes)
- **Disable 2FA**: Turn off two-factor authentication completely

![2FA management options](/images/2fa-manage.png)

---

## Disabling Two-Factor Authentication

If you need to disable 2FA:

1. Go to your **Profile Settings**
2. In the **Two Factor Authentication** section, click **"Disable"**
3. Enter your current password to confirm
4. Click **"Disable"** to turn off 2FA

![Disable 2FA](/images/2fa-disable.png)

After disabling 2FA, you'll only need your email and password to log in.

---

## Troubleshooting

**My authenticator app codes aren't working:**
- Check that your device's time is synchronized correctly
- Ensure you're entering the code quickly (they expire every 30 seconds)
- Try refreshing the 2FA page and using a new code

**I lost my mobile device:**
- Use one of your recovery codes to log in
- Once logged in, disable 2FA and set it up again with your new device

**I lost my recovery codes:**
- If you can still access your authenticator app, log in normally and regenerate new recovery codes
- If you've lost both your device and recovery codes, contact your administrator for account recovery