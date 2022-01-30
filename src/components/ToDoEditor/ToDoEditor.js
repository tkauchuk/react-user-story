import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from './ToDoEditor.module.css';

const ToDoEditor = ({ onFormSubmit }) => {
  const [task, setTask] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    onFormSubmit(task);
    return setTask('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <TextField
        id="outlined-multiline-flexible"
        label="Set a task..."
        multiline
        maxRows={4}
        value={task}
        onChange={event => setTask(event.target.value)}
        sx={{
          marginRight: '10px',
        }}
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

export default ToDoEditor;
