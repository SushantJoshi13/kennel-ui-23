import React, { useEffect, useState } from "react";
import ReactFlow, { MiniMap, Controls } from "react-flow-renderer";

const CertificateTree = ({ data }) => {
  const [elements, setElements] = useState([]);
  const [trans, setTrans] = useState({ x: 0, y: 0 });

  const nodeSize = { width: 400, height: 200 };

  const dimention = () => {
    const rect = document
      .getElementById("tree-container")
      .getBoundingClientRect();
    return { x: rect.width, y: rect.height };
  };

  useEffect(() => {
    const { width, height } = dimention();
    setTrans({
      x: width / 2,
      y: height / 2,
    });
  }, []);

  function dynamicHeight(node) {
    if (node.length === 0) {
      return 20;
    } else {
      let result = 60;
      for (let i = 0; i < node.length; i++) {
        result += dynamicHeight(node[i]);
      }
      return result;
    }
  }

  const FirstNodeData = () => {
    return (
      <div>
        <h2>First Node Data: {data.name}</h2>
      </div>
    );
  };

  const modifiedData = data.children.map((nodeData, index) => {
    if (index === 0) {
    }
    const modifiedNode = {
      id: nodeData.id,
      type: "default",
      data: { label: nodeData.name },
      position: {
        x: nodeSize.width * index,
        y: dynamicHeight(nodeData.children),
      },
      ...(index === 1 || index === 2 ? { sourcePosition: "right" } : {}),
      ...(nodeData.children.length > 0
        ? {
            children: nodeData.children.map((childNode) => ({
              id: childNode.id,
              type: "default",
              data: { label: childNode.name },
              position: {
                x: nodeSize.width * index,
                y: dynamicHeight(childNode.children),
              },
              targetPosition: "left",
            })),
          }
        : {}),
    };
    return modifiedNode;
  });

  useEffect(() => {
    setElements(modifiedData);
  }, [data]);

  return (
    <div>
      <FirstNodeData />
      <div id="tree-container" style={{ height: 600 }}>
        <ReactFlow
          elements={elements}
          nodesDraggable={true}
          zoomOnScroll={false}
        >
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};
