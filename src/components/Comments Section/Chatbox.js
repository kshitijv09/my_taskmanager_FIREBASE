import React, { useEffect, useRef, useState, lazy, Suspense } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { db } from "../../firebase";
import SendMessage from "./SendMessage";
import { useLocation } from "react-router-dom";
import Loader from "../Loader/Loader";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getMessaging,
  getToken,
  onMessage,
  onTokenRefresh,
  requestPermission,
} from "firebase/messaging";

import "./style.css";

const Message = lazy(() => import("./Message"));
const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const scroll = useRef();

  const location = useLocation();
  const task_id = location.state;
  console.log(task_id);

  useEffect(() => {
    const firebaseConfig = {
      /* apiKey: process.env.REACT_APP_FIREBASE_API_KEY, */
      apiKey: "AIzaSyD4CDDgsrfRI1clr0BGXXe8Oz5OuR_9k9k",
      /*authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,*/
      authDomain: "taskmaanager-ba7fd.firebaseapp.com",
      /* projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID, */
      projectId: "taskmaanager-ba7fd",
      /* storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET, */
      storageBucket: "taskmaanager-ba7fd.appspot.com",
      /* messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID, */
      messagingSenderId: "30671024178",
      /* appId: process.env.REACT_APP_FIREBASE_APP_ID, */
      appId: "1:30671024178:web:eb0c05839382d332348c2b",
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const messaging = getMessaging(app);

    const requestNotificationPermission = async () => {
      const permissionStatus = await Notification.requestPermission();
      if (permissionStatus === "granted") {
        const token = await getToken(messaging);
        console.log("FCM token:", token);
        // Save the token to your user's data in Firestore or send it to your server
      } else {
        console.log("Notification permission denied");
      }
    };

    requestNotificationPermission();

    /* onTokenRefresh(() => {
      messaging
        .getToken()
        .then((refreshedToken) => {
          console.log("FCM token refreshed:", refreshedToken);
          // Update the refreshed token in your user's data in Firestore or send it to your server
        })
        .catch((error) => {
          console.log("FCM token refresh error:", error);
        });
    }); */

    onMessage(messaging, (payload) => {
      console.log("Received message:", payload);
    });
  }, []);

  useEffect(() => {
    const q = query(
      collection(db, `${task_id}`),
      orderBy("createdAt", "desc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
      const sortedMessages = fetchedMessages.sort(
        (a, b) => a.createdAt - b.createdAt
      );
      setMessages(sortedMessages);
    });
    return () => unsubscribe;
  }, []);

  return (
    <main className="chat-box">
      <div className="heading">
        <h1>CHAT BOX</h1>
      </div>
      <div className="messages-wrapper">
        {messages?.map((message) => (
          <Suspense fallback={<Loader />}>
            <Message key={message.id} message={message} />
          </Suspense>
        ))}
      </div>
      {/* when a new message enters the chat, the screen scrolls down to the scroll div */}
      <span ref={scroll}></span>
      <SendMessage scroll={scroll} task_id={task_id} />
    </main>
  );
};

export default ChatBox;
