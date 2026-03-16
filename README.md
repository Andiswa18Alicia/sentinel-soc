# SENTINEL — Security Operations Center Dashboard

A cybersecurity incident response platform built with HTML, CSS, Vanilla JS, and Firebase.

## 📁 Files

| File | Description |
|------|-------------|
| `index.html` | Main dashboard — stats, charts, heatmap, recent incidents |
| `incidents.html` | Full incident registry with filtering and incident creation |
| `incident-detail.html` | Deep-dive view: timeline, notes, evidence, state management |
| `styles.css` | Global dark industrial design system |
| `app.js` | Shared utilities (formatting, nav, toast, templates) |
| `firebase-config.js` | Firebase setup + demo data layer |

---

## 🚀 Setup

### Option A: Demo Mode (no Firebase needed)

Just open `index.html` directly in a browser. The app loads with 5 sample incidents automatically.

### Option B: Connect Firebase

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Create a new project
3. Enable **Firestore Database** (start in test mode for development)
4. Go to **Project Settings → Your Apps → Web App** → Copy the config
5. Open `firebase-config.js` and replace the `firebaseConfig` object with your values:

```js
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "yourproject.firebaseapp.com",
  projectId: "yourproject",
  storageBucket: "yourproject.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

6. The yellow demo banner will disappear and all data will persist in Firestore.

### Firestore Rules (for production)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /incidents/{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

## ✨ Features

### Dashboard (index.html)
- Live stat cards: Critical, High, Open, Resolved, SLA warnings
- **14-day incident trend** line chart
- **Attack type distribution** doughnut chart
- **Severity distribution** bar chart
- **Risk × Severity heatmap** (severity vs. incident state)
- Recent incidents table with click-through
- Real-time UTC clock

### Incidents (incidents.html)
- Full searchable incident registry
- Filter by: severity, state, attack type, free text
- **Create incident modal** with all fields
- Redirects to detail page after creation

### Incident Detail (incident-detail.html)
- Color-coded incident banner by severity
- **State machine**: open → investigating → contained → resolved → closed
- **Investigation notes** with author + timestamp
- **Evidence attachments** (file metadata stored in Firestore; actual files would go to Firebase Storage)
- **Incident timeline** — auto-logged events for every state change and note
- **IP Reputation lookup** (simulated; integrate VirusTotal/AbuseIPDB API for real lookups)
- **Quick actions**: Copy report, Export JSON, Escalate to CISO

---

## 🔌 Extending

### Real IP Reputation (VirusTotal)
In `incident-detail.html`, replace the `lookupIP` function with a call to:
```
https://www.virustotal.com/api/v3/ip_addresses/{ip}
```
Requires a VirusTotal API key.

### Real IP Reputation (AbuseIPDB)
```
https://api.abuseipdb.com/api/v2/check?ipAddress={ip}
```

### File Storage
Replace the `attachEvidence` metadata-only approach with Firebase Storage:
```js
const storageRef = firebase.storage().ref(`incidents/${incidentId}/${file.name}`);
await storageRef.put(file);
const url = await storageRef.getDownloadURL();
```

### Authentication
Enable Firebase Auth (Google/Email) and wrap DataLayer calls behind `auth.currentUser`.

---

## 🎨 Design System

- **Font**: Share Tech Mono (data/labels) + Barlow Condensed (headings) + Barlow (body)
- **Colors**: Deep black bg, electric cyan accent, severity-coded (red/orange/yellow/green)
- **Aesthetic**: Dark industrial terminal / military ops center
