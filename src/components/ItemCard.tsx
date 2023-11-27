import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Typography,
} from "@mui/material";
import Link from "next/link";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import React, { ReactNode } from "react";

interface Prop {
  label: string;
  href?: string;
  subtitle?: number;
  imgUrl?: string;
  icon?: ReactNode;
  selected?: boolean;
  onClick?: () => void;
}

const ItemCard = ({
  label,
  href,
  subtitle,
  onClick,
  imgUrl = "",
  icon,
  selected,
}: Prop) => {
  if (!onClick) {
    if (!imgUrl && href) {
      return (
        <Link href={href} style={{ textDecoration: "none" }}>
          <Card style={{ width: "259px", height: "250px" }}>
            <CardMedia>
              <Box
                display={"flex"}
                height={150}
                width={250}
                alignItems={"center"}
                justifyContent={"center"}
              >
                {icon}
              </Box>
            </CardMedia>
            <CardContent>
              <Typography>{label}</Typography>
              <Typography>{subtitle ? subtitle : ""}</Typography>
            </CardContent>
          </Card>
        </Link>
      );
    } else if (href) {
      return (
        <Link href={href} style={{ textDecoration: "none" }}>
          <Card>
            <CardMedia
              component="img"
              height="150"
              image={`${imgUrl}`}
              alt="photo is unavailable"
            ></CardMedia>
            <CardContent>
              <Typography>{label}</Typography>
              <Typography>{subtitle ? subtitle : ""}</Typography>
            </CardContent>
          </Card>
        </Link>
      );
    }
  }
  return (
    <Paper
      elevation={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        cursor: "pointer",
        width: 259,
        height: 250,
      }}
      onClick={() => onClick && onClick()}
    >
      <Box
        display={"flex"}
        height={150}
        width={250}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {selected && (
          <CheckCircleOutlineIcon
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              fontSize: "30px",
              color: "#1B9C85",
            }}
          />
        )}
        {icon}
      </Box>
      <Typography>{label}</Typography>
    </Paper>
  );
  // if (href) {
  //   return (
  //     <Link href={href}>
  //       <Card>
  //         <CardMedia>
  //           <Box height={150}>{icon}</Box>
  //         </CardMedia>
  //         <CardContent>
  //           <Typography>{label}</Typography>
  //           <Typography>{subtitle}</Typography>
  //         </CardContent>
  //       </Card>
  //     </Link>
  //   );
  // }
  // return (
  //   <Card>
  //     <CardMedia>
  //       <Box height={150}>{icon}</Box>
  //     </CardMedia>
  //     <CardContent>
  //       <Typography>{label}</Typography>
  //       <Typography>{subtitle}</Typography>
  //     </CardContent>
  //   </Card>
  // );
};

export default ItemCard;
