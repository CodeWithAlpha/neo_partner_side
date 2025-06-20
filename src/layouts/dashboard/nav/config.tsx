// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
// components
import SvgColor from "../../../components/svg-color";

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const ICONS = {
  user: icon("ic_user"),
  ecommerce: icon("ic_ecommerce"),
  analytics: icon("ic_analytics"),
  dashboard: icon("ic_dashboard"),
};

const NavConfig = [
  {
    subheader: "",
    items: [
      { title: "Dashboard", path: PATH_DASHBOARD.dashboard },
      { title: "Api Credentials", path: PATH_DASHBOARD.ApiCredentials },
      { title: "Wallet", path: PATH_DASHBOARD.wallet },
      { title: "Services", path: PATH_DASHBOARD.Services },
      { title: "Api Documentation", path: PATH_DASHBOARD.ApiDocs },
      { title: "Transactions", path: PATH_DASHBOARD.transactions },
    ],
  },
  // MANAGEMENT
  // ----------------------------------------------------------------------
  // {
  //   subheader: "",
  //   items: [
  //     {
  //       title: "user",
  //       path: PATH_DASHBOARD.user.root,
  //       icon: ICONS.user,
  //       children: [
  //         { title: "Four", path: PATH_DASHBOARD.user.four },
  //         { title: "Five", path: PATH_DASHBOARD.user.five },
  //         { title: "Six", path: PATH_DASHBOARD.user.six },
  //       ],
  //     },
  //   ],
  // },
];

export default NavConfig;
