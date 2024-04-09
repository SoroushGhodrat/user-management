import Checkbox from "@mui/joy/Checkbox";
import Sheet from "@mui/joy/Sheet";
import Table from "@mui/joy/Table";
import Chip from "@mui/joy/Chip";

import styles from "./users.module.css";
import DUMMY_USERS from "../../mock/users";
import Avatar from "@mui/joy/Avatar";
import Person from "@mui/icons-material/Person";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { phoneFormater, dateFormater } from "../../helper/helper";

const users: React.FC = () => {
  return (
    <Sheet>
      <Table
        hoverRow={true}
        aria-label="basic table"
        borderAxis="xBetween"
        size="md"
        stickyFooter={false}
        stickyHeader={false}
        variant="outlined"
      >
        <caption className={styles.px_1}>A caption should be a summary of the table.</caption>
        <thead>
          <tr>
            <th style={{ width: "auto" }}>
              <Checkbox label="" variant="outlined" size="sm" />
            </th>
            <th style={{ width: "20%" }}>Name</th>
            <th>Role</th>
            <th style={{ width: "20%" }}>Email</th>
            <th>Created on</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {DUMMY_USERS.map((user) => (
            <tr key={user.id}>
              <td>
                <Checkbox label="" variant="outlined" size="sm" />
              </td>
              <td>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  {user.image ? (
                    <Avatar size="md" src={user.image} alt={user.name} />
                  ) : (
                    <Avatar>
                      <Person fontSize="large" />
                    </Avatar>
                  )}

                  <p>
                    {user.name} {user.family}
                    {user.isOwner && (
                      <Chip sx={{ "--Chip-radius": "6px", background: "#D6EDED", ml: 2 }}>
                        Owner
                      </Chip>
                    )}
                  </p>
                </div>
              </td>
              <td>{user.role}</td>
              <td>{user.email}</td>
              <td style={{ width: "auto" }}>{dateFormater(user.createdOn)}</td>
              <td>{`${user.countryCode} ${phoneFormater(user.phone)}`}</td>
              <td>{user.status}</td>
              <td>...</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
};

export default users;
