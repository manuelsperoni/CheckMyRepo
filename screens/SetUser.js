import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useLayoutEffect } from "react";
import { icon } from "../constants/icon";

export default function SetUser({ route, navigation }) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const [user, setUser] = useState(data.user);

  //change header back button icon
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ margin: 10 }}>
          <Image source={icon.arrow} resizeMode='contain' style={{ width: 20 }} />
        </TouchableOpacity>
      ),
    });
  });

  // button done handler
  const onButtonDone = () => {
    console.log({
      type: "SET_USER",
      user: user,
    });
    dispatch({
      type: "SET_USER",
      user: user,
    });
    navigation.goBack();
  };

  return (
    <View style={style.main}>
      <TextInput placeholder='type yopur github username' value={user} style={style.input} onChangeText={setUser} />
      <View style={style.bottom}>
        <TouchableOpacity onPress={onButtonDone}>
          <Text style={style.buttonText}>DONE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = {
  main: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "white",
  },
  bottom: { justifyContent: "flex-end", flexDirection: "row" },
  buttonText: { fontWeight: "bold", fontSize: 20 },
  input: { width: "100%", fontSize: 20, color: "gray", borderBottomWidth: 2, borderColor: "black" },
};
