import React, { useState, SyntheticEvent } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  FormGroup,
  CustomInput,
  Label,
} from "reactstrap";
import Settings from "../../utils/Settings";
import ThemeManager, { Theme } from "../../utils/Theme";

type Props = {
  open?: boolean;
  changeTheme: (theme: Theme) => void;
  openSettingsModal: () => void;
};

export default function SettingsComponent(props: Props) {
  const { open, changeTheme, openSettingsModal } = props;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [settings, setSettings] = useState(Settings.load());
  const toggleSwitch = (e: SyntheticEvent) => {
    Settings.toggleFlag(e.target.id);
    setSettings({ ...Settings.settings });
  };
  const clickDropdownItem = (e: SyntheticEvent) => {
    changeTheme(e.target.id);
    setSettings({ ...Settings.settings });
  };
  const toggleDropdownOpen = () => setDropdownOpen(!dropdownOpen);
  const { themes } = ThemeManager;

  return (
    <Modal isOpen={open} toggle={openSettingsModal} centered>
      <ModalHeader toggle={openSettingsModal}>Settings</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="exampleCheckbox">Theme</Label>
          <Dropdown isOpen={dropdownOpen} toggle={toggleDropdownOpen}>
            <DropdownToggle caret>Theme</DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Theme</DropdownItem>
              {themes.map((theme) => (
                <DropdownItem
                  id={theme.id}
                  key={theme.id}
                  active={theme.id === settings.theme}
                  onClick={clickDropdownItem}
                >
                  {theme.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Label for="exampleCheckbox">Experimental</Label>
          <div>
            {settings.flags.map((flag) => (
              <CustomInput
                key={flag.id}
                type="switch"
                checked={flag.enabled}
                id={flag.id}
                label={flag.name}
                onClick={toggleSwitch}
              />
            ))}
          </div>
        </FormGroup>
      </ModalBody>
    </Modal>
  );
}

Settings.defaultProps = {
  open: false,
};