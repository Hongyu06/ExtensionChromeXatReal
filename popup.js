const firebaseConfig = {
  apiKey: "AIzaSyBn55d46Vg61gpHcBrkYSB8Tepn6g06n0g",
  authDomain: "chrome-extension-chat-6f801.firebaseapp.com",
  databaseURL: "https://chrome-extension-chat-6f801-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chrome-extension-chat-6f801",
  storageBucket: "chrome-extension-chat-6f801.appspot.com",
  messagingSenderId: "945346792367",
  appId: "1:945346792367:web:33cfb2978bb4991f837d5a",
  measurementId: "G-TP647TR57T"
};

// Inicialitza Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const messagesDiv = document.getElementById('messages');
const input = document.getElementById('input');
const sendBtn = document.getElementById('send');
const usernameInput = document.getElementById('username');

function afegeixMissatge(text, user = 'Anon') {
  const div = document.createElement('div');
  div.textContent = `${user}: ${text}`;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Enviar missatge
sendBtn.addEventListener('click', () => {
  const text = input.value.trim();
  const username = usernameInput.value.trim() || 'Anon';
  if (text.length === 0) return;

  const newMsgRef = db.ref('chat').push();
  newMsgRef.set({
    user: username,
    message: text,
    timestamp: Date.now()
  });

  input.value = '';
});

// Escoltar missatges nous
db.ref('chat').limitToLast(50).on('child_added', snapshot => {
  const msg = snapshot.val();
  afegeixMissatge(msg.message, msg.user);
});
