"use client";
import { Shopify } from "@shopify/shopify-api";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, Chip } from "@mui/material";
import { Key } from "react";
import Link from "next/link";
import styles from "./page.module.css";

export async function getProductById(productId: any) {
  const res = await fetch("http://localhost:8080" + "/products/" + productId, {
    cache: "no-store",
  });
  const data = await res.json();
  const resp = data;
  return resp as any;
}

export default async function loadProduct({ params }: any) {
  const product = await getProductById(params.id);
  return (
    <div>
      <div className={styles.pageMargins}>
        <img
          src={product.image.src}
          alt={product.image.alt}
          className={styles.imageStyle}
        />

        <div>
          <h1>{product.title}</h1>
          <p>{product.vendor}</p>
          <p>{product.product_type}</p>
          <p>{product.body_html}</p>
          {product.tags && (
            <Typography variant="body2" color="text.primary">
              Tags:
              {product.tags
                .split(",")
                .map((tag: string, index: Key | null | undefined) => (
                  <span key={index}>
                    <Chip
                      label={tag.trim()}
                      color="primary"
                      sx={{
                        marginRight: "0.5rem",
                        marginBottom: "0.5rem",
                        marginTop: "0.5rem",
                      }}
                    />
                    {index !== product.tags.split(",").length - 1 && " "}
                  </span>
                ))}
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
}
