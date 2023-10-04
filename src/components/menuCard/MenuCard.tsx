import { Menu } from "@/types/menu";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

interface Prop {
  superman: Menu;
}

const MenuCard = ({ superman }: Prop) => {
  const imageUrl = superman.assertUrl;
  console.log("imageUrl");
  return (
    <Card sx={{ width: "250px" }}>
      <CardMedia image={imageUrl} sx={{ height: 150 }}></CardMedia>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {superman.name} <br></br>$ {superman.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          delicious food from burma and you can eat almost everywhere in BURMA
        </Typography>
      </CardContent>

      {/* <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions> */}
    </Card>
  );
};

export default MenuCard;
