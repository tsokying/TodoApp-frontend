import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteTask } from "../../actions/taskActions";

class Task extends Component {
    onDeleteClick(task_id) {
        this.props.deleteTask(task_id);
    }
    render() {
        const { tasks } = this.props;
        return (
            <div className="card mb-1 bg-light">
                <div className="card-body bg-light">
                    <h5 className="card-title">{tasks.summary}</h5>
                    <p className="card-text text-truncate ">{tasks.details}</p>
                    <Link to={`updateTask/${tasks.id}`} className="btn btn-primary">
                        View / Update
                    </Link>
                    <button className="btn btn-danger ml-4" onClick={this.onDeleteClick.bind(this, tasks.id)}>Delete</button>
                </div>
            </div>
        );
    }
}

Task.propTypes = {
    deleteTask: PropTypes.func.isRequired,
};

export default connect(null, { deleteTask })(Task);
