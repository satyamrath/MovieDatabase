import { HashRouter, Switch, Route } from 'react-router-dom';
import AddMovie from './components/AddMovie';
import Header from './components/Header';
import Home from './components/Home';
import UpdateMovie from './components/UpdateMovie';

function App() {
	return (
		<HashRouter>
			<Header />
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route path="/add">
					<AddMovie />
				</Route>
				<Route path="/update">
					<UpdateMovie />
				</Route>
				<Route path="/delete">
					<h1>Delete Movie</h1>
				</Route>
			</Switch>
		</HashRouter>
	);
}

export default App;
