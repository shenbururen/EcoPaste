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
  const { value, subtype, isExpanded } = props;
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
    if (isExpanded) {
      return {};
    }
    return {
      display: "-webkit-box",
      overflow: "hidden",
      textOverflow: "ellipsis",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: content.plainTextLines,
    };
  };

  return (
    <div className="relative">
      {/* 原始文本 */}
      <div style={getLineClampStyle()}>{renderContent()}</div>
    </div>
  );
};

export default Text;
