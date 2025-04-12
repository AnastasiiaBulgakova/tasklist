import React, { useState, useEffect, useRef } from 'react';

import { formatDistanceToNowStrict } from 'date-fns';
import PropTypes from 'prop-types';
import { useCounter, useDateFormat, useNow } from '@shined/react-use';
import './task.scss';

const Task = ({
  label,
  onDeleted,
  onToggleDone,
  done,
  editing,
  onToggleEditing,
  createdAt,
}) => {
  const [timeAgo, setTimeAgo] = useState(() =>
    formatDistanceToNowStrict(new Date(createdAt), { addSuffix: true })
  );
  const [editingValue, setEditingValue] = useState(label);
  const [startAt, setStartAt] = useState(null); // Начальное значение null
  const inputRef = useRef(null);

  const now = useNow(); // Получаем текущее время каждую секунду
  const dateStr = useDateFormat(now, 'YYYY-MM-DD HH:mm:ss:SSS');
  const [count, actions] = useCounter(0)
  const { now: _now, ...controls } = useNow({
    interval: 1000,
    controls: true,
    immediate: false,
    callback: () => actions.inc(),
  })
  const fromStart = startAt ? now - startAt : 0;

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo(formatDistanceToNowStrict(new Date(createdAt), { addSuffix: true }));
    }, 60000);

    return () => clearInterval(interval);
  }, [createdAt]);

  const toggleTimer = () => {
    if (startAt) {
      setStartAt(null); // Сбрасываем таймер в null
    } else {
      setStartAt(Date.now()); // Запускаем таймер
    }
  };

  const handleBlur = () => {
    onToggleEditing(editingValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onToggleEditing(editingValue);
    }
  };

  const handleChange = (e) => {
    setEditingValue(e.target.value);
  };
  

  let naming = '';
  if (done) naming = 'completed';
  if (editing) naming = 'editing';

  return (
    <li className={naming}>
      <div className="view">
        <input className="toggle" type="checkbox" onClick={onToggleDone} />
        <label>
          <span className="title">{label}</span>
          <span className="description">
            <button className="icon icon-play" onClick={() => controls.resume(true)}></button>
            <button className="icon icon-pause" onClick={() => controls.pause(true)}></button>
            {count > 60 ? `${Math.floor(count / 60)} min` : `${count} sec`} 
          </span>
          <span className="description">{`Created ${timeAgo}`}</span>
        </label>
        <button className="icon icon-edit" onClick={() => onToggleEditing(editingValue)}></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
      {naming === 'editing' && (
        <input
          ref={inputRef}
          className="edit"
          type="text"
          value={editingValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      )}
    </li>
  );
};

Task.propTypes = {
  label: PropTypes.string.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  done: PropTypes.bool.isRequired,
  editing: PropTypes.bool.isRequired,
  onToggleEditing: PropTypes.func.isRequired,
  createdAt: PropTypes.instanceOf(Date).isRequired,
};

Task.defaultProps = {
  label: '',
  onDeleted: () => {},
  onToggleDone: () => {},
  done: false,
  editing: false,
  onToggleEditing: () => {},
  createdAt: new Date(),
};

export default Task;
