import Dictionary from './dictionary';


export type VertexId = string | number
// type EdgeId= [VertexId, VertexId]

export class Graph<V=any, E=any> {
  private vertices: VertexId[] = [];
  private adjList: Dictionary<VertexId, (string | number)[]> = new Dictionary();

  constructor(private isDirected = false) {}

  addVertex(v: VertexId) {
    if (!this.vertices.includes(v)) {
      this.vertices.push(v);
      this.adjList.set(v, []); // initialize adjacency list with array as well;
    }
  }

  addEdge(a: VertexId, b: VertexId) {
    if (!this.adjList.get(a)) {
      this.addVertex(a);
    }
    if (!this.adjList.get(b)) {
      this.addVertex(b);
    }

    this.adjList.get(a).push(b);

    if (!this.isDirected) {
      this.adjList.get(b).push(a);
    }
    // adjList.get(w).push(v); //commented to run the improved DFS with topological sorting
  }

  getVertices() {
    return this.vertices;
  }

  getAdjList() {
    return this.adjList;
  }

  toString() {
    let s = '';
    for (let i = 0; i < this.vertices.length; i++) {
      s += this.vertices[i] + ' -> ';
      const neighbors = this.adjList.get(this.vertices[i]);
      for (let j = 0; j < neighbors.length; j++) {
        s += neighbors[j] + ' ';
      }
      s += '\n';
    }
    return s;
  }
}

export default Graph
