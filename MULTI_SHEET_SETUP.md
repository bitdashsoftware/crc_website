# Multi-Sheet Contact Form Setup

## Overview

The contact form system now automatically creates separate Google Sheets for each form ID. This allows you to organize submissions by page or form type.

## How It Works

### 1. Form ID Detection
- Each contact form has a unique `formId` prop
- The form ID is sent with the submission data
- If no form ID is provided, it defaults to `'contact-form'`

### 2. Sheet Creation
- A new sheet is automatically created for each unique form ID
- Sheet names are sanitized to comply with Google Sheets naming rules
- Invalid characters are replaced with underscores
- Sheet names are limited to 31 characters

### 3. Sheet Structure
Each sheet contains these columns:
- **Timestamp** - When the submission was received
- **Name** - Submitter's name
- **Email** - Submitter's email
- **Message** - The submitted message
- **User Agent** - Browser information
- **Referrer** - Page where the form was submitted from
- **IP Address** - Not available in Apps Script (shows 'N/A')
- **Status** - Submission status (defaults to 'New')
- **Form ID** - The original form ID

## Example Usage

### Contact Us Page
```astro
<ContactForm 
  formId="contact-us-page"
  title="Contact Us"
  subtitle="Get in touch with our team"
/>
```
Creates sheet: `contact-us-page`

### Volunteer Page
```astro
<ContactForm 
  formId="volunteer-interest"
  title="Volunteer Interest"
  subtitle="Tell us about your volunteer interests"
/>
```
Creates sheet: `volunteer-interest`

### Partner Page
```astro
<ContactForm 
  formId="partner-inquiry"
  title="Partner With Us"
  subtitle="Let's discuss partnership opportunities"
/>
```
Creates sheet: `partner-inquiry`

## Sheet Naming Rules

### Valid Characters
- Letters (a-z, A-Z)
- Numbers (0-9)
- Underscores (_)
- Hyphens (-)

### Invalid Characters (automatically replaced)
- `[ ] \ / ? *` → `_`
- Spaces → `_`
- Other special characters → `_`

### Examples
- `contact-us-page` → `contact-us-page`
- `volunteer interest form` → `volunteer_interest_form`
- `partner@inquiry` → `partner_inquiry`
- `very-long-form-id-that-exceeds-31-characters` → `very-long-form-id-that-exceeds-31`

## Email Notifications

Notification emails now include:
- Form ID in the subject line
- Form ID in the email body
- All other submission details

## Setup Instructions

1. **Update Google Apps Script**: Replace your existing script with the updated version
2. **Redeploy**: Create a new version and deploy as a web app
3. **Update Form URLs**: Update the script URL in your ContactForm components
4. **Test**: Submit forms with different form IDs to verify sheet creation

## Benefits

- **Organized Data**: Separate sheets for different forms/pages
- **Easy Analysis**: Filter and analyze submissions by form type
- **Better Notifications**: Know which form received the submission
- **Scalable**: Automatically handles new forms without configuration
- **Clean Structure**: Each sheet has proper headers and formatting

## Troubleshooting

### Sheet Not Created
- Check that the form ID is being sent correctly
- Verify the Google Apps Script has permission to create sheets
- Check the Apps Script logs for errors

### Invalid Sheet Name
- The system automatically sanitizes form IDs
- Check the console logs to see the sanitized sheet name
- Use simpler form IDs if needed (letters, numbers, hyphens only)

### Permission Issues
- Ensure the Google Apps Script has edit access to the spreadsheet
- Check that the spreadsheet ID is correct
- Verify the script is deployed as a web app with proper permissions
