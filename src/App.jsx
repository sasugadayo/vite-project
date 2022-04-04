
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, addDoc, setDoc, doc, serverTimestamp, deleteDoc, query, where, getDocs, updateDoc, orderBy, limit } from 'firebase/firestore';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // 通常取得
    // const usersCollectionRef = collection(db, 'users');
    // const unsub = onSnapshot(usersCollectionRef, (querySnapshot) => {
    //   setUsers(
    //     querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    //   );
    // });

    // ソート
    const usersCollectionRef = collection(db, 'users');
    // 降順
    // const q = query(usersCollectionRef, orderBy('name', 'desc'));
    const q = query(usersCollectionRef, orderBy('name'), limit(2));
    // 取得件数制限
    const unsub = onSnapshot(q, (querySnapshot) => {
      setUsers(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });

    return unsub;
  }, []);

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const { name, email } = event.target.elements;
  //   console.log(name.value, email.value);
  // };

  // // addDoc関数によるドキュメント追加
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const { name, email } = event.target.elements;
  //   console.log(name.value, email.value);
  //   const usersCollectionRef = collection(db, 'users');
  //   const documentRef = await addDoc(usersCollectionRef, {
  //     name: name.value,
  //     email: email.value,
  //   });
  //   console.log(documentRef);
  // };

  // setDoc関数によるドキュメント追加
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email } = event.target.elements;

    const userDocumentRef = doc(collection(db, 'users'));
    await setDoc(userDocumentRef, {
      name: name.value,
      email: email.value,
      timpstamp: serverTimestamp(),
    });
  };

  // const deleteUser = async (id) => {
  //   const userDocumentRef = doc(db, 'users', id);
  //   await deleteDoc(userDocumentRef);
  // };

  // ユーザー削除
  const deleteUser = async (name) => {
    const userCollectionRef = collection(db, 'users');
    const q = query(userCollectionRef, where('name', '==', name));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (document) => {
      const userDocumentRef = doc(db, 'users', document.id);
      await deleteDoc(userDocumentRef);
    });
  };

  // admin
  const changeAdmin = async (id) => {
    const userDocumentRef = doc(db, 'users', id);
    await updateDoc(userDocumentRef, {
      admin: true,
    });
  };

  return (
    <div style={{ margin: '50px' }}>
      <form onSubmit={handleSubmit}>
        <div>
          <label>名前</label>
          <input name="name" type="text" placeholder="名前" />
        </div>
        <div>
          <label>メールアドレス</label>
          <input name="email" type="email" placeholder="メールアドレス" />
        </div>
        <div>
          <button>登録</button>
        </div>
      </form>
      <h1>ユーザ一覧</h1>
      <div>
        {users.map((user) => (
          <div key={user.id}>
            <span>{user.name}</span>
            {/* <button onClick={() => deleteUser(user.id)}>削除</button> */}
            <button onClick={() => deleteUser(user.id)}>削除</button>
            {!user.admin && (
              <button onClick={() => changeAdmin(user.id)}>admin</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
