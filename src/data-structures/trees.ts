/**
 * @version 1.0
 */

import {EventEmitter} from "events";
/** ===============================================
 * =========  TYPES
 * */
export type WithDepth<T=any> = T & { depth: number }
export type WithHierarchy<T=any> = T & { depth: number, parent: WithHierarchy<T>, children: WithHierarchy<T>[] }

/** ===============================================
 * ======== CLASSES
 * */
export class Branch<T=any> extends Array<T>{
  __fields = { parent: "parent", children: "children" }
  constructor(...items: T[]) {
    super(...items);
  }
  set fields({ parent=this.__fields, children }){}
  get fields(){ return this.__fields; }
  get leaves(){ return this; }
  toArray(){ return tree_to_list(this); }
  find(predicate){ return super.find(predicate);  }
}
export class Tree<T=any> extends Branch<T>{
  __sync;
  constructor(...items) { super(...items); }
  get sync(){ return this.__sync; }
  set sync(enabled){
    if(enabled && !this.sync){
      this.__sync = new EventEmitter();
    }
    else if(this.__sync){
      delete this.__sync;
    }
  }
  syncWith(src){ }
  refresh(...items){}
  update(...items){}
  drop(...items){}
}
/** ===============================================
 * ======== CONSTRUCTOR METHODS
 * */
export function withDepths<T=any>(array: T[] = []): WithDepth<T>[]{
  return tree_to_list(list_to_tree(array));
};
export function list_to_tree<T=any>(
    arr: T[],
    keyId: (keyof T|'id') = 'id',
    keyParent: (keyof T|'parent') = 'parent'
  ): Tree<WithHierarchy<T>>{
  const list = JSON.parse(JSON.stringify(arr)) as WithHierarchy<T>[];
  const map = {};
  let node;
  const roots = [];
  let i;
  for (i = 0; i < list.length; i += 1) {
    // @ts-ignore
    map[list[i][keyId]] = i; // initialize the map
    if(!Array.isArray(list[i].children)) list[i].children = []; // initialize the children
  }
  for (i = 0; i < list.length; i += 1) {
    node = list[i];
    // if you have dangling branches check that map[node.parentId] exists
    if (node[keyParent] && list[map[node[keyParent]]]) {
      list[map[node[keyParent]]].children.push(node);
    } else {
      roots.push(node);
    }
  }
  return new Tree<WithHierarchy<T>>(...roots);
}

export function tree_to_list(tree){
  const collection = { children: JSON.parse(JSON.stringify(tree)) };
  const flattenedCollection = {};
  bfs(collection, "children", flattenedCollection);
  const list = Object.keys(flattenedCollection).map(
    (i) => flattenedCollection[i],
  );
  list.forEach((p) => {
    p.children = [];
  });
  return list;
}
export const bfs = function(tree, key, collection, depth = 1) {
  if (!tree[key] || tree[key].length === 0) return;

  for (let i = 0; i < tree[key].length; i++) {
    const child = tree[key][i];
    child.depth = depth;
    collection[child.id] = child;
    bfs(child, key, collection, depth + 1);
  }
};
/** ===============================================
 * ======== UTILITIES
 * */
export function hasDescendantWithAttribute( treeItem, attrib, value,allowFirst = false) {
  if (allowFirst && treeItem[attrib] === value) return true;
  if (!treeItem.children || treeItem.children.length === 0) return false;
  return !!treeItem.children.find((child) =>
    hasDescendantWithAttribute(child, attrib, value, true),
  );
}
export function getDescendantWithAttribute( treeItem, attrib, value,allowFirst = false) {
  if (allowFirst && treeItem[attrib] === value) return treeItem;
  if (!treeItem.children || treeItem.children.length === 0) return null;
  return treeItem.children.find((child) =>
    hasDescendantWithAttribute(child, attrib, value, true),
  );
}
export function hasParentWithAttribute( tree, item, attrib, value, allowFirst = false) {
  const depth = item.depth || 1;
  let parent = null;
  for (let i = depth; i > 1; i--) {
    parent = tree.find(
      (pItem) => !!(pItem.children || []).find((sItem) => sItem.id === item.id),
    );
    if (!parent) return false;
    if (parent[attrib] === value) return true;
  }
  return false;
}
export const hasAncestorWithAttribute = hasParentWithAttribute
export function getPathToRoot(tree, item, max=100){
  return getPathToItem(tree, item, max).reverse();
}
// TODO (next): Test sur un vrai tree, marche sur les array pour l'instant
export function getPathToItem(tree, item, max=100){
  if(!item.parent) return [];
  let parent, i=0, path = [], d=0;
  let subtree = tree;

  while((i===0||!!parent) && i < max){
    if(parent && !parent.parent) return  path;
    parent = subtree.find(i => i.id === (parent || item).parent);
    if(!parent) subtree.forEach(branch => {
      if(!parent && hasDescendantWithAttribute(branch, "id", (parent || item).parent, true)) {
        if(branch.children) {  subtree = branch.children; d++; }
        parent = branch;
      }
    })
    if(parent) path[d === 0 ? "unshift" : "push"](parent.id ? parent.id : parent);
    i++;
  }
  return path;
}
export function useTree<T=any>(arr: T[]=[]){
  return list_to_tree(arr);
}
/*
export function getPathToItem(tree, item, max=5){
  return getPathToRoot(tree, item, max).reverse()
}
*/

export const ArrayToTree = (array) => list_to_tree(array);
export const ArrayWithDepths = (array) => withDepths(array);
