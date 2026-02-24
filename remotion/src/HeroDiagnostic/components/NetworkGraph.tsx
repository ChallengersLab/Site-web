import React, { useMemo } from "react";
import { useCurrentFrame } from "remotion";

const W = 1920;
const H = 1080;

interface Node {
  x: number;
  y: number;
  size: number;
  color: string;
  side: "left" | "right";
}

interface Connection {
  from: number;
  to: number;
  length: number;
}

interface NetworkGraphProps {
  progress: number;
  mergeProgress: number;
  opacity?: number;
}

export const NetworkGraph: React.FC<NetworkGraphProps> = ({
  progress,
  mergeProgress,
  opacity = 1,
}) => {
  const frame = useCurrentFrame();

  // Pre-compute nodes and connections deterministically
  const { nodes, sameSideConnections, crossConnections } = useMemo(() => {
    const allNodes: Node[] = [];

    // Left side nodes (purple) — 10 nodes
    for (let i = 0; i < 10; i++) {
      allNodes.push({
        x: 100 + ((i * 173 + 47) % 750),
        y: 100 + ((i * 271 + 83) % 850),
        size: 4 + (i % 3),
        color: "#7B5EFF",
        side: "left",
      });
    }

    // Right side nodes (cyan) — 10 nodes
    for (let i = 0; i < 10; i++) {
      allNodes.push({
        x: 1070 + ((i * 173 + 47) % 750),
        y: 100 + ((i * 271 + 83) % 850),
        size: 4 + (i % 3),
        color: "#00F5FF",
        side: "right",
      });
    }

    // Same-side connections: nodes within 400px of each other on same side
    const sameConns: Connection[] = [];
    for (let i = 0; i < allNodes.length; i++) {
      for (let j = i + 1; j < allNodes.length; j++) {
        if (allNodes[i].side !== allNodes[j].side) continue;
        const dx = allNodes[i].x - allNodes[j].x;
        const dy = allNodes[i].y - allNodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 400) {
          sameConns.push({ from: i, to: j, length: dist });
        }
      }
    }

    // Cross-center connections: find left-right pairs that are close-ish
    // Sort potential cross pairs by distance, take the 5 closest
    const crossCandidates: Connection[] = [];
    for (let i = 0; i < 10; i++) {
      for (let j = 10; j < 20; j++) {
        const dx = allNodes[i].x - allNodes[j].x;
        const dy = allNodes[i].y - allNodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        crossCandidates.push({ from: i, to: j, length: dist });
      }
    }
    crossCandidates.sort((a, b) => a.length - b.length);
    const crossConns = crossCandidates.slice(0, 5);

    return {
      nodes: allNodes,
      sameSideConnections: sameConns,
      crossConnections: crossConns,
    };
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        width: W,
        height: H,
        overflow: "hidden",
        pointerEvents: "none",
        opacity,
      }}
    >
      {/* SVG layer for all connection lines */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: W,
          height: H,
        }}
        viewBox={`0 0 ${W} ${H}`}
      >
        {/* Same-side connections */}
        {sameSideConnections.map((conn, idx) => {
          const fromNode = nodes[conn.from];
          const toNode = nodes[conn.to];

          // Both nodes must be visible for the line to start drawing
          const fromIndex = fromNode.side === "left" ? conn.from : conn.from - 10;
          const toIndex = toNode.side === "left" ? conn.to : conn.to - 10;
          const neededProgress = Math.max(fromIndex, toIndex) / 10;

          if (progress <= neededProgress) return null;

          // Connection draws once both nodes are visible
          const connectionProgress = Math.min(
            1,
            (progress - neededProgress) / 0.15,
          );

          const lineColor = fromNode.side === "left" ? "#7B5EFF" : "#00F5FF";
          const dashOffset = conn.length * (1 - connectionProgress);

          return (
            <line
              key={`same-${idx}`}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke={lineColor}
              strokeWidth={1}
              strokeOpacity={0.2}
              strokeDasharray={conn.length}
              strokeDashoffset={dashOffset}
            />
          );
        })}

        {/* Cross-center connections */}
        {crossConnections.map((conn, idx) => {
          const fromNode = nodes[conn.from];
          const toNode = nodes[conn.to];

          const threshold = idx / crossConnections.length;
          if (mergeProgress <= threshold) return null;

          const connectionProgress = Math.min(
            1,
            (mergeProgress - threshold) / 0.25,
          );

          const dashOffset = conn.length * (1 - connectionProgress);

          return (
            <line
              key={`cross-${idx}`}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke="#FFFFFF"
              strokeWidth={1.5}
              strokeOpacity={0.15}
              strokeDasharray={conn.length}
              strokeDashoffset={dashOffset}
            />
          );
        })}
      </svg>

      {/* Node layer (divs on top of SVG) */}
      {nodes.map((node, i) => {
        // Node index within its side (0-9)
        const sideIndex = i < 10 ? i : i - 10;
        const visible = progress > sideIndex / 10;
        if (!visible) return null;

        // Pulsing opacity
        const pulse = 0.6 + 0.2 * Math.sin(frame / 20 + i * 2);

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: node.x - node.size / 2,
              top: node.y - node.size / 2,
              width: node.size,
              height: node.size,
              borderRadius: "50%",
              backgroundColor: node.color,
              opacity: pulse,
              boxShadow: `0 0 8px ${node.color}60`,
            }}
          />
        );
      })}
    </div>
  );
};
