import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Checkbox,
} from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import styles from './ToDoList.module.css';

const ToDoList = ({
  todos,
  onDeleteToDo,
  setTaskCompleted,
  moveTaskUp,
  moveTaskDown,
}) => {
  return (
    todos &&
    todos.length > 0 && (
      <div className={styles.wrapper}>
        <List>
          {todos.map(({ id, todo, completed }, index) => {
            return (
              <ListItem
                alignItems="flex-start"
                disablePadding
                sx={{
                  backgroundColor: completed ? '#ececec' : 'transparent',
                  borderBottom: '1px solid #ececec',
                  alignItems: 'center',
                  transition: 'background-color linear 250ms',
                }}
                key={id}
              >
                <div className={styles.buttonsWrapper}>
                  <ListItemButton
                    onClick={() => moveTaskUp(id)}
                    disabled={index === 0 || completed}
                    sx={{ marginRight: '10' }}
                    className="MuiListItem - root"
                  >
                    <ArrowDropUpOutlinedIcon />
                  </ListItemButton>
                  <ListItemButton
                    onClick={() => moveTaskDown(id)}
                    disabled={index === todos.length - 1 || completed}
                  >
                    <ArrowDropDownOutlinedIcon />
                  </ListItemButton>
                </div>
                <ListItemText primary={todo} />
                <Checkbox
                  checked={completed}
                  onChange={() => setTaskCompleted(id)}
                  size="small"
                />
                <button
                  type="button"
                  className={styles.deleteButton}
                  onClick={() => onDeleteToDo(id)}
                >
                  <DeleteOutlineOutlinedIcon />
                </button>
              </ListItem>
            );
          })}
        </List>
      </div>
    )
  );
};

export default ToDoList;
