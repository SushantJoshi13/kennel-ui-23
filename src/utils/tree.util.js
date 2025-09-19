export function bfs_search(key, id, tree) {
  const queue = [];

  queue.unshift(tree);
  let arr = [];
  while (queue.length > 0) {
    const curNode = queue.pop();

    if (curNode.attributes[key] === id) {
      arr.push(curNode);
    }

    const len = curNode.children.length;

    for (let i = 0; i < len; i++) {
      queue.unshift(curNode.children[i]);
    }
  }
  return arr;
}

export function processTree(tree) {
  const addUnknownNode = (node) => {
    const remainingChildren = 2 - node.children.length;
    for (let i = 0; i < remainingChildren; i++) {
      node.children.push({
        name: "unknown",
        attributes: {
          parentType: "unknown",
          level: node.attributes.level + 1,
        },
        children: [],
      });
    }
  };

  const queue = [];
  queue.unshift(tree); // Add the root node to the queue with level 0

  while (queue.length > 0) {
    const node = queue.pop();

    if (node.attributes.level < 3 && node.children.length < 2) {
      addUnknownNode(node);
    }

    // Add children to the queue with their respective levels
    node.children.forEach((child) => {
      queue.unshift(child);
    });
  }

  let data = [];
  for (let index = 0; index <= 4; index++) {
    const items = bfs_search("level", index, tree);
    if (items) {
      data = [...data, ...items];
    }
  }

  return data;
}
