# EmailJS Setup Guide

Your contact form is now configured to send emails via EmailJS. Follow these steps to activate it:

## Step 1: Create an EmailJS Account
1. Go to https://www.emailjs.com/
2. Click "Sign Up" and create a free account
3. Verify your email

## Step 2: Create an Email Service
1. In the EmailJS dashboard, go to **Email Services**
2. Click **"Add Service"**
3. Choose your email provider (Gmail, Outlook, etc.) or use **Gmail**
4. For Gmail:
   - Select "Gmail"
   - Click "Connect Account"
   - Authorize EmailJS to access your Gmail
5. Name the service (e.g., "Gmail Service")
6. Copy the **Service ID** (you'll need this)

## Step 3: Create an Email Template
1. Go to **Email Templates**
2. Click **"Create New Template"**
3. Use this template code:

```
From: {{from_name}} <{{from_email}}>
Phone: {{phone}}

{{message}}
```

4. Set the email subject to: `New Contact Form Submission from {{from_name}}`
5. Set "Send to" as: `{{to_email}}`
6. Save the template
7. Copy the **Template ID** (you'll need this)

## Step 4: Get Your Public Key
1. Go to **Account → API Keys**
2. Copy your **Public Key**

## Step 5: Update Your Website
1. Open `script.js` in your project
2. Find these lines (around line 2-4):
   ```javascript
   const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY_HERE";
   const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID_HERE";
   const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID_HERE";
   ```

3. Replace with your actual credentials:
   ```javascript
   const EMAILJS_PUBLIC_KEY = "your_actual_public_key";
   const EMAILJS_SERVICE_ID = "service_xxxxxxxxx";
   const EMAILJS_TEMPLATE_ID = "template_xxxxxxxxx";
   ```

## Step 6: Test the Form
1. Open your website
2. Scroll to the "Get in Touch" contact form
3. Fill in all fields and submit
4. You should receive an email at `info@hra-ca.com` with the submission

## That's It! 🎉
Your contact form is now fully functional and sending emails!

### Troubleshooting:
- **Emails not sending?** Check browser console (F12) for errors
- **Template not matching?** Make sure template variables match: `{{from_name}}`, `{{from_email}}`, `{{phone}}`, `{{message}}`, `{{to_email}}`
- **Gmail not working?** You may need to use an [App Password](https://support.google.com/accounts/answer/185833) instead of your regular password

### Free Plan Limits:
- EmailJS free tier allows 200 emails/month
- Perfect for testing and small websites
