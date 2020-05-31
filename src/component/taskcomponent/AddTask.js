import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addTask } from "../../actions/taskActions";
import classnames from "classnames";

class AddTask extends Component {
    constructor() {
        super();
        this.state = {
            summary: "",
            acceptanceCriteria: "",
            status: "",
            errors: {},
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const newTask = {
            summary: this.state.summary,
            details: this.state.details,
            status: this.state.status,
        };
        this.props.addTask(newTask, this.props.history);
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="addTask">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/" className="btn btn-light">
                                Back to Board
                            </Link>
                            <h4 className="display-4 text-center">
                                Add/ Update Task
                            </h4>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classnames(
                                            "form-control form-control-lg",
                                            {
                                                "is-invalid": errors.summary,
                                            }
                                        )}
                                        name="summary"
                                        placeholder="Task summary"
                                        value={this.state.summary}
                                        onChange={this.onChange}
                                    />
                                    {errors.summary && (
                                        <div className="invalid-feedback">
                                            {errors.summary}
                                        </div>
                                    )}
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

AddTask.propTypes = {
    addTask: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    errors: state.errors,
});

export default connect(mapStateToProps, { addTask })(AddTask);
