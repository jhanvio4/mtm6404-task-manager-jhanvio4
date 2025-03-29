import React, { createContext, useContext, useEffect, useState } from "react";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [lists, setLists] = useState(() => {

        const storedLists = localStorage.getItem("taskLists");

        return Array.isArray(storedLists) ? storedLists : JSON.parse(storedLists) || [];
    });

    const [selectedListId, setSelectedListId] = useState(null);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        if (Array.isArray(lists)) {
            localStorage.setItem("taskLists", JSON.stringify(lists));
        }
    }, [lists]);

    const addList = (name) => {
        const newList = { id: Date.now(), name, tasks: [] };

        setLists((prevLists) => [...(Array.isArray(prevLists) ? prevLists : []), newList]);
    };

    const deleteList = (id) => {
        setLists(lists.filter((list) => list.id !== id));
        if (selectedListId === id) setSelectedListId(null);
    };

    const addTask = (listId, task) => {
        setLists(
            lists.map((list) =>
                list.id === listId ? { ...list, tasks: [...list.tasks, task] } : list
            )
        );
    };

    const deleteTask = (listId, taskId) => {
        setLists(
            lists.map((list) =>
                list.id === listId
                    ? { ...list, tasks: list.tasks.filter((task) => task.id !== taskId) }
                    : list
            )
        );
    };

    const toggleTaskStatus = (listId, taskId) => {
        setLists(
            lists.map((list) =>
                list.id === listId
                    ? {
                        ...list,
                        tasks: list.tasks.map((task) =>
                            task.id === taskId ? { ...task, completed: !task.completed } : task
                        ),
                    }
                    : list
            )
        );
    };

    return (
        <TaskContext.Provider
            value={{
                lists,
                selectedListId,
                setSelectedListId,
                addList,
                deleteList,
                addTask,
                deleteTask,
                toggleTaskStatus,
                filter,
                setFilter,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};

export const useTaskContext = () => useContext(TaskContext);
