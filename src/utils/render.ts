type Change = { node: Node; type: "add" | "none" | "delete" };

export default function(newNodes: Node[], anchor: Node) {
  const currentNodes = Array.from(anchor.childNodes);
  const changes = diff(currentNodes, newNodes);

  let lastNonDeletedNode = null;
  for (let i = changes.length - 1; i >= 0; i--) {
    let change: Change = changes[i];
    if (change.type === "delete") {
      if (change.node.parentNode) {
        change.node.parentNode.removeChild(change.node);
      }
    } else {
      if (change.type === "add") {
        if (!lastNonDeletedNode) {
          anchor.appendChild(change.node);
        } else {
          anchor.insertBefore(change.node, lastNonDeletedNode);
        }

        lastNonDeletedNode = change.node;
      }
    }
  }
}

function diff(currentNodes: Node[], newNodes: Node[]): Change[] {
  let currentIndex = 0;
  let newIndex = 0;

  const newNodesMap = new WeakMap();
  const changes: Change[] = [];
  while (newIndex < newNodes.length) {
    const current = currentNodes[currentIndex];
    const newNode = newNodes[newIndex];

    if (current === newNode) {
      changes.push({ type: "none", node: newNode });
      currentIndex;
    } else if (newNode) {
      changes.push({ type: "add", node: newNode });
    }

    currentIndex++;
    newIndex++;
    newNodesMap.set(newNode, true);
  }

  for (let i = 0; i < currentNodes.length; i++) {
    if (!newNodesMap.has(currentNodes[i])) {
      changes.push({ type: "delete", node: currentNodes[i] });
    }
  }

  return changes;
}
