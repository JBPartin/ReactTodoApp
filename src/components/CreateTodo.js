import React, { useState, useEffect } from 'react';

export const NavBar = () => {
    return (
        <nav>
            <h1>TODO APP IN REACT</h1>
            <a href='http://www.jacobpartin.com'>My Portfilio</a>
        </nav>
    );
}
export const AddBox = () => {
    return (
        <div className='textbox'>
            <input type='text' placeholder='Type and press enter.' maxLength='50' onKeyPress={(e) => setEventItem(e, new Date().toDateString())} />
        </div>
    );
};
export const List = () => {
    const [getData, setData] = useState(null);
    const getItems = async () => {
        setData(await JSON.parse(JSON.stringify(localStorage)));
    }
    useEffect(() => {
        setInterval(() => {
            getItems();
        }, 100);
    }, []);
    if (!getData)
        return 'loading';
    else {
        let trues = Object.keys(getData).filter(key => JSON.parse(getData[key]).completed === true);
        let falses = Object.keys(getData).filter(key => JSON.parse(getData[key]).completed === false);
        return (
            <div className='tasks-container'>
                <div className='todo-h1'>
                    <h1>MY TODO LIST</h1>
                </div>
                <ul className='tasklist' >{trues.map((task) =>
                    <div style={{ backgroundColor: 'green' }} key={task} className='task'>
                        <input onClick={(e) => { if (e) setKey(task, false) }} type='checkbox' defaultChecked />
                        <div className='task-info'>
                            <p className='task-text'>{task}</p>
                            <p className='date'>{JSON.parse(getKey(task)).date}</p>
                        </div>
                        <button onClick={(e) => { if (e) removeKey(task) }}><i className="fa fa-trash" aria-hidden="true"></i></button>
                    </div>
                )}{falses.map((task) =>
                    <div style={{ backgroundColor: 'yellow' }} key={task} className='task'>
                        <input onClick={(e) => { if (e) setKey(task, true) }} type='checkbox' />
                        <div className='task-info'>
                            <p className='task-text' style={{ color: 'black' }}>{task}</p>
                            <p className='date' style={{ color: 'black' }}>{JSON.parse(getKey(task)).date}</p>
                        </div>
                        <button onClick={(e) => { if (e) removeKey(task) }}><i className="fa fa-trash" aria-hidden="true"></i></button>
                    </div>
                )}
                </ul>
            </div>
        );
    }
};

export const Task = (props) => {
    return (
        <div>
            <p />
            <input type="check" />
            <button onClick={removeKey(props.key)} />
        </div>);
}
function setEventItem(key, date) {
    if (key.code === 'Enter') {
        if (key.target.value.length < 1)
            return;
        localStorage.setItem(key.target.value, JSON.stringify({ completed: false, date: date }));
        key.target.value = '';
    }
}
function getKey(key) {
    return localStorage.getItem(key);
}
function setKey(key, item) {
    let object = JSON.parse(getKey(key));
    object.completed = item;
    localStorage.setItem(key, JSON.stringify(object));
}
function removeKey(key) {
    localStorage.removeItem(key);
}