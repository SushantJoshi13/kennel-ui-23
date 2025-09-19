import React, { useEffect, useState } from "react";
import Tree from "react-d3-tree";
import { useCenteredTree } from "../utils/helper";

const CertificateTree = ({ data }) => {
  const TreeContainer = React.useRef();
  const [trans, setTrans] = useState({ x: 0, y: 0 });

  const nodeSize = { x: 400, y: 200 };
  const foreignObjectProps = {
    width: nodeSize.x,
    height: nodeSize.y,
    x: -200,
    y: -60,
  };
  const separation = { siblings: 2.5, nonSiblings: 0 };
  const [translate, containerRef] = useCenteredTree();

  const dimension = () => {
    if (!TreeContainer.current) return;
    return TreeContainer.current.getBoundingClientRect() !== undefined
      ? TreeContainer.current.getBoundingClientRect()
      : 0;
  };
  useEffect(() => {
    const { width, height } = dimension();
    setTrans({
      x: width,
      y: height,
    });
  }, []);
  const straightPathFunc = (linkDatum, orientation) => {
    const { source, target } = linkDatum;
    return orientation === "horizontal"
      ? `M${source.y},${source.x}L${target.y},${target.x}`
      : `M${source.x},${source.y}L${target.x},${target.y}`;
  };
  function dynamicHeight(node) {
    if (node.length === 0) {
      return 20;
    } else {
      let result = 30;
      for (let i = 0; i < node.length; i++) {
        result += dynamicHeight(node[i]);
      }
      return result;
    }
  }

  const customNode = ({ nodeDatum }) => {
    return (
      <foreignObject {...foreignObjectProps}>
        <div
          className={`bg-white text-center p-4 ${
            nodeDatum?.attributes?.level === 0 ? "hidden" : ""
          } `}
          // className={`
          // relative flex items-center justify-center rounded-xl border-2 border-slate-400 bg-white font-semibold
          // ${nodeDatum?.attributes?.level === 0 ? "hidden" : ""} `}
          // style={{ height: `120px`, links: { stroke: "none !important" } }}
        >
          {/* <span className="absolute left-2 top-[40%] rounded-xl bg-slate-900 px-2 py-1 !text-white">
            {nodeDatum?.attributes?.parentType}
          </span> */}
          <p className="text-2xl">{nodeDatum?.attributes?.parentType}</p>
          <span className="text-5xl !font-poppins text-black">
            {nodeDatum.name}
          </span>
        </div>
      </foreignObject>
    );
  };

  return (
    <div className="h-full" ref={TreeContainer}>
      <div
        className="certificate_map h-full disable_root w-auto"
        ref={containerRef}
      >
        <Tree
          zoom={0.2}
          zoomable={true}
          data={data}
          translate={translate}
          draggable={true}
          separation={separation}
          transitionDuration="1000"
          pathFunc="step"
          pathClassFunc={() => "certificate-link"}
          depthFactor={1500}
          renderCustomNodeElement={(nodeInfo) =>
            customNode(nodeInfo, foreignObjectProps)
          }
          orientation="horizontal"
        />
      </div>
    </div>
  );
};

export default CertificateTree;
