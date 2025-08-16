// Google Apps Script Backend for Contact Form
// Deploy this as a web app in Google Apps Script

// Configuration
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID'; // Replace with your actual spreadsheet ID
const RECAPTCHA_SECRET_KEY = 'YOUR_RECAPTCHA_SECRET_KEY'; // Replace with your reCAPTCHA secret key
const MAX_SUBMISSIONS_PER_HOUR = 5; // Rate limiting
const ADMIN_EMAIL = 'your-email@example.com'; // For notifications

function doPost(e) {
  try {
    
    const data = JSON.parse(e.postData.contents);
    
    // Log the request for debugging
    console.log('Received form submission:', data);
    
    // 1. Verify reCAPTCHA
    // if (!verifyRecaptcha(data.recaptchaResponse)) {
    //   return createResponse(false, 'reCAPTCHA verification failed', headers);
    // }
    
    // 2. Check honeypot field
    if (data.website) {
      console.log('Bot detected via honeypot field');
      return createResponse(false, 'Invalid submission detected');
    }
    
    // 3. Rate limiting check
    if (isRateLimited(data.email)) {
      return createResponse(false, 'Rate limit exceeded. Please wait before submitting again.');
    }
    
    // 4. Content filtering
    if (isSpam(data)) {
      console.log('Spam detected:', data);
      return createResponse(false, 'Message flagged as spam');
    }
    
    // 5. Save to spreadsheet
    const success = saveToSheet(data);
    
    if (success) {
      // 6. Send notification email (optional)
      sendNotificationEmail(data);
      
      return createResponse(true, 'Form submitted successfully');
    } else {
      return createResponse(false, 'Failed to save submission');
    }
    
  } catch (error) {
    console.error('Error processing form submission:', error);
    return createResponse(false, 'Internal server error', error.message);
  }
}

// Verify reCAPTCHA
function verifyRecaptcha(recaptchaResponse) {
  try {
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaResponse}`;
    const response = UrlFetchApp.fetch(verificationUrl);
    const result = JSON.parse(response.getContentText());
    
    return result.success === true;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
}

// Rate limiting check
function isRateLimited(email) {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('RateLimits');
    if (!sheet) {
      // Create rate limits sheet if it doesn't exist
      const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
      const newSheet = ss.insertSheet('RateLimits');
      newSheet.getRange(1, 1, 1, 3).setValues([['Email', 'Timestamp', 'IP']]);
      return false;
    }
    
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    
    // Get recent submissions from this email
    const data = sheet.getDataRange().getValues();
    const recentSubmissions = data.slice(1).filter(row => {
      const rowEmail = row[0];
      const rowTimestamp = new Date(row[1]);
      return rowEmail === email && rowTimestamp > oneHourAgo;
    });
    
    return recentSubmissions.length >= MAX_SUBMISSIONS_PER_HOUR;
    
  } catch (error) {
    console.error('Rate limiting check error:', error);
    return false; // Allow submission if rate limiting fails
  }
}

// Content filtering
function isSpam(data) {
  const spamKeywords = [
    'viagra', 'casino', 'loan', 'click here', 'buy now', 'make money fast',
    'weight loss', 'diet pills', 'free money', 'lottery', 'inheritance',
    'nigerian prince', 'urgent', 'limited time', 'act now', 'credit card',
    'debt consolidation', 'refinance', 'mortgage', 'insurance'
  ];
  
  const message = data.message.toLowerCase();
  const name = data.name.toLowerCase();
  const email = data.email.toLowerCase();
  
  // Check for spam keywords
  if (spamKeywords.some(keyword => 
    message.includes(keyword) || 
    name.includes(keyword) || 
    email.includes(keyword)
  )) {
    return true;
  }
  
  // Check for excessive links
  const linkCount = (message.match(/http/g) || []).length;
  if (linkCount > 3) {
    return true;
  }
  
  // Check for excessive caps
  const capsRatio = (message.match(/[A-Z]/g) || []).length / message.length;
  if (capsRatio > 0.7) {
    return true;
  }
  
  // Check for suspicious email patterns
  const suspiciousEmails = [
    'test@test.com', 'admin@admin.com', 'user@example.com',
    'example@example.com', 'demo@demo.com'
  ];
  if (suspiciousEmails.includes(email)) {
    return true;
  }
  
  // Check for very short messages (likely spam)
  if (message.length < 10) {
    return true;
  }
  
  // Check for repeated characters
  const repeatedChars = message.match(/(.)\1{4,}/g);
  if (repeatedChars && repeatedChars.length > 0) {
    return true;
  }
  
  return false;
}

// Save data to Google Sheet
function saveToSheet(data) {
  try {
    // Get form ID from data, default to 'contact-form' if not provided
    const formId = data.formId || 'contact-form';
    
    // Sanitize form ID for sheet name (remove special characters, limit length)
    const sheetName = sanitizeSheetName(formId);
    
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName(sheetName);
    
    if (!sheet) {
      // Create new sheet for this form ID
      sheet = ss.insertSheet(sheetName);
      sheet.getRange(1, 1, 1, 9).setValues([
        ['Timestamp', 'Name', 'Email', 'Message', 'User Agent', 'Referrer', 'IP Address', 'Status', 'Form ID']
      ]);
      
      // Format header row
      const headerRange = sheet.getRange(1, 1, 1, 9);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#f0f0f0');
      
      // Auto-resize columns
      sheet.autoResizeColumns(1, 9);
      
      console.log(`Created new sheet: ${sheetName} for form ID: ${formId}`);
    }
    
    // Add new row
    sheet.appendRow([
      new Date(),
      data.name,
      data.email,
      data.message,
      data.userAgent || '',
      data.referrer || '',
      'N/A', // IP address (not available in Apps Script)
      'New',
      formId
    ]);
    
    // Update rate limiting
    updateRateLimit(data.email);
    
    return true;
    
  } catch (error) {
    console.error('Error saving to sheet:', error);
    return false;
  }
}

// Sanitize sheet name (Google Sheets has restrictions on sheet names)
function sanitizeSheetName(formId) {
  // Remove or replace invalid characters
  let sanitized = formId
    .replace(/[\[\]\\\/\?\*]/g, '_') // Replace invalid characters with underscore
    .replace(/[^\w\s-]/g, '_') // Replace other special characters
    .replace(/\s+/g, '_') // Replace spaces with underscores
    .replace(/_+/g, '_') // Replace multiple underscores with single
    .trim();
  
  // Limit length (Google Sheets sheet names max 31 characters)
  if (sanitized.length > 31) {
    sanitized = sanitized.substring(0, 31);
  }
  
  // Ensure it starts with a letter or underscore
  if (!/^[a-zA-Z_]/.test(sanitized)) {
    sanitized = 'Form_' + sanitized;
  }
  
  return sanitized || 'Contact_Form';
}

// Update rate limiting
function updateRateLimit(email) {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('RateLimits');
    if (sheet) {
      sheet.appendRow([email, new Date(), 'N/A']);
    }
  } catch (error) {
    console.error('Error updating rate limit:', error);
  }
}

// Send notification email (optional)
function sendNotificationEmail(data) {
  try {
    const formId = data.formId || 'contact-form';
    const subject = `New Contact Form Submission - ${formId} - CRC Website`;
    const body = `
      New contact form submission received:
      
      Form ID: ${formId}
      Name: ${data.name}
      Email: ${data.email}
      Message: ${data.message}
      Timestamp: ${new Date().toLocaleString()}
      User Agent: ${data.userAgent || 'N/A'}
      Referrer: ${data.referrer || 'N/A'}
    `;
    
    MailApp.sendEmail(ADMIN_EMAIL, subject, body);
  } catch (error) {
    console.error('Error sending notification email:', error);
  }
}

// Create response
function createResponse(success, message) {
  let response = ContentService
    .createTextOutput(JSON.stringify({
      success: success,
      message: message,
      timestamp: new Date().toISOString(),
      error: success ? null : message
    }))
    .setMimeType(ContentService.MimeType.JSON);
  
  return response;
}

// Test function (optional)
function testFormSubmission() {
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    message: 'This is a test message',
    recaptchaResponse: 'test',
    timestamp: new Date().toISOString(),
    userAgent: 'Test User Agent',
    referrer: 'https://example.com'
  };
  
  const result = doPost({
    postData: {
      contents: JSON.stringify(testData)
    }
  });
  
  console.log('Test result:', result);
}

