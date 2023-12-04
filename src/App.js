import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import TodoApp from './components/TodoApp';
// import { auth } from '../firebase/firebase.utils';

const App = () => {
  // const [userName, setUserName] = useState('');
  // console.log(userName)
  // useEffect(() => {
  //   auth.onAuthStateChanged(user => {
  //     if (user) {
  //       setUserName(user.displayName);
  //     } else {
  //       setUserName('');
  //     }
  //   });
  // }, []);

  return (
    <Router>
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/" component={Home} />
        <Route path="/todo" component={TodoApp} />
      </Switch>
    </Router>
  );
};

export default App;

