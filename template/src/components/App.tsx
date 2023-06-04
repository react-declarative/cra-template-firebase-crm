import { observer } from "mobx-react";

import { Switch, Scaffold, Scaffold2, serviceManager } from "react-declarative";

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import UserInfo from "./common/UserInfo";

import useLoader from "../hooks/useLoader";
import useRouteItem from "../hooks/useRouteItem";

import routes, { sideMenuClickMap } from "../config/routes";
import sidemenu from "../config/sidemenu";
import scaffoldmenu from "../config/scaffoldmenu";

import ioc from "../lib/ioc";

import { CC_APP_NAME } from "../config/params";

const Loader = () => (
  <Box
    sx={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      height: "100vh",
      width: "100vw",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
      background: (theme) => theme.palette.background.paper,
    }}
  >
    <CircularProgress />
  </Box>
);

const Fragment = () => <></>;

const App = observer(() => {
  const item = useRouteItem();
  const { loader, setLoader } = useLoader();
  const handleLoadStart = () => setLoader(true);
  const handleLoadEnd = () => setLoader(false);
  const handleAction = async (action: string) => {
    if (action === 'logout-action') {
      await ioc.firebaseService.logout();
    }
  };
  const handleInit = async () => {
    await serviceManager.prefetch(true);
  };
  const handleDispose = async () => {
    await serviceManager.unload(true);
  };
  return (
    <Scaffold2
      appName={CC_APP_NAME}
      activeOptionPath={item?.sideMenu || "root.example.todo_list"}
      loading={loader}
      options={sidemenu}
      actions={scaffoldmenu}
      Loader={Loader}
      BeforeSearch={UserInfo}
      onOptionClick={(path) => {
        ioc.routerService.push(sideMenuClickMap[path] || "/not-found");
      }}
      onAction={handleAction}

    >
      <Switch
        Loader={Fragment}
        history={ioc.routerService}
        items={routes}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onInit={handleInit}
        onDispose={handleDispose}
      />
    </Scaffold2>
  );
});

export default App;
