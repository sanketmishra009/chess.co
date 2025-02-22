"use client";
import React, { useRef, useState } from "react";

const metadata = {
  title: "dragTest",
};

const DragTest = () => {
  const [data, setData] = useState(initial_data);
  const dragItem = useRef(null);
  const dragContainer = useRef(null);
  const handleDrag = (e, container, item) => {
    e.target.style.opacity = "0.5";
    dragItem.current = item;
    dragContainer.current = container;
    // console.log("inside handleDrag");
  };
  const handleDragEnd = (e, container, item) => {
    // e.preventDefault();
    e.target.style.opacity = "1";
  };

  const handleDrop = (e, targetContainer) => {
    const item = dragItem.current,
      sourceContainer = dragContainer.current;
    setData((pdata) => {
      const newData = { ...pdata };
      newData[sourceContainer] = newData[sourceContainer].filter((i) => {
        return i !== item;
      });
      newData[targetContainer] = [...newData[targetContainer], item];
      return newData;
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  return (
    <div className="flex justify-evenly bg-red-900 items-center h-[50vh]">
      {Object.keys(data).map((container, containeri) => {
        return (
          <div
            key={containeri}
            className="flex flex-col h-[60%] gap-10"
            onDrop={(e) => handleDrop(e, container)}
            onDragOver={handleDragOver}
          >
            <h1 className="underline text-3xl font-bold text-black">
              {container}
            </h1>
            <div className="flex flex-col justify-evenly h-full bg-red-700 p-2 rounded-lg">
              {data[container].map((item, itemi) => {
                return (
                  <div
                    key={itemi}
                    className="border-black border-4 rounded-lg p-2"
                    draggable
                    onDragStart={(e) => handleDrag(e, container, item)}
                    onDragEnd={(e) => handleDragEnd(e, container, item)}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DragTest;

const initial_data = {
  home: ["Write code", "Eat", "Sleep"],
  work: ["Write code", "Design Algorithm", "Test"],
  fun: ["soccer", "study"],
};
