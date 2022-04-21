import React from "react";
import { Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

export function MADButton({
  title,
  onPress,
  disabled,
  backgroundColor,
  color,
  variant,
  margin,
  padding,
  borderRadius,
  fontSize,
}) {
  let style = {
    flex: 0,
    margin: margin ? margin : 0,
    padding: padding ? padding : 20,
    opacity: disabled ? 0.3 : 1,
    textAlign: "center",
    borderRadius: borderRadius ? borderRadius : 10,
    fontWeight: "bold",
    fontSize: fontSize ? fontSize : 18,
    overflow: "hidden",
  };

  if (variant == "filled") {
    style.backgroundColor = backgroundColor ? backgroundColor : "black";
    style.color = color ? color : "white";
  }
  if (variant == "outlined") {
    style.borderWidth = 1;
    style.borderColor = backgroundColor ? backgroundColor : "black";
    style.color = color ? color : "white";
  }
  if (variant == "ghost") {
    style.color = color ? color : "white";
  }

  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <Text style={style}>{title}</Text>
    </TouchableOpacity>
  );
}

export function MADButtonIcon({
  title,
  onPress,
  disabled,
  backgroundColor,
  color,
  variant,
  margin,
  padding,
  borderRadius,
  borderColor,
  borderWidth,
  icon,
  iconColor,
  iconSize,
  fontSize,
  flexDirection,
  width,
  height,
}) {
  let style = {
    margin: margin !== false ? margin : 0,
    padding: padding !== false ? padding : 10,
    opacity: disabled ? 0.3 : 1,
    textAlign: "center",
    borderRadius: borderRadius !== false ? borderRadius : 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: borderWidth !== false ? borderWidth : 0,
    borderColor: borderColor !== false ? borderColor : "black",
    borderRadius: borderRadius !== false ? borderRadius : 10,
    color: color != false ? color : "white",
    backgroundColor: backgroundColor !== false ? backgroundColor : "black",
    flexDirection: flexDirection ? flexDirection : "row",
    overflow: "hidden",
    width: width !== false ? width : "100%",
    height: height !== false ? height : "100%",
  };

  if (variant == "filled") {
    style.backgroundColor = backgroundColor ? backgroundColor : "black";
    style.color = color ? color : "white";
  }
  if (variant == "outlined") {
    style.borderWidth = 1;
    style.borderColor = backgroundColor ? backgroundColor : "black";
    style.color = color ? color : "white";
  }
  if (variant == "ghost") {
    style.color = color ? color : "white";
    style.backgroundColor = "transparent";
  }

  const textStyle = {
    fontSize: fontSize ? fontSize : 16,
    color: color ? color : "white",
    marginLeft: title && flexDirection == "row" ? 10 : 0,
  };

  // style.backgroundColor = 'red';
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress ? onPress : () => console.log("Pressed")}>
      <View style={[style]}>
        <Ionicons
          name={icon ? icon : "ellipsis-horizontal"}
          size={iconSize ? iconSize : 25}
          color={iconColor ? iconColor : "white"}
        />
        <Text style={textStyle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}
