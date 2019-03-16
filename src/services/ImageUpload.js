import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyD3XGgF6aKVXFq5IKfQYWOF8h9pBeXMO2U",
    authDomain: "o-commerce.firebaseapp.com",
    databaseURL: "https://o-commerce.firebaseio.com",
    projectId: "o-commerce",
    storageBucket: "o-commerce.appspot.com",
    messagingSenderId: "559262210318"
};

firebase.initializeApp(config);

const storage = firebase.storage();

export const imageUpload = async (localImageUrl) => {
    const ref = storage.ref().child(`${new Date().toISOString()}`);

    const imageResponse = await fetch(imageUpload)
    const imageBlob = await imageResponse.blob();
    const snapshot = await ref.put(imageBlob);

    return new Promise((resolve, reject) => {
        ref.getDownloadURL().then(imageUrl => {
            resolve(imageUrl);
        }).catch(error => {
            reject(error);
        });
    });
};

