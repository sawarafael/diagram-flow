import React, { useCallback } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from 'reactflow';

import { nodes as initialNodes, edges as initialEdges } from './../../utils/data/NodesAndEdges';
import CustomNode from './CustomNode';

import 'reactflow/dist/style.css';
import './styles.css';

import NodeCard  from './NodeCard'

const DiagramProps = {
    nodeTypes: { custom:  CustomNode},
}

const onInit = (reactFlowInstance) => console.log('flow loaded:', reactFlowInstance);

const Diagram = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const edgesWithUpdatedTypes = edges.map((edge) => {
    if (edge.sourceHandle) {
      const edgeType = nodes.find((node) => node.type === 'custom').data.selects[edge.sourceHandle];
      edge.type = edgeType;
    }

    return edge;
  });

  const onElementClick = (event, object) => {
    console.log(object.data);
    };

  return (
        <><ReactFlow
      nodes={nodes}
      edges={edgesWithUpdatedTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onInit={onInit}
      fitView
      attributionPosition="top-right"
      nodeTypes={DiagramProps.nodeTypes.custom}
      style={{
        height: 850,
        width: 850
      }}
      onElementClick={onElementClick}
      onNodeClick={onElementClick}
    >
      <NodeCard />
      <MiniMap zoomable pannable />
      <Controls />
      <Background color="#aaa" gap={16} />
    </ReactFlow>
    </>    
  );
};

export default Diagram;
