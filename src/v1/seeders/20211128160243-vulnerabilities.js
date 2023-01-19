'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert('vulnerabilities', [
      {
        title: 'RCE'
      },
      {
        title: 'Injections'
      },
      {
        title: 'XXE'
      },
      {
        title: 'SSRF'
      },
      {
        title: 'IDOR'
      },
      {
        title: 'Command Injection'
      },
      {
        title: 'File Inclusion'
      },
      {
        title: 'Improper Access Control'
      },
      {
        title: 'Privilege Escalation'
      },
      {
        title: 'Improper Authentication'
      },
      {
        title: 'Business logic vulnerabilities'
      },
      {
        title: 'Sensitive Data Exposure'
      },
      {
        title: 'UI and UX bugs and spelling or localization mistakes'
      },
      {
        title:
          'Open redirect / Lack of security speedbump when leaving the site'
      },
      {
        title: 'HTTP 404 codes/pages or other HTTP non-200 codes/pages'
      },
      {
        title:
          'Disclosure of known public files or directories, (e.g. README.TXT, CHANGES.TXT, robots.txt, .gitignore, etc.)'
      },
      {
        title: `Presence of application or web browser 'autocomplete' or 'save password' functionality`
      },
      {
        title: 'Lack of Secure/HTTPOnly flags on non-sensitive Cookies'
      },
      {
        title:
          'Descriptive error messages (e.g. stack traces, application or server errors, path disclosure)'
      },
      {
        title: 'Fingerprinting/banner disclosure on common/public services'
      },
      {
        title: 'Clickjacking and issues only exploitable through clickjacking'
      },
      {
        title: `CSRF issues that don't impact the integrity of an account (e.g. log in or out, contact forms and other publicly accessible forms)`
      },
      {
        title: 'Lack of rate limiting / Weak Captcha / Captcha Bypass'
      },
      {
        title:
          'Login or Forgot Password page brute force, account lockout not enforced, or insufficient password strength requirements'
      },
      {
        title: 'HTTPS mixed content scripts'
      },
      {
        title:
          'Username / email enumeration by brute forcing / error messages (e.g. login / signup / forgotten password)',
        metaData: JSON.stringify([
          'Exceptional cases may still be in scope (e.g. ability to enumerate email addresses via incrementing a numeric parameter)'
        ])
      },
      {
        title:
          'Use of a known-vulnerable component (exceptional cases, such as where you are able to provide proof of exploitation, may still be in scope)'
      },
      {
        title: 'OPTIONS HTTP method enabled'
      },
      {
        title: 'Missing HTTP security headers, e.g',
        metaData: JSON.stringify([
          'Strict-Transport-Security',
          'X-Frame-Options',
          'X-XSS-Protection',
          'X-Content-Type-Options',
          'Content-Security-Policy, X-Content-Security-Policy, X-WebKit-CSP',
          'Content-Security-Policy-Report-Only'
        ])
      },
      {
        title: 'SSL Issues, e.g',
        metaData: JSON.stringify([
          'SSL Attacks such as BEAST, BREACH, Renegotiation attack',
          'SSL Forward secrecy not enabled',
          'SSL weak / insecure cipher suites'
        ])
      },
      {
        title:
          'Self XSS / XSS issues that affect only outdated browsers (like Internet Explorer)'
      },
      {
        title: 'Text injection'
      },
      {
        title: 'Spamming'
      },
      {
        title: 'Best practices'
      },
      {
        title: 'WAF bypass'
      },
      {
        title: 'Internal IP address disclosure'
      },
      {
        title: 'Denial of Service attacks'
      },
      {
        title: 'Out-of-date software'
      },
      {
        title: 'DNS issues (i.e. mx records, SPF records, etc.)'
      },
      {
        title:
          'Social engineering / phishing attacks / Email spoofing, and related issues'
      },
      {
        title: `Physical attacks against Alibaba's Facilities / Property`
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
}
