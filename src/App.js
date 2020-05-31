import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Board from "./component/Board";
import AddTask from "./component/taskcomponent/AddTask";
import UpdateTask from "./component/taskcomponent/UpdateTask";
import { Provider } from "react-redux";
import store from "./store";

function App() {
    return (
        <Provider store={ store }>
            <Router>
                <div className="App">
                    <Navbar />
                    <Route exact path="/" component={Board} />
                    <Route
                        exact
                        path="/addtask"
                        component={AddTask}
                    />
                    <Route exact path="/updatetask/:task_id" component={UpdateTask} />
                </div>
            </Router>
        </Provider>
    );
}

export default App;
