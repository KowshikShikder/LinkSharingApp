import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import "./Task.css";

export const Task = (props) => {
  const { id } = props;


  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="task w-full bg-gray-100 text-black text-sm px-3 py-4 rounded-md mt-4 self-center"
    >
      
      <input type="checkbox" className="checkbox" />
      {id}
    </div>
  );
};
