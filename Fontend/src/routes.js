import {
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator
} from "react-navigation";

import SingIn from "~/pages/SingIn";
import Login from "~/pages/Login";
import Home from "~/pages/Home";
import Eventos from "~/pages/Eventos";
import Perfil from "~/pages/Perfil";

const Routes = (userLogged = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Login,
        SingIn,
        User: createBottomTabNavigator(
          {
            Home,
            Eventos,
            Perfil
          },
          {
            tabBarOptions: {
              showIcon: true,
              showLabel: true,
              activeTintColor: "rgb(255, 255, 255)",
              inactiveTintColor: "#333",
              style: {
                backgroundColor: "rgb(56,87,116)"
              }
            }
          }
        )
      },
      {
        initialRouteName: userLogged ? "User" : "Login"
      }
    )
  );

export default Routes;
