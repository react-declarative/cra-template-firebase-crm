import { IScaffold2Group } from "react-declarative";

import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheckOutlined";
import PublicIcon from "@mui/icons-material/Public";

export const sidemenu: IScaffold2Group[] = [
    {
        id: "example",
        label: "Example",
        icon: PublicIcon,
        children: [
            {
                id: "todo_list",
                label: "Todo list",
                icon: PlaylistAddCheckIcon,
            },
        ],
    },
];

export default sidemenu;
