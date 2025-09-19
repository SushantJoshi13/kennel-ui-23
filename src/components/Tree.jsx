import { useState } from "react";
import Tree from "react-d3-tree";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { useCenteredTree } from "../utils/helper";
import Modal from "./Modal";

// uuid
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router";

export function bfs(id, tree, node) {
  const queue = [];

  queue.unshift(tree);

  while (queue.length > 0) {
    const curNode = queue.pop();

    if (curNode.attributes.uuid === id) {
      curNode.children.push(node);

      return { ...tree };
    }

    const len = curNode.children.length;

    for (let i = 0; i < len; i++) {
      queue.unshift(curNode.children[i]);
    }
  }
}

export function bfs_edit(id, tree, node) {
  const queue = [];

  queue.unshift(tree);

  while (queue.length > 0) {
    const curNode = queue.pop();

    if (curNode.attributes.uuid === id) {
      curNode.name = node.name;
      return { ...tree };
    }

    const len = curNode.children.length;

    for (let i = 0; i < len; i++) {
      queue.unshift(curNode.children[i]);
    }
  }
}

const TreePage = ({ tree, setTree, readOnly }) => {
  const [node, setNode] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [parentAlreadyExist, setParentAlreadyExist] = useState("");
  const nav = useNavigate();
  const close = () => {
    setNode(undefined);
    nav(-1);
  };

  const handleNodeClick = (datum, edit, create) => {
    if (datum.children.length === 1) {
      setParentAlreadyExist(datum.children[0].attributes.parentType);
    } else {
      setParentAlreadyExist("");
    }
    if (datum.children.length === 2 && create) {
      alert("Parents already exist");
      return;
    }

    if (datum.attributes.level + 1 === 5) {
      alert("You can add upto 5 generations");
      return;
    }
    setNode(datum);
    setIsEdit(edit);
    setIsCreate(create);
  };

  // Edit node
  const handleEditName = (familyMemberName, parentType) => {
    const newTree = bfs_edit(node.attributes.uuid, tree, {
      name: familyMemberName,
      attributes: {
        parentType: parentType,
      },
      children: node.children,
    });

    if (newTree) {
      setTree(newTree);
    }
    setNode(undefined);
  };

  // Create new node
  const handleSubmit = (familyMemberName, parentType) => {
    if (Object.keys(tree).length === 0) {
      setTree({
        name: familyMemberName,
        attributes: {
          parentType: parentType,
          level: 0,
          uuid: uuidv4(),
        },
        children: [],
      });
      setNode(undefined);
      return;
    }
    const newTree = bfs(node.attributes.uuid, tree, {
      name: familyMemberName,
      attributes: {
        parentType: parentType,
        level: node.attributes.level + 1,
        uuid: uuidv4(),
      },
      children: [],
    });

    if (newTree) {
      setTree(newTree);
    }

    setNode(undefined);
  };

  // console.log(tree);
  // Modal node
  const renderRectSvgNode = (customProps, foreignObjectProps, click) => {
    const { nodeDatum } = customProps;

    return (
      <>
        <foreignObject {...foreignObjectProps} className="cursor-default">
          <div className=" flex h-[10rem] w-[17rem] flex-col rounded-lg bg-treeNode text-secondary ">
            <div className="btn-gradient flex justify-between gap-3 rounded-md px-3 py-2">
              <div>
                <span className="text-xl font-bold">{nodeDatum.name}</span>
              </div>
              {!readOnly && (
                <div className="flex gap-3">
                  <button
                    className="cursor-pointer rounded-lg text-xl"
                    onClick={() => click(nodeDatum, true, false)}
                  >
                    <BiEdit />
                  </button>
                  <button
                    className="cursor-pointer rounded-lg text-xl"
                    onClick={() => click(nodeDatum, false, true)}
                  >
                    <AiOutlinePlusCircle />
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center px-3 py-2">
              <div className="flex w-full flex-wrap justify-between border-b-[1px] pb-3">
                <span className="font-bold">Name :</span>
                <span className="font-medium">{nodeDatum.name}</span>
              </div>
              <div className="flex w-full flex-wrap justify-between pb-3 pt-2">
                <span className="font-bold">Parent Type :</span>
                <span className="font-medium">
                  {nodeDatum?.attributes?.parentType
                    ? nodeDatum.attributes.parentType
                    : "Selection"}
                </span>
              </div>
            </div>
          </div>
        </foreignObject>
      </>
    );
  };
  const nodeSize = { x: 400, y: 200 };
  const foreignObjectProps = {
    width: nodeSize.x,
    height: nodeSize.y,
    x: -130,
    y: -64,
  };
  const separation = { siblings: 3, nonSiblings: 2 };
  const [translate, containerRef] = useCenteredTree();
  return (
    <div className="min-h-[100vh]  w-screen bg-primary">
      {Object.keys(tree).length === 0 ? (
        <Modal
          onSubmit={(familyMemberName, parentType) =>
            handleSubmit(familyMemberName, parentType)
          }
          onClose={close}
          isOpen={Boolean(node)}
          isFirst={true}
          value="Create"
        />
      ) : (
        <div className="canvas h-[100vh] w-screen" ref={containerRef}>
          <Tree
            data={tree}
            onNodeClick={handleNodeClick}
            translate={translate}
            separation={separation}
            transitionDuration="1000"
            pathFunc="step"
            depthFactor={260}
            renderCustomNodeElement={(nodeInfo) =>
              renderRectSvgNode(nodeInfo, foreignObjectProps, handleNodeClick)
            }
            orientation="vertical"
          />
          {isCreate && (
            <Modal
              onSubmit={(familyMemberName, parentType) =>
                handleSubmit(familyMemberName, parentType)
              }
              onClose={close}
              isOpen={Boolean(node)}
              value="Create"
              node={node}
              parentAlreadyExist={parentAlreadyExist}
            />
          )}
          {isEdit && (
            <Modal
              onClose={close}
              isOpen={Boolean(node)}
              onEdit={(familyMemberName, parentType) =>
                handleEditName(familyMemberName, parentType)
              }
              value="Edit"
              node={node}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default TreePage;
