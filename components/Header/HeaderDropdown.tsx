import Link from "next/link";
import { Dropdown, Avatar } from "@nextui-org/react";

export default function HeaderDropdown() {
  return (
    <Dropdown>
        <Dropdown.Trigger>
            <Avatar
                bordered
                color="primary"
                size="md"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
        </Dropdown.Trigger>
        <Dropdown.Menu aria-label="Static Actions">
            <Dropdown.Item key="profile">
                <Link href="/">
                    Profile
                </Link>
            </Dropdown.Item>
            <Dropdown.Item key="my_favourite">
                <Link href="/">
                    My Favourite
                </Link>
            </Dropdown.Item>
            <Dropdown.Item key="logout" withDivider color="error">
                Log Out
            </Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
  );
}