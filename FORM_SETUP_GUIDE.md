# Contact Form Setup Guide

This guide will help you set up the reusable contact form component with Google Sheets backend and anti-spam protection.

## Prerequisites

1. A Google account
2. Access to Google Apps Script
3. A Google Sheet for storing form submissions
4. reCAPTCHA account (free)

## Step 1: Set up Google Sheet

1. Create a new Google Sheet
2. Note the Spreadsheet ID from the URL (the long string between `/d/` and `/edit`)
3. The script will automatically create two sheets:
   - `FormSubmissions` - stores all form submissions
   - `RateLimits` - tracks rate limiting

## Step 2: Set up reCAPTCHA

1. Go to https://www.google.com/recaptcha/
2. Click "Get reCAPTCHA"
3. Choose "reCAPTCHA v2" → "I'm not a robot" Checkbox
4. Add your domain(s)
5. Note your **Site Key** and **Secret Key**

## Step 3: Deploy Google Apps Script

1. Go to https://script.google.com/
2. Create a new project
3. Replace the default code with the contents of `google-apps-script-backend.js`
4. Update the configuration variables:
   ```javascript
   const SPREADSHEET_ID = 'YOUR_ACTUAL_SPREADSHEET_ID';
   const RECAPTCHA_SECRET_KEY = 'YOUR_ACTUAL_RECAPTCHA_SECRET_KEY';
   const ADMIN_EMAIL = 'your-email@example.com';
   ```
5. Save the project
6. Click "Deploy" → "New deployment"
7. Choose "Web app"
8. Set:
   - Execute as: "Me"
   - Who has access: "Anyone"
9. Click "Deploy"
10. Copy the **Web app URL**

## Step 4: Update Form Component

1. Open `src/components/common/ContactForm.astro`
2. Replace `YOUR_RECAPTCHA_SITE_KEY` with your actual reCAPTCHA site key
3. Replace `YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL` with your actual web app URL

## Step 5: Use the Form Component

### Basic Usage

```astro
---
import ContactForm from "@components/common/ContactForm.astro";
---

<ContactForm />
```

### Customized Usage

```astro
---
import ContactForm from "@components/common/ContactForm.astro";
---

<ContactForm 
  title="Get in Touch"
  subtitle="We'd love to hear from you about our running community!"
  submitButtonText="Send Message"
  successMessage="Thanks! We'll get back to you soon."
  formId="contact-form-1"
  className="my-8"
/>
```

### Multiple Forms on Same Page

```astro
---
import ContactForm from "@components/common/ContactForm.astro";
---

<div class="grid md:grid-cols-2 gap-8">
  <ContactForm 
    title="General Inquiry"
    formId="general-contact"
  />
  
  <ContactForm 
    title="Volunteer Interest"
    subtitle="Interested in volunteering?"
    formId="volunteer-contact"
  />
</div>
```

## Step 6: Update Contact Page

Update your contact page to use the new form:

```astro
---
import type { AboutEntry } from "@/types";
import HeroLayout from "@components/common/HeroLayout.astro";
import ContactForm from "@components/common/ContactForm.astro";
import { getEntry } from "astro:content";
import contactUsHero from "@assets/hero/contact_us_hero.jpg";

const entry = (await getEntry("about", "contact-us")) as AboutEntry;
---

<HeroLayout 
  entry={entry} 
  heroImage={contactUsHero}
  contentClass="content-beige"
  heroTextClass="content-lightgreen"
/>

<div class="container mx-auto px-4 py-16">
  <div class="max-w-4xl mx-auto">
    <div class="grid md:grid-cols-2 gap-12">
      <!-- Contact Information -->
      <div>
        <h2 class="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
        <p class="text-gray-600 mb-8">
          We'd love to hear from you! Whether you have questions about our upcoming race, 
          want to get involved with our community, or just want to say hello, we're here to help.
        </p>
        
        <div class="space-y-4">
          <div>
            <h3 class="font-semibold text-gray-900">Email</h3>
            <p class="text-gray-600">info@confluencerunningcollective.com</p>
          </div>
          
          <div>
            <h3 class="font-semibold text-gray-900">Social Media</h3>
            <p class="text-gray-600">
              <a href="https://www.instagram.com/confluencerunningcollective" class="text-green-600 hover:text-green-700">
                @confluencerunningcollective
              </a>
            </p>
          </div>
        </div>
      </div>
      
      <!-- Contact Form -->
      <div>
        <ContactForm 
          title="Send us a Message"
          subtitle="Fill out the form below and we'll get back to you as soon as possible."
        />
      </div>
    </div>
  </div>
</div>
```

## Anti-Spam Features

The form includes multiple layers of protection:

1. **reCAPTCHA** - Prevents automated submissions
2. **Honeypot Field** - Hidden field that bots fill out
3. **Rate Limiting** - Max 5 submissions per hour per email
4. **Content Filtering** - Blocks spam keywords and patterns
5. **Email Validation** - Server-side email format checking
6. **Suspicious Pattern Detection** - Flags unusual submissions

## Monitoring Submissions

1. Check your Google Sheet for new submissions
2. Monitor the "RateLimits" sheet for potential abuse
3. Set up email notifications for new submissions
4. Review logs in Google Apps Script console

## Troubleshooting

### Form not submitting
- Check browser console for errors
- Verify reCAPTCHA site key is correct
- Ensure Google Apps Script URL is accessible

### reCAPTCHA not working
- Verify domain is added to reCAPTCHA settings
- Check if site key matches your domain

### Submissions not appearing in sheet
- Check Google Apps Script logs
- Verify spreadsheet ID is correct
- Ensure script has permission to access the sheet

### Rate limiting issues
- Check "RateLimits" sheet for blocked emails
- Adjust `MAX_SUBMISSIONS_PER_HOUR` in the script

## Security Notes

- Keep your reCAPTCHA secret key private
- Regularly monitor submissions for spam
- Consider adding IP-based rate limiting for additional security
- Backup your Google Sheet regularly

## Customization

You can customize the form by:

1. **Adding fields** - Modify the form HTML and update the Google Apps Script
2. **Changing styling** - Update the CSS classes in the component
3. **Adjusting spam filters** - Modify the `isSpam()` function
4. **Adding validation** - Extend the client-side validation
5. **Custom notifications** - Modify the email template

## Support

For issues or questions:
1. Check the browser console for JavaScript errors
2. Review Google Apps Script logs
3. Verify all configuration values are correct
4. Test with a simple submission first
