# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability, please report it by emailing the maintainer.
Do NOT create a public GitHub issue.

## Current Security Measures

- **Authentication**: Firebase Auth with Google provider, session persistence
- **Data Storage**: Firebase Firestore with granular security rules
- **Client Storage**: All localStorage calls wrapped in try/catch to prevent crashes in private browsing
- **API Protection**: No hardcoded API keys in client code
- **Dependencies**: Regular npm audit to patch vulnerabilities

## Security Best Practices

1. Never commit `.env` files or service account keys to the repository
2. All Firebase operations are subject to Firestore security rules in `firestore.rules`
3. CSP (Content Security Policy) is enforced via Tauri config
