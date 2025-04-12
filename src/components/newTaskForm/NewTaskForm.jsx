import React from 'react';
import './newTaskForm.module.scss';
import PropTypes from 'prop-types';

export default class NewTaskForm extends React.Component {
  state = {
    label: '',
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addItem(this.state.label);
    this.setState({
      label: '',
    });
  };

  render() {
    return (
      <form className="header" onSubmit={this.onSubmit}>
        <h1>todos</h1>
        <input
          className="new-todo"
          onChange={this.onLabelChange}
          value={this.state.label}
          placeholder="What needs to be done?"
          autofocus
        />
      </form>
    );
  }
}

NewTaskForm.propTypes = {
  addItem: PropTypes.func.isRequired,
};
NewTaskForm.defaultProps = {
  addItem: () => {},
};
