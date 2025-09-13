import React from "react";

type Props = React.PropsWithChildren<{
  ratio?: `${number}/${number}`; // e.g. "16/9"
  minHeight?: number;            // px fallback for small screens
  className?: string;
}>;

export default function AspectBox({ratio="16/9", minHeight=320, className="", children}: Props) {
  return (
    <div className={className} style={{
      position:"relative",
      width:"100%",
      aspectRatio: ratio,
      minHeight
    }}>
      <div style={{position:"absolute", inset:0, width:"100%", height:"100%"}}>
        {children}
      </div>
    </div>
  );
}

