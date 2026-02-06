import { Flex } from "antd";
import clsx from "clsx";
import { type CSSProperties, type FC, useContext } from "react";
import { Marker } from "react-mark.js";
import { useSnapshot } from "valtio";
import { MainContext } from "@/pages/Main";
import { clipboardStore } from "@/stores/clipboard";
import type { DatabaseSchemaHistory } from "@/types/database";

interface TextProps extends DatabaseSchemaHistory<"text"> {
  isExpanded: boolean;
  onExpand: () => void;
  onCollapse: () => void;
}

const Text: FC<TextProps> = (props) => {
  const { value, subtype, isExpanded, onExpand, onCollapse } = props;
  const { rootState } = useContext(MainContext);
  const { content } = useSnapshot(clipboardStore);

  const renderMarker = () => {
    return <Marker mark={rootState.search}>{value}</Marker>;
  };

  const renderColor = () => {
    const className = "absolute rounded-full";
    const style: CSSProperties = {
      background: value,
    };

    return (
      <Flex align="center" gap="small">
        <div className="relative h-5.5 min-w-5.5">
          <span
            className={clsx(className, "inset-0 opacity-50")}
            style={style}
          />

          <span className={clsx(className, "inset-0.5")} style={style} />
        </div>

        {renderMarker()}
      </Flex>
    );
  };

  const renderContent = () => {
    if (subtype === "color") {
      return renderColor();
    }

    return renderMarker();
  };

  const getLineClampStyle = () => {
    return {
      display: "-webkit-box",
      overflow: "hidden",
      textOverflow: "ellipsis",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: content.plainTextLines,
    };
  };

  return (
    <div className="relative" onClick={onExpand} onMouseLeave={onCollapse}>
      {/* 原始文本 */}
      <div style={getLineClampStyle()}>{renderContent()}</div>

      {/* 展开的文本（向下延伸） */}
      {isExpanded && (
        <div className="absolute top-full right-0 left-0 z-50 mt-1 rounded-md border border-border-1 bg-color-1 p-2 shadow-lg">
          <div
            style={{
              display: "-webkit-box",
              overflow: "hidden",
              textOverflow: "ellipsis",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 5,
            }}
          >
            {renderContent()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Text;
