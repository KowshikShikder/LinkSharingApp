'use client'


import { useState } from "react";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

// import { Input } from "./components/Input/Input";

import "./App.css";
import { Task } from "../../../Component/Task/Task";

export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Add tests to homepage" },
    { id: 2, title: "Fix styling in about section" },
    { id: 3, title: "Learn how to center a div" },
  ]);

  const addTask = (title) => {
    setTasks((tasks) => [...tasks, { id: tasks.length + 1, title }]);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getTaskPos = (id) => tasks.findIndex((task) => task.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id === over.id) return;

    setTasks((tasks) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);

      return arrayMove(tasks, originalPos, newPos);
    });
  };

  return (
    <div className="App">
      <h1>My Tasks ✅</h1>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <div className="column text-black">
          <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
            {tasks.map((task) => (
              <Task key={task.id} id={task.id} title={task.title} />
            ))}
          </SortableContext>
        </div>
      </DndContext>
    </div>
  );
}
