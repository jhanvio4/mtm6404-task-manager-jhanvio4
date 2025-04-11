import React, { createContext, useContext, useEffect, useState } from "react";
import {
    collection,
    doc,
    onSnapshot,
    setDoc,
    deleteDoc,
    updateDoc,
    arrayUnion,
    arrayRemove,
} from "firebase/firestore";
import { db } from "../firebase";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [lists, setLists] = useState([]);
    const [selectedListId, setSelectedListId] = useState(null);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "taskLists"), (snapshot) => {
            const listsData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setLists(listsData);
        });

        return () => unsubscribe();
    }, []);

    const addList = async (name) => {
        const newList = {
            name,
            tasks: [],
        };
        const newListRef = doc(collection(db, "taskLists"));
        await setDoc(newListRef, newList);
    };

    const deleteList = async (id) => {
        await deleteDoc(doc(db, "taskLists", id));
        if (selectedListId === id) setSelectedListId(null);
    };

    const addTask = async (listId, task) => {
        const listRef = doc(db, "taskLists", listId);
        await updateDoc(listRef, {
            tasks: arrayUnion(task),
        });
    };

    const deleteTask = async (listId, taskId) => {
        const list = lists.find((l) => l.id === listId);
        if (!list) return;
        const updatedTasks = list.tasks.filter((task) => task.id !== taskId);

        await updateDoc(doc(db, "taskLists", listId), {
            tasks: updatedTasks,
        });
    };

    const toggleTaskStatus = async (listId, taskId) => {
        const list = lists.find((l) => l.id === listId);
        if (!list) return;
        const updatedTasks = list.tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        );

        await updateDoc(doc(db, "taskLists", listId), {
            tasks: updatedTasks,
        });
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
