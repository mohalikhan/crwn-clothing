import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDMSVmh5njGA1eFEE_f15lLTc0jLvDPpyg",
    authDomain: "crwn-db-dccec.firebaseapp.com",
    databaseURL: "https://crwn-db-dccec.firebaseio.com",
    projectId: "crwn-db-dccec",
    storageBucket: "",
    messagingSenderId: "384990926791",
    appId: "1:384990926791:web:3d3870d2671c177f186be2"
};

export const createUserProfileDocument = (userAuth, additionalData) => {
    if (!userAuth) return;
    return new Promise((resolve, reject) => {
        const userRef = firestore.doc(`users/${userAuth.uid}`);
        const snapShot = userRef.get();  

        if (!snapShot.exists) {
            const { displayName, email } = userAuth;
            const createdAt = new Date();
    
            try {
                userRef.set({
                    displayName,
                    email,
                    createdAt,
                    ...additionalData
                })
            } catch (error) {
                return reject(error.message);
            }
        }
        return resolve(userRef);
    });
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });

    return await batch.commit();

}

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    });

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
}

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject)
    })
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;


