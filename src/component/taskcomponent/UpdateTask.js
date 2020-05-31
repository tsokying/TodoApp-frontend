import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import {
    getTask,
    addTask,
} from "../../actions/taskActions";

class UpdateTask extends Component {
    constructor() {
        super();
        this.state = {
            id: "",
            summary: "",
            details: "",
            status: "",
            errors: {},
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {

        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }

        const { id, summary, details, status } = nextProps.task;

        this.setState({
            id,
            summary,
            details,
            status,
        });
    }

    componentDidMount() {
        const { task_id } = this.props.match.params;
        this.props.getTask(task_id);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const updatedTask = {
            id: this.state.id,
            summary: this.state.summary,
            details: this.state.details,
            status: this.state.status,
        };
        this.props.addTask(updatedTask, this.props.history);
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="addTask">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <a href="/" className="btn btn-light">
                                Back to Board
                            </a>
                            <h4 className="display-4 text-center">
                                Add/ Update Task
                            </h4>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.summary
                                        })}
                                        name="summary"
                                        placeholder="Task summary"
                                        value={this.state.summary}
                                        onChange={this.onChange}
                                    />
                                    {
                                        errors.summary && (
                                            <div className="invalid-feedback">{errors.summary}</div>
                                        )
                                    }
                                </div>
                                <div className="form-group">
                                    <textarea
                                        className="form-control form-control-lg"
                                        name="details"
                                        placeholder="Details"
                                        value={this.state.details}
                                        onChange={this.onChange}
                                    ></textarea>
                                </div>
                                <div className="form-group">
                                    <select
                                        className="form-control form-control-lg"
                                        name="status"
                                        value={this.state.status}
                                        onChange={this.onChange}
                                    >
                                        <option value="" selected disabled>Select Status</option>
                                        <option value="TO_DO">To-do</option>
                                        <option value="IN_PROGRESS">
                                        In progress
                                        </option>
                                        <option value="DONE">Done</option>
                                    </select>
                                </div>
                                <input
                                    type="submit"
                                    className="btn btn-primary btn-block mt-4"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

UpdateTask.propTypes = {
    task: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    getTask: PropTypes.func.isRequired,
    addTask: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    task: state.task.task,
    errors: state.errors,
});

export default connect(mapStateToProps, { getTask, addTask })(
    UpdateTask
);
