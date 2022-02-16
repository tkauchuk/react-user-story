import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import styles from './ToDoEditor.module.css';

const ToDoEditor = ({ onFormSubmit, parentTaskID, onNestedTask }) => {
  const [task, setTask] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    onFormSubmit(task);
    return setTask('');
  };

  const handleNestedSubmit = event => {
    event.preventDefault();
    onNestedTask(parentTaskID, task);
    return setTask('');
  };

  return (
    <form
      className={styles.form}
      style={
        parentTaskID !== null
          ? { transform: 'scale(1.1)', transition: 'transform 250ms linear' }
          : {}
      }
      onSubmit={parentTaskID ? handleNestedSubmit : handleSubmit}
    >
      <TextField
        id="outlined-multiline-flexible"
        label="Set a task..."
        multiline
        maxRows={4}
        value={task}
        autoFocus
        onChange={event => setTask(event.target.value)}
        sx={
          parentTaskID !== null
            ? {
                boxShadow: '4px 4px 8px 0px rgba(34, 60, 80, 0.2)',
                marginRight: '10px',
              }
            : {
                marginRight: '10px',
              }
        }
      />
      <Button
        type="submit"
        variant="outlined"
        size="medium"
        disabled={!task.trim().length > 0}
      >
        Add
      </Button>
    </form>
  );
};

ToDoEditor.propTypes = {
  onFormSubmit: PropTypes.func,
};

export default ToDoEditor;
