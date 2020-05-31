import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getBacklog } from "../actions/taskActions";
import Task from "./taskcomponent/Task";

class Board extends Component {
    componentDidMount() {
        this.props.getBacklog();
    }
    render() {
        const { tasks } = this.props.tasks;

        let BoardContent;
        let todoItems = [];
        let inprogressItems = [];
        let doneItems = [];

        const BoardAlgorithm = (tasks) => {
            if (tasks.length < 1) {
                return (
                    <div className="alert alert-info text-center" role="alert">
                        No Tasks on this board
                    </div>
                );
            } else {
                const tmap = tasks.map((task) => (
                    <Task key={task.id} tasks={task} />
                ));

                for (let i = 0; i < tmap.length; i++) {
                    if (tmap[i].props.tasks.status === "TO_DO") {
                        todoItems.push(tmap[i]);
                    } else if (tmap[i].props.tasks.status === "IN_PROGRESS") {
                        inprogressItems.push(tmap[i]);
                    } else if (tmap[i].props.tasks.status === "DONE") {
                        doneItems.push(tmap[i]);
                    }
                }

                return (
                    <React.Fragment>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="card text-center mb-2">
                                        <div className="card-header bg-secondary text-white">
                                            <h3>To-do</h3>
                                        </div>
                                    </div>
                                    {todoItems}
                                </div>
                                <div className="col-md-4">
                                    <div className="card text-center mb-2">
                                        <div className="card-header bg-primary text-white">
                                            <h3>In progress</h3>
                                        </div>
                                    </div>
                                    {inprogressItems}
                                </div>
                                <div className="col-md-4">
                                    <div className="card text-center mb-2">
                                        <div className="card-header bg-success text-white">
                                            <h3>Done</h3>
                                        </div>
                                    </div>
                                    {doneItems}
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                );
            }
        };

        BoardContent = BoardAlgorithm(tasks);

        return (
            <div className="container">
                <Link to="/addtask" className="btn btn-primary mb-3">
                    <i className="fas fa-plus-circle" /> Create New Task
                </Link>
                <br />
                <hr />
                {BoardContent}
            </div>
        );
    }
}
Board.propTypes = {
    getBacklog: PropTypes.func.isRequired,
    tasks: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    tasks: state.task,
});

export default connect(mapStateToProps, { getBacklog })(Board);
