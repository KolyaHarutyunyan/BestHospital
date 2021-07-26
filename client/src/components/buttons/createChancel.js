import { Button } from "@material-ui/core";
import { Colors } from "@eachbase/utils";

export const CreateChancel = ({
  create,
  chancel,
  onCreate,
  onClose,
  classes,
}) => {
  return (
    <div className={classes}>
      <Button
        style={{
          textTransform: "capitalize",
          width: "238px",
          height: "48px",
          background: Colors.ThemeGreen,
          borderRadius: "8px",
          fontSize: "16px",
          fontWeight: "600",
          color: Colors.TextWhite,
        }}
        onClick={onCreate}
      >
        {create}
      </Button>
      <Button
        style={{
          textTransform: "capitalize",
          width: "238px",
          height: "48px",
          background: Colors.ThemeGray,
          borderRadius: "8px",
          marginLeft: "16px",
          fontSize: "16px",
          fontWeight: "600",
          color: Colors.TextPrimary,
        }}
        onClick={onClose}
      >
        {chancel}
      </Button>
    </div>
  );
};
