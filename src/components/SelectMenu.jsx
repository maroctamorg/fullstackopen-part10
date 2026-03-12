import { useMemo, useState } from "react";
import { Button, Menu } from "react-native-paper";

const SelectMenu = ({
  labelPrefix,
  value,
  options,
  onSelect,
  buttonStyle,
  contentStyle,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedLabel = useMemo(() => {
    const selectedOption = options.find((option) => option.value === value);
    return selectedOption ? selectedOption.label : options[0]?.label || "";
  }, [options, value]);

  const handleSelect = (selectedValue) => {
    onSelect(selectedValue);
    setIsOpen(false);
  };

  return (
    <Menu
      visible={isOpen}
      onDismiss={() => setIsOpen(false)}
      contentStyle={contentStyle}
      anchor={
        <Button
          mode="outlined"
          icon="menu-down"
          style={buttonStyle}
          onPress={() => setIsOpen(true)}
        >
          {`${labelPrefix}: ${selectedLabel}`}
        </Button>
      }
    >
      {options.map((option) => (
        <Menu.Item
          key={option.value}
          onPress={() => handleSelect(option.value)}
          title={option.label}
        />
      ))}
    </Menu>
  );
};

export default SelectMenu;
