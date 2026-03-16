// ============================================================
// firebase-config.js
// Replace the firebaseConfig object below with your own
// Firebase project credentials from:
// https://console.firebase.google.com → Project Settings → Your Apps
// ============================================================

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// ============================================================
// DEMO MODE — remove this block once you add real Firebase creds
// This seeds localStorage with sample data so the UI is usable
// without a live Firebase project.
// ============================================================
const DEMO_MODE = firebaseConfig.apiKey === "YOUR_API_KEY";

const DEMO_INCIDENTS = [
  {
    id: "INC-001",
    title: "Ransomware Detected on PROD-DB-01",
    severity: "critical",
    attackType: "Ransomware",
    state: "investigating",
    assignee: "Alice Nkosi",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 1800000).toISOString(),
    sourceIP: "192.168.14.22",
    affectedSystem: "PROD-DB-01",
    description: "EDR flagged lateral movement followed by file encryption on the primary database server. Snapshot taken. Containment in progress.",
    tags: ["ransomware","lateral-movement","db"],
    notes: [
      { author: "Alice Nkosi", text: "Isolated host from network. Forensic copy initiated.", ts: new Date(Date.now() - 3000000).toISOString() },
      { author: "System", text: "SLA breach warning: 2 hours remaining.", ts: new Date(Date.now() - 1800000).toISOString() }
    ],
    evidence: [
      { name: "edr-alert-dump.json", size: "48 KB", uploadedAt: new Date(Date.now() - 3500000).toISOString() }
    ],
    timeline: [
      { event: "Incident created", ts: new Date(Date.now() - 7200000).toISOString() },
      { event: "Assigned to Alice Nkosi", ts: new Date(Date.now() - 7100000).toISOString() },
      { event: "Host isolated", ts: new Date(Date.now() - 6000000).toISOString() },
      { event: "Forensic copy initiated", ts: new Date(Date.now() - 3000000).toISOString() }
    ]
  },
  {
    id: "INC-002",
    title: "Suspicious Login — Admin Account",
    severity: "high",
    attackType: "Unauthorized Access",
    state: "open",
    assignee: "Ben Dlamini",
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 1).toISOString(),
    sourceIP: "45.33.32.156",
    affectedSystem: "IAM / Active Directory",
    description: "Multiple failed logins followed by a successful auth from an unusual geolocation (Nigeria → South Africa within 30 min).",
    tags: ["unauthorized-access","admin","geo-anomaly"],
    notes: [
      { author: "Ben Dlamini", text: "Confirmed impossible travel. Account locked pending investigation.", ts: new Date(Date.now() - 3600000).toISOString() }
    ],
    evidence: [],
    timeline: [
      { event: "Alert triggered by SIEM", ts: new Date(Date.now() - 18000000).toISOString() },
      { event: "Incident created", ts: new Date(Date.now() - 18000000).toISOString() },
      { event: "Account locked", ts: new Date(Date.now() - 3600000).toISOString() }
    ]
  },
  {
    id: "INC-003",
    title: "Phishing Campaign Targeting Finance",
    severity: "medium",
    attackType: "Phishing",
    state: "contained",
    assignee: "Cara van Wyk",
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    sourceIP: "mail.fakebank-alert.com",
    affectedSystem: "Email Gateway",
    description: "52 emails received targeting the finance department with a credential-harvesting page mimicking the internal payroll portal.",
    tags: ["phishing","finance","email"],
    notes: [],
    evidence: [
      { name: "phishing-email-sample.eml", size: "12 KB", uploadedAt: new Date(Date.now() - 86000000).toISOString() },
      { name: "screenshot-fake-portal.png", size: "340 KB", uploadedAt: new Date(Date.now() - 85000000).toISOString() }
    ],
    timeline: [
      { event: "Incident created", ts: new Date(Date.now() - 86400000).toISOString() },
      { event: "Emails quarantined (52)", ts: new Date(Date.now() - 85000000).toISOString() },
      { event: "Domain blocked on proxy", ts: new Date(Date.now() - 80000000).toISOString() },
      { event: "Finance team notified", ts: new Date(Date.now() - 75000000).toISOString() }
    ]
  },
  {
    id: "INC-004",
    title: "Port Scan from External IP",
    severity: "low",
    attackType: "Reconnaissance",
    state: "resolved",
    assignee: "David Mokoena",
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    sourceIP: "185.220.101.47",
    affectedSystem: "Perimeter Firewall",
    description: "Automated port scan detected from known Tor exit node. No services exposed. Firewall rule updated.",
    tags: ["recon","port-scan","tor"],
    notes: [],
    evidence: [],
    timeline: [
      { event: "Incident created", ts: new Date(Date.now() - 172800000).toISOString() },
      { event: "IP blocked at perimeter", ts: new Date(Date.now() - 170000000).toISOString() },
      { event: "Incident resolved", ts: new Date(Date.now() - 43200000).toISOString() }
    ]
  },
  {
    id: "INC-005",
    title: "Data Exfiltration Attempt via DNS Tunneling",
    severity: "critical",
    attackType: "Data Exfiltration",
    state: "open",
    assignee: "Alice Nkosi",
    createdAt: new Date(Date.now() - 3600000 * 1).toISOString(),
    updatedAt: new Date(Date.now() - 1200000).toISOString(),
    sourceIP: "10.0.4.88",
    affectedSystem: "DNS / Internal Workstation WS-088",
    description: "Anomalously large DNS TXT record queries detected. Pattern consistent with DNS tunneling exfiltration tool (iodine/dnscat2).",
    tags: ["exfiltration","dns","tunneling"],
    notes: [
      { author: "Alice Nkosi", text: "Blocked outbound DNS except to internal resolver. Capturing traffic.", ts: new Date(Date.now() - 1200000).toISOString() }
    ],
    evidence: [],
    timeline: [
      { event: "Alert triggered by NDR", ts: new Date(Date.now() - 3600000).toISOString() },
      { event: "Incident created", ts: new Date(Date.now() - 3600000).toISOString() },
      { event: "DNS policy updated", ts: new Date(Date.now() - 1200000).toISOString() }
    ]
  }
];

// Seed demo data into memory (acts as in-memory DB in demo mode)
if (DEMO_MODE) {
  if (!window._demoStore) {
    window._demoStore = { incidents: JSON.parse(JSON.stringify(DEMO_INCIDENTS)) };
  }
}

// ============================================================
// Unified data layer — works in both Demo and Firebase mode
// ============================================================
const DataLayer = {
  async getIncidents() {
    if (DEMO_MODE) {
      return window._demoStore.incidents.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    const snap = await db.collection("incidents").orderBy("createdAt", "desc").get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  },

  async getIncident(id) {
    if (DEMO_MODE) {
      return window._demoStore.incidents.find(i => i.id === id) || null;
    }
    const doc = await db.collection("incidents").doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  },

  async createIncident(data) {
    if (DEMO_MODE) {
      const id = "INC-" + String(window._demoStore.incidents.length + 1).padStart(3, "0");
      const now = new Date().toISOString();
      const incident = {
        ...data, id,
        createdAt: now, updatedAt: now,
        notes: [], evidence: [],
        timeline: [{ event: "Incident created", ts: now }]
      };
      window._demoStore.incidents.unshift(incident);
      return id;
    }
    const ref = await db.collection("incidents").add({
      ...data,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      notes: [], evidence: [],
      timeline: [{ event: "Incident created", ts: new Date().toISOString() }]
    });
    return ref.id;
  },

  async addNote(incidentId, note) {
    if (DEMO_MODE) {
      const inc = window._demoStore.incidents.find(i => i.id === incidentId);
      if (inc) {
        inc.notes.push(note);
        inc.updatedAt = new Date().toISOString();
        inc.timeline.push({ event: `Note added by ${note.author}`, ts: note.ts });
      }
      return;
    }
    await db.collection("incidents").doc(incidentId).update({
      notes: firebase.firestore.FieldValue.arrayUnion(note),
      timeline: firebase.firestore.FieldValue.arrayUnion({ event: `Note added by ${note.author}`, ts: note.ts }),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  },

  async updateState(incidentId, state) {
    if (DEMO_MODE) {
      const inc = window._demoStore.incidents.find(i => i.id === incidentId);
      if (inc) {
        inc.state = state;
        inc.updatedAt = new Date().toISOString();
        inc.timeline.push({ event: `State changed to: ${state}`, ts: new Date().toISOString() });
      }
      return;
    }
    await db.collection("incidents").doc(incidentId).update({
      state,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      timeline: firebase.firestore.FieldValue.arrayUnion({ event: `State changed to: ${state}`, ts: new Date().toISOString() })
    });
  },

  async addEvidence(incidentId, fileInfo) {
    if (DEMO_MODE) {
      const inc = window._demoStore.incidents.find(i => i.id === incidentId);
      if (inc) {
        inc.evidence.push(fileInfo);
        inc.updatedAt = new Date().toISOString();
        inc.timeline.push({ event: `Evidence attached: ${fileInfo.name}`, ts: fileInfo.uploadedAt });
      }
      return;
    }
    await db.collection("incidents").doc(incidentId).update({
      evidence: firebase.firestore.FieldValue.arrayUnion(fileInfo),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      timeline: firebase.firestore.FieldValue.arrayUnion({ event: `Evidence attached: ${fileInfo.name}`, ts: fileInfo.uploadedAt })
    });
  }
};
