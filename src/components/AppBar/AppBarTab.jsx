import { Link } from "react-router-native";

import Text from "../Text";
import theme from "../../theme";

const AppBarTab = ({ to, label, style }) => {
  if (!to) {
    return (
      <Text fontWeight="bold" style={{ color: theme.colors.textContrast }}>
        {label}
      </Text>
    );
  }

  return (
    <Link to={to} style={style}>
      <Text fontWeight="bold" style={{ color: theme.colors.textContrast }}>
        {label}
      </Text>
    </Link>
  );
};

export default AppBarTab;
