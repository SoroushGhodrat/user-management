import { Chip } from "@mui/joy";
import { Status } from "@/models/user";

type StatusChipProps = {
  status: Status;
  children: React.ReactNode;
};

const statusColors = {
  active: { backgroundColor: "#D6EDED", color: "#224B4C" },
  invited: { backgroundColor: "#FAE5CD", color: "#683900" },
  blocked: { backgroundColor: "#FFC1C1", color: "#8B0000" },
  inactive: { backgroundColor: "#D3D3D3", color: "#808080" },
};

const StatusChip: React.FC<StatusChipProps> = ({ status, children }) => {
  const colors = statusColors[status] || {
    backgroundColor: "",
    color: "#24292e",
  };

  return (
    <Chip
      sx={{
        "--Chip-radius": "6px",
        backgroundColor: colors.backgroundColor,
        color: colors.color,
        textTransform: "capitalize",
        textAlign: "center",
        minWidth: 70,
        ml: 2,
      }}
    >
      {children}
    </Chip>
  );
};

export default StatusChip;
