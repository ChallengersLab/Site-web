import React from "react";

interface GradientTextProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  italic?: boolean;
}

export const GradientText: React.FC<GradientTextProps> = ({
  children,
  style,
  italic = false,
}) => {
  return (
    <span
      style={{
        background: "linear-gradient(135deg, #7B5EFF 0%, #00F5FF 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        ...(italic ? { fontStyle: "italic" as const } : {}),
        ...style,
      }}
    >
      {children}
    </span>
  );
};
