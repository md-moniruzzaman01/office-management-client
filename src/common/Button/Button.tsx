"use client";

import { FC } from "react";
import { ButtonProps } from "./type";
import { cx } from "../../shared/config/constaints";

const Button: FC<ButtonProps> = ({
  className,
  sizeClass = "px-5 py-2",
  fontSize,
  disabled = false,
  children,
  mini,
  type,
  loading,
  link,
  primary,
  secondary,
  ghost,
  transparent,
  dangerBgTransparent,
  danger,
  status,
  edit,
  icon,
  onClick = () => {},
}) => {
  const CLASSES = `transition duration-500 
        ${className} 
        ${icon && "flex"} 
        ${
          disabled &&
          "!bg-primary/50 hover:!bg-disable cursor-not-allowed text-gray-400"
        } 
         ${mini && "!py-1 !px-2 !text-sm !h-7"}
        ${
          loading &&
          "cursor-not-allowed !bg-disable hover:!bg-disable flex items-center justify-center "
        }
        ${fontSize} 
        ${sizeClass} 
        
    `;

  const linkStyle = `text-linkColor !px-0 !py-0 hover:text-shadeOfBlue  hover:underline !hover:bg-transparent`;
  const primaryStyle = `bg-btnPrimary text-solidWhite rounded-md hover:bg-btnSecondary`;
  const secondaryStyle = `bg-btnSecondary text-solidWhite rounded-md hover:bg-btnPrimary `;
  const ghostStyle = `bg-btnGhost text-solidBlack rounded-md hover:bg-lightShadeOfBlueGray`;
  const transparentStyle = `!px-0 !py-0`;
  const dangerBgTransparentStyle = `bg-transparent border-shadeOfGrayishWhite border rounded-md text-shadeOfRed hover:bg-lightShadeOfBlueGray`;
  const dangerStyle = `bg-shadeOfRed text-solidWhite rounded-md hover:bg-lightRed`;
  const statusStyle = `bg-transparent  border rounded-full text-xs  `;
  const iconStyle = `flex items-center bg-transparent border-shadeOfGrayishWhite border rounded-md`;

  const _renderLoading = () => {
    return (
      <svg
        className="animate-spin -ml-1 mr-3 h-5 w-5 "
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    );
  };

  return (
    <button
      disabled={disabled || loading}
      className={cx(
        CLASSES,
        link && linkStyle,
        primary && primaryStyle,
        secondary && secondaryStyle,
        ghost && ghostStyle,
        transparent && transparentStyle,
        dangerBgTransparent && dangerBgTransparentStyle,
        danger && dangerStyle,
        status && statusStyle,
        edit && iconStyle
      )}
      onClick={onClick}
      type={type}
    >
      {loading && _renderLoading()}
      {children || `This is Button`}
      {icon && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export default Button;
