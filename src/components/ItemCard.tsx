import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import Link from "next/link";
import React, { ReactNode } from "react";

interface Prop {
  label: string;
  href?: string;
  subtitle: number;
  imgUrl?: string;
  icon?: ReactNode;
}

const ItemCard = ({ label, href, subtitle, imgUrl = "", icon }: Prop) => {
  if (href && label && subtitle && (imgUrl || icon)) {
    if (!imgUrl) {
      return (
        <Link href={href}>
          <Card>
            <CardMedia>
              <Box height={150}>{icon}</Box>
            </CardMedia>
            <CardContent>
              <Typography>{label}</Typography>
              <Typography>{subtitle}</Typography>
            </CardContent>
          </Card>
        </Link>
      );
    } else {
      return (
        <Link href={href}>
          <Card>
            <CardMedia
              component="img"
              height="150"
              image={`${imgUrl}`}
              alt="Paella dish"
            ></CardMedia>
            <CardContent>
              <Typography>{label}</Typography>
              <Typography>{subtitle}</Typography>
            </CardContent>
          </Card>
        </Link>
      );
    }
  }
  if (href) {
    return (
      <Link href={href}>
        <Card>
          <CardMedia>
            <Box height={150}>{icon}</Box>
          </CardMedia>
          <CardContent>
            <Typography>{label}</Typography>
            <Typography>{subtitle}</Typography>
          </CardContent>
        </Card>
      </Link>
    );
  }
  return (
    <Card>
      <CardMedia>
        <Box height={150}>{icon}</Box>
      </CardMedia>
      <CardContent>
        <Typography>{label}</Typography>
        <Typography>{subtitle}</Typography>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
