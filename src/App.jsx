
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersCollectionRef = collection(db, 'users');
    const unsub = onSnapshot(usersCollectionRef, (querySnapshot) => {
      setUsers(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
    return unsub;
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email } = event.target.elements;
    console.log(name.value, email.value);
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
          <div key={user.id}>{user.name}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
