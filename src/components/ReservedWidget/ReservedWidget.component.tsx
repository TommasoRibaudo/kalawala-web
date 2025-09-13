import React from "react";

type Props = React.PropsWithChildren<{
  minHeightDesktop?: number;
  minHeightMobile?: number;
  className?: string;
}>;

export default function ReservedWidget({
  minHeightDesktop=760,
  minHeightMobile=640,
  className="",
  children
}: Props) {
  return (
    <div
      className={className}
      style={{
        minHeight: minHeightDesktop
      }}
    >
      <div className="reserved-widget">{children}</div>
      <style>{`
        @media (max-width: 640px){
          .reserved-widget { min-height: ${minHeightMobile}px; }
        }
      `}</style>
    </div>
  );
}

