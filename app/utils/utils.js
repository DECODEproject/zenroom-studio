
export function findCollapsedParent(node) {
  if (!node.data.isExpanded) {
    return node
  } else if (node.parent) {
    return findCollapsedParent(node.parent)
  }

  return null
}

export function getTopLeft(node) {
  return {
    top: node.x,
    left: node.y,
  }
}