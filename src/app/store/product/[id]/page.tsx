"use client";
import { Shopify } from "@shopify/shopify-api";
import styles from "./page.module.css";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, Chip } from "@mui/material";
import { Key } from "react";
import Link from 'next/link';



export default async function product() {
  
  return (
    <Link href={`store`}>
      <Button variant="contained">Back</Button>
    </Link>
  );
}
