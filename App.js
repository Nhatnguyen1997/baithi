
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import chitiet from "./chitiet";
import danhsach from "./danhsach";
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StudentList">
        <Stack.Screen name="danhsach" component={danhsach} />
        <Stack.Screen name="chitiet" component={chitiet} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;