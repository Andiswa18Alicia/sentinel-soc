const firebaseConfig = {
  apiKey: "AIzaSyAXsAXojw3yGnsys4PDTI28k4A-WaxBn9k",
  authDomain: "soc-dashboard-e3b9b.firebaseapp.com",
  projectId: "soc-dashboard-e3b9b",
  storageBucket: "soc-dashboard-e3b9b.firebasestorage.app",
  messagingSenderId: "2801008006",
  appId: "1:2801008006:web:1c3644bdedd1b6e7698007"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

const DEMO_MODE = false;

const DataLayer = {
  async getIncidents() {
    const snap = await db.collection("incidents").orderBy("createdAt", "desc").get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  },

  async getIncident(id) {
    const doc = await db.collection("incidents").doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  },

  async createIncident(data) {
    const ref = await db.collection("incidents").add({
      ...data,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      notes: [],
      evidence: [],
      timeline: [{ event: "Incident created", ts: new Date().toISOString() }]
    });
    return ref.id;
  },

  async addNote(incidentId, note) {
    await db.collection("incidents").doc(incidentId).update({
      notes: firebase.firestore.FieldValue.arrayUnion(note),
      timeline: firebase.firestore.FieldValue.arrayUnion({ event: `Note added by ${note.author}`, ts: note.ts }),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  },

  async updateState(incidentId, state) {
    await db.collection("incidents").doc(incidentId).update({
      state,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      timeline: firebase.firestore.FieldValue.arrayUnion({ event: `State changed to: ${state}`, ts: new Date().toISOString() })
    });
  },

  async addEvidence(incidentId, fileInfo) {
    await db.collection("incidents").doc(incidentId).update({
      evidence: firebase.firestore.FieldValue.arrayUnion(fileInfo),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      timeline: firebase.firestore.FieldValue.arrayUnion({ event: `Evidence attached: ${fileInfo.name}`, ts: fileInfo.uploadedAt })
    });
  }
};
